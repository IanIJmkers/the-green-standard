import React, { useState } from "react";
import { motion } from "framer-motion";
import ProductGrid from "../product/ProductGrid";
import { products } from "../../data/products";

const GridView = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src="/golf-aerial-bunkers.jpg"
          alt="Golf Course Aerial"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/98 to-white" />
      </div>

      <div className="relative z-10 pt-24">
        <div className="container mx-auto px-6">
          {/* Header with image backdrop */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 py-16"
          >
            <h1 className="text-5xl md:text-6xl font-light mb-4 text-gray-900">
              Our Collection
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Premium golf equipment meticulously crafted for players who demand
              excellence
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                  selectedCategory === category
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-white/90 backdrop-blur text-gray-700 hover:bg-white shadow-md"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Products Grid */}
          <div className="pb-24">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridView;
