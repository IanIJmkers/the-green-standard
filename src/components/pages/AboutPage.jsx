import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import { useView } from "../../context/ViewContext";

const AboutPage = () => {
  const { setCurrentPage } = useView();

  // Smooth scroll to top with a slight delay for seamless transition
  useEffect(() => {
    const scrollTimer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);

    return () => clearTimeout(scrollTimer);
  }, []);

  const navigateToCollections = () => {
    setCurrentPage("collections");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="min-h-screen relative pt-20"
    >
      {/* Hero Section with Your First Photo */}
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
            src="/golf-misty-mountain.jpg"
            alt="Misty Mountain Golf Course"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        </div>

        <div className="relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-light mb-4"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-xl text-white/90 max-w-2xl mx-auto"
          >
            Where the love of the game meets the craft of perfection
          </motion.p>
        </div>
      </motion.section>

      {/* Origin Story Section with Your Second Photo */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-4xl font-light mb-6 text-gray-900">
                Born in the Netherlands
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our journey began on the serene courses of the Netherlands,
                where morning mist dances across manicured greens and the game
                takes on a meditative quality.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                It was here we discovered that golf is more than sport—it's a
                dialogue between player and course, a journey of self-discovery
                with every swing. The calm, the focus, the mental clarity
                required; these elements transformed our understanding of what
                equipment should provide.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Each round became an exploration. Not just of the course, but of
                ourselves. This philosophy now guides every product we create.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="relative h-96 rounded-lg overflow-hidden"
            >
              <img
                src="/golf-aerial-bunker.jpg"
                alt="Aerial view of golf course"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Philosophy Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="py-24 bg-gray-50"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-6 text-gray-900">
              Simplicity Meets Standard
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every detail carefully considered. Every element purposefully
              crafted. This is equipment designed for those who understand that
              excellence lies in simplicity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-green-600"></div>
              </div>
              <h3 className="text-xl font-light mb-3 text-gray-900">
                Precision Crafted
              </h3>
              <p className="text-gray-600">
                Meticulous attention to detail ensures every product meets the
                demands of your game's finest moments.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-green-600"></div>
              </div>
              <h3 className="text-xl font-light mb-3 text-gray-900">
                Mindful Design
              </h3>
              <p className="text-gray-600">
                Products that honor the mental game, creating harmony between
                player intention and equipment response.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-green-600"></div>
              </div>
              <h3 className="text-xl font-light mb-3 text-gray-900">
                Uncompromised Quality
              </h3>
              <p className="text-gray-600">
                The standard you expect, delivered through materials and
                craftsmanship that stand the test of time.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Full Width Image Break - Reusing the misty mountain photo */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="relative h-screen"
      >
        <div className="absolute inset-0">
          <img
            src="/golf-misty-mountain.jpg"
            alt="Golfer on misty course"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white max-w-4xl px-6"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              "The exploration of the course became
              <br />
              an exploration of self"
            </h2>
            <p className="text-xl text-white/80 font-light">
              This philosophy guides every decision we make
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Commitment Section with subtle background */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="py-24 bg-white relative"
      >
        {/* Subtle background using the aerial photo */}
        <div className="absolute inset-0 opacity-5">
          <img
            src="/golf-aerial-bunker.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-light mb-6 text-gray-900"
            >
              Our Commitment
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 mb-8 leading-relaxed"
            >
              We believe in equipment that doesn't shout but whispers
              confidence. Products that become extensions of your intent, not
              obstacles to overcome. This is our promise: simplicity at its
              finest, with the unwavering standard your game deserves.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 mb-12 leading-relaxed"
            >
              From the peaceful courses of the Netherlands to wherever your game
              takes you, we're honored to be part of your journey.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Button
                onClick={navigateToCollections}
                size="lg"
                className="inline-flex items-center space-x-2 bg-green-600 text-white hover:bg-green-700"
              >
                <span>Explore Our Collection</span>
                <ArrowRight size={18} />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default AboutPage;
