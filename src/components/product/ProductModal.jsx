import { X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useView } from "../../context/ViewContext";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";

const ProductModal = () => {
  const { selectedProduct, setSelectedProduct } = useView();
  const { addToCart } = useCart();

  if (!selectedProduct) return null;

  // Clean up description — take first 2 meaningful sentences
  const cleanDescription = (desc) => {
    if (!desc) return "";
    const sentences = desc
      .split(/[.!]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 15 && !s.toLowerCase().startsWith("key features"));
    const unique = [...new Set(sentences)];
    return unique.slice(0, 2).join(". ") + (unique.length > 0 ? "." : "");
  };

  return (
    <AnimatePresence>
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 h-full">
              {/* Product Image */}
              <div className="relative bg-[#f5f5f0] aspect-square md:aspect-auto md:h-full flex items-center justify-center">
                {selectedProduct.image ? (
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.imageAlt || selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#f5f5f0] flex items-center justify-center">
                    <span className="text-gray-300 text-xs uppercase tracking-widest">
                      No Image
                    </span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex flex-col justify-between p-8 md:p-10">
                <div>
                  {/* Header */}
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
                      {selectedProduct.category}
                    </p>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="text-gray-400 hover:text-gray-900 transition-colors -mt-1 -mr-1"
                    >
                      <X size={18} strokeWidth={1.5} />
                    </button>
                  </div>

                  <h2 className="text-2xl font-light text-gray-900 tracking-tight mb-6">
                    {selectedProduct.name}
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed mb-8">
                    {cleanDescription(selectedProduct.description)}
                  </p>

                  {/* Availability */}
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        selectedProduct.inStock ? "bg-green-600" : "bg-red-500"
                      }`}
                    />
                    <span className="text-[11px] uppercase tracking-[0.15em] text-gray-500">
                      {selectedProduct.inStock ? "In Stock" : "Sold Out"}
                    </span>
                  </div>
                </div>

                {/* Price + CTA */}
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-end justify-between mb-6">
                    <span className="text-2xl font-light text-gray-900">
                      {formatPrice(
                        selectedProduct.price,
                        selectedProduct.currencyCode
                      )}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    disabled={!selectedProduct.inStock}
                    className={`w-full py-3.5 text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors ${
                      selectedProduct.inStock
                        ? "bg-gray-900 text-white hover:bg-black"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingBag size={15} strokeWidth={1.5} />
                    <span>
                      {selectedProduct.inStock ? "Add to Bag" : "Sold Out"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
