import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Small delay before showing banner
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem(
      "cookie_consent",
      JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString(),
      })
    );
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem(
      "cookie_consent",
      JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString(),
      })
    );
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="hidden md:block p-3 bg-green-50 rounded-full">
                <Cookie className="text-green-600" size={24} />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  We value your privacy
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  We use cookies to enhance your browsing experience, serve
                  personalised content, and analyse our traffic. Under GDPR and
                  ePrivacy regulations, we need your consent for non-essential
                  cookies.
                </p>

                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mb-4"
                    >
                      <div className="space-y-3 py-2">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">
                              Necessary Cookies
                            </p>
                            <p className="text-xs text-gray-500">
                              Required for the website to function. Cannot be
                              disabled.
                            </p>
                          </div>
                          <span className="text-xs text-green-600 font-medium">
                            Always Active
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">
                              Analytics Cookies
                            </p>
                            <p className="text-xs text-gray-500">
                              Help us understand how visitors interact with our
                              website.
                            </p>
                          </div>
                          <span className="text-xs text-gray-400">
                            Optional
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">
                              Marketing Cookies
                            </p>
                            <p className="text-xs text-gray-500">
                              Used to display relevant advertisements and track
                              ad campaign performance.
                            </p>
                          </div>
                          <span className="text-xs text-gray-400">
                            Optional
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={acceptAll}
                    className="px-6 py-2.5 bg-green-600 text-white text-sm font-medium rounded-full hover:bg-green-700 transition-colors"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={acceptNecessary}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors"
                  >
                    Necessary Only
                  </button>
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="px-6 py-2.5 text-gray-500 text-sm font-medium hover:text-gray-700 transition-colors"
                  >
                    {showDetails ? "Hide Details" : "Cookie Settings"}
                  </button>
                </div>
              </div>

              <button
                onClick={acceptNecessary}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={18} className="text-gray-400" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
