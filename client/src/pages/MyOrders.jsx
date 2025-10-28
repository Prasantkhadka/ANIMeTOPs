import React, { useEffect, useContext, useState } from "react";
import Title from "../components/Title.jsx";
import { ShopContext } from "../context/ShopContext.jsx";
import toast from "react-hot-toast";

const MyOrders = () => {
  const { currency, axios } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post("/api/order/user-orders");
      if (response.status === 200) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      toast.error("Failed to fetch orders: " + error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-padd-container py-16 pt-28 bg-primary">
      <Title title1={"My"} title2={"Orders"} title1Styles={"pb-10"} />

      {orders.length > 0 ? (
        <div className="space-y-10">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-none"
                  >
                    <img
                      src={item.product.image[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-contain rounded-lg bg-gray-50"
                    />
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-800">
                        {item.product.name}
                      </h5>
                      <p className="text-sm text-gray-500">
                        Size: <span className="font-medium">{item.size}</span>
                      </p>
                      <div className="flex items-center gap-6 mt-1 text-sm">
                        <div className="flex items-center gap-2">
                          <h5 className="text-gray-700">Price:</h5>
                          <p className="text-gray-600">
                            {currency}
                            {item.product.offerPrice}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-gray-700">Quantity:</h5>
                          <p className="text-gray-600">{item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="space-y-2 text-sm">
                  <div>
                    <h5 className="medium-14">Order ID:</h5>
                    <p className="text-gray-400 text-xs break-all">
                      {order._id}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-x-2">
                      <h5 className="medium-14">Payment Status:</h5>
                      <p className="text-gray-500 text-sm">
                        {order.isPaid ? "Paid" : "Pending"}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <h5 className="medium-14">Method:</h5>
                      <p className="text-gray-500 text-sm uppercase">
                        {order.paymentMethod}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-x-2">
                      <h5 className="medium-14">Date:</h5>
                      <p className="text-gray-600 text-sm">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString(
                              "en-AU",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <h5 className="medium-14">Amount:</h5>
                      <p className="text-gray-600 text-sm">
                        {currency}
                        {order.amount}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <h4 className="medium-14">Status:</h4>
                    <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
                    <p className="text-gray-700 font-medium">{order.status}</p>
                  </div>
                  <button
                    onClick={fetchOrders}
                    className="btn-secondary py-1 text-xs rounded-sm"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No orders found.</p>
      )}
    </div>
  );
};

export default MyOrders;
