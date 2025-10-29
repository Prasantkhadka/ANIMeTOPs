import React, { useState, useEffect, useContext } from "react";
import Title from "./Title.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { ShopContext } from "../context/ShopContext.jsx";
import Item from "./Item.jsx";

const PopularProducts = () => {
  const [PopularProducts, setPopularProducts] = useState([]);
  const { products } = useContext(ShopContext);

  useEffect(() => {
    // Guard: ensure products is an array (sometimes a failed API call returns HTML or a string)
    if (!Array.isArray(products)) {
      console.warn("PopularProducts: products is not an array", products);
      setPopularProducts([]);
      return;
    }

    const data = products.filter((product) => product.popular);
    setPopularProducts(data.slice(0, 6));
  }, [products]);

  return (
    <section className="max-padd-container pt-16">
      <Title title1={"Popular"} title2={"Products"} titleStyles={"pb-10"} />
      {/* Container */}

      {
        <Swiper
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            555: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            800: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1150: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1350: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
          modules={[Autoplay]}
          className="min-h-[399px]"
        >
          {PopularProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <Item product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      }
    </section>
  );
};

export default PopularProducts;
