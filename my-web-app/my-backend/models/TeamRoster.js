const mongoose = require("mongoose");

const TeamRosterSchema = new mongoose.Schema({
    team_id: Number,
    member_id: Number,
});

const TeamRoster = mongoose.model("TeamRoster", TeamRosterSchema);

module.exports = TeamRoster;
