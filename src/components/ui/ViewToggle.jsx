import React from "react";
import { Grid3X3, Move } from "lucide-react";
import { motion } from "framer-motion";
import { useView } from "../../context/ViewContext";

const ViewToggle = () => {
  const { viewMode, toggleView } = useView();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleView}
      className="flex items-center space-x-2 text-sm bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
    >
      {viewMode === "experience" ? (
        <>
          <Grid3X3 size={16} />
          <span className="hidden md:inline">Grid View</span>
        </>
      ) : (
        <>
          <Move size={16} />
          <span className="hidden md:inline">Experience View</span>
        </>
      )}
    </motion.button>
  );
};

export default ViewToggle;
