const express = require('express');
const { createComplaint, getComplaints, updateComplaintStatus } = require('../controllers/complaintController');
const protect = require('../middlewares/authMiddleware');
const router = express.Router();

router
  .route('/')
  .post(protect, createComplaint)
  .get(protect, getComplaints);

router
  .route('/:complaintId')
  .put(protect, updateComplaintStatus);

module.exports = router;
