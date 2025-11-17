const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerUser, loginUser, registerVendor, loginVendor, registerAgent, loginAgent } = require('../controllers/authController');

router.post('/user/register', [ body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 }) ], registerUser);
router.post('/user/login', loginUser);

router.post('/vendor/register', [ body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 }), body('shopName').notEmpty() ], registerVendor);
router.post('/vendor/login', loginVendor);

router.post('/agent/register', [ body('name').notEmpty(), body('password').isLength({ min: 6 }) ], registerAgent);
router.post('/agent/login', loginAgent);

module.exports = router;
