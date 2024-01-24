// routes/teamRoster.js
const express = require('express');
const router = express.Router();
const TeamRoster = require('../models/TeamRoster');

// Endpoint for creating a new Team Roster
router.post('/add', async (req, res) => {
  try {
    const { team_id, member_id } = req.body;

    // Create a new Team Roster instance
    const newTeamRoster = new TeamRoster({
      team_id,
      member_id,
    });

    // Save the Team Roster to the database
    await newTeamRoster.save();

    res.json({ success: true, message: 'Team Roster Created' });
  } catch (err) {
    console.error('Error Details:', err);
    res.status(500).json({ success: false, message: 'Something Went Wrong!' });
  }
});

module.exports = router;
