// models/UserStory.js
const mongoose = require("mongoose");

const UserStorySchema = new mongoose.Schema({
    user_story: String,
    proj_id: String,
    priority: {
        type: Number,
        default: 0,           // Default priority is set to 0
    },
});

const UserStory = mongoose.model("UserStory", UserStorySchema);

module.exports = UserStory;
