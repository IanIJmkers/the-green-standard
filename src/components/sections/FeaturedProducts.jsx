
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useView } from "../../context/ViewContext";
import { formatPrice } from "../../utils/formatPrice";
import { products } from "../../data/products";
import Button from "../ui/Button";

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const { setSelectedProduct, setCurrentPage } = useView();

  // Select featured products
  const featuredProducts = products.slice(0, 4);

  const navigateToCollections = () => {
    setCurrentPage("collections");
    // Don't scroll here - let the collections page handle it
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4">Bestsellers</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            The equipment that's transforming games worldwide
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative h-64 mb-4 overflow-hidden rounded-lg bg-gray-100">
                <div
                  className="h-full flex items-center justify-center"
                  style={{ backgroundColor: product.color + "20" }}
                >
                  <motion.div
                    className="w-32 h-32 rounded-full"
                    style={{ backgroundColor: product.color }}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </div>
                <div className="absolute top-4 left-4 flex items-center space-x-1 bg-white/90 backdrop-blur px-2 py-1 rounded">
                  <Star size={14} className="text-yellow-500 fill-current" />
                  <span className="text-xs">4.9</span>
                </div>
              </div>

              <h3 className="text-lg font-light mb-1 group-hover:text-green-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{product.category}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-light">{formatPrice(product.price, product.currencyCode)}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="text-sm text-green-600 hover:text-green-700 flex items-center space-x-1"
                >
                  <span>Quick Add</span>
                  <ArrowRight size={14} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={navigateToCollections}
            variant="outline"
            size="lg"
            className="inline-flex items-center space-x-2"
          >
            <span>View All Products</span>
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
