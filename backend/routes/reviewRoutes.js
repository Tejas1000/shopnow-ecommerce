const express = require("express");
const router = express.Router();
const {
  addReview,
  getProductReviews,
} = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

// Routes
router.post("/", protect, addReview); // Add Review (Login required)
router.get("/:productId", getProductReviews); // Get Reviews for a product

module.exports = router;
