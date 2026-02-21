const jwt = require('jsonwebtoken');

// Generate JWT token
exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Send token response
exports.sendTokenResponse = (user, statusCode, res) => {
  const token = this.generateToken(user._id || user.id);

  const userResponse = {
    id: user._id || user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };

  res.status(statusCode).json({
    success: true,
    token,
    user: userResponse
  });
};
