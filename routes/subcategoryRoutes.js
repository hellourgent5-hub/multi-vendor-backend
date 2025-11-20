import express from "express";
import Subcategory from "../models/Subcategory.js";  // ✅ exact match
import Category from "../models/Category.js";        // ✅ exact match

const router = express.Router();

// Get all subcategories
router.get("/", async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate("category");
    res.json(subcategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new subcategory
router.post("/", async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ error: "Category not found" });

    const subcategory = new Subcategory({ name, category: category._id });
    await subcategory.save();
    res.status(201).json(subcategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
