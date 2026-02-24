import { useState, useEffect } from "react";
import { shopifyFetch, PRODUCTS_QUERY } from "../utils/shopify";

function ShopifyTest() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function testConnection() {
      try {
        console.log("🔄 Testing Shopify connection...");
        const data = await shopifyFetch(PRODUCTS_QUERY, { first: 10 });

        console.log("✅ Connected! Products:", data.products.edges);
        setProducts(data.products.edges.map((edge) => edge.node));
      } catch (err) {
        console.error("❌ Connection failed:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    testConnection();
  }, []);

  if (loading) return <div className="p-8">Loading Shopify products...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">✅ Shopify Connected!</h1>
      <p className="mb-4">Found {products.length} products</p>

      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            {product.images.edges[0] && (
              <img
                src={product.images.edges[0].node.url}
                alt={product.title}
                className="w-full h-48 object-cover mb-2"
              />
            )}
            <h3 className="font-bold">{product.title}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-lg font-bold text-green-600 mt-2">
              ${product.priceRange.minVariantPrice.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopifyTest;
