import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to see your orders");
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/orders/myorders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      alert("Order Cancelled Successfully!");
      fetchOrders();
    } catch (error) {
      alert("Failed to cancel order");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-2xl dark:text-white">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-10 text-gray-900 dark:text-white">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-600 dark:text-gray-400">
            No orders yet
          </p>
          <button
            onClick={() => navigate("/products")}
            className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-xl"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow p-8"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="font-semibold text-lg text-gray-900 dark:text-white">
                    Order ID: {order._id}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div
                  className={`px-5 py-2 rounded-full text-sm font-medium
                  ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : order.status === "Cancelled"
                        ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                  }`}
                >
                  {order.status}
                </div>
              </div>

              <div className="border-t dark:border-gray-700 pt-6">
                <p className="font-medium mb-4 text-gray-900 dark:text-white">
                  Items:
                </p>
                <ul className="space-y-2">
                  {order.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex justify-between text-gray-700 dark:text-gray-300"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t dark:border-gray-700 flex justify-between items-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  Total:{" "}
                  <span className="text-green-600">₹{order.totalAmount}</span>
                </div>

                {order.status === "Pending" && (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-700"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
