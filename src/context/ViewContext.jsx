import { createContext, useContext, useState } from "react";

const ViewContext = createContext();

export const useView = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("useView must be used within ViewProvider");
  }
  return context;
};

export const ViewProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'experience'

  const toggleView = () => {
    setViewMode((prev) => (prev === "grid" ? "experience" : "grid"));
  };

  return (
    <ViewContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProduct,
        setSelectedProduct,
        viewMode,
        setViewMode,
        toggleView,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};
