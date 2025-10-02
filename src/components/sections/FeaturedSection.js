import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FeaturedSection = () => {
  const featured = [
    {
      title: "The Coastal Collection",
      description: "Inspired by links courses worldwide",
      image: "/golf-coastal-links.jpg",
      cta: "Explore Collection",
    },
    {
      title: "Mountain Series",
      description: "Equipment for elevated play",
      image: "/golf-mountain-course.jpg",
      cta: "View Series",
    },
    {
      title: "Tour Professional",
      description: "Precision-engineered for excellence",
      image: "/golf-player-green.jpg",
      cta: "Shop Pro Line",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            Featured Collections
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Curated selections for every course and condition
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {featured.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-96 overflow-hidden rounded-lg mb-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-light text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/80 mb-4">{item.description}</p>
                  <button className="text-white flex items-center space-x-2 hover:space-x-3 transition-all">
                    <span>{item.cta}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
