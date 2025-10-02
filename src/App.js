import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CartProvider } from "./context/CartContext";
import { ViewProvider, useView } from "./context/ViewContext";
import Header from "./components/layout/Header";
import HomePage from "./components/pages/HomePage";
import CollectionsPage from "./components/pages/CollectionsPage";
import AboutPage from "./components/pages/AboutPage";
import ProductModal from "./components/product/ProductModal";
import CartDrawer from "./components/cart/CartDrawer";
import "./App.css";

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5, ease: "easeInOut" },
};

const AppContent = () => {
  const { currentPage } = useView();

  const renderPage = () => {
    switch (currentPage) {
      case "collections":
        return <CollectionsPage key="collections" />;
      case "about":
        return <AboutPage key="about" />;
      case "contact":
        return (
          <motion.div
            {...pageTransition}
            className="min-h-screen pt-24 flex items-center justify-center"
          >
            <h1 className="text-4xl font-light text-gray-900">
              Contact Coming Soon
            </h1>
          </motion.div>
        );
      default:
        return <HomePage key="home" />;
    }
  };

  return (
    <div className="App">
      <Header />

      <AnimatePresence mode="wait">{renderPage()}</AnimatePresence>

      <ProductModal />
      <CartDrawer />
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
