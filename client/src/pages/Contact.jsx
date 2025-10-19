import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";

const Contact = () => {
  return (
    <section className="bg-primary min-h-screen pt-28 pb-16">
      <div className="max-padd-container">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-tertiary mb-4">
            Get in <span className="text-secondary">Touch</span>
          </h2>
          <p className="text-gray-50 max-w-2xl mx-auto">
            Have questions or want to collaborate? Reach out to us — we’d love
            to hear from you! Whether it’s about your order, anime collections,
            or partnership ideas, we’re just a message away.
          </p>
        </div>

        {/* Contact Section */}
        <div className="grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Contact Info */}
          <div className="bg-tertiary text-white flex flex-col justify-center gap-6 p-10">
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
            <p className="text-gray-300">
              We’re open to your feedback and questions. Let’s make your anime
              fashion journey even better!
            </p>

            <div className="flex items-center gap-3">
              <FiMail className="w-5 h-5 text-secondary" />
              <p>support@animetops.com</p>
            </div>
            <div className="flex items-center gap-3">
              <FiPhone className="w-5 h-5 text-secondary" />
              <p>+61 400 123 456</p>
            </div>
            <div className="flex items-center gap-3">
              <FiMapPin className="w-5 h-5 text-secondary" />
              <p>Melbourne, Australia</p>
            </div>

            {/* Socials */}
            <div className="flex gap-5 mt-6">
              <a
                href="#"
                className="hover:text-secondary transition-all duration-200"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="hover:text-secondary transition-all duration-200"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="hover:text-secondary transition-all duration-200"
              >
                <FaXTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form className="p-10 flex flex-col gap-6">
            <div>
              <label className="block mb-2 font-semibold text-tertiary">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-tertiary">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-tertiary">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn-dark w-full sm:w-auto px-8 py-3 rounded-lg text-white bg-tertiary hover:bg-secondary transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
