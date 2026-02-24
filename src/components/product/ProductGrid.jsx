import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useView } from "../../context/ViewContext";
import { useState } from "react";
import { formatPrice } from "../../utils/formatPrice";

const ProductGrid = ({ products }) => {
  const { addToCart } = useCart();
  const { setSelectedProduct } = useView();
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortBy, setSortBy] = useState("recommended");

  // Available sizes for filter
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "28"];

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    if (selectedColors.length > 0 && !selectedColors.includes(product.color)) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex gap-8">
      {/* Sidebar Filters */}
      <div className="w-64 flex-shrink-0">
        {/* Color Filter */}
        <div className="mb-8">
          <button className="flex items-center justify-between w-full mb-4 text-left">
            <span className="font-medium text-gray-900">Color</span>
            <span className="text-gray-400">^</span>
          </button>
          <div className="grid grid-cols-4 gap-2">
            {/* Color swatches - you can customize these */}
            {[
              { name: "white", bg: "#FFFFFF", border: true },
              { name: "black", bg: "#000000" },
              { name: "blue", bg: "#5B7C99" },
              { name: "burgundy", bg: "#6B1E3C" },
              { name: "beige", bg: "#C4B5A0" },
              { name: "cream", bg: "#F5F5DC" },
              { name: "yellow", bg: "#FFD700" },
              { name: "olive", bg: "#6B7456" },
              { name: "sage", bg: "#87A96B" },
              { name: "light-gray", bg: "#D3D3D3" },
              { name: "gold", bg: "#DAA520" },
              { name: "tan", bg: "#D2B48C" },
              { name: "gray", bg: "#808080" },
              { name: "silver", bg: "#C0C0C0" },
              { name: "charcoal", bg: "#36454F" },
              { name: "ivory", bg: "#FFFFF0" },
            ].map((color) => (
              <button
                key={color.name}
                onClick={() => toggleColor(color.name)}
                className={`w-10 h-10 rounded-full transition-all ${
                  selectedColors.includes(color.name)
                    ? "ring-2 ring-green-600 ring-offset-2"
                    : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2"
                } ${color.border ? "border border-gray-300" : ""}`}
                style={{ backgroundColor: color.bg }}
              />
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div className="mb-8">
          <button className="flex items-center justify-between w-full mb-4 text-left">
            <span className="font-medium text-gray-900">Size</span>
            <span className="text-gray-400">^</span>
          </button>
          <div className="space-y-2">
            {availableSizes.map((size) => (
              <label key={size} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => toggleSize(size)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="ml-2 text-gray-700">{size}</span>
              </label>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-black text-white p-6 rounded-lg">
          <h3 className="font-medium mb-2">CLICK HERE FOR YOUR OFFER</h3>
          <p className="text-sm text-gray-300">Special deals waiting for you</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-light text-gray-900">All Products</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border-none bg-transparent text-sm focus:outline-none cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.imageAlt || product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: product.color || "#f3f4f6" }}
                  >
                    <span className="text-gray-400">No image</span>
                  </div>
                )}

                {/* Quick Buy Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute top-4 right-4 bg-white px-4 py-2 rounded-md shadow-md flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  <ShoppingBag size={16} />
                  QUICK BUY
                </motion.button>

                {/* View Details on Image Click */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all"
                  onClick={() => setSelectedProduct(product)}
                />
              </div>

              {/* Product Info */}
              <div onClick={() => setSelectedProduct(product)}>
                <h3 className="text-base font-normal text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                <p className="text-lg font-medium text-gray-900">
                  {formatPrice(product.price, product.currencyCode)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No products found matching your filters.
            </p>
          </div>
        )}
      </div>
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
