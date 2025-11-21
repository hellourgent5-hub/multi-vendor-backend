import Vendor from '../models/vendor.js';
import User from '../models/user.js'; // Assuming User model is needed
import Product from '../models/product.js'; // Assuming Product model is needed

// =================================================================
// 1. Create Vendor Profile (The function from your screenshot)
// =================================================================
export const createVendor = async (req, res) => {
    try {
        const { shopName, phone } = req.body;
        const userId = req.user.id; // Assumes user ID is available via middleware

        const existingVendor = await Vendor.findOne({ user: userId });
        if (existingVendor) {
            return res.status(400).json({ message: "Vendor profile already exists" });
        }

        const newVendor = await Vendor.create({ user: userId, shopName, phone });
        res.status(201).json(newVendor);

    } catch (error) {
        console.error("Error creating vendor:", error);
        res.status(500).json({ message: "Failed to create vendor profile", error: error.message });
    }
};

// =================================================================
// 2. Approve Vendor (Admin Only) (The function from your screenshot)
// =================================================================
export const approveVendor = async (req, res) => {
    try {
        const { id } = req.params;
        const vendor = await Vendor.findById(id);

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        vendor.isApproved = true;
        await vendor.save();

        res.status(200).json(vendor);

    } catch (error) {
        console.error("Error approving vendor:", error);
        res.status(500).json({ message: "Failed to approve vendor", error: error.message });
    }
};

// =================================================================
// 3. List All Vendors (The function from your screenshot)
// =================================================================
export const getVendors = async (req, res) => {
    try {
        // Assuming 'user' and 'name email' are correct population fields
        const vendors = await Vendor.find().populate('user', 'name email'); 
        res.status(200).json(vendors);

    } catch (error) {
        console.error("Error listing vendors:", error);
        res.status(500).json({ message: "Failed to fetch vendors", error: error.message });
    }
};

// =================================================================
// 4. Delete Vendor (THE MISSING FUNCTION - FIXES THE SYNTAXERROR)
// =================================================================
export const deleteVendor = async (req, res) => {
    try {
        const { id } = req.params; 
        
        const vendor = await Vendor.findByIdAndDelete(id);

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        // Optional: Also delete associated products, if any
        await Product.deleteMany({ vendor: id }); 

        res.status(200).json({ message: 'Vendor successfully deleted' });

    } catch (error) {
        console.error('Error during vendor deletion:', error); 
        res.status(500).json({ message: 'Internal Server Error during deletion', error: error.message });
    }
};

// =================================================================
// 5. Get Single Vendor By ID (Assumed needed for router.get("/:id"))
// =================================================================
export const getVendor = async (req, res) => {
    try {
        const { id } = req.params;
        const vendor = await Vendor.findById(id).populate('user', 'name email');

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        res.status(200).json(vendor);
    } catch (error) {
        console.error("Error fetching single vendor:", error);
        res.status(500).json({ message: "Failed to fetch vendor", error: error.message });
    }
};

// =================================================================
// 6. Update Vendor (Assumed needed for router.put("/:id"))
// =================================================================
export const updateVendor = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; 

        const updatedVendor = await Vendor.findByIdAndUpdate(id, updateData, { 
            new: true,
            runValidators: true 
        }).populate('user', 'name email');

        if (!updatedVendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        res.status(200).json(updatedVendor);
    } catch (error) {
        console.error("Error updating vendor:", error);
        res.status(500).json({ message: "Failed to update vendor", error: error.message });
    }
};
