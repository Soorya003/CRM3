const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const Product = require('../models/Product');
const Feedback = require('../models/Feedback');
const Order = require('../models/Order');
const Report = require('../models/Report');

// Get all complaints
router.get('/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('user product');
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update complaint status
router.put('/complaints/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all feedback
router.get('/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('user');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all reports
router.get('/reports', async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
