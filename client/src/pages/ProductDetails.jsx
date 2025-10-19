import React, { useEffect, useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { Link, useParams } from "react-router-dom";
import {
  TbShoppingBagPlus,
  TbStarFilled,
  TbStarHalfFilled,
  TbHeart,
  TbRefresh,
} from "react-icons/tb";
import { FaTruckFast } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import ProductDescription from "../components/ProductDescription.jsx";
import ProductFeatures from "../components/ProductFeatures.jsx";
import RelatedProducts from "../components/RelatedProducts.jsx";

const ProductDetails = () => {
  const { products, currency, addToCart } = useContext(ShopContext);
  const { id } = useParams();

  const product = products?.find((item) => item._id === id);
  const [image, setImage] = useState(null);
  const [size, setSize] = useState(null);

  useEffect(() => {
    if (product?.image?.length > 0) {
      setImage(product.image[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-padd-container py-24 text-center">
        <p className="text-gray-600 text-lg">Product not found or loading...</p>
      </div>
    );
  }

  return (
    <div className="max-padd-container py-16 pt-28 bg-primary">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-secondary">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/collection" className="hover:text-secondary">
          Collection
        </Link>{" "}
        /{" "}
        <Link
          to={`/collection/${product.category}`}
          className="hover:text-secondary"
        >
          {product.category}
        </Link>{" "}
        / <span className="text-secondary">{product.name}</span>
      </p>

      {/* Product Section */}
      <div className="flex flex-col xl:flex-row gap-10">
        {/* Left Side: Product Images */}
        <div className="flex flex-col xl:flex-row flex-1 gap-4">
          {/* Thumbnail Images */}
          <div className="flex xl:flex-col gap-2 justify-center items-center">
            {product.image?.map((item, index) => (
              <div
                key={index}
                className={`cursor-pointer bg-white border rounded-lg p-1 ${
                  image === item ? "ring-2 ring-secondary" : ""
                }`}
                onClick={() => setImage(item)}
              >
                <img
                  src={item}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 bg-white rounded-xl flex items-center justify-center p-4 shadow-sm">
            <img
              src={image}
              alt={product.name}
              className="w-full h-auto max-h-[500px] object-contain rounded-lg"
            />
          </div>
        </div>

        {/* Right Side: Product Info */}
        <div className="flex-1 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="h3 leading-tight text-gray-800">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-x-2 pt-2">
            <div className="flex text-yellow-400 text-lg">
              <TbStarFilled />
              <TbStarFilled />
              <TbStarFilled />
              <TbStarFilled />
              <TbStarHalfFilled />
            </div>
            <p className="text-sm text-gray-500">(22 reviews)</p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 my-3">
            <h3 className="text-2xl font-semibold line-through text-secondary">
              {currency}
              {product.price}.00
            </h3>
            <h4 className="text-3xl font-bold text-secondary">
              {currency}
              {product.price}.00
            </h4>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed max-w-[500px] mb-4">
            {product.description}
          </p>

          {/* Sizes */}
          <div className="my-4">
            <p className="font-medium text-gray-700 mb-2">Select Size:</p>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(product.sizes) &&
                [...product.sizes]
                  .sort((a, b) => {
                    const order = ["XS", "S", "M", "L", "XL", "XXL"];
                    return order.indexOf(a) - order.indexOf(b);
                  })
                  .map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSize(item)}
                      className={`px-3 py-1 border rounded-md text-sm font-medium transition ${
                        item === size
                          ? "bg-secondary text-white border-secondary"
                          : "bg-primary text-gray-800 border-gray-300 hover:border-secondary"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 my-4">
            <button
              onClick={() => addToCart(product._id, size)}
              className="btn-dark sm:w-1/2 flex items-center justify-center gap-2"
            >
              Add to Cart <TbShoppingBagPlus />
            </button>
            <button className="btn-light flex items-center justify-center">
              <TbHeart className="text-xl" />
            </button>
          </div>

          {/* Delivery Info */}
          <div className="flex items-center gap-x-2 mt-3 text-gray-600">
            <FaTruckFast className="text-lg" />
            <span className="text-sm">Free Delivery on Orders Over $100</span>
          </div>

          <hr className="my-4 border-gray-200" />

          <div className="text-sm text-gray-500 space-y-1">
            <div className="flex items-center gap-2">
              <MdVerified className="text-green-600 text-lg" />
              <p>Authenticity you can trust</p>
            </div>
            <div className="flex items-center gap-2">
              <FaMoneyBillWave className="text-yellow-500 text-lg" />
              <p>Enjoy Cash on Delivery</p>
            </div>
            <div className="flex items-center gap-2">
              <TbRefresh className="text-blue-500 text-lg" />
              <p>Easy Returns within 30 Days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description, Features & Related Products */}
      <div className="mt-12 space-y-10">
        <ProductDescription />
        <ProductFeatures />
        <RelatedProducts product={product} id={id} />
      </div>
    </div>
  );
};

export default ProductDetails;
