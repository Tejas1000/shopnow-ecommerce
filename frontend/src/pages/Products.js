import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(1000);
  const [maxPrice, setMaxPrice] = useState(100000);

  const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Total Products:", data.length);
        console.log(
          "📋 All Categories in DB:",
          data.map((p) => p.category),
        );
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "All" ||
      (product.category &&
        product.category
          .toLowerCase()
          .includes(selectedCategory.toLowerCase()));

    const priceMatch = product.price >= minPrice && product.price <= maxPrice;

    return categoryMatch && priceMatch;
  });

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  console.log("Dropdown Categories:", categories);

  if (loading)
    return (
      <div className="text-center py-32 text-3xl dark:text-white">
        Loading products...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold text-center mb-8 dark:text-white">
        Our Products ({filteredProducts.length})
      </h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white text-lg"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 dark:text-gray-300">
              Price: ₹{minPrice.toLocaleString()} - ₹{maxPrice.toLocaleString()}
            </label>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-600 -mt-2"
            />
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedCategory("All");
            setMinPrice(1000);
            setMaxPrice(100000);
          }}
          className="mt-6 w-full py-3 bg-gray-200 dark:bg-gray-700 rounded-2xl hover:bg-gray-300"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
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
              <h3 className="font-bold text-xl mb-2 dark:text-white">
                {product.name}
              </h3>
              <p className="text-3xl font-bold text-green-600">
                ₹{product.price}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {product.category}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-3 flex-1 line-clamp-4">
                {product.description}
              </p>

              <button
                onClick={() => addToCart(product)}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl font-medium"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
