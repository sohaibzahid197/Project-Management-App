import React, { useState } from 'react';
import axios from 'axios';

function TeamRosterForm() {
  // State initialization
  const [team, setTeam] = useState('');
  const [member, setMember] = useState('');

  // Static data for dropdowns (replace with your actual data)
  const teams = [
    { id: 1, name: "Team 1" },
    { id: 2, name: "Team 2" },
    { id: 3, name: "Team 3" },
  ];

  const members = [
    { id: 1, name: "Member 1" },
    { id: 2, name: "Member 2" },
    { id: 3, name: "Member 3" },
  ];

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Find the selected team and member objects based on their names
      const selectedTeam = teams.find((t) => t.name === team);
      const selectedMember = members.find((m) => m.name === member);

      // Check if the selected team and member are found
      if (selectedTeam && selectedMember) {
        const response = await axios.post('http://localhost:9000/api/teamrosters/add', {
          team_id: selectedTeam.id, // Use the ID of the selected team
          member_id: selectedMember.id, // Use the ID of the selected member
        });

        if (response.data.success) {
          alert('Team Roster Created');
          // Clear the input fields after successful submission
          setTeam('');
          setMember('');
        } else {
          alert(response.data.message);
        }
      } else {
        alert('Selected team or member not found');
      }
    } catch (err) {
      console.error('Error Details:', err.response ? err.response.data : err);
      alert('Something Went Wrong!');
    }
  };

  return (
    <div>
      <h2>Create Team Roster</h2>
      <form onSubmit={handleSubmit}>
        <select value={team} onChange={(e) => setTeam(e.target.value)}>
          <option value="">Select Team</option>
          {teams.map((teamObj) => (
            <option key={teamObj.id} value={teamObj.name}>
              {teamObj.name}
            </option>
          ))}
        </select>
        <select value={member} onChange={(e) => setMember(e.target.value)}>
          <option value="">Select Member</option>
          {members.map((memberObj) => (
            <option key={memberObj.id} value={memberObj.name}>
              {memberObj.name}
            </option>
          ))}
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default TeamRosterForm;
