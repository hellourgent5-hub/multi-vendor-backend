const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerVendor, loginVendor, listVendors } = require('../controllers/vendorController');
// 💡 CHANGE: Imported 'permit' instead of 'adminOnly'
const { protect, permit } = require('../middlewares/authMiddleware'); 

router.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('shopName').notEmpty()
], registerVendor);

router.post('/login', loginVendor);

// 💡 FIX: The route now uses protect and calls the permit function with the 'admin' role.
// This call (permit('admin')) returns the actual middleware function.
router.get('/', protect, permit('admin'), listVendors); 

module.exports = router;
