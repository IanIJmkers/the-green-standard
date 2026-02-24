import { useView } from "../../context/ViewContext";

const Navigation = ({ className = "", textClass = "" }) => {
  const { setCurrentPage, currentPage } = useView();

  const navItems = [
    { label: "Home", page: "home" },
    { label: "Collections", page: "collections" },
    { label: "About", page: "about" },
    { label: "Contact", page: "contact" },
  ];

  const handleNavClick = (page) => {
    setCurrentPage(page);
    // Don't scroll here - let the page component handle it
  };

  return (
    <nav
      className={`${className} items-center space-x-8 md:space-x-8 space-y-0 md:space-y-0`}
    >
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => handleNavClick(item.page)}
          className={`text-sm tracking-wider hover:text-green-600 transition-colors ${textClass} ${
            currentPage === item.page ? "text-green-600" : ""
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
