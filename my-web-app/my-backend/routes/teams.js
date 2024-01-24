// teams.js (routes)

const express = require('express');
const router = express.Router();
const Team = require('../models/TeamName');  // Assuming the model file is named TeamName.js

// Endpoint for creating a new team
router.post('/add', async (req, res) => {
    try {
      const { team_name } = req.body;
  
      // Create a new team instance
      const newTeam = new Team({
        team_name,
      });
  
      // Save the team to the database
      await newTeam.save();
  
      res.status(200).json({ success: true, message: 'Team Created' });
    } catch (err) {
      console.error('Error Details:', err);
      res.status(500).json({ success: false, message: 'Something Went Wrong!' });
    }
  });


  router.get('/', async (req, res) => {
    try {
      const teams = await Team.find();
      res.json({ success: true, teams });
    } catch (error) {
      console.error('Error fetching teams:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch teams' });
    }
  });
  

  module.exports = router;
