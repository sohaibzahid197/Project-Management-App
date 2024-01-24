// routes/assignments.js
const express = require('express');
const router = express.Router();
const UserStory = require('../models/UserStory');
const Assigned = require('../models/Assigned');

router.get('/assignedstories', async (req, res) => {
  try {
    const assignedStories = await Assigned.find().populate('user_story_id');
    
    res.json({ success: true, assignedStories });
  } catch (err) {
    console.error('Error Details:', err);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

// Route to get unassigned user stories
router.get('/unassignedstories', async (req, res) => {
    try {
      // Log to check if we are hitting the route
      console.log("Fetching unassigned user stories");
  
      const assignedIds = await Assigned.find().distinct('user_story_id');
  
      const unassignedStories = await UserStory.find({ _id: { $nin: assignedIds } });
      res.json({ success: true, userStories: unassignedStories });
    } catch (err) {
      console.error('Error Details:', err);
      res.status(500).json({ success: false, message: 'Something went wrong' });
    }
  });
  
  // routes/assignments.js

  router.post('/assign', async (req, res) => {
    const { user_story_id, user_id } = req.body;
  
    try {
      // Validate if user_id is present
      if (!user_id) {
        return res.status(400).json({ success: false, message: 'User ID is required' });
      }
  
      // Your existing code to assign the story to the user
      const assignment = new Assigned({
        user_story_id,
        user_id,
      });
  
      const savedAssignment = await assignment.save();
      res.json({ success: true, message: 'Story assigned successfully', data: savedAssignment });
    } catch (error) {
      console.error('Error assigning user story:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  
  module.exports = router;