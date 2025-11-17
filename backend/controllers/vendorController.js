const Vendor = require('../models/Vendor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Vendor registration
const registerVendor = async (req, res) => {
  const { name, email, password, shopName } = req.body;
  const existing = await Vendor.findOne({ email });
  if(existing) return res.status(400).json({ message: 'Vendor already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const vendor = await Vendor.create({ name, email, password: hashedPassword, shopName });
  
  const token = jwt.sign({ id: vendor._id, role: vendor.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.json({ vendor, token });
};

// Vendor login
const loginVendor = async (req, res) => {
  const { email, password } = req.body;
  const vendor = await Vendor.findOne({ email });
  if(!vendor) return res.status(400).json({ message:'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, vendor.password);
  if(!isMatch) return res.status(400).json({ message:'Invalid credentials' });

  const token = jwt.sign({ id: vendor._id, role: vendor.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.json({ vendor, token });
};

module.exports = { registerVendor, loginVendor };

