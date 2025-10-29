import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true; // Enable sending cookies for API requests

axios.defaults.baseURL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:1111"; // Set base URL as backend url for API requests

if (import.meta.env.MODE !== "production") {
  console.log("Axios baseURL:", axios.defaults.baseURL);
}

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

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const res = await axios.get(`/api/admin/is-auth`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setIsAdmin(true);
        }
      } catch {
        setIsAdmin(false);
      }
    };
    checkAdminAuth();
  }, []);

  //

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/user/is-auth");
      if (response?.status === 200 || response.data?.user) {
        setUser(response.data.user);
        setCartItems(response.data.cartData || {});
      } else {
        setUser(null);
        setCartItems({});
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null);
        setCartItems({});
      } else {
        toast.error(error.message);
        setUser(null);
        setCartItems({});
      }
    }
  };

  // Login handler after fetching user data
  const handleLoginSuccess = async () => {
    try {
      await fetchUserData();
      navigate("/");
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.message || "Failed to login");
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/user/logout");
      if (response.status === 200) {
        setUser(null);
        setCartItems({});
        // remove stored token (fallback for deployments where cookies aren't shared)
        try {
          sessionStorage.removeItem("token");
          delete axios.defaults.headers.common["Authorization"];
        } catch {
          /* ignore */
        }
        navigate("/");
        toast.success(response.data.message || "Logged out successfully");
      }
    } catch (error) {
      toast.error(error.message || "Failed to logout");
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/product/list-products");
      if (response.status === 200) {
        setProducts(response.data);
      } else {
        toast.error(response.data.message || "Failed to fetch products");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Add to cart
  const addToCart = async (productId, size) => {
    if (!size) return toast.error("Please select a size");
    let cartData = structuredClone(cartItems);
    cartData[productId] = cartData[productId] || {};
    cartData[productId][size] = (cartData[productId][size] || 0) + 1;
    setCartItems(cartData);

    if (user) {
      try {
        const response = await axios.post("/api/cart/add-to-cart", {
          productId,
          size,
        });
        if (response.status === 200) {
          toast.success(response.data.message || "Product added to cart");
        }
      } catch (error) {
        toast.error(error.message || "Failed to add product to cart");
      }
    }
  };

  // Get cart count
  const getCartCount = () => {
    let count = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        count += cartItems[productId][size];
      }
    }
    return count;
  };

  // Update cart quantity
  const updateQuantity = (productId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[productId][size] = quantity;
    setCartItems(cartData);
    if (user) {
      try {
        const response = axios.put("/api/cart/update-cart", {
          productId,
          size,
          quantity,
        });
        if (response.status === 200) {
          toast.success(response.data.message || "Cart updated successfully");
        }
      } catch (error) {
        toast.error(error.message || "Failed to update cart");
      }
    }
  };

  // Get cart amount
  const getCartAmount = () => {
    let total = 0;
    for (const productId in cartItems) {
      const product = products.find((product) => product._id === productId);
      if (!product) continue;
      for (const size in cartItems[productId]) {
        total += product.offerPrice * cartItems[productId][size];
      }
    }
    return total;
  };

  useEffect(() => {
    fetchProducts();
    fetchUserData();
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
    axios,
    fetchUserData,
    handleLoginSuccess,
    handleLogout,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
