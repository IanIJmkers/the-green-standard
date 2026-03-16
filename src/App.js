import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CartProvider } from "./context/CartContext";
import { ViewProvider } from "./context/ViewContext";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./components/pages/HomePage";
import ProductModal from "./components/product/ProductModal";
import CartDrawer from "./components/cart/CartDrawer";
import CookieConsent from "./components/eu/CookieConsent";
import "./App.css";

// Lazy load secondary pages for better performance
const CollectionsPage = lazy(() => import("./components/pages/CollectionsPage"));
const AboutPage = lazy(() => import("./components/pages/AboutPage"));
const ContactPage = lazy(() => import("./components/pages/ContactPage"));
const PrivacyPolicyPage = lazy(() => import("./components/pages/PrivacyPolicyPage"));
const TermsPage = lazy(() => import("./components/pages/TermsPage"));
const ShippingReturnsPage = lazy(() => import("./components/pages/ShippingReturnsPage"));
const FAQPage = lazy(() => import("./components/pages/FAQPage"));
const LoginPage = lazy(() => import("./components/pages/LoginPage"));
const SignUpPage = lazy(() => import("./components/pages/SignUpPage"));
const AccountPage = lazy(() => import("./components/pages/AccountPage"));

const PageLoader = () => (
  <div className="min-h-screen pt-28 flex items-center justify-center bg-white">
    <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="App">
      <Header />
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsPage />} />
            <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
      <ProductModal />
      <CartDrawer />
      <CookieConsent />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ViewProvider>
          <AppContent />
        </ViewProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
