import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/data.js";
import { toast } from "react-hot-toast";

export const ShopContext = createContext();
const ShopContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;
  const deliveryCharge = 10; // Fixed delivery charge
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserLogin, setShowUserLogin] = useState("");
  const [cartItems, setCartItems] = useState({ items: [] });
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  // Add to cart
  const addToCart = async (itemId, size) => {
    if (!size) return toast.error("Please select a size");
    let cartData = structuredClone(cartItems);
    cartData[itemId] = cartData[itemId] || {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    setCartItems(cartData);
    toast.success("Product added to cart");
  };

  // Get cart count
  const getCartCount = () => {
    let count = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        count += cartItems[itemId][size];
      }
    }
    return count;
  };

  // Update cart quantity
  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    toast.success("Cart updated successfully");
  };

  // Get cart amount
  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((product) => product._id === itemId);
      if (!product) continue;
      for (const size in cartItems[itemId]) {
        total += product.offerPrice * cartItems[itemId][size];
      }
    }
    return total;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    user,
    setUser,
    navigate,
    products,
    setProducts,
    searchQuery,
    setSearchQuery,
    currency,
    showUserLogin,
    setShowUserLogin,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    deliveryCharge,
    isAdmin,
    setIsAdmin,
    fetchProducts,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
