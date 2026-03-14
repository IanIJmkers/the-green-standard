import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  shopifyFetch,
  CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION,
  CUSTOMER_ACCESS_TOKEN_DELETE_MUTATION,
  CUSTOMER_CREATE_MUTATION,
  CUSTOMER_RECOVER_MUTATION,
  CUSTOMER_UPDATE_MUTATION,
  CUSTOMER_QUERY,
} from "../utils/shopify";
import {
  signInWithGoogle,
  signInWithApple,
  generateSocialPassword,
} from "../utils/socialAuth";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

const TOKEN_KEY = "tgs_customer_token";
const TOKEN_EXPIRY_KEY = "tgs_customer_token_expiry";

export const AuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [accessToken, setAccessToken] = useState(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (token && expiry && new Date(expiry) > new Date()) {
      return token;
    }
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
    return null;
  });
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState(null);

  const clearError = useCallback(() => setError(null), []);

  // Fetch customer data when we have a token
  const fetchCustomer = useCallback(async (token) => {
    if (!token) return null;
    try {
      const data = await shopifyFetch(CUSTOMER_QUERY, {
        customerAccessToken: token,
      });
      if (data?.customer) {
        setCustomer(data.customer);
        return data.customer;
      }
      return null;
    } catch (err) {
      // Token might be expired/invalid
      console.warn("Failed to fetch customer:", err.message);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_EXPIRY_KEY);
      setAccessToken(null);
      setCustomer(null);
      return null;
    }
  }, []);

  // On mount, try to restore session
  useEffect(() => {
    if (accessToken) {
      fetchCustomer(accessToken).finally(() => setInitializing(false));
    } else {
      setInitializing(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sign in with email/password
  const signIn = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await shopifyFetch(CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION, {
        input: { email, password },
      });

      const { customerAccessToken, customerUserErrors } =
        data.customerAccessTokenCreate;

      if (customerUserErrors?.length > 0) {
        const msg = customerUserErrors.map((e) => e.message).join(". ");
        setError(msg);
        return { success: false, error: msg };
      }

      if (customerAccessToken) {
        const { accessToken: token, expiresAt } = customerAccessToken;
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(TOKEN_EXPIRY_KEY, expiresAt);
        setAccessToken(token);
        await fetchCustomer(token);
        return { success: true };
      }

      setError("Unable to sign in. Please check your credentials.");
      return { success: false, error: "Unable to sign in" };
    } catch (err) {
      const msg = err.message || "An error occurred during sign in.";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, [fetchCustomer]);

  // Sign up (create account)
  const signUp = useCallback(async ({ email, password, firstName, lastName }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await shopifyFetch(CUSTOMER_CREATE_MUTATION, {
        input: { email, password, firstName, lastName, acceptsMarketing: true },
      });

      const { customerUserErrors } = data.customerCreate;

      if (customerUserErrors?.length > 0) {
        const msg = customerUserErrors.map((e) => e.message).join(". ");
        setError(msg);
        return { success: false, error: msg };
      }

      // Auto sign-in after registration
      const result = await signIn(email, password);
      return result;
    } catch (err) {
      const msg = err.message || "An error occurred during registration.";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, [signIn]);

  // Social sign-in (Google / Apple) — handled locally
  const socialSignIn = useCallback(
    async (provider) => {
      setLoading(true);
      setError(null);
      try {
        // 1. Authenticate with the social provider in-browser
        let profile;
        if (provider === "google") {
          profile = await signInWithGoogle();
        } else if (provider === "apple") {
          profile = await signInWithApple();
        } else {
          throw new Error(`Unsupported provider: ${provider}`);
        }

        const { email, firstName, lastName } = profile;
        if (!email) {
          throw new Error(
            "No email returned from provider. Please allow email access."
          );
        }

        // 2. Derive a deterministic password for this social identity
        const socialId =
          provider === "google" ? profile.googleId : profile.appleId;
        const password = generateSocialPassword(provider, socialId);

        // 3. Try signing in first (existing customer)
        try {
          const tokenData = await shopifyFetch(
            CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION,
            { input: { email, password } }
          );
          const { customerAccessToken, customerUserErrors } =
            tokenData.customerAccessTokenCreate;

          if (customerAccessToken?.accessToken) {
            const { accessToken: token, expiresAt } = customerAccessToken;
            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem(TOKEN_EXPIRY_KEY, expiresAt);
            localStorage.setItem("tgs_social_provider", provider);
            setAccessToken(token);
            await fetchCustomer(token);
            return { success: true };
          }

          // If sign-in failed, the customer probably doesn't exist yet
          if (
            customerUserErrors?.some(
              (e) =>
                e.code === "UNIDENTIFIED_CUSTOMER" ||
                e.message.toLowerCase().includes("unidentified")
            )
          ) {
            // Fall through to create account below
          } else if (customerUserErrors?.length > 0) {
            throw new Error(
              customerUserErrors.map((e) => e.message).join(". ")
            );
          }
        } catch (signInErr) {
          // If it's not a "customer not found" type error, rethrow
          if (
            !signInErr.message?.toLowerCase().includes("unidentified") &&
            !signInErr.message?.toLowerCase().includes("invalid")
          ) {
            throw signInErr;
          }
        }

        // 4. Customer doesn't exist — create one
        const createData = await shopifyFetch(CUSTOMER_CREATE_MUTATION, {
          input: {
            email,
            password,
            firstName: firstName || provider,
            lastName: lastName || "User",
            acceptsMarketing: true,
          },
        });

        const { customerUserErrors: createErrors } =
          createData.customerCreate;

        if (createErrors?.length > 0) {
          // "Email has already been taken" means the customer exists but
          // with a different password (manually created account).
          const emailTaken = createErrors.some(
            (e) =>
              e.code === "TAKEN" ||
              e.message.toLowerCase().includes("has already been taken")
          );
          if (emailTaken) {
            setError(
              "An account with this email already exists. Please sign in with your email and password instead."
            );
            return { success: false, error: "email_taken" };
          }
          throw new Error(createErrors.map((e) => e.message).join(". "));
        }

        // 5. Sign in with the newly created account
        const newTokenData = await shopifyFetch(
          CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION,
          { input: { email, password } }
        );
        const { customerAccessToken: newToken } =
          newTokenData.customerAccessTokenCreate;

        if (newToken?.accessToken) {
          localStorage.setItem(TOKEN_KEY, newToken.accessToken);
          localStorage.setItem(TOKEN_EXPIRY_KEY, newToken.expiresAt);
          localStorage.setItem("tgs_social_provider", provider);
          setAccessToken(newToken.accessToken);
          await fetchCustomer(newToken.accessToken);
          return { success: true };
        }

        throw new Error("Failed to sign in after creating social account");
      } catch (err) {
        if (err.message === "Sign-in cancelled") {
          // User closed the popup, no error to show
          return { success: false, error: "cancelled" };
        }
        const msg =
          err.message || `An error occurred during ${provider} sign-in.`;
        setError(msg);
        return { success: false, error: msg };
      } finally {
        setLoading(false);
      }
    },
    [fetchCustomer]
  );

  // Sign out
  const signOut = useCallback(async () => {
    if (accessToken) {
      try {
        await shopifyFetch(CUSTOMER_ACCESS_TOKEN_DELETE_MUTATION, {
          customerAccessToken: accessToken,
        });
      } catch (err) {
        // Ignore errors on sign out
      }
    }
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
    localStorage.removeItem("tgs_social_provider");
    setAccessToken(null);
    setCustomer(null);
  }, [accessToken]);

  // Password recovery
  const recoverPassword = useCallback(async (email) => {
    setLoading(true);
    setError(null);
    try {
      const data = await shopifyFetch(CUSTOMER_RECOVER_MUTATION, { email });
      const { customerUserErrors } = data.customerRecover;

      if (customerUserErrors?.length > 0) {
        const msg = customerUserErrors.map((e) => e.message).join(". ");
        setError(msg);
        return { success: false, error: msg };
      }

      return { success: true };
    } catch (err) {
      const msg = err.message || "An error occurred.";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Update customer profile
  const updateProfile = useCallback(async (updates) => {
    if (!accessToken) return { success: false, error: "Not signed in" };
    setLoading(true);
    setError(null);
    try {
      const data = await shopifyFetch(CUSTOMER_UPDATE_MUTATION, {
        customerAccessToken: accessToken,
        customer: updates,
      });

      const { customer: updated, customerUserErrors } = data.customerUpdate;

      if (customerUserErrors?.length > 0) {
        const msg = customerUserErrors.map((e) => e.message).join(". ");
        setError(msg);
        return { success: false, error: msg };
      }

      if (updated) {
        setCustomer((prev) => ({ ...prev, ...updated }));
        return { success: true };
      }

      return { success: false, error: "Update failed" };
    } catch (err) {
      const msg = err.message || "An error occurred.";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  const isAuthenticated = !!accessToken && !!customer;

  return (
    <AuthContext.Provider
      value={{
        customer,
        isAuthenticated,
        loading,
        initializing,
        error,
        clearError,
        signIn,
        signUp,
        socialSignIn,
        signOut,
        recoverPassword,
        updateProfile,
        fetchCustomer: () => fetchCustomer(accessToken),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
