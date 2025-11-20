// routes/subcategoryRoutes.js
import express from "express";
import Subcategory from "../models/Subcategory.js";  // ✅ exact casing

const router = express.Router();

// Example route
router.get("/", async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate("category");
    res.json(subcategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
