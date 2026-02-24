import { lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { CartProvider } from "./context/CartContext";
import { ViewProvider, useView } from "./context/ViewContext";
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

const PageLoader = () => (
  <div className="min-h-screen pt-28 flex items-center justify-center bg-white">
    <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

const AppContent = () => {
  const { currentPage } = useView();

  const renderPage = () => {
    switch (currentPage) {
      case "collections":
        return <CollectionsPage key="collections" />;
      case "about":
        return <AboutPage key="about" />;
      case "contact":
        return <ContactPage key="contact" />;
      case "privacy":
        return <PrivacyPolicyPage key="privacy" />;
      case "terms":
        return <TermsPage key="terms" />;
      case "shipping":
        return <ShippingReturnsPage key="shipping" />;
      default:
        return <HomePage key="home" />;
    }
  };

  return (
    <div className="App">
      <Header />
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">{renderPage()}</AnimatePresence>
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
    <CartProvider>
      <ViewProvider>
        <AppContent />
      </ViewProvider>
    </CartProvider>
  );
}

export default App;
