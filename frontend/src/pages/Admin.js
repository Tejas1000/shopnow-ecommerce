import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token || user.role !== "admin") {
      alert("Access Denied! Admin only.");
      navigate("/login");
      return;
    }
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    if (image) data.append("image", image);

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/products/${editingId}`,
          data,
        );
        alert("Product Updated Successfully!");
      } else {
        await axios.post("http://localhost:5000/api/products", data);
        alert("Product Added Successfully!");
      }

      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
      });
      setImage(null);
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
    });
    setEditingId(product._id);
    setImage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        alert("Product Deleted!");
        fetchProducts();
      } catch (error) {
        alert("Error deleting product");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
        🛠️ Admin Panel
      </h1>

      {/* Add/Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg mb-12"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          {editingId ? "Edit Product" : "Add New Product"}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl mb-4 h-32 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={formData.stock}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl mb-6 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-3 border rounded-xl mb-6 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-green-700"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Products List */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        All Products ({products.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow"
          >
            {product.images && product.images[0] && (
              <img
                src={`http://localhost:5000${product.images[0]}`}
                alt={product.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
            )}
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              {product.name}
            </h3>
            <p className="text-green-600 dark:text-green-400 text-xl font-semibold">
              ₹{product.price}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {product.description}
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleEdit(product)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="flex-1 bg-red-600 text-white py-2 rounded-xl hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
