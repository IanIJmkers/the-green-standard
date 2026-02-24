import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useShopifyCart } from "../hooks/useShopifyCart";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const shopifyCart = useShopifyCart();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    // Sync with Shopify cart if variant ID is available
    if (product.variantId) {
      shopifyCart.addToCart(product.variantId, 1);
    }
  }, [shopifyCart]);

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const goToCheckout = () => {
    if (shopifyCart.checkoutUrl) {
      shopifyCart.goToCheckout();
    } else {
      // Fallback: create a new Shopify cart with all items then redirect
      const firstItem = cart.find((item) => item.variantId);
      if (firstItem) {
        shopifyCart.addToCart(firstItem.variantId, firstItem.quantity).then(() => {
          setTimeout(() => {
            if (shopifyCart.checkoutUrl) {
              shopifyCart.goToCheckout();
            }
          }, 1000);
        });
      }
    }
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        goToCheckout,
        checkoutUrl: shopifyCart.checkoutUrl,
        checkoutLoading: shopifyCart.loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
