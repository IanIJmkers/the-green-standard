/**
 * Social Authentication Utilities
 * Handles Google Identity Services and Apple Sign-in SDK integration.
 *
 * Required env vars:
 *   REACT_APP_GOOGLE_CLIENT_ID   – from Google Cloud Console
 *   REACT_APP_APPLE_CLIENT_ID    – your Apple Services ID (e.g. com.thegreenstandardgolf.auth)
 *   REACT_APP_APPLE_REDIRECT_URI – must match the one registered with Apple
 */

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const APPLE_CLIENT_ID = process.env.REACT_APP_APPLE_CLIENT_ID;
const APPLE_REDIRECT_URI =
  process.env.REACT_APP_APPLE_REDIRECT_URI || window.location.origin;

// ─── Script loaders ─────────────────────────────────────────────────

let googleScriptLoaded = false;
let appleScriptLoaded = false;

const loadScript = (src, id) =>
  new Promise((resolve, reject) => {
    if (document.getElementById(id)) return resolve();
    const s = document.createElement("script");
    s.id = id;
    s.src = src;
    s.async = true;
    s.defer = true;
    s.onload = resolve;
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });

export const loadGoogleSDK = async () => {
  if (googleScriptLoaded) return;
  await loadScript(
    "https://accounts.google.com/gsi/client",
    "google-identity-sdk"
  );
  googleScriptLoaded = true;
};

export const loadAppleSDK = async () => {
  if (appleScriptLoaded) return;
  await loadScript(
    "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js",
    "apple-signin-sdk"
  );
  appleScriptLoaded = true;
};

// ─── Google Sign-In ─────────────────────────────────────────────────

/**
 * Trigger Google One Tap / popup sign-in.
 * Returns { email, firstName, lastName, googleId, credential }
 */
export const signInWithGoogle = () =>
  new Promise(async (resolve, reject) => {
    if (!GOOGLE_CLIENT_ID) {
      return reject(
        new Error(
          "Google Client ID not configured. Add REACT_APP_GOOGLE_CLIENT_ID to .env.local"
        )
      );
    }

    try {
      await loadGoogleSDK();

      /* global google */
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response) => {
          try {
            const payload = parseJwt(response.credential);
            resolve({
              email: payload.email,
              firstName: payload.given_name || "",
              lastName: payload.family_name || "",
              googleId: payload.sub,
              credential: response.credential,
            });
          } catch (err) {
            reject(new Error("Failed to parse Google credential"));
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      // Show the popup prompt
      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback: render a temporary button and click it
          renderGoogleButton(resolve, reject);
        }
      });
    } catch (err) {
      reject(err);
    }
  });

/** Fallback: create an invisible Google button, click it, clean up */
function renderGoogleButton(resolve, reject) {
  const container = document.createElement("div");
  container.id = "g-signin-fallback";
  container.style.cssText =
    "position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;overflow:hidden;";
  document.body.appendChild(container);

  google.accounts.id.renderButton(container, {
    type: "icon",
    size: "large",
  });

  // Click the rendered button after a tick
  requestAnimationFrame(() => {
    const btn = container.querySelector('[role="button"]') || container.querySelector("div[id^='g_']");
    if (btn) {
      btn.click();
    } else {
      document.body.removeChild(container);
      reject(new Error("Could not render Google sign-in button"));
    }
  });

  // Clean up after a timeout
  setTimeout(() => {
    if (document.getElementById("g-signin-fallback")) {
      document.body.removeChild(container);
    }
  }, 60000);
}

// ─── Apple Sign-In ──────────────────────────────────────────────────

/**
 * Trigger Apple Sign-in popup.
 * Returns { email, firstName, lastName, appleId, identityToken }
 */
export const signInWithApple = async () => {
  if (!APPLE_CLIENT_ID) {
    throw new Error(
      "Apple Client ID not configured. Add REACT_APP_APPLE_CLIENT_ID to .env.local"
    );
  }

  await loadAppleSDK();

  /* global AppleID */
  AppleID.auth.init({
    clientId: APPLE_CLIENT_ID,
    scope: "name email",
    redirectURI: APPLE_REDIRECT_URI,
    usePopup: true,
  });

  try {
    const response = await AppleID.auth.signIn();
    const { authorization, user } = response;

    return {
      email: user?.email || "",
      firstName: user?.name?.firstName || "",
      lastName: user?.name?.lastName || "",
      appleId: authorization?.code || "",
      identityToken: authorization?.id_token || "",
    };
  } catch (err) {
    if (err?.error === "popup_closed_by_user") {
      throw new Error("Sign-in cancelled");
    }
    throw new Error(err?.error || "Apple sign-in failed");
  }
};

// ─── Helpers ────────────────────────────────────────────────────────

/** Decode a JWT without verification (client-side only) */
function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
}

/**
 * Generate a deterministic password for social-auth users.
 * This lets us create and sign in to Shopify customer accounts
 * without requiring the user to set a password.
 *
 * Uses provider + ID + a salt so it's not trivially guessable
 * but stays consistent for the same social account.
 */
export const generateSocialPassword = (provider, socialId) => {
  const raw = `tgs_social_${provider}_${socialId}_${GOOGLE_CLIENT_ID || APPLE_CLIENT_ID || "salt"}`;
  // Simple hash-like transform to create a password meeting requirements
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const chr = raw.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16);
  // Build a password with mixed case, digits, and special chars (Shopify requires >=5 chars)
  return `Tgs!${hex}${socialId.slice(0, 6)}Sx`;
};
