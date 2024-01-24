// routes/task.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // Import mongoose to handle ObjectId
const TaskList = require('../models/TaskList');
const Assigned = require('../models/Assigned');

const UserStory = require('../models/UserStory'); // Import UserStory model

router.get('/', async (req, res) => {
  try {
    // Populate user story details in each task
    const tasks = await TaskList.find().populate('user_story_id');
    res.json({ success: true, tasks });
  } catch (err) {
    console.error('Error Details:', err);
    res.status(500).json({ success: false, message: 'Something Went Wrong!' });
  }
});



// Endpoint to update a task status
router.patch('/:taskId', async (req, res) => {
  try {
    const { status } = req.body;
    const { taskId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID',
      });
    }

    const task = await TaskList.findByIdAndUpdate(taskId, { status }, { new: true });
    
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.json({ success: true, message: 'Task Updated', task });
  } catch (err) {
    console.error('Error Details:', err);
    res.status(500).json({ success: false, message: 'Something Went Wrong!' });
  }
});

// Endpoint for creating a new task
router.post('/add', async (req, res) => {
  try {
    const { task, user_story_id, created_by, status } = req.body;
    console.log(task, user_story_id, created_by, status)
    // Check if the user_story_id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(user_story_id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user_story_id',
      });
    }

    // Check if the user_story_id is valid and assigned
    const assignedUserStory = await Assigned.findOne({
      user_story_id,
      user_id: created_by,
    });

    if (!assignedUserStory) {
      return res.status(400).json({
        success: false,
        message: 'User Story is not assigned to the user.',
      });
    }

    // Create a new TaskList instance
    const newTask = new TaskList({
      task,
      user_story_id,
      created_by,
      status,
    });

    await newTask.save();

    res.json({ success: true, message: 'Task Created' });
  } catch (err) {
    console.error('Error Details:', err);
    res
      .status(500)
      .json({ success: false, message: 'Something Went Wrong!' });
  }
});

module.exports = router;
