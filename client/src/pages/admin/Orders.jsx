import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext.jsx";
import { dummyOrders } from "../../assets/data";

const Orders = () => {
  const { currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    setOrders(dummyOrders);
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="px-2 sm:px-6 py-12 m-2 h-[97vh] bg-primary overflow-y-scroll lg:w-4/5 rounded-xl">
      {orders.map((order) => (
        <div key={order._id} className="bg-white p-3 mb-4 rounded">
          {/* Product List */}
          {order.items.map((item, index) => (
            <div
              key={index}
              className="text-gray-700 flex flex-col lg:flex-row gap-4 mb-3"
            >
              <div className="flex flex-[2] gap-x-3">
                <div className="flexCenter bg-primary rounded">
                  <img
                    src={item.product.image[0]}
                    alt="orderedProductImg"
                    className="max-h-20 max-w-20 object-contain"
                  />
                </div>
                <div className="block w-full">
                  <h5 className="capitalize h5 line-clam-1">
                    {item.product.name}
                  </h5>
                  <div className="flex flex-wrap gap-3 max-sm:gap-y-1 mt-1">
                    <div>
                      <h5 className="medium-14">Price:</h5>
                      <p>
                        {currency}
                        {item.product.offerPrice}
                      </p>
                    </div>

                    <div className="flex item-center gap-x-2 ">
                      <h5 className="medium-14">Quantity:</h5>
                      <p>
                        {currency}
                        {item.quantity}
                      </p>
                    </div>
                    <div className="flex item-center gap-x-2 ">
                      <h5 className="medium-14">Size:</h5>
                      <p>
                        {currency}
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Order Summary */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4 border-t border-gray-300 pt-3">
            <div className="flex flex-col gap-2">
              <div className="flex item-center gap-x-2 ">
                <h5 className="medium-14">OrderId:</h5>
                <p className="break-all">{order._id}</p>
              </div>
              <div className="flex gap-4">
                <div className="flex item-center gap-x-2 ">
                  <h5 className="medium-14">Customer:</h5>
                  <p className="">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                </div>
                <div className="flex item-center gap-x-2 ">
                  <h5 className="medium-14">Phone:</h5>
                  <p className="">{order.address.phone}</p>
                </div>
              </div>
              <div className="flex item-center gap-x-2 ">
                <h5 className="medium-14">Address:</h5>
                <p className="">
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state}, {order.address.country},{" "}
                  {order.address.zip}
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex item-center gap-x-2 ">
                  <h5 className="medium-14">Payment Status:</h5>
                  <p className="">{order.isPaid ? "Paid" : "Pending"}</p>
                </div>
                <div className="flex item-center gap-x-2 ">
                  <h5 className="medium-14">Method:</h5>
                  <p className="">{order.paymentMethod}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex item-center gap-x-2 ">
                <h5 className="medium-14">Date:</h5>
                <p className="">{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex item-center gap-x-2 ">
                <h5 className="medium-14">Amount:</h5>
                <p className="">
                  {currency}
                  {order.amount}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <h5 className="medium-14">Status:</h5>
              <select
                value={order.status}
                className="font-semibold p-1 ring-1 ring-slate-900/5 rounded max-w-36 bg-primary"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
