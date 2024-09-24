const roleCheck = (roles) => {
  return (req, res, next) => {
    console.log('User role:', req.user.role); // Log role for debugging
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

module.exports = roleCheck;
