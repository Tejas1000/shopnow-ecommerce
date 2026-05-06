import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { cart } = useCart();
  const { searchTerm, setSearchTerm } = useSearch();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user.role === "admin";
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (window.location.pathname !== "/products") {
      navigate(`/products?search=${e.target.value}`);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 dark:text-blue-400"
          >
            ShopNow
          </Link>

          {/* Global Search */}
          <div className="flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-5 py-2.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="flex items-center gap-6 text-lg">
            <Link
              to="/"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Products
            </Link>

            <Link
              to="/cart"
              className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 relative"
            >
              Cart 🛒
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>

            {isLoggedIn && (
              <Link
                to="/my-orders"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                My Orders
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/admin"
                className="text-orange-600 dark:text-orange-400 font-semibold hover:text-orange-700"
              >
                Admin Panel
              </Link>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="text-2xl hover:scale-110 transition"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="hover:text-red-600 dark:hover:text-red-400 font-medium"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
