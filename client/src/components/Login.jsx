import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-hot-toast";

const Login = () => {
  const { setShowUserLogin, axios, fetchUserData, navigate } =
    useContext(ShopContext);
  const [mode, setMode] = useState("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `/api/user/${mode}`,
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      if (response.status === 200 || response.status === 201) {
        const { user, success } = response.data;
        if (user && success) {
          await fetchUserData();
        }
        toast.success(
          mode === "signup"
            ? "Account created successfully"
            : "Signed in successfully"
        );

        navigate("/");
        setShowUserLogin(false);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong");
      } else {
        toast.error("Network error");
      }
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmitHandler}
        className="relative flex flex-col w-full max-w-md rounded-xl shadow-2xl border border-gray-300 bg-white"
      >
        {/* Close Icon */}
        <button
          type="button"
          onClick={() => setShowUserLogin(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <AiOutlineClose size={22} />
        </button>

        {/* Header */}
        <div className="text-center p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 capitalize">
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </h3>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4 p-6">
          {mode === "signup" && (
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
              />
            </div>
          )}

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
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
            />
          </div>

          {/* Toggle between Sign In / Sign Up */}
          <div className="text-center mt-2">
            <p className="text-gray-600">
              {mode === "signup"
                ? "Already have an account?"
                : "Don't have an account?"}
              <span
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="ml-1 text-secondary font-semibold cursor-pointer hover:underline transition-all"
              >
                {mode === "signup" ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full btn-dark text-white py-3 px-4 rounded-lg font-semibold hover:bg-black/80 transition-colors mt-4"
          >
            {mode === "signup" ? "Create Account" : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
