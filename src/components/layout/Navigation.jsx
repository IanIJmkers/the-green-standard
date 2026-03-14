import { useView } from "../../context/ViewContext";
import { useAuth } from "../../context/AuthContext";

const Navigation = ({ className = "", textClass = "" }) => {
  const { setCurrentPage, currentPage } = useView();
  const { isAuthenticated } = useAuth();

  const navItems = [
    { label: "Home", page: "home" },
    { label: "Collections", page: "collections" },
    { label: "About", page: "about" },
    { label: "Contact", page: "contact" },
    {
      label: isAuthenticated ? "Account" : "Sign In",
      page: isAuthenticated ? "account" : "login",
      mobileOnly: true,
    },
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
          } ${item.mobileOnly ? "md:hidden" : ""}`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
