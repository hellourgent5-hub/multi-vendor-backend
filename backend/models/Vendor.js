const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  shopName: { type: String, required: true },
  role: { type: String, default: 'vendor' }
}, { timestamps: true });

module.exports = mongoose.model('Vendor', vendorSchema);

