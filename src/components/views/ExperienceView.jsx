import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Move, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard3D from "../product/ProductCard3D";
import { useMousePosition } from "../../hooks/useMousePosition";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { products } from "../../data/products";

const ExperienceView = () => {
  const { mouseX } = useMousePosition();
  const { scrollX, activeIndex } = useScrollAnimation(true, products.length);
  const [currentBg, setCurrentBg] = useState(0);

  // Rotating background images
  const backgroundImages = [
    "/golf-ocean-course.jpg",
    "/golf-sunset-fairway.jpg",
    "/golf-mountain-course.jpg",
    "/golf-coastal-links.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Dynamic Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBg}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src={backgroundImages[currentBg]}
            alt="Golf Course"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center mb-32 z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-light mb-4 tracking-wide text-white"
          >
            Elevate Your Game
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/90 mb-8 max-w-2xl mx-auto px-8 text-lg"
          >
            Discover our curated collection of premium golf equipment. Move your
            cursor to explore each masterpiece.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center space-x-2 text-sm text-white/70"
          >
            <Move size={16} />
            <span>Move cursor to explore</span>
          </motion.div>
        </div>
      </div>

      {/* Products Carousel */}
      <div className="absolute inset-0 flex items-center">
        <motion.div className="flex space-x-8 px-8" style={{ x: scrollX }}>
          {products.map((product, index) => (
            <ProductCard3D
              key={product.id}
              product={product}
              index={index}
              mouseX={mouseX}
              activeIndex={activeIndex}
            />
          ))}
        </motion.div>
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <ChevronLeft className="text-white/60" size={20} />
        <div className="flex space-x-2">
          {products.map((_, index) => (
            <motion.div
              key={index}
              className="h-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm"
              animate={{ width: index === activeIndex ? 32 : 8 }}
            >
              <motion.div
                className="h-full bg-white"
                animate={{ width: index === activeIndex ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
        <ChevronRight className="text-white/60" size={20} />
      </div>
    </div>
  );
};

export default ExperienceView;
