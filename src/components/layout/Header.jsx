import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../ui/Logo";
import CartButton from "../cart/CartButton";
import Navigation from "./Navigation";
import { useView } from "../../context/ViewContext";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentPage, setCurrentPage } = useView();
  const { isAuthenticated, customer } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = currentPage === "home" && !scrolled;
  const headerClass = isTransparent
    ? "bg-transparent"
    : "glass-effect border-b border-gray-100 shadow-sm";

  const textClass = isTransparent ? "text-white" : "text-gray-900";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${headerClass}`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className={isTransparent ? "brightness-0 invert" : ""}>
            <Logo />
          </div>

          <Navigation className="hidden md:flex" textClass={textClass} />

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage(isAuthenticated ? "account" : "login")}
              className={`p-2 rounded-full hover:bg-black/5 transition-colors ${textClass}`}
              title={isAuthenticated ? `Hi, ${customer?.firstName || "Account"}` : "Sign In"}
            >
              {isAuthenticated ? (
                <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-semibold">
                  {(customer?.firstName?.[0] || "U").toUpperCase()}
                </div>
              ) : (
                <User className={`w-5 h-5 ${isTransparent ? "text-white" : ""}`} />
              )}
            </button>

            <div className={isTransparent ? "brightness-0 invert" : ""}>
              <CartButton />
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 ${textClass}`}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 bg-white"
          >
            <Navigation className="flex flex-col p-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
