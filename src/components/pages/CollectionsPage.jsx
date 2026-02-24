import { motion } from "framer-motion";
import ProductGrid from "../product/ProductGrid";
import { useShopifyProducts } from "../../hooks/useShopifyProducts";

const CollectionsPage = () => {
  const { products, loading, error } = useShopifyProducts();

  if (loading) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-white">
        <div className="text-center text-red-600">
          <p className="text-xl">Error loading products</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductGrid products={products} />
      </div>
    </motion.div>
  );
};

export default CollectionsPage;
