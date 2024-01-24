const express = require('express');
const router = express.Router();
const Project = require('../models/Projects');


// Endpoint for creating a new project


router.post('/add', async (req, res) => {
  try {
    const { proj_name, proj_desc, prod_owner_id, mgr_id, team_id } = req.body;

    
    const newProject = new Project({
      proj_name,
      proj_desc,
      prod_owner_id,
      mgr_id,
      team_id,
    });

    // For  Saving the project to the database
    await newProject.save();

    res.json({ success: true, message: 'Project Created' });
  } catch (err) {
    console.error('Error Details:', err);
    res.status(500).json({ success: false, message: 'Something Went Wrong!' });
  }
});

// Existing code here...
router.get('/', async (req, res) => {
  // console.log('GET /api /projects called');
  try {
    const projects = await Project.find({}).lean();
    for (const project of projects) {
      project.prod_owner_name = "Owner Name"; 
      project.mgr_name = "Manager Name"; 
      project.team_name = "Team Name"; 
    }
    res.json({ success: true, projects });
  } catch (err) {
    console.error('Error Details:', err);
    res.status(500).json({ success: false, message: 'Something Went Wrong!' });
  }
});



module.exports = router;