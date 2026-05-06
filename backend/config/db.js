const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("⏳ MongoDB Connecting...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    // process.exit(1);   ← isko comment kar diya hai abhi ke liye
  }
};

module.exports = connectDB;
