import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navigation = ({ className = "", textClass = "" }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Collections", path: "/collections" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    {
      label: isAuthenticated ? "Account" : "Sign In",
      path: isAuthenticated ? "/account" : "/login",
      mobileOnly: true,
    },
  ];

  return (
    <nav
      className={`${className} items-center space-x-8 md:space-x-8 space-y-0 md:space-y-0`}
    >
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          className={`text-sm tracking-wider hover:text-green-600 transition-colors ${textClass} ${
            location.pathname === item.path ? "text-green-600" : ""
          } ${item.mobileOnly ? "md:hidden" : ""}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
