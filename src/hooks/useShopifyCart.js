import { useState, useCallback } from 'react';
import { shopifyFetch, CREATE_CART_MUTATION, ADD_TO_CART_MUTATION } from '../utils/shopify';

/**
 * Hook to manage a Shopify Storefront API cart.
 * Creates a cart on first add, then uses cartLinesAdd for subsequent items.
 * Provides a checkoutUrl that redirects to Shopify's hosted checkout.
 */
export const useShopifyCart = () => {
  const [cartId, setCartId] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCart = useCallback(async (variantId, quantity = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await shopifyFetch(CREATE_CART_MUTATION, {
        cartInput: {
          lines: [{ merchandiseId: variantId, quantity }],
        },
      });

      const cart = data.cartCreate.cart;
      setCartId(cart.id);
      setCheckoutUrl(cart.checkoutUrl);
      return cart;
    } catch (err) {
      console.error('Error creating Shopify cart:', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = useCallback(async (variantId, quantity = 1) => {
    if (!cartId) {
      return createCart(variantId, quantity);
    }

    setLoading(true);
    setError(null);
    try {
      const data = await shopifyFetch(ADD_TO_CART_MUTATION, {
        cartId,
        lines: [{ merchandiseId: variantId, quantity }],
      });

      const cart = data.cartLinesAdd.cart;
      setCheckoutUrl(cart.checkoutUrl);
      return cart;
    } catch (err) {
      console.error('Error adding to Shopify cart:', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [cartId, createCart]);

  const goToCheckout = useCallback(() => {
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
    }
  }, [checkoutUrl]);

  return {
    cartId,
    checkoutUrl,
    loading,
    error,
    addToCart,
    goToCheckout,
  };
};
