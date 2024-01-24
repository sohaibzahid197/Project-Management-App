const express = require('express');
const router = express.Router();
const UserStory = require('../models/UserStory');

router.post('/add', async (req, res) => {
  const { user_story, proj_id, priority } = req.body;

  if (!user_story || !proj_id || typeof priority !== 'number') {
    return res.status(400).json({ success: false, message: 'Invalid input.' });
  }

  try {
    const proj_id_str = String(proj_id);

    const newUserStory = new UserStory({
      user_story,
      proj_id: proj_id_str,  
      priority,
    });

    await newUserStory.save();
    res.json({ success: true, message: 'User Story  Created' });
  } catch (err) {
    console.error('Error Details:', err);
    res.status(500).json({ success: false, message: 'Something Went Wrong!' });
  }
});

router.get('/', async (req, res) => {
  try {
    const proj_id = req.query.proj_id;
    let query = {};

    if (proj_id) {
      query.proj_id = proj_id;
    }

    const userStories = await UserStory.find(query);
    res.json({ success: true, userStories });
  } catch (err) {
    console.error('Error Details:', err);
    res.status(500).json({ success: false, message: 'Something Went Wrong!' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const userStory = await UserStory.findById(id);

    if (!userStory) {
      return res.status(404).json({ success: false, message: 'User Story not found' });
    }

    await UserStory.findByIdAndDelete(id);

    res.json({ success: true, message: 'User Story deleted Sucessfully' });
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

module.exports = router;
