"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


// Provide a default value or `null`
export const CartContext = createContext<any | null>(null);

export function CartProvider({ children }:any) {
  const [searchInput, setSearchInput] = useState("");
  const [handleSearches, setHandleSearches] = useState([]);
  const [productDetails, setProductDetails] = useState("");
  const [currency, setCurrency] = useState("UGX"); // Default currency

  let cartItems = [];
  
  if (typeof window !== "undefined") {
    cartItems = JSON.parse(localStorage.getItem("cartItem") as any) || [];
  }

  const [cart, setCart] = useState(cartItems);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState<any>([]);

  const addRecentlyViewedProduct = (product:any) => {
    if (!recentlyViewedProducts.some((item:any) => item.id === product.id)) {
      const updatedRecentlyViewed = [product, ...recentlyViewedProducts].slice(
        0,
        4
      );
      setRecentlyViewedProducts(updatedRecentlyViewed);
      localStorage.setItem(
        "recentlyViewedProducts",
        JSON.stringify(updatedRecentlyViewed)
      );
    }
  };

  const addToCart = (product:any) => {
    if (cart.some((item:any) => item.id === product.id)) {
      toast.error("This product is already in the cart");
    } else {
      setCart((prevCart:any) => [...prevCart, product]);
   
      toast.success("This product has been added to the cart");
    }
  };

  const removeFromCart = (productId:string) => {
    setCart((prevCart:any) => prevCart.filter((item:any) => item.id !== productId));
    toast.success("This product has been removed from the cart");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItem", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cartItem") as any);
      if (storedCart) {
        setCart(storedCart);
      }
      const storedRecentlyViewed = JSON.parse(
        localStorage.getItem("recentlyViewedProducts") as any
      );
      if (storedRecentlyViewed) {
        setRecentlyViewedProducts(storedRecentlyViewed);
      }
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cart,
        removeFromCart,
        setProductDetails,
        productDetails,
        recentlyViewedProducts,
        addRecentlyViewedProduct,
        handleSearches,
        setRecentlyViewedProducts,
        setHandleSearches,
        setSearchInput,
        searchInput,
        currency,
        setCurrency,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  return context;
}
