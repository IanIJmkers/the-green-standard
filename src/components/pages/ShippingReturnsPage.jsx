import { useEffect } from "react";
import { motion } from "framer-motion";
import { Truck, RotateCcw, Clock, MapPin } from "lucide-react";

const ShippingReturnsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const shippingZones = [
    {
      zone: "Netherlands & Belgium",
      standard: "2-3 business days",
      express: "Next day",
      cost: "Free over EUR 75",
    },
    {
      zone: "Germany, France, Austria",
      standard: "3-5 business days",
      express: "2-3 business days",
      cost: "Free over EUR 150",
    },
    {
      zone: "Rest of EU",
      standard: "5-7 business days",
      express: "3-5 business days",
      cost: "Free over EUR 200",
    },
    {
      zone: "United Kingdom",
      standard: "5-10 business days",
      express: "3-5 business days",
      cost: "Customs duties may apply",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-28 pb-20 bg-white"
    >
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-light mb-4">Shipping & Returns</h1>
        <p className="text-gray-600 mb-12">
          We ship across Europe with tracked delivery and hassle-free returns.
        </p>

        {/* Highlights */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Truck, label: "Free EU Shipping", desc: "On qualifying orders" },
            { icon: RotateCcw, label: "14-Day Returns", desc: "EU consumer right" },
            { icon: Clock, label: "2-7 Day Delivery", desc: "Across Europe" },
            { icon: MapPin, label: "Tracked Parcels", desc: "Full visibility" },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="text-center p-6 bg-gray-50 rounded-xl">
              <Icon className="mx-auto mb-3 text-green-600" size={28} />
              <p className="font-medium text-gray-900">{label}</p>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>

        {/* Shipping Zones Table */}
        <section className="mb-16">
          <h2 className="text-2xl font-light mb-6">Shipping Zones & Rates</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 pr-4 text-sm font-medium text-gray-500">
                    Region
                  </th>
                  <th className="py-3 pr-4 text-sm font-medium text-gray-500">
                    Standard
                  </th>
                  <th className="py-3 pr-4 text-sm font-medium text-gray-500">
                    Express
                  </th>
                  <th className="py-3 text-sm font-medium text-gray-500">
                    Free Shipping
                  </th>
                </tr>
              </thead>
              <tbody>
                {shippingZones.map((zone) => (
                  <tr key={zone.zone} className="border-b border-gray-100">
                    <td className="py-4 pr-4 font-medium text-gray-900">
                      {zone.zone}
                    </td>
                    <td className="py-4 pr-4 text-gray-600">
                      {zone.standard}
                    </td>
                    <td className="py-4 pr-4 text-gray-600">{zone.express}</td>
                    <td className="py-4 text-gray-600">{zone.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            VAT is included in all prices for EU customers. Orders to non-EU
            countries may be subject to import duties and taxes.
          </p>
        </section>

        {/* Returns */}
        <section className="mb-16">
          <h2 className="text-2xl font-light mb-6">Returns & Refunds</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Under EU consumer protection law, you have the right to return any
              item within 14 days of delivery for a full refund, no questions
              asked. Items must be in original, unused condition with all
              packaging.
            </p>
            <p>
              To initiate a return, email returns@thegreenstandard.eu with your
              order number. We will provide a prepaid return label for orders
              within the EU.
            </p>
            <p>
              Refunds are processed within 14 days of receiving the returned
              item, to the original payment method.
            </p>
          </div>
        </section>

        {/* Warranty */}
        <section>
          <h2 className="text-2xl font-light mb-6">Warranty</h2>
          <p className="text-gray-700">
            All products carry a minimum 2-year warranty as required by EU
            consumer law. Manufacturing defects are covered with free repair or
            replacement. Contact support@thegreenstandard.eu for warranty claims.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default ShippingReturnsPage;
