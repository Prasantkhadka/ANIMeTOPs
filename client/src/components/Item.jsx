import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";

const Item = ({ product }) => {
  const { navigate, addToCart } = useContext(ShopContext);
  const [hovered, setHovered] = useState(false);
  return (
    <div className="overflow-hidden p-5 bg-white">
      {/* Image */}
      <div
        onClick={() => {
          navigate(
            `/collection/${product.category.toLocaleLowerCase()}/${product._id}`
          );
          scrollTo(0, 0);
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flexCenter bg-[#F5F5F5] overflow-hidden relative"
      >
        <img
          src={
            product.image.length > 1 && hovered
              ? product.image[1]
              : product.image[0]
          }
          alt="productImg"
          className="group-hover:bg-primaryDeep transition-all duration-300"
        />
      </div>
      {/* Info */}
      <div
        onClick={() =>
          navigate(`/collection/${product.category}/${product._id}`)
        }
        className="pt-3"
      >
        <h4 className="bold-15 line-clamp-1 !py-0 uppercase">{product.name}</h4>
        <p className="line-clamp-1">{product.description}</p>
        <div className="flexBetween pt-2 gap-2">
          <p className="h5 capitalize">{product.category}</p>
          <button
            className="btn-outline !py-2 !px-0 w-full !text-xs"
            onClick={() => addToCart(product._id)}
          >
            Add to Cart | ${product.offerPrice}.00
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
