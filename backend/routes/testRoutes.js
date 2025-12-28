const express = require("express");
const router = express.Router();
const ReactionTest = require("../models/ReactionTest");

// POST /api/tests
router.post("/", async (req, res) => {
  try {
    const { ageRange, sleep, caffeine, fatigue, gamer, reactionTimes, averageReactionTime } = req.body;

    const newTest = new ReactionTest({
      ageRange,
      sleep,
      caffeine,
      fatigue,
      gamer,
      reactionTimes,
      averageReactionTime
    });

    const savedTest = await newTest.save();

    res.status(201).json({ message: "Test data saved successfully" });
  } catch (error) {
    console.error("Error saving test:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
