const express = require('express');
const { getReports, createReport, updateReport, deleteReport } = require('../controllers/reportController');
const protect = require('../middlewares/authMiddleware'); // Ensure this path is correct
const router = express.Router();

// Define routes
router.route('/')
  .get(protect, getReports)        // Ensure getReports is defined
  .post(protect, createReport);    // Ensure createReport is defined

router.route('/:id')
  .put(protect, updateReport)      // Ensure updateReport is defined
  .delete(protect, deleteReport);  // Ensure deleteReport is defined

module.exports = router;
