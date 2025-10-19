import React from "react";
import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import Categories from "../components/Categories.jsx";
import PopularProducts from "../components/PopularProducts.jsx";
import Blog from "../components/Blog.jsx";

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <Categories />
      <PopularProducts />
      <Blog />
    </>
  );
};

export default Home;
