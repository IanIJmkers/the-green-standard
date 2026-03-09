import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    category: "Shipping",
    questions: [
      {
        q: "How long does delivery take?",
        a: "Delivery times depend on your location. Netherlands & Belgium: 2-3 business days. Germany, France & Austria: 3-5 business days. Rest of EU: 5-7 business days. United Kingdom: 5-10 business days.",
      },
      {
        q: "Do you ship outside the EU?",
        a: "We currently ship to all EU countries and the United Kingdom. Orders to the UK may be subject to customs duties and import taxes. We do not yet ship outside of Europe.",
      },
      {
        q: "How much does shipping cost?",
        a: "Shipping is free for orders over EUR 75 (NL & BE), EUR 150 (DE, FR, AT), or EUR 200 (rest of EU). Below these thresholds, shipping costs are calculated at checkout based on your location.",
      },
      {
        q: "Can I track my order?",
        a: "Yes. Once your order ships, you will receive a confirmation email with a tracking number and link. You can also contact us at support@thegreenstandard.eu for order updates.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        q: "What is your return policy?",
        a: "Under EU consumer protection law, you have the right to return any item within 14 days of delivery for a full refund. Items must be in their original, unused condition with all packaging intact.",
      },
      {
        q: "How do I start a return?",
        a: "Email returns@thegreenstandard.eu with your order number. We will provide a prepaid return label for all EU orders. Once we receive the item, your refund is processed within 14 business days to the original payment method.",
      },
      {
        q: "Can I exchange an item instead of returning it?",
        a: "We do not offer direct exchanges. Please return the original item for a refund and place a new order for the item you would like instead.",
      },
    ],
  },
  {
    category: "Products & Care",
    questions: [
      {
        q: "How do I choose the right club size?",
        a: "Club sizing depends on your height, arm length, and swing style. Each product page includes a sizing guide. If you need further help, contact our team at support@thegreenstandard.eu and we will be happy to assist.",
      },
      {
        q: "What materials are your clubs made from?",
        a: "Our clubs are crafted using premium materials including forged carbon steel, titanium alloy heads, and graphite shafts. Each product page lists the specific materials and construction details.",
      },
      {
        q: "How should I care for my golf equipment?",
        a: "Clean club heads after each round with warm water and a soft brush. Dry thoroughly before storing. Keep grips clean with mild soap and water. Store clubs in a cool, dry place and use headcovers for woods and putters.",
      },
    ],
  },
  {
    category: "Warranty & Support",
    questions: [
      {
        q: "What does your warranty cover?",
        a: "All products carry a minimum 2-year warranty as required by EU consumer law. This covers manufacturing defects and material failures under normal use. It does not cover damage from misuse, neglect, or normal wear and tear.",
      },
      {
        q: "How do I make a warranty claim?",
        a: "Contact support@thegreenstandard.eu with your order number, a description of the issue, and photos if possible. We will assess your claim and arrange a free repair or replacement if covered.",
      },
    ],
  },
  {
    category: "Orders & Payment",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, Mastercard, Amex), iDEAL, Bancontact, SOFORT, and other local payment methods via Shopify Payments. All transactions are secured with SSL encryption.",
      },
      {
        q: "Can I modify or cancel my order?",
        a: "You can modify or cancel your order within 1 hour of placing it by contacting support@thegreenstandard.eu. After this window, orders enter processing and cannot be changed. You can still return the item after delivery.",
      },
      {
        q: "Do your prices include VAT?",
        a: "Yes. All prices displayed on our website include VAT for EU customers. For orders to the United Kingdom, customs duties and import taxes may apply and are the responsibility of the buyer.",
      },
    ],
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let globalIndex = 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-28 pb-20 bg-white"
    >
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-light mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 mb-12">
          Find answers to common questions about our products, shipping, returns,
          and more.
        </p>

        {faqs.map((section) => (
          <section key={section.category} className="mb-10">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              {section.category}
            </h2>
            <div className="border-t border-gray-200">
              {section.questions.map((item) => {
                const idx = globalIndex++;
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="border-b border-gray-200">
                    <button
                      onClick={() => toggle(idx)}
                      className="w-full flex items-center justify-between py-4 text-left"
                    >
                      <span className="text-gray-900 font-normal pr-4">
                        {item.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0 text-gray-400"
                      >
                        <ChevronDown size={20} />
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="pb-4 text-gray-600 leading-relaxed">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* Contact CTA */}
        <div className="mt-12 p-8 bg-gray-50 rounded-xl text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-1">
            Our team is here to help. Reach out to us at
          </p>
          <a
            href="mailto:support@thegreenstandard.eu"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            support@thegreenstandard.eu
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default FAQPage;
