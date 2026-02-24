import { useEffect } from "react";
import { motion } from "framer-motion";

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-28 pb-20 bg-white"
    >
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-light mb-8">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">
          Last updated: February 2026
        </p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-3">
              1. Introduction
            </h2>
            <p>
              The Green Standard ("we", "us", "our") is committed to protecting
              your personal data in compliance with the General Data Protection
              Regulation (GDPR) (EU) 2016/679. This Privacy Policy explains how
              we collect, use, store, and share your information when you visit
              our website or make a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-3">
              2. Data Controller
            </h2>
            <p>
              The Green Standard B.V., registered in the Netherlands. For
              questions about this policy, contact us at
              privacy@thegreenstandard.eu.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-3">
              3. Data We Collect
            </h2>
            <p>We collect the following categories of personal data:</p>
            <p>
              <strong>Identity Data:</strong> name, email address, shipping and
              billing address, phone number.
            </p>
            <p>
              <strong>Transaction Data:</strong> order history, payment details
              (processed securely through Shopify Payments).
            </p>
            <p>
              <strong>Technical Data:</strong> IP address, browser type, device
              information, and cookies (see our Cookie Policy).
            </p>
            <p>
              <strong>Usage Data:</strong> pages visited, time on site, and
              browsing behaviour.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-3">
              4. Legal Basis for Processing
            </h2>
            <p>We process your data on the following legal bases under GDPR:</p>
            <p>
              <strong>Contract performance</strong> (Art. 6(1)(b)) — to fulfil
              orders and provide customer service.
            </p>
            <p>
              <strong>Consent</strong> (Art. 6(1)(a)) — for marketing emails and
              non-essential cookies.
            </p>
            <p>
              <strong>Legitimate interest</strong> (Art. 6(1)(f)) — for fraud
              prevention and website analytics.
            </p>
            <p>
              <strong>Legal obligation</strong> (Art. 6(1)(c)) — for tax and
              accounting records.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-3">
              5. Your Rights Under GDPR
            </h2>
            <p>
              You have the right to access, rectify, erase, restrict processing,
              data portability, and object to processing of your personal data.
              You may also withdraw consent at any time. To exercise these
              rights, contact privacy@thegreenstandard.eu. We will respond within
              30 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-3">
              6. Data Retention
            </h2>
            <p>
              We retain personal data only as long as necessary for the purposes
              set out in this policy. Order data is retained for 7 years for tax
              compliance. Marketing data is deleted upon unsubscribing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-3">
              7. International Transfers
            </h2>
            <p>
              Your data is processed within the EEA. Where data is transferred
              outside the EEA (e.g., via Shopify's infrastructure), we ensure
              adequate safeguards under GDPR Chapter V, including Standard
              Contractual Clauses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-3">
              8. Supervisory Authority
            </h2>
            <p>
              You have the right to lodge a complaint with the Dutch Data
              Protection Authority (Autoriteit Persoonsgegevens) or your local EU
              supervisory authority.
            </p>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicyPage;
