const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Vendor = require('../models/Vendor');

const protect = async (req, res, next) => {
  let token;
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // attempt to find user in each collection
      let user = await User.findById(decoded.id).select('-password');
      if (!user) user = await Vendor.findById(decoded.id).select('-password');
      if (!user) return res.status(401).json({ message: 'Not authorized' });
      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: 'No token' });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token invalid' });
  }
};

const permit = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Not authorized' });
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  next();
};

module.exports = { protect, permit };
