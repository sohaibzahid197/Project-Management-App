const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
  console.log("GET /api/users route accessed.");  

  try {
    const users = await User.find({});
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
});


router.post('/signup', async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username already exists.' });
    }

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      fname: req.body.fname,
      lname: req.body.lname,
      username: req.body.username,
      password: req.body.password, 
    });

    const savedUser = await newUser.save();
    res.status(201).json({ success: true, message: 'Signup successful.', user: savedUser });
  } catch (error) {
    console.error('Signup failed:', error.message); 
    res.status(500).json({ success: false, message: `Signup failed. ${error.message}` });
}
});


router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    
    if (user && user.password === req.body.password) {
      res.status(200).json({ success: true, message: 'Login successful.', user });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Login failed.' });
  }
});



module.exports = router;
