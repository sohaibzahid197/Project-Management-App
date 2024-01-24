// ViewProjects.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

function ViewProjects() {
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState({});

  useEffect(() => {
    axios.get('http://localhost:9000/api/projects')
      .then((response) => {
        if (response.data.success) {
          setProjects(response.data.projects);
        }
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });

    axios.get('http://localhost:9000/api/teams')
      .then((response) => {
        if (response.data.success) {
          const teamMap = {};
          response.data.teams.forEach(team => teamMap[team._id] = team.team_name);
          setTeams(teamMap);
        }
      })
      .catch((error) => {
        console.error('Error fetching teams:', error);
      });
  }, []);

  return (
    <div className="container" style={{ marginTop: '50px' }}>
      <h2 style={{ marginBottom: '30px' }}>View Projects</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Project Name</th>
            <th>Project Description</th>
            <th>Product Owner Name</th>
            <th>Manager Name</th>
            <th>Team Name</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>{project.proj_name}</td>
              <td>{project.proj_desc}</td>
              <td>{`Product Owner ${project.prod_owner_id}`}</td>
              <td>{`Manager ${project.mgr_id}`}</td>
              <td>{teams[project.team_id] || 'Unknown'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewProjects;