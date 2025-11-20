import express from "express";
import Module from "../models/Module.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
