import React from "react";
import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import { FaSearch, FaShoppingBasket } from "react-icons/fa";
import { FaBars, FaBarsStaggered } from "react-icons/fa6";
import userImg from "../assets/user.png";
import { RiUserLine } from "react-icons/ri";
import { ShopContext } from "../context/ShopContext.jsx";

const Header = () => {
  const {
    user,
    setUser,
    navigate,
    searchQuery,
    setSearchQuery,
    setShowUserLogin,
    getCartCount,
    handleLogout,
  } = useContext(ShopContext);
  const [menuOpened, setMenuOpened] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isOncollectionPage = location.pathname.endsWith("/collection");

  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };

  useEffect(() => {
    if (searchQuery.length > 0 && !isOncollectionPage) {
      navigate("/collection");
    }
  }, [searchQuery]);

  return (
    <header
      className={`${
        !isHomePage && "bg-gradient-to-l from-primary via-white to-primary"
      } absolute top-0 left-0 right-0 max-padd-container flexBetween py-2`}
    >
      <Link to={"/"} className="bold-22 font-paci">
        ANIMeTops<span className="text-secondary bold-28">.</span>
      </Link>
      {/* Navbar */}
      <Navbar
        setMenuOpened={setMenuOpened}
        containerStyle={`${
          menuOpened
            ? "flex items-start flex-col gap-y-8 fixed top-16 right-6 p-5 bg-white shadow-md w-52 ring-1 ring-slate-900/5 z-50"
            : "hidden lg:flex gap-x-5 xl:gap-x-1 medium-15 p-1"
        } `}
      />
      <div className="flex gap-8 items-center">
        <div className="relative hidden xl:flex">
          <div
            className={`${
              showSearch
                ? "flex roundered-full bg-white w-[333px] p-3.5 pl-6"
                : "hidden"
            } ${!isHomePage && "bg-primary"}`}
          >
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Type here..."
              className="bg-transparent w-full outline-none text-[14px]"
            />
          </div>
          <div
            onClick={() => setShowSearch(!showSearch)}
            className={`cursor-pointer bg-tertiary text-white rounded-full p-2.5 text-sm m-1 ${
              showSearch ? "absolute top-0 right-0" : ""
            }`}
          >
            <FaSearch className="text-xl" />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-2 xs:gap-x-8">
          {/* Menu Toggle */}
          <>
            {menuOpened ? (
              <FaBarsStaggered
                onClick={toggleMenu}
                className="lg:hidden text-xl cursor-pointer"
              />
            ) : (
              <FaBars
                onClick={toggleMenu}
                className="lg:hidden text-xl cursor-pointer"
              />
            )}
          </>
          {/* Shopping Cart */}
          <div
            onClick={() => navigate("/cart")}
            className="flex gap-2 items-center cursor-pointer p-2 rounded-full bg-white relative"
          >
            <FaShoppingBasket size={27} />
            <label className="absolute bottom-8 -right-2 text-xs font-bold">
              {getCartCount()}
            </label>
          </div>
          {/* User Profile */}
          <div className="group relative ">
            <div>
              {user ? (
                <div className="flex gap-2 items-center rounded-full bg-white cursor-pointer">
                  <img src={userImg} alt="" height={44} width={44} />
                </div>
              ) : (
                <button
                  className="btn-dark flexCenter gap-x-2 rounded-full"
                  onClick={() => setShowUserLogin(true)}
                >
                  Login
                  <RiUserLine className="text-xl" />
                </button>
              )}
            </div>
            {/* DropDown Menu */}
            {user && (
              <ul className="bg-white p-2 w-32 ring-1 ring-slate-900/5 rounded absolute right-0 top-7 hidden group-hover:flex flex-col medium-14 shadow-md z-50">
                <li
                  onClick={() => navigate("/my-orders")}
                  className="p-2 text-tertiary rounded-md hover:bg-primary cursor-pointer"
                >
                  Orders
                </li>
                <li
                  onClick={handleLogout}
                  className="p-2 text-tertiary rounded-md hover:bg-primary cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
