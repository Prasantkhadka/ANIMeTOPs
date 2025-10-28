import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext.jsx";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, axios } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.post("/api/order/list");
      if (response.status === 200) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post("/api/order/update-status", {
        orderId,
        status: event.target.value,
      });
      if (response.status === 200) {
        await fetchAllOrders();
        toast.success(
          response.data.message || "Order status updated successfully"
        );
      }
    } catch (error) {
      toast.error(error.message);
    }
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
                      <p>{item.quantity}</p>
                    </div>
                    <div className="flex item-center gap-x-2 ">
                      <h5 className="medium-14">Size:</h5>
                      <p>{item.size}</p>
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
                <h5 className="break-all text-gray-500">{order._id}</h5>
              </div>
              <div className="flex gap-4">
                <div className="flex item-center gap-x-2 ">
                  <h5 className="medium-14">Customer:</h5>
                  <h5 className="text-gray-500">
                    {order.address.firstName} {order.address.lastName}
                  </h5>
                </div>
                <div className="flex item-center gap-x-2 ">
                  <h5 className="medium-14">Phone:</h5>
                  <h5 className="text-gray-500">{order.address.phone}</h5>
                </div>
              </div>
              <div className="flex item-center gap-x-2 ">
                <h5 className="medium-14">Address:</h5>
                <h5 className="text-gray-500">
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state}, {order.address.country},{" "}
                  {order.address.zip}
                </h5>
              </div>
              <div className="flex gap-4">
                <div className="flex item-center gap-x-2 ">
                  <h5 className="medium-14">Payment Status:</h5>
                  <h5 className="text-gray-500">
                    {order.isPaid ? "Paid" : "Pending"}
                  </h5>
                </div>
                <div className="flex item-center gap-x-2 ">
                  <h5 className="medium-14">Method:</h5>
                  <h5 className="uppercase text-gray-500">
                    {order.paymentMethod}
                  </h5>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex item-center gap-x-2 ">
                <h5 className="medium-14">Date:</h5>
                <h5 className="text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </h5>
              </div>
              <div className="flex item-center gap-x-2 ">
                <h5 className="medium-14">Amount:</h5>
                <h5 className="text-gray-500">
                  {currency}
                  {order.amount}
                </h5>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <h5 className="medium-14">Status:</h5>
              <select
                onChange={(event) => statusHandler(event, order._id)}
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
