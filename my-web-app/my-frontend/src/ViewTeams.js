import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewTeams () {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teamUsers, setTeamUsers] = useState([]);

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

  // Fetch users of the selected team
  useEffect(() => {
    if (selectedTeam) {
      axios.get(`http://localhost:9000/api/teamMembers/team/${selectedTeam}/users`)
        .then(response => {
          if (response.data.success) {
            setTeamUsers(response.data.users);
          } else {
            console.error('Failed to fetch team users:', response.data.message);
          }
        })
        .catch(error => {
          console.error('Error fetching team users:', error);
        });
    }
  }, [selectedTeam]);

  const handleTeamSelect = e => {
    setSelectedTeam(e.target.value);
  };

  return (
    <div className="container" style={{ marginTop: '50px' }}>
      <h2 style={{ marginBottom: '30px' }}>View Team Users</h2>
      <div className="form-group">
        <label htmlFor="teamSelect">Select Team:</label>
        <select id="teamSelect" className="form-control" onChange={handleTeamSelect} value={selectedTeam}>
          <option value="" disabled>Select a team</option>
          {teams.map(team => (
            <option value={team.team_name} key={team._id}>
              {team.team_name}
            </option>
          ))}
        </select>
      </div>

      {selectedTeam && (
        <>
          <h3>Users of {selectedTeam}:</h3>
          <ul>
            {teamUsers.map(user => (
              <li key={user}>{user}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ViewTeams;
