import React from "react";
import Title from "../components/Title.jsx";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import CartTotal from "../components/CartTotal.jsx";
import toast from "react-hot-toast";

const PlaceOrder = () => {
  const { navigate, cartItems, products, setCartItems, axios } =
    useContext(ShopContext);
  const [method, setMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderData = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const productInfo = structuredClone(
              products.find((product) => product._id === productId)
            );
            if (productInfo) {
              productInfo.size = size;
              productInfo.quantity = cartItems[productId][size];
              orderData.push(productInfo);
            }
          }
        }
      }
      // convert orderData to items array for backend
      let items = orderData.map((product) => ({
        product: product._id,
        quantity: product.quantity,
        size: product.size,
      }));

      if (method === "cod") {
        const response = await axios.post("/api/order/cod", {
          items,
          address: formData,
        });
        if (response.status === 201) {
          setCartItems({});
          toast.success(response.data.message || "Order placed successfully");
          navigate("/my-orders");
        }
      } else {
        const response = await axios.post("/api/order/stripe", {
          items,
          address: formData,
        });
        if (response.status === 201) {
          window.location.replace(response.data.url);
        } else {
          toast.error(response.data.message || "Failed to place order");
        }
      }
    } catch (error) {
      toast.error(error.message || "Failed to place order");
    }
  };

  return (
    <div className="max-padd-container py-16 pt-28 bg-primary">
      {/* Container */}
      <form onSubmit={onSubmitHandler}>
        <div className="flex flex-col xl:flex-row gap-20 xl:gap-28">
          {/* Left Side */}
          <div className="flex flex-[2] flex-col gap-3 text-[95%]">
            <Title
              title1={"Delivery"}
              title2={"Information"}
              titleStyle={"pb-5"}
            />
            <div className="flex gap-3">
              <input
                onChange={changeHandler}
                value={formData.firstName}
                type="text"
                name="firstName"
                placeholder="First Name"
                className="ring-1 ring-slate-900/15 p-1 ol-3 rounded-sm bg-white outline-none w-1/2"
                required
              />
              <input
                onChange={changeHandler}
                value={formData.lastName}
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="ring-1 ring-slate-900/15 p-1 ol-3 rounded-sm bg-white outline-none w-1/2"
                required
              />
            </div>
            <input
              onChange={changeHandler}
              value={formData.email}
              type="email"
              name="email"
              placeholder="Email"
              className="ring-1 ring-slate-900/15 p-1 ol-3 rounded-sm bg-white outline-none"
              required
            />
            <input
              onChange={changeHandler}
              value={formData.phone}
              type="phone"
              name="phone"
              placeholder="Phone"
              className="ring-1 ring-slate-900/15 p-1 ol-3 rounded-sm bg-white outline-none"
              required
            />
            <input
              onChange={changeHandler}
              value={formData.street}
              type="text"
              name="street"
              placeholder="Street Address"
              className="ring-1 ring-slate-900/15 p-1 ol-3 rounded-sm bg-white outline-none"
              required
            />
            <div className="flex gap-3">
              <input
                onChange={changeHandler}
                value={formData.city}
                type="text"
                name="city"
                placeholder="City"
                className="ring-1 ring-slate-900/15 p-1 ol-3 rounded-sm bg-white outline-none w-1/2"
                required
              />
              <input
                onChange={changeHandler}
                value={formData.state}
                type="text"
                name="state"
                placeholder="State"
                className="ring-1 ring-slate-900/15 p-1 ol-3 rounded-sm bg-white outline-none w-1/2"
                required
              />
            </div>
            <div className="flex gap-3">
              <input
                onChange={changeHandler}
                value={formData.zipcode}
                type="text"
                name="zipcode"
                placeholder="Zip Code"
                className="ring-1 ring-slate-900/15 p-1 ol-3 rounded-sm bg-white outline-none w-1/2"
                required
              />
              <input
                onChange={changeHandler}
                value={formData.country}
                type="text"
                name="country"
                placeholder="Country"
                className="ring-1 ring-slate-900/15 p-1 ol-3 rounded-sm bg-white outline-none w-1/2"
                required
              />
            </div>
          </div>
          {/* Right Side */}
          <div className="flex flex-1 flex-col">
            <div className="max-w-[360px] w-full bg-white p-5 py-10 max-md:mt-16">
              <CartTotal method={method} setMethod={setMethod} />
              <button type="submit" className="btn-dark w-full mt-8">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
