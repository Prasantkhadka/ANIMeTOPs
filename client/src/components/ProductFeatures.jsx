import React from "react";
import { FaTruckFast, FaRegHandshake } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";

const ProductFeatures = () => {
  const features = [
    {
      id: 1,
      title: "Easy Returns",
      description: "Return or exchange within 30 days of purchase.",
      icon: <FaRegHandshake className="text-3xl text-secondary" />,
    },
    {
      id: 2,
      title: "Fast Delivery",
      description: "Enjoy free and quick shipping on orders over $100.",
      icon: <FaTruckFast className="text-3xl text-secondary" />,
    },
    {
      id: 3,
      title: "Secure Payment",
      description: "Your payment information is processed securely.",
      icon: <MdOutlinePayment className="text-3xl text-secondary" />,
    },
  ];

  return (
    <div className=" bg-primary rounded-2xl py-8 mt-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 px-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="mb-3">{feature.icon}</div>
            <h3 className="text-base font-semibold text-gray-800 mb-1">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFeatures;
