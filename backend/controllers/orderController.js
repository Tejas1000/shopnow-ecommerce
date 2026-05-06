const Order = require("../models/Order");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create New Order
const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;
    const userId = req.user.id;

    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `order_${Date.now()}`,
    });

    const order = await Order.create({
      user: userId,
      items,
      totalAmount,
      shippingAddress,
      razorpayOrderId: razorpayOrder.id,
      status: "Pending",
    });

    res.status(201).json({ success: true, order, razorpayOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get My Orders
const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel Order
const cancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const order = await Order.findOne({ _id: req.params.id, user: userId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "Delivered" || order.status === "Cancelled") {
      return res.status(400).json({ message: "Cannot cancel this order" });
    }

    order.status = "Cancelled";
    await order.save();

    res.json({ success: true, message: "Order cancelled successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getMyOrders, cancelOrder };
