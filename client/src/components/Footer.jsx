import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-[#f5f5f5] pt-16 pb-10 px-6 md:px-16 w-full mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold mb-3 text-white">AnimeTops</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Explore premium anime-inspired streetwear. From iconic hoodies to
            graphic tees — wear your fandom with pride and style.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="/" className="hover:text-secondary transition">
                Home
              </a>
            </li>
            <li>
              <a href="/collection" className="hover:text-secondary transition">
                Collections
              </a>
            </li>
            <li>
              <a href="/blogs" className="hover:text-secondary transition">
                Blogs
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-secondary transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Categories</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Anime Hoodies</li>
            <li>Graphic T-Shirts</li>
            <li>Sweatshirts</li>
            <li>Bomber Jackets</li>
            <li>Shorts</li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Follow Us</h3>
          <div className="flex gap-4 mb-5">
            <a
              href="#"
              className="text-gray-400 hover:text-secondary transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-secondary transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-secondary transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-secondary transition"
            >
              <FaTiktok />
            </a>
          </div>
          <form className="flex bg-white rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Subscribe for updates"
              className="px-4 py-2 w-full text-sm text-tertiary outline-none"
            />
            <button className="bg-secondary text-white px-4 py-2 text-sm hover:bg-tertiary transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} AnimeTops. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
