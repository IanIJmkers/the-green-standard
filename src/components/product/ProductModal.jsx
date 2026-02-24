import { X, ShoppingBag, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useView } from "../../context/ViewContext";
import { useCart } from "../../context/CartContext";
import Button from "../ui/Button";
import { formatPrice } from "../../utils/formatPrice";

const ProductModal = () => {
  const { selectedProduct, setSelectedProduct } = useView();
  const { addToCart } = useCart();

  if (!selectedProduct) return null;

  return (
    <AnimatePresence>
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2">
              {/* Product Image */}
              <div
                className="h-64 md:h-full flex items-center justify-center p-12"
                style={{ backgroundColor: selectedProduct.color }}
              >
                {selectedProduct.image ? (
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.imageAlt}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <motion.div
                    className="w-48 h-48 rounded-full bg-white bg-opacity-20"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
              </div>

              {/* Product Details */}
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-light mb-2">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-gray-600">{selectedProduct.category}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X size={24} />
                  </button>
                </div>

                <p className="text-gray-600 mb-6">
                  {selectedProduct.description}
                </p>

                {selectedProduct.features && selectedProduct.features.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <Check size={16} className="mr-2 text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between mb-8">
                  <span className="text-3xl font-light">
                    {formatPrice(selectedProduct.price, selectedProduct.currencyCode)}
                  </span>
                  <span className={`text-sm ${selectedProduct.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full flex items-center justify-center space-x-2"
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  disabled={!selectedProduct.inStock}
                >
                  <ShoppingBag size={20} />
                  <span>{selectedProduct.inStock ? 'Add to Bag' : 'Out of Stock'}</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
