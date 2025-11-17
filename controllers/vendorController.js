// --- Imports and Helper Functions ---

// Assuming you have a Vendor model
const Vendor = require('../models/Vendor'); 
// Assuming you use JWT for tokens
const jwt = require('jsonwebtoken'); 
// Assuming you use express-validator 
const { validationResult } = require('express-validator');
// Assuming you have a function to generate a token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};


// --- Controller Functions ---

const registerVendor = async (req, res) => {
    // 1. Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, shopName } = req.body;

    try {
        // 2. Check if vendor already exists
        const exists = await Vendor.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: 'Vendor already exists' });
        }

        // 3. Create the new vendor
        const vendor = await Vendor.create({ name, email, password, shopName, role: 'vendor' });

        // 4. Generate token and send response
        if (vendor) {
            const token = generateToken(vendor.id, vendor.role);
            res.status(201).json({
                token,
                id: vendor.id,
                email: vendor.email,
                shopName: vendor.shopName,
                role: vendor.role
            });
        } else {
            res.status(400).json({ message: 'Invalid vendor data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};


const loginVendor = async (req, res) => {
    const { email, password } = req.body;

    try {
        const vendor = await Vendor.findOne({ email });

        // Check password using Mongoose model method (assuming your model has matchPassword)
        if (vendor && (await vendor.matchPassword(password))) {
            const token = generateToken(vendor.id, vendor.role);
            res.json({
                token,
                id: vendor.id,
                email: vendor.email,
                shopName: vendor.shopName,
                role: vendor.role
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login' });
    }
};


const listVendors = async (req, res) => {
    try {
        // Find all vendors but exclude the password field
        const vendors = await Vendor.find({}).select('-password');
        res.json(vendors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error listing vendors' });
    }
};


// --- Exports ---
module.exports = {
    registerVendor,
    loginVendor,
    listVendors
};
