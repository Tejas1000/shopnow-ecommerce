import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        // Sirf pehle 8 products featured mein dikhao
        setFeaturedProducts(data.slice(0, 8));
      })
      .catch((err) => console.error(err));
  }, []);

  const StarRating = ({ rating = 4.5 }) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-xl ${star <= Math.floor(rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold mb-4 dark:text-white">
          Welcome to ShopNow
        </h1>
        <p className="text-2xl text-gray-600 dark:text-gray-400">
          Best Deals on Premium Products
        </p>
        <Link
          to="/products"
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl text-lg font-medium transition"
        >
          Shop Now
        </Link>
      </div>

      {/* Featured Products */}
      <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {featuredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow overflow-hidden flex flex-col h-full"
          >
            <div className="h-64 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              {product.images?.[0] ? (
                <img
                  src={`http://localhost:5000${product.images[0]}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-7xl">🛍️</span>
              )}
            </div>

            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-bold text-xl mb-2 dark:text-white line-clamp-2">
                {product.name}
              </h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                ₹{product.price}
              </p>

              <div className="my-3">
                <StarRating />
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed flex-1 line-clamp-3">
                {product.description}
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl font-medium transition"
                >
                  Add to Cart
                </button>
                <Link
                  to="/products"
                  className="flex-1 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 py-3.5 rounded-2xl font-medium text-center transition dark:text-white"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/products"
          className="inline-block bg-gray-900 dark:bg-white dark:text-gray-900 text-white px-10 py-4 rounded-2xl font-medium hover:bg-gray-800 transition"
        >
          View All Products →
        </Link>
      </div>
    </div>
  );
};

export default Home;
