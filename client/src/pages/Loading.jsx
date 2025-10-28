import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Loading = () => {
  const { navigate } = useContext(ShopContext);
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const nextUrl = query.get("next");

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 3000);
    }
  }, [nextUrl, navigate]);
  return (
    <div className="flexCenter h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-secondary" />
    </div>
  );
};

export default Loading;
