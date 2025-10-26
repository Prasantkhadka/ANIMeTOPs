import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { useLocation } from "react-router-dom";

const CartTotal = ({ method, setMethod }) => {
  const { currency, getCartAmount, getCartCount, deliveryCharge } =
    useContext(ShopContext);

  const location = useLocation();
  const isOrderPage = location.pathname.includes("place-order");

  const amount = getCartAmount();
  const tax = amount * 0.02;
  const total = amount + (amount === 0 ? 0 : deliveryCharge) + tax;

  return (
    <div>
      <h3 className="bold-22">
        Order Summary{" "}
        <span className="bold-14 text-secondary">({getCartCount()} Items)</span>{" "}
      </h3>
      <hr className="border-gray-300 my-5" />
      {/* Payment Method */}
      {isOrderPage && (
        <div className="mb-6">
          <div className="my-6">
            <h4 className="h4 mb-5">
              Payment <span>Method</span>
            </h4>
            <div className="flex gap-3">
              <div
                onClick={() => setMethod("cod")}
                className={`${
                  method === "cod" ? "btn-secondary" : "btn-light"
                } !py-1 text-xs cursor-pointer`}
              >
                Cash on Delivery
              </div>
              <div
                onClick={() => setMethod("stripe")}
                className={`${
                  method === "stripe" ? "btn-secondary" : "btn-light"
                } !py-1 text-xs cursor-pointer`}
              >
                Stripe
              </div>
            </div>
          </div>
          <hr className="border-gray-300" />
        </div>
      )}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <h5 className="h5">Price</h5>
          <p className="font-bold">
            {currency}
            {amount.toFixed(2)}
          </p>
        </div>
        <div className="flex justify-between">
          <h5 className="h5">Shipping Fee</h5>
          <p className="font-bold">
            {getCartAmount() === 0
              ? "$0.00"
              : `${currency}${deliveryCharge}.00`}
          </p>
        </div>
        <div className="flex justify-between">
          <h5 className="h5">Tax(2%)</h5>
          <p className="font-bold">
            {currency}
            {tax.toFixed(2)}
          </p>
        </div>
        <div className="flex justify-between text-lg font-medium mt-3">
          <h4 className="h4">Total Amount</h4>{" "}
          <p className="bold-18">
            {currency}
            {total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
