const jwt = require('jsonwebtoken');

// Assuming you have the user data with the role
const generateToken = (user) => {
  console.log("generatetoken :",{ id: user._id, role: user.role })
  return jwt.sign(
    { id: user._id, role: user.role }, // Include role here
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

module.exports = generateToken;