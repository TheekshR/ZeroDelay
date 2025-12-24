const mongoose = require("mongoose");

const ReactionTestSchema = new mongoose.Schema({
  ageRange: String,
  sleep: String,
  caffeine: String,
  fatigue: Number,
  gamingExperience: String,

  reactionTimes: [Number],
  averageReactionTime: Number,
  attempts: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ReactionTest", ReactionTestSchema);
