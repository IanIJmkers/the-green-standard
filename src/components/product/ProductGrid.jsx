import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useView } from "../../context/ViewContext";
import { useState, useMemo } from "react";
import { formatPrice } from "../../utils/formatPrice";

const CATEGORIES = [
  "Drivers",
  "Iron Sets",
  "Putters",
  "Wedges",
  "Hybrids",
  "Bags",
  "Balls",
  "Gloves",
  "Accessories",
  "Training",
  "Tech",
];

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

const ProductGrid = ({ products }) => {
  const { addToCart } = useCart();
  const { setSelectedProduct } = useView();
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    availability: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const activeFilterCount =
    selectedCategories.length +
    (priceRange !== "all" ? 1 : 0) +
    (availability !== "all" ? 1 : 0);

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange("all");
    setAvailability("all");
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (priceRange !== "all") {
      const ranges = {
        "under-50": [0, 50],
        "50-100": [50, 100],
        "100-250": [100, 250],
        "250-500": [250, 500],
        "over-500": [500, Infinity],
      };
      const [min, max] = ranges[priceRange];
      result = result.filter((p) => p.price >= min && p.price < max);
    }

    if (availability === "in-stock") {
      result = result.filter((p) => p.inStock !== false);
    }

    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);

    return result;
  }, [products, selectedCategories, priceRange, availability, sortBy]);

  return (
    <div>
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-normal text-gray-900">All Products</h1>
          <p className="text-sm text-gray-500 mt-1">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              Sort by
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border-none bg-transparent text-xs uppercase tracking-wider focus:outline-none cursor-pointer text-gray-900"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-900 hover:text-gray-600 transition-colors"
          >
            <SlidersHorizontal size={14} />
            Filter
            {activeFilterCount > 0 && (
              <span className="bg-green-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Product Grid — 4 columns like Kith */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            className="group cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          >
            {/* Product Image */}
            <div className="relative bg-[#f0f0f0] overflow-hidden mb-3 aspect-square">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.imageAlt || product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: product.color || "#f0f0f0" }}
                >
                  <span className="text-gray-400 text-sm">No image</span>
                </div>
              )}

              {/* Stock Badge */}
              {product.inStock === false && (
                <span className="absolute bottom-3 left-3 bg-white text-[10px] uppercase tracking-wider font-medium px-2 py-1">
                  Sold Out
                </span>
              )}

              {/* Quick Add — appears on hover */}
              <motion.button
                initial={{ opacity: 0 }}
                whileHover={{ scale: 1.02 }}
                className="absolute bottom-0 left-0 right-0 bg-black text-white text-xs uppercase tracking-wider py-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  if (product.inStock !== false) addToCart(product);
                }}
              >
                {product.inStock === false ? "Sold Out" : "Quick Add"}
              </motion.button>
            </div>

            {/* Product Info */}
            <h3 className="text-sm font-normal text-gray-900 leading-tight">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              {formatPrice(product.price, product.currencyCode)}
            </p>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 mb-2">
            No products found matching your filters.
          </p>
          <button
            onClick={clearFilters}
            className="text-sm text-green-600 hover:text-green-700 underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Filter Side Panel Overlay */}
      <AnimatePresence>
        {showFilters && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setShowFilters(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                <h2 className="text-sm uppercase tracking-wider font-medium">
                  Filter
                </h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Panel Body */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {/* Sort (mobile) */}
                <div className="sm:hidden mb-6">
                  <button
                    onClick={() => toggleSection("sort")}
                    className="flex items-center justify-between w-full py-2"
                  >
                    <span className="text-xs uppercase tracking-wider font-medium text-gray-900">
                      Sort By
                    </span>
                    <ChevronDown
                      size={14}
                      className={`text-gray-400 transition-transform ${expandedSections.sort ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedSections.sort && (
                    <div className="space-y-2 mt-2">
                      {SORT_OPTIONS.map((opt) => (
                        <label
                          key={opt.value}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="sort"
                            checked={sortBy === opt.value}
                            onChange={() => setSortBy(opt.value)}
                            className="w-3.5 h-3.5 text-green-600 border-gray-300 focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {opt.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Category Filter */}
                <div className="border-t border-gray-100 pt-4 mb-6">
                  <button
                    onClick={() => toggleSection("category")}
                    className="flex items-center justify-between w-full py-2"
                  >
                    <span className="text-xs uppercase tracking-wider font-medium text-gray-900">
                      Category
                    </span>
                    <ChevronDown
                      size={14}
                      className={`text-gray-400 transition-transform ${expandedSections.category ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedSections.category && (
                    <div className="space-y-2 mt-2">
                      {CATEGORIES.map((cat) => (
                        <label
                          key={cat}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat)}
                            onChange={() => toggleCategory(cat)}
                            className="w-3.5 h-3.5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {cat}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Filter */}
                <div className="border-t border-gray-100 pt-4 mb-6">
                  <button
                    onClick={() => toggleSection("price")}
                    className="flex items-center justify-between w-full py-2"
                  >
                    <span className="text-xs uppercase tracking-wider font-medium text-gray-900">
                      Price
                    </span>
                    <ChevronDown
                      size={14}
                      className={`text-gray-400 transition-transform ${expandedSections.price ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedSections.price && (
                    <div className="space-y-2 mt-2">
                      {[
                        { value: "all", label: "All Prices" },
                        { value: "under-50", label: "Under EUR 50" },
                        { value: "50-100", label: "EUR 50 - EUR 100" },
                        { value: "100-250", label: "EUR 100 - EUR 250" },
                        { value: "250-500", label: "EUR 250 - EUR 500" },
                        { value: "over-500", label: "Over EUR 500" },
                      ].map((opt) => (
                        <label
                          key={opt.value}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="price"
                            checked={priceRange === opt.value}
                            onChange={() => setPriceRange(opt.value)}
                            className="w-3.5 h-3.5 text-green-600 border-gray-300 focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {opt.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Availability Filter */}
                <div className="border-t border-gray-100 pt-4 mb-6">
                  <button
                    onClick={() => toggleSection("availability")}
                    className="flex items-center justify-between w-full py-2"
                  >
                    <span className="text-xs uppercase tracking-wider font-medium text-gray-900">
                      Availability
                    </span>
                    <ChevronDown
                      size={14}
                      className={`text-gray-400 transition-transform ${expandedSections.availability ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedSections.availability && (
                    <div className="space-y-2 mt-2">
                      {[
                        { value: "all", label: "All" },
                        { value: "in-stock", label: "In Stock" },
                      ].map((opt) => (
                        <label
                          key={opt.value}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="availability"
                            checked={availability === opt.value}
                            onChange={() => setAvailability(opt.value)}
                            className="w-3.5 h-3.5 text-green-600 border-gray-300 focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {opt.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Panel Footer */}
              <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
                <button
                  onClick={clearFilters}
                  className="flex-1 py-3 text-xs uppercase tracking-wider border border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 py-3 text-xs uppercase tracking-wider bg-gray-900 text-white hover:bg-black transition-colors"
                >
                  Apply ({filteredProducts.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string,
      color: PropTypes.string,
      image: PropTypes.string,
      imageAlt: PropTypes.string,
    })
  ).isRequired,
};

export default ProductGrid;
