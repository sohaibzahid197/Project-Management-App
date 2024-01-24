import React, { useState } from 'react';
import axios from 'axios';

function TeamForm() {
  // State initialization
  const [teamName, setTeamName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:9000/api/teams/add', {
        team_name: teamName, 
      });
      
      if (response.data.success) {
        alert('Team Created');
        setTeamName('');
      } else {
        alert("Something Went Wrong!");
      }
    } catch (err) {
      console.error('Error Details:', err.response ? err.response.data : err);
      alert('Something Went Wrong!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Team Name" 
        value={teamName}
        onChange={e => setTeamName(e.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
}

export default TeamForm;
