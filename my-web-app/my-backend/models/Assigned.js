// models/Assigned.js

const mongoose = require("mongoose");

const AssignedSchema = new mongoose.Schema({
  user_story_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserStory",
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Assigned = mongoose.model("Assigned", AssignedSchema);

module.exports = Assigned;
