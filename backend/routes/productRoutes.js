const express = require('express');
const { createProduct, getProducts } = require('../controllers/productController');
const protect = require('../middlewares/authMiddleware');
const roleCheck = require('../middlewares/roleMiddleware');
const Product = require('../models/Product'); // Import your Product model
const router = express.Router();

// Existing routes for creating and getting products
router
  .route('/')
  .post(protect, roleCheck(['admin', 'user']), createProduct)
  .get(protect, getProducts);

// New route for purchasing a product
router.post('/buy', protect, roleCheck(['user']), async (req, res) => {
  const { productId } = req.body;

  try {
    // Find the product by ID
    const product = await Product.findById(productId);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Implement your purchase logic here (e.g., deduct from inventory, create an order)
    // For example, you could reduce the product stock:
    // if (product.stock <= 0) {
    //   return res.status(400).json({ message: 'Product out of stock' });
    // }
    // product.stock -= 1; // Reduce stock
    // await product.save(); // Save changes to the product

    // Respond with a success message
    res.status(200).json({ message: 'Product purchased successfully', name: product.name });
  } catch (error) {
    console.error('Error processing purchase:', error);
    res.status(500).json({ message: 'Error processing purchase', error: error.message });
  }
});

module.exports = router;
