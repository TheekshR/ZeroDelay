const express = require("express");
const router = express.Router();
const { Parser } = require("json2csv");

// IMPORT YOUR MODEL (adjust name/path if needed)
const ReactionTest = require("../models/ReactionTest");

router.get("/", async (req, res) => {
  try {
    // 1. Get data from MongoDB
    const data = await ReactionTest.find().lean();

    // 2. If no data
    if (!data.length) {
      return res.status(404).send("No data available");
    }

    // 3. Select fields for CSV
    const fields = [
      "ageRange",
      "sleep",
      "caffeine",
      "fatigue",
      "gamer",
      "averageReactionTime",
      "createdAt"
    ];

    // 4. Convert JSON → CSV
    const parser = new Parser({ fields });
    const csv = parser.parse(data);

    // 5. Send CSV
    res.header("Content-Type", "text/csv");
    res.attachment("zerodelay_reaction_data.csv");
    res.send(csv);

  } catch (error) {
    res.status(500).send("Failed to export CSV");
  }
});

module.exports = router;
