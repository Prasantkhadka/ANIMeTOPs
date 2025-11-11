import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "../components/Title.jsx";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";
import CartTotal from "../components/CartTotal.jsx";

const Cart = () => {
  const { navigate, products, currency, cartItems, updateQuantity } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      const tempData = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            tempData.push({ productId: productId, size: size });
          }
        }
      }
      setCartData(tempData);
    }
  }, [products, cartItems]);

  const increment = (id, size) => {
    const currentQuantity = cartItems[id][size];
    updateQuantity(id, size, currentQuantity + 1);
  };
  const decrement = (id, size) => {
    const currentQuantity = cartItems[id][size];
    if (currentQuantity > 1) {
      updateQuantity(id, size, currentQuantity - 1);
    } else {
      updateQuantity(id, size, 0);
    }
  };

  return products.length > 0 && cartItems ? (
    <div className="max-padd-contauner py-16 pt-28 bg-primary ">
      <div className="flex flex-col lg:flex-row gap-20 lg:gap-28">
        {/* Left side */}
        <div className="max-padd-container flex flex-[2] flex-col gap-3 text-[95%]">
          <Title title1={"Cart"} title2={"Overview"} title1Styles={"pb-5"} />
          <div className="grid grid-cols-[6fr_1fr_1fr] text-base font-medium bg-white p-2">
            <h5 className="h5 text-left">Product Details</h5>
            <h5 className="h5 text-left">Subtotal</h5>
            {""}
            <h5 className="h5 text-left">Action</h5>
          </div>
          {cartData.map((item, index) => {
            const product = products.find(
              (product) => product._id === item.productId
            );
            const quantity = cartItems[item.productId][item.size];
            return (
              <div
                key={index}
                className="grid grid-cols-[6fr_1fr_1fr] items-center bg-white p-2"
              >
                <div className="flex items-center md:gap-6 gap-3">
                  <div className="flex bg-primary">
                    <img
                      src={product.image[0]}
                      alt="productImg"
                      className="w-20"
                    />
                  </div>
                  <div className="">
                    <h5 className="hidden h5 sm:block line-clamp-1">
                      {product.name}
                    </h5>
                    <div className="bold-14 flexStart gap-2 mb-1">
                      Size: <p>{item.size}</p>
                    </div>
                    <div className="flexBetween">
                      <div className="flex items-center ring-1 ring-slate-900/5 rounded-full overflow-hidden bg-primary">
                        <button
                          onClick={() => decrement(item.productId, item.size)}
                          className="p-1.5 bg-white text-secondary rounded-full shadow-md"
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        <p className="px-2">{quantity}</p>
                        <button
                          onClick={() => increment(item.productId, item.size)}
                          className="p-1.5 bg-white text-secondary rounded-full shadow-md"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center">
                  {currency}
                  {product.offerPrice * quantity}
                </p>
                <button
                  onClick={() => updateQuantity(item.productId, item.size, 0)}
                  className="cursor-pointer mx-auto"
                >
                  <IoCloseCircleOutline className="text-xl" />
                </button>
              </div>
            );
          })}
        </div>
        {/* Right side */}
        <div className="flex-1 flex-col max-padd-container">
          <div className="max-w-[360px] w-full bg-white p-5 py-10 max-md:mt-16">
            <CartTotal />
            <button
              onClick={() => navigate("/place-order")}
              className="btn-dark w-full mt-8"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Cart;
