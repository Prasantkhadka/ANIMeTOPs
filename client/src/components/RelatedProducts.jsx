import React, { useEffect, useState, useContext } from "react";
import Title from "./Title.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { ShopContext } from "../context/ShopContext.jsx";
import Item from "./Item.jsx";

const RelatedProducts = ({ product, id }) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0 && product?.category) {
      const filtered = products
        .filter((item) => item.category === product.category && id !== item._id)
        .slice(0, 6);
      setRelatedProducts(filtered);
    }
  }, [product, id, products]);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="max-padd-container py-16">
      <Title
        title1={"Related"}
        title2={"Products"}
        titleStyles={"pb-10"}
        para={"You may also like these similar styles."}
      />

      <Swiper
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          555: { slidesPerView: 2, spaceBetween: 10 },
          800: { slidesPerView: 3, spaceBetween: 15 },
          1150: { slidesPerView: 4, spaceBetween: 15 },
          1350: { slidesPerView: 4, spaceBetween: 20 },
        }}
        modules={[Autoplay]}
        className="min-h-[399px]"
      >
        {relatedProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <Item product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RelatedProducts;
