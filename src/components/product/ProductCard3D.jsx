import React from "react";
import { motion, useTransform } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useView } from "../../context/ViewContext";

const ProductCard3D = ({ product, index, mouseX, activeIndex }) => {
  const { addToCart } = useCart();
  const { setSelectedProduct } = useView();

  const rotation = useTransform(mouseX, [0, window.innerWidth], [-15, 15]);

  const scale = index === activeIndex ? 1.1 : 0.95;
  const opacity = Math.abs(index - activeIndex) <= 1 ? 1 : 0.6;

  return (
    <motion.div
      className="relative cursor-pointer"
      style={{ rotateY: rotation }}
      animate={{ scale, opacity }}
      transition={{ duration: 0.3 }}
      onClick={() => setSelectedProduct(product)}
    >
      <div className="w-80 h-96 rounded-2xl overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl">
        {/* Product visual area with gradient overlay */}
        <div
          className="h-full p-8 flex flex-col items-center justify-center relative"
          style={{
            background: `linear-gradient(135deg, ${product.color}ee, ${product.color}99)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          <div className="relative z-10 text-white text-center">
            <motion.div
              className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/10 backdrop-blur flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-24 h-24 rounded-full bg-white/20" />
            </motion.div>

            <h3 className="text-2xl font-light mb-2">{product.name}</h3>
            <p className="text-sm opacity-90 mb-4">{product.category}</p>
            <p className="text-3xl font-light mb-6">${product.price}</p>

            <div className="flex items-center justify-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="bg-white/20 backdrop-blur p-3 rounded-full hover:bg-white/30 transition-colors"
              >
                <Plus size={20} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 backdrop-blur px-4 py-3 rounded-full hover:bg-white/30 transition-colors flex items-center space-x-2"
              >
                <span className="text-sm">View</span>
                <ArrowRight size={16} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard3D;
