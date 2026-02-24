import { useState, useEffect } from 'react';
import { shopifyFetch, PRODUCTS_QUERY } from '../utils/shopify';

export const useShopifyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await shopifyFetch(PRODUCTS_QUERY, { first: 50 });

        const transformedProducts = data.products.edges.map(({ node }, index) => ({
          id: node.id,
          handle: node.handle,
          name: node.title,
          price: parseFloat(node.priceRange.minVariantPrice.amount),
          currencyCode: node.priceRange.minVariantPrice.currencyCode || 'EUR',
          category: node.productType || 'General',
          description: node.description || 'No description available',
          color: getProductColor(index),
          image: node.images.edges[0]?.node.url,
          imageAlt: node.images.edges[0]?.node.altText || node.title,
          inStock: node.variants.edges[0]?.node.availableForSale || false,
          variantId: node.variants.edges[0]?.node.id,
          features: generateFeatures(node.description),
        }));

        setProducts(transformedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

// Helper function to generate colors for products
const getProductColor = (index) => {
  const colors = [
    '#004d33', '#006644', '#008855', '#00aa66', '#00cc77',
    '#2d5a4d', '#3d6a5d', '#4d7a6d', '#5d8a7d', '#6d9a8d'
  ];
  return colors[index % colors.length];
};

// Helper to extract features from description
const generateFeatures = (description) => {
  if (!description) return ['High quality materials', 'Eco-friendly', 'Sustainable'];

  const sentences = description.split('.').filter(s => s.trim().length > 10);
  return sentences.slice(0, 3).map(s => s.trim()) || ['Premium product', 'Quality guaranteed'];
};
