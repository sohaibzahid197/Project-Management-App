// teamMembers.js (routes)
const express = require("express");
const router = express.Router();
const TeamMembers = require("../models/TeamMember");

// Endpoint for creating a new team member entry
router.post("/add", async (req, res) => {
  try {
    const { teamName, usernames } = req.body;

    // Create a new team member entry
    const newTeamMember = new TeamMembers({
      teamName,
      usernames,
    });

    // Save the team member entry to the database
    await newTeamMember.save();

    res.status(200).json({ success: true, message: "Team Members Added" });
  } catch (err) {
    console.error("Error Details:", err);
    res.status(500).json({ success: false, message: "Something Went Wrong!" });
  }
});

router.get("/team/:teamName", async (req, res) => {
  try {
    const teamName = req.params.teamName; 
    console.log("Fetching team members for team:", teamName);

    const teamMembers = await TeamMembers.find({ teamName });

    res.status(200).json({ success: true, teamMembers });
  } catch (err) {
    console.error("Error Details:", err);
    res.status(500).json({ success: false, message: "Failed to fetch team members" });
  }
});

// Endpoint for fetching users of a specific team
router.get("/team/:teamName/users", async (req, res) => {
  try {
    const { teamName } = req.params;

    // Fetch all users of the specified team
    const teamMembers = await TeamMembers.find({ teamName });

    if (!teamMembers || teamMembers.length === 0) {
      return res.status(404).json({ success: false, message: "Team not found or no users in the team." });
    }

    const users = teamMembers.flatMap(teamMember => teamMember.usernames); 

    res.status(200).json({ success: true, users });
  } catch (err) {
    console.error("Error Details:", err);
    res.status(500).json({ success: false, message: "Failed to fetch team members" });
  }
});

router.post("/remove", async (req, res) => {
  try {
    const { teamName, usernamesToRemove } = req.body;

    const teamMembers = await TeamMembers.find({ teamName });

    if (!teamMembers || teamMembers.length === 0) {
      return res.status(404).json({ success: false, message: "Team not found." });
    }


    for (const teamMember of teamMembers) {
      teamMember.usernames = teamMember.usernames.filter(username => !usernamesToRemove.includes(username));
      await teamMember.save();
    }

    console.log("Team Members after removal:", teamMembers);

    res.status(200).json({ success: true, message: "Team Members Removed" });
  } catch (err) {
    console.error("Error Details:", err);
    res.status(500).json({ success: false, message: "Something Went Wrong!" });
  }
});



module.exports = router;
