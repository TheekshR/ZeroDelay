const express = require("express");
const router = express.Router();
const ReactionTest = require("../models/ReactionTest");

// Save test result
router.post("/", async (req, res) => {
  try {
    const newTest = new ReactionTest(req.body);
    await newTest.save();
    res.status(201).json({ message: "Test saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save test" });
  }
});

module.exports = router;