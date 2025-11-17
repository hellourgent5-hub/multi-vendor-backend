// ... imports ...
const { registerVendor, loginVendor, listVendors } = require('../controllers/vendorController');
// ... validation middleware ...

router.post('/register', 
    // ... validation ...
    registerVendor
);

router.post('/login', loginVendor);

router.get('/listVendors', permit('admin'), listVendors); 
// Note: You do not have a plain router.get('/') defined.
