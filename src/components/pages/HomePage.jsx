import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Button from "../ui/Button";
import FeaturedProducts from "../sections/FeaturedProducts";
import FeaturedSection from "../sections/FeaturedSection";
import { useView } from "../../context/ViewContext";

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { setCurrentPage } = useView();

  const heroImages = [
    {
      src: "/golf-ocean-course.jpg",
      title: "Where Precision\nMeets Passion",
      subtitle: "Discover equipment crafted for the perfect game",
    },
    {
      src: "/golf-sunset-fairway.jpg",
      title: "Elevate Your\nPerformance",
      subtitle: "Professional-grade gear for every level",
    },
    {
      src: "/golf-mountain-course.jpg",
      title: "The Green\nStandard",
      subtitle: "Setting new benchmarks in golf excellence",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Smooth scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navigateToCollections = () => {
    setCurrentPage("collections");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="relative"
    >
      {/* Hero Section with Rotating Images */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img
              src={heroImages[currentImageIndex].src}
              alt="Golf Course"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            key={`content-${currentImageIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 leading-tight">
              {heroImages[currentImageIndex].title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 font-light">
              {heroImages[currentImageIndex].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={navigateToCollections}
                variant="outline"
                size="lg"
                className="border-white/40 text-white bg-green-600/20 hover:bg-green-600/30 backdrop-blur-md flex items-center justify-center space-x-2 transition-all"
              >
                <span>Shop Collection</span>
                <ArrowRight size={18} />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/40 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all"
              >
                Watch Story
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-1 transition-all duration-300 ${
                index === currentImageIndex
                  ? "w-12 bg-white"
                  : "w-6 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 right-8"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="text-white/60" size={24} />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Full-Width Image Break */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="/golf-flag-trees.jpg"
            alt="Golf Course Flag"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-xl"
            >
              <h2 className="text-5xl md:text-6xl font-light text-white mb-6">
                Crafted for Champions
              </h2>
              <p className="text-xl text-white/90 mb-8 font-light">
                Every product in our collection is meticulously designed and
                tested by professionals who understand the demands of the game.
              </p>
              <Button
                onClick={navigateToCollections}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Explore All Products
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <FeaturedSection />

      {/* Final CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/golf-coastal-links.jpg"
            alt="Coastal Links"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              Ready to Elevate Your Game?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join thousands of golfers who have chosen The Green Standard
            </p>
            <Button
              onClick={navigateToCollections}
              size="lg"
              className="text-gray-900 hover:bg-gray-100"
            >
              View Full Collection
            </Button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;
