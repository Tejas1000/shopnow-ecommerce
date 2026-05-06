import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">ShopNow</h2>
            <p className="text-gray-400 leading-relaxed">
              Your trusted online store for premium products. Quality you can
              trust, prices you'll love.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="hover:text-white transition">
                📘
              </a>
              <a href="#" className="hover:text-white transition">
                🐦
              </a>
              <a href="#" className="hover:text-white transition">
                📷
              </a>
              <a href="#" className="hover:text-white transition">
                💼
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/my-orders" className="hover:text-white transition">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white transition">
                  Phone
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Cloth
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Mobile
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Electronics
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li>📍 Shirdi, Maharashtra</li>
              <li>📞 +91 98765 43210</li>
              <li>✉️ support@shopnow.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          © 2026 ShopNow. All Rights Reserved. | Made with ❤️ for Portfolio
        </div>
      </div>
    </footer>
  );
};

export default Footer;
