const mongoose = require("mongoose");

const reactionTestSchema = new mongoose.Schema({
  // Pre-test form data
  ageRange: { type: String, required: true },
  sleep: { type: String, required: true },
  caffeine: { type: String, required: true },
  fatigue: { type: String, required: true },
  gamer: { type: String, required: true },

  // Reaction test data
  reactionTimes: [{ type: Number, required: true }], // array of individual reaction times
  averageReactionTime: { type: Number, required: true },

  // Optional: timestamp
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ReactionTest", reactionTestSchema);
