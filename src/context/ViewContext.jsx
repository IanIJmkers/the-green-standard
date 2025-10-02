import React, { createContext, useContext, useState } from "react";

const ViewContext = createContext();

export const useView = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("useView must be used within ViewProvider");
  }
  return context;
};

export const ViewProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("home"); // 'home', 'collections', 'about', 'contact'
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <ViewContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};
