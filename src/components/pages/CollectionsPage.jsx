import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductGrid from "../product/ProductGrid";
import { products } from "../../data/products";

const CollectionsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Smooth scroll to top with a slight delay for seamless transition
  useEffect(() => {
    // Small delay to let the fade-in start before scrolling
    const scrollTimer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Changed to smooth for a more relaxed feel
      });
    }, 100);

    return () => clearTimeout(scrollTimer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="min-h-screen relative pt-20"
    >
      {/* Hero Section with Background */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative h-96 flex items-center justify-center"
      >
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src="/golf-aerial-bunkers.jpg"
            alt="Golf Course Aerial"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        </div>

        <div className="relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-light mb-4"
          >
            Full Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-xl text-white/90 max-w-2xl mx-auto"
          >
            Premium golf equipment meticulously crafted for players who demand
            excellence
          </motion.p>
        </div>
      </motion.section>

      {/* Products Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-6">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.7 + index * 0.05,
                  ease: "easeOut",
                }}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-light transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Products Grid with staggered animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <ProductGrid products={filteredProducts} />
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-12 text-gray-600"
          >
            Showing {filteredProducts.length} of {products.length} products
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default CollectionsPage;
