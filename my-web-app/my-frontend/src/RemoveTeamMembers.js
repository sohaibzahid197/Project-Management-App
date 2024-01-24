import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function RemoveTeamMembers() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedUsersToRemove, setSelectedUsersToRemove] = useState([]);
  const [usersToRemove, setUsersToRemove] = useState([]); 

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

  // Fetch team members of the selected team
  
  useEffect(() => {
    if (selectedTeam) {
      axios.get(`http://localhost:9000/api/teamMembers/team/${selectedTeam}`)
        .then(response => {
          if (response.data.success) {
            setTeamMembers(response.data.teamMembers);
          } else {
            console.error('Failed to fetch team members:', response.data.message);
          }
        })
        .catch(error => {
          console.error('Error fetching team members:', error);
        });
    }
  }, [selectedTeam]);

  // Fetch the list of users to remove when selectedTeam changes
  useEffect(() => {
    if (selectedTeam) {
      axios.get(`http://localhost:9000/api/teamMembers/team/${selectedTeam}/users`)
        .then(response => {
          if (response.data.success) {
            setUsersToRemove(response.data.users);
          } else {
            console.error('Failed to fetch users to remove:', response.data.message);
          }
        })
        .catch(error => {
          console.error('Error fetching users to remove:', error);
        });
    }
  }, [selectedTeam]);

  const handleTeamSelect = e => {
    setSelectedTeam(e.target.value);
  };

  const handleUserSelectToRemove = e => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedUsersToRemove(selected);
  };

  const handleRemoveUsers = () => {
    axios.post('http://localhost:9000/api/teamMembers/remove', {
      teamName: selectedTeam,
      usernamesToRemove: selectedUsersToRemove,
    })
      .then(response => {
        if (response.data.success) {
          console.log('Team members removed successfully.');
          setSelectedUsersToRemove([]);
          // Refresh the list of users to remove after removal
          axios.get(`http://localhost:9000/api/teamMembers/team/${selectedTeam}/users`)
            .then(response => {
              if (response.data.success) {
                setUsersToRemove(response.data.users);
              } else {
                console.error('Failed to fetch updated users to remove:', response.data.message);
              }
            })
            .catch(error => {
              console.error('Error fetching updated users to remove:', error);
            });
        } else {
          console.error('Failed to remove team members:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error removing team members:', error);
      });
  };

  return (
    <div className="container" style={{ marginTop: '50px' }}>
      <h2 style={{ marginBottom: '30px' }}>Remove Team Members</h2>
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
          <div className="form-group">
            <label htmlFor="userSelectToRemove">Select Users to remove (Hold Ctrl to select multiple): </label>
            <select id="userSelectToRemove" multiple={true} className="form-control" onChange={handleUserSelectToRemove} value={selectedUsersToRemove}>
              {usersToRemove.map(user => (
                <option value={user} key={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-danger" onClick={handleRemoveUsers}>Remove Team Members</button>
        </>
      )}
    </div>
  );
}

export default RemoveTeamMembers;