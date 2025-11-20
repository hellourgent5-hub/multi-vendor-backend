import express from "express";
import Vendor from "../models/Vendor.js";
// import bcrypt from "bcrypt"; // Required for hashing
// import jwt from "jsonwebtoken"; // Required for token generation

const router = express.Router();

// 1. Vendor Registration (Sign Up)
router.post("/register", async (req, res) => {
    try {
        const { username, email, password, shopName } = req.body;

        // Add validation checks here (e.g., if fields are empty)

        // TODO: 
        // 1. Check if vendor already exists by email/username.
        // 2. Hash the password using bcrypt.

        const newVendor = new Vendor({
            username,
            email,
            password, // IMPORTANT: Must be hashed before saving!
            shopName
        });

        await newVendor.save();
        
        // TODO: 
        // 3. Generate a JWT token for immediate login.

        res.status(201).json({ message: "Vendor registered successfully. Awaiting approval.", vendor: newVendor });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Vendor Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // TODO:
        // 1. Find the vendor by email.
        // 2. Compare the provided password with the hashed password (using bcrypt.compare).
        // 3. If credentials are valid, generate and return a JWT token.
        // 4. Check if 'isApproved' is true before allowing access.

        res.status(501).json({ message: "Login logic is pending implementation." }); 

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
