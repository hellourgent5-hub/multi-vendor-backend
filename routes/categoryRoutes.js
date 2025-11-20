import express from "express";
import Category from "../models/Category.js";
import Module from "../models/Module.js";

const router = express.Router();

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().populate("module");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create category
router.post("/", async (req, res) => {
  try {
    const { name, moduleId } = req.body;
    const module = await Module.findById(moduleId);
    if (!module) return res.status(404).json({ error: "Module not found" });

    const category = new Category({ name, module: module._id });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
