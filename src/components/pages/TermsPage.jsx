import { useEffect } from "react";
import { motion } from "framer-motion";

const TermsPage = () => {
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
        <h1 className="text-4xl font-light mb-8">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">
          Last updated: February 2026
        </p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-3">
              1. General
            </h2>
            <p>
              These Terms of Service govern your use of thegreenstandard.eu and
              all purchases made through our online store. By placing an order,
              you agree to these terms. The Green Standard B.V. is registered in
              the Netherlands.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-3">
              2. Orders and Pricing
            </h2>
            <p>
              All prices are displayed in Euros (EUR) and include applicable VAT
              for EU customers. Prices may change without notice, but
              already-placed orders will not be affected. We reserve the right to
              refuse or cancel any order due to pricing errors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-3">
              3. Payment
            </h2>
            <p>
              Payment is processed securely through Shopify Payments. We accept
              major credit cards, iDEAL, Bancontact, SOFORT, and other European
              payment methods. Payment is taken at the time of order.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-3">
              4. Shipping within the EU
            </h2>
            <p>
              We ship to all EU member states. Standard delivery takes 3-7
              business days depending on destination. Express shipping is
              available for select countries. Shipping costs are calculated at
              checkout. Orders over EUR 150 qualify for free standard shipping
              within the EU.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-3">
              5. Right of Withdrawal (EU Consumer Rights)
            </h2>
            <p>
              Under EU Directive 2011/83/EU, you have the right to withdraw from
              your purchase within 14 days of receiving the goods, without giving
              any reason. To exercise this right, inform us by email at
              returns@thegreenstandard.eu. You must return the goods in their
              original condition within 14 days of notifying us. We will refund
              the full purchase price within 14 days of receiving the returned
              goods.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-3">
              6. Warranty and Returns
            </h2>
            <p>
              All products come with a 2-year legal guarantee under EU consumer
              law. If a product is defective, you are entitled to free repair,
              replacement, or a refund. Contact support@thegreenstandard.eu for
              warranty claims.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-3">
              7. Governing Law and Disputes
            </h2>
            <p>
              These terms are governed by Dutch law. For disputes, you may use
              the EU Online Dispute Resolution platform at
              https://ec.europa.eu/consumers/odr. You may also contact your
              local consumer protection authority.
            </p>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default TermsPage;
