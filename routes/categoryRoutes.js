import express from "express";
import Category from "../models/Category.js";
import Module from "../models/Module.js";

const router = express.Router();

// GET all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().populate("module");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a category
router.post("/", async (req, res) => {
  const { name, moduleId } = req.body;
  try {
    const moduleExists = await Module.findById(moduleId);
    if (!moduleExists) return res.status(404).json({ error: "Module not found" });

    const newCategory = new Category({ name, module: moduleId });
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
