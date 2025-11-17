const Order = require('../models/Order');

// Create order
const createOrder = async (req, res) => {
  const { vendor, products, totalPrice } = req.body;
  const order = await Order.create({
    customer: req.user.id,
    vendor,
    products,
    totalPrice
  });
  res.json(order);
};

// Get customer orders
const getOrders = async (req, res) => {
  const orders = await Order.find({ customer: req.user.id }).populate('products.product vendor','name shopName');
  res.json(orders);
};

module.exports = { createOrder, getOrders };

