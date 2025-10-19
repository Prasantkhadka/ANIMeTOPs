import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ containerStyle, setMenuOpened }) => {
  const navLinks = [
    { path: "/", title: "Home" },
    { path: "/collection", title: "Collection" },
    { path: "/testimonials", title: "Testimonials" },
    { path: "/contact", title: "Contact" },
  ];
  return (
    <nav className={`${containerStyle}`}>
      {navLinks.map((link) => (
        <NavLink
          key={link.title}
          to={link.path}
          onClick={() => {
            setMenuOpened(false);
          }}
          className={({ isActive }) =>
            `${
              isActive ? "active-link" : ""
            } px-3 py-2 rounded-full uppercase text-sm font-bold`
          }
        >
          {link.title}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
