
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fname: String,
  lname: String,
  username: String,
  password: String,  
});

const User = mongoose.model('User', userSchema, 'users');  

module.exports = User;

