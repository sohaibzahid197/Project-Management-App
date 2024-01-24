// teamMembers.js (models)
const mongoose = require("mongoose");

const TeamMembersSchema = new mongoose.Schema({
  teamName: String, // Use teamName instead of teamId
  usernames: [String], // Use usernames instead of userIds
});

const TeamMembers = mongoose.model("TeamMembers", TeamMembersSchema);

module.exports = TeamMembers;
