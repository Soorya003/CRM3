const express = require('express');
const { createFeedback, getFeedbacks } = require('../controllers/feedbackController');
const protect = require('../middlewares/authMiddleware');
const router = express.Router();

router
  .route('/')
  .post(protect, createFeedback)
  .get(protect, getFeedbacks);

module.exports = router;