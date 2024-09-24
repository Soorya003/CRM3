const express = require('express');
const {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customerController');
const protect = require('../middlewares/authMiddleware');
const roleCheck = require('../middlewares/roleMiddleware');
const router = express.Router();

router
  .route('/')
  .post(protect, roleCheck(['admin', 'manager']), createCustomer)
  .get(protect, getCustomers);

router
  .route('/:id')
  .put(protect, roleCheck(['admin', 'manager']), updateCustomer)
  .delete(protect, roleCheck(['admin']), deleteCustomer);

module.exports = router;
