const express = require('express');
const router = express.Router(); // <--- FIX: Initialize router here!
const { body } = require('express-validator');

// Assuming authMiddleware is required for protect/permit
const { protect, permit } = require('../middleware/authMiddleware'); 

// Assuming vendorController has the correct exports
const { registerVendor, loginVendor, listVendors } = require('../controllers/vendorController'); 


// @route   POST /api/vendors/register
// @desc    Register a new vendor
// @access  Public
router.post('/register',
    // Input validation checks
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('shopName').notEmpty().withMessage('Shop Name is required'),
    registerVendor
);

// @route   POST /api/vendors/login
// @desc    Authenticate vendor & get token
// @access  Public
router.post('/login', loginVendor);

// @route   GET /api/vendors/listVendors
// @desc    Get all vendors (Admin only)
// @access  Private/Admin
// NOTE: Temporarily commented out to prevent startup crash related to middleware loading
// router.get('/listVendors', protect, permit('admin'), listVendors); 


module.exports = router;
