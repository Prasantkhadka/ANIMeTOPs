import React, { useState, useContext } from "react";
import upload_icon from "../../assets/upload_icon.png";
import { ShopContext } from "../../context/ShopContext.jsx";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("10");
  const [offerPrice, setOfferPrice] = useState("10");
  const [category, setCategory] = useState("T-Shirts");
  const [popular, setPopular] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [files, setFiles] = useState([]);

  const { axios } = useContext(ShopContext);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name,
        description,
        price,
        offerPrice,
        category,
        popular,
        sizes,
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }
      const response = await axios.post("/api/product/add-product", formData);
      if (response.status === 201) {
        toast.success(response.data.message || "Product added successfully");
        // Reset form
        setName("");
        setDescription("");
        setPrice("10");
        setOfferPrice("10");
        setCategory("T-Shirts");
        setPopular(false);
        setSizes([]);
        setFiles([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="px-6 sm:px-10 py-10 m-4 min-h-[90vh] bg-primary text-tertiary overflow-y-auto w-full lg:w-4/5 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 border-b border-slate-700/20 pb-3">
        Add New Product
      </h2>

      <form onSubmit={onSubmitHandler} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="h5 block mb-2">Product Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter product name"
            value={name}
            className="w-full max-w-xl px-3 py-2 rounded-md bg-white text-gray-800 ring-1 ring-slate-900/10 focus:ring-2 focus:ring-tertiary focus:outline-none"
            required
          />
        </div>

        {/* Product Description */}
        <div>
          <label className="h5 block mb-2">Product Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            value={description}
            rows={5}
            className="w-full max-w-xl px-3 py-2 rounded-md bg-white text-gray-800 ring-1 ring-slate-900/10 focus:ring-2 focus:ring-tertiary focus:outline-none"
            required
          />
        </div>

        {/* Category & Prices */}
        <div className="flex flex-col md:flex-row gap-6">
          <div>
            <label className="h5 block mb-2">Category</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="px-3 py-2 rounded-md bg-white text-gray-800 ring-1 ring-slate-900/10 focus:ring-2 focus:ring-tertiary focus:outline-none"
            >
              <option value="T-Shirts">T-Shirts</option>
              <option value="Hoodies">Hoodies</option>
              <option value="Sweatshirts">Sweatshirts</option>
              <option value="Jackets">Jackets</option>
              <option value="Shorts">Shorts</option>
            </select>
          </div>

          <div>
            <label className="h5 block mb-2">Product Price ($)</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Enter price"
              value={price}
              className="px-3 py-2 rounded-md bg-white text-gray-800 ring-1 ring-slate-900/10 focus:ring-2 focus:ring-tertiary focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="h5 block mb-2">Offer Price ($)</label>
            <input
              onChange={(e) => setOfferPrice(e.target.value)}
              type="number"
              placeholder="Enter offer price"
              value={offerPrice}
              className="px-3 py-2 rounded-md bg-white text-gray-800 ring-1 ring-slate-900/10 focus:ring-2 focus:ring-tertiary focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Product Sizes */}
        <div>
          <h5 className="h5 mb-3">Product Sizes</h5>
          <div className="flex flex-wrap gap-3">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <span
                key={size}
                onClick={() => {
                  if (sizes.includes(size)) {
                    setSizes(sizes.filter((s) => s !== size));
                  } else {
                    setSizes([...sizes, size]);
                  }
                }}
                className={`${
                  sizes.includes(size)
                    ? "bg-tertiary text-white shadow-md"
                    : "bg-white text-gray-700"
                } rounded-md ring-1 ring-slate-900/5 py-1.5 px-4 cursor-pointer text-sm font-medium transition duration-200 hover:bg-tertiary hover:text-white`}
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        {/* Upload Images */}
        <div>
          <h5 className="h5 mb-3">Product Images</h5>
          <div className="flex flex-wrap gap-3">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label
                  key={index}
                  htmlFor={`images${index}`}
                  className="rounded-lg overflow-hidden border border-slate-900/10 bg-white cursor-pointer hover:ring-2 hover:ring-tertiary transition"
                >
                  <input
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
                    type="file"
                    id={`images${index}`}
                    className="hidden"
                  />
                  <img
                    src={
                      files[index]
                        ? URL.createObjectURL(files[index])
                        : upload_icon
                    }
                    alt="upload area"
                    width={70}
                    height={70}
                    className="object-cover"
                  />
                </label>
              ))}
          </div>
        </div>

        {/* Popular Checkbox */}
        <div className="flex items-center gap-3 pt-3">
          <input
            onChange={() => setPopular((prev) => !prev)}
            type="checkbox"
            checked={popular}
            id="popular"
            className="w-4 h-4 accent-tertiary cursor-pointer"
          />
          <label htmlFor="popular" className="cursor-pointer text-sm">
            Add to Popular
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-dark mt-6 max-w-44 sm:w-full rounded-md py-2 px-4 text-sm font-semibold"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
