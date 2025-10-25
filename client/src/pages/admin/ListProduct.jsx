import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext.jsx";
import toast from "react-hot-toast";

const ListProduct = () => {
  const { products, currency, fetchProducts, axios } = useContext(ShopContext);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    setProductList(products);
    fetchProducts();
  }, [products, fetchProducts]);

  const toggleInStock = async (productId, inStock) => {
    try {
      const response = await axios.post("/api/product/stock", {
        productId,
        inStock,
      });
      if (response.status === 200) {
        fetchProducts();
        toast.success(response.data.message || "Product stock updated");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="px-4 sm:px-8 py-10 m-4 min-h-[95vh] bg-primary text-tertiary overflow-x-auto w-full lg:w-4/5 rounded-2xl shadow-lg">
      {/* Header Row */}
      <div className="grid grid-cols-[80px_3fr_1fr_1fr_1fr] items-center bg-white text-tertiary py-3 px-4 rounded-md font-semibold text-sm uppercase tracking-wide ring-1 ring-slate-900/10 min-w-[700px]">
        <p>Image</p>
        <p className="pl-12">Product Name</p>
        <p className="pl-20">Category</p>
        <p className="text-right">Price</p>
        <p className="text-center">In Stock</p>
      </div>

      {/* Product Rows */}
      <div className="mt-3 space-y-3 min-w-[700px]">
        {productList && productList.length > 0 ? (
          productList.map((product, index) => (
            <div
              key={product._id || index}
              className="grid grid-cols-[80px_3fr_1fr_1fr_1fr] items-center bg-white rounded-md p-3 shadow-sm hover:shadow-md transition-all duration-200 ring-1 ring-slate-900/5"
            >
              {/* Image */}
              <div className="flex justify-center">
                <img
                  src={product.image?.[0] || product.images?.[0]}
                  alt={product.name}
                  className="w-14 h-14 object-cover rounded-md border border-gray-200"
                />
              </div>

              {/* Product Name */}
              <h5 className="text-gray-800 font-medium truncate px-2 pl-12">
                {product.name}
              </h5>

              {/* Category */}
              <p className="capitalize font-semibold text-gray-600 pl-20">
                {product.category}
              </p>

              {/* Price */}
              <div className="text-gray-700 font-semibold text-right">
                {currency}
                {product.offerPrice}
              </div>

              {/* In Stock Toggle */}
              <div className="flex justify-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked={product.inStock}
                    onChange={() =>
                      toggleInStock(product._id, !product.inStock)
                    }
                  />
                  <div className="w-10 h-6 rounded-full transition-colors duration-300 bg-gray-300 peer peer-checked:bg-green-500"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-4"></div>
                </label>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center mt-10">
            No products available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
