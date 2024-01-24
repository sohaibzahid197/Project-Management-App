import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddTeamMembers() {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Fetch teams
  useEffect(() => {
    axios.get('http://localhost:9000/api/teams')
      .then(response => {
        if (response.data.success) {
          setTeams(response.data.teams);
        } else {
          console.error('Failed to fetch teams:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
      });
  }, []);

  // Fetch users
  useEffect(() => {
    axios.get('http://localhost:9000/api/users')
      .then(response => {
        if (response.data.success) {
          setUsers(response.data.users);
        } else {
          console.error('Failed to fetch users:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleTeamSelect = e => {
    setSelectedTeam(e.target.value);
  };

  const handleUserSelect = e => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedUsers(selected);
  };

  const handleSubmit = () => {
    axios.post('http://localhost:9000/api/teamMembers/add', {
      teamName: selectedTeam,
      usernames: selectedUsers,
    })
      .then(response => {
        if (response.data.success) {
          console.log('Team members added successfully.');
          setSelectedTeam('');
          setSelectedUsers([]);
        } else {
          console.error('Failed to add team members:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error adding team members:', error);
      });
  };

  return (
    <div className="container" style={{ marginTop: '50px' }}>
      <h2 style={{ marginBottom: '30px' }}>Add Team Members</h2>
      
      <div className="form-group">
        <label htmlFor="teamSelect">Select Team: </label>
        <select 
          id="teamSelect" 
          className="form-control"
          onChange={handleTeamSelect} 
          value={selectedTeam}
        >
          <option value="" disabled>Select a team</option>
          {teams.map(team => (
            <option value={team.team_name} key={team._id}>
              {team.team_name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="userSelect">Select Users (Hold Ctrl to select multiple): </label>
        <select 
          id="userSelect" 
          className="form-control" 
          multiple={true} 
          size="5"
          onChange={handleUserSelect} 
          value={selectedUsers}
        >
          {users.map(user => (
            <option value={user.username} key={user._id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary" onClick={handleSubmit}>Submit Team Members</button>
    </div>
  );
}

export default AddTeamMembers;
