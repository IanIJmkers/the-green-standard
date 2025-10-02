import React from "react";
import { motion } from "framer-motion";
import { Plus, Eye } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useView } from "../../context/ViewContext";

const ProductGrid = ({ products }) => {
  const { addToCart } = useCart();
  const { setSelectedProduct } = useView();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group"
        >
          <div
            className="h-48 flex items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: product.color }}
          >
            <motion.div
              className="w-24 h-24 rounded-full bg-white bg-opacity-20"
              whileHover={{ scale: 1.1, rotate: 10 }}
            />

            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                className="bg-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setSelectedProduct(product)}
              >
                <Eye size={20} className="text-gray-700" />
              </motion.button>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-light mb-1">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{product.category}</p>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-light">${product.price}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => addToCart(product)}
                className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
              >
                <Plus size={18} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;
