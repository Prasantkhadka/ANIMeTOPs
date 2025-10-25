import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext.jsx";
import { toast } from "react-hot-toast";

const AdminLogin = () => {
  const { isAdmin, setIsAdmin, navigate, axios } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/admin/signin", {
        email,
        password,
      });
      if (response.data.success) {
        setIsAdmin(true);
        navigate("/admin");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin, navigate]);

  return (
    !isAdmin && (
      <div className="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center text-sm text-[80%]">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
        >
          {/* Header */}
          <div className="text-center p-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 capitalize">
              Admin Sign In
            </h3>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full btn-dark text-white py-3 px-4 rounded-lg font-semibold hover:bg-black/80 transition-colors mt-4"
          >
            Sign In
          </button>
        </form>
      </div>
    )
  );
};

export default AdminLogin;
