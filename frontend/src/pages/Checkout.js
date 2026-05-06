import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * (item.quantity || 1);
  }, 0);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    if (!address.name || !address.phone || !address.address) {
      alert("Please fill shipping details");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const orderRes = await axios.post(
        "http://localhost:5000/api/orders",
        {
          items: cart.map((item) => ({
            product: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1,
          })),
          totalAmount: totalPrice,
          shippingAddress: address,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const { razorpayOrder } = orderRes.data;

      const options = {
        key: "rzp_test_SlfYhO5IWZPeu7",
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "ShopNow",
        description: "Thank you for shopping!",
        order_id: razorpayOrder.id,
        handler: function (response) {
          alert(
            `✅ Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`,
          );
          clearCart();
          navigate("/my-orders");
        },
        prefill: {
          name: address.name,
          email: "customer@shopnow.com",
          contact: address.phone,
        },
        theme: { color: "#3b82f6" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert(
        "Payment failed: " + (error.response?.data?.message || error.message),
      );
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Shipping Details */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Shipping Address</h2>
          <div className="bg-white p-8 rounded-2xl shadow">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full p-3 border rounded-xl mb-4"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full p-3 border rounded-xl mb-4"
              required
            />
            <textarea
              name="address"
              placeholder="Full Address"
              onChange={handleChange}
              className="w-full p-3 border rounded-xl mb-4 h-24"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
                required
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
                required
              />
            </div>
          </div>
        </div>

        {/* Order Summary + Pay Button */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
          <div className="bg-white p-8 rounded-2xl shadow">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between py-4 border-b last:border-none"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity || 1}
                  </p>
                </div>
                <p className="font-semibold">
                  ₹{item.price * (item.quantity || 1)}
                </p>
              </div>
            ))}

            <div className="pt-6 mt-4 border-t flex justify-between text-3xl font-bold">
              <span>Total</span>
              <span className="text-green-600">₹{totalPrice}</span>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full mt-8 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-5 rounded-2xl text-xl font-semibold"
            >
              {loading
                ? "Processing..."
                : `Pay ₹${totalPrice} Securely with Razorpay`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
