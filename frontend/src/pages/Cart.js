import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
  } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-3xl font-semibold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Kuch products add karo</p>
        <Link
          to="/products"
          className="bg-blue-600 text-white px-10 py-4 rounded-2xl text-lg hover:bg-blue-700"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Your Cart ({cart.length})</h1>
        <button
          onClick={clearCart}
          className="text-red-500 hover:text-red-700 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow p-8">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between py-6 border-b last:border-none"
          >
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center text-5xl">
                🛍️
              </div>
              <div>
                <h3 className="font-bold text-xl">{item.name}</h3>
                <p className="text-green-600 text-2xl font-semibold">
                  ₹{item.price}
                </p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => decreaseQuantity(item._id)}
                className="w-10 h-10 border rounded-lg hover:bg-gray-100"
              >
                −
              </button>
              <span className="font-semibold w-8 text-center">
                {item.quantity || 1}
              </span>
              <button
                onClick={() => increaseQuantity(item._id)}
                className="w-10 h-10 border rounded-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-6">
              <p className="font-bold text-xl">
                ₹{item.price * (item.quantity || 1)}
              </p>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {/* Total & Checkout */}
        <div className="mt-10 border-t pt-8">
          <div className="flex justify-between items-center text-3xl font-bold">
            <span>Total Amount</span>
            <span className="text-green-600">₹{totalPrice}</span>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={clearCart}
              className="flex-1 py-4 border border-red-500 text-red-500 rounded-2xl hover:bg-red-50 font-medium"
            >
              Clear Cart
            </button>

            <button
              onClick={() => navigate("/checkout")}
              className="flex-1 py-4 bg-green-600 text-white rounded-2xl hover:bg-green-700 text-xl font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
