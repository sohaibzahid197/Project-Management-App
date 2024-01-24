const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    proj_name: String,
    proj_desc: String,
    prod_owner_id: Number, 
    mgr_id: Number, 
    team_id: String,
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
