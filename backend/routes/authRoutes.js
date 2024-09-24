const express = require('express');
const { loginUser, registerUser } = require('../controllers/authController');
const router = express.Router();

router.post('/login', loginUser); // This should match your request
router.post('/register', registerUser);

module.exports = router;