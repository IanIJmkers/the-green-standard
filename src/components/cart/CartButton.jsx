import React from "react";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";

const CartButton = () => {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsCartOpen(true)}
      className="relative p-2"
    >
      <ShoppingBag size={20} />
      {cartCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 text-white rounded-full text-xs flex items-center justify-center"
        >
          {cartCount}
        </motion.span>
      )}
    </motion.button>
  );
};

export default CartButton;
