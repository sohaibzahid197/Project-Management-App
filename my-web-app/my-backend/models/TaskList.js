const mongoose = require("mongoose");

const TaskListSchema = new mongoose.Schema({
    task: String,
    user_story_id: mongoose.Schema.Types.ObjectId,
    created_by: mongoose.Schema.Types.ObjectId,
    status: String
});

const TaskList = mongoose.model("TaskList", TaskListSchema);

module.exports = TaskList;
