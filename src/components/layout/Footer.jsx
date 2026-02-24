
import { useView } from "../../context/ViewContext";
import Logo from "../ui/Logo";

const Footer = () => {
  const { setCurrentPage } = useView();

  const footerLinks = {
    Shop: [
      { label: "All Collections", page: "collections" },
      { label: "Bestsellers", page: "home" },
      { label: "New Arrivals", page: "collections" },
    ],
    Company: [
      { label: "About Us", page: "about" },
      { label: "Contact", page: "contact" },
    ],
    "Customer Service": [
      { label: "Shipping & Returns", page: "shipping" },
      { label: "Order Tracking", page: "contact" },
      { label: "FAQ", page: "contact" },
    ],
    Legal: [
      { label: "Privacy Policy", page: "privacy" },
      { label: "Terms of Service", page: "terms" },
      { label: "Cookie Policy", page: "privacy" },
    ],
  };

  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="brightness-0 invert mb-4">
              <Logo />
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Premium golf equipment crafted in the Netherlands for the European
              market.
            </p>
            <div className="text-sm text-gray-500">
              <p>The Green Standard B.V.</p>
              <p>Amsterdam, Netherlands</p>
              <p>KvK: 12345678</p>
              <p>BTW: NL123456789B01</p>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-medium text-gray-300 mb-4 uppercase tracking-wider">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => {
                        setCurrentPage(link.page);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* EU Trust Badges */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
            <span>Secure Payments via Shopify</span>
            <span className="text-gray-700">|</span>
            <span>Free EU Shipping over EUR 150</span>
            <span className="text-gray-700">|</span>
            <span>14-Day Returns (EU Consumer Right)</span>
            <span className="text-gray-700">|</span>
            <span>2-Year EU Warranty</span>
            <span className="text-gray-700">|</span>
            <span>GDPR Compliant</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} The Green Standard B.V. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              EU Dispute Resolution
            </a>
            <button
              onClick={() => setCurrentPage("privacy")}
              className="hover:text-gray-300 transition-colors"
            >
              Privacy
            </button>
            <button
              onClick={() => setCurrentPage("terms")}
              className="hover:text-gray-300 transition-colors"
            >
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
