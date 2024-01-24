import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectForm() {
  // Declare state variables
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [productOwner, setProductOwner] = useState('');
  const [manager, setManager] = useState('');
  const [team, setTeam] = useState('');
  const [teamList, setTeamList] = useState([]);

  // Fetch teams from the API
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/teams');
        setTeamList(response.data.teams);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
    fetchTeams();
  }, []);

  // Sample data for product owners and managers
  const productOwners = [
    { id: 1, name: 'Product Owner 1' },
    { id: 2, name: 'Product Owner 2' },
    { id: 3, name: 'Product Owner 3' },
  ];
  
  const managers = [
    { id: 1, name: 'Manager 1' },
    { id: 2, name: 'Manager 2' },
    { id: 3, name: 'Manager 3' },
  ];

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const objectIdRegExp = /^[a-f\d]{24}$/i;
    if (!objectIdRegExp.test(team)) {
      alert("Invalid Team ID format.");
      return;
    }

    const projectDetails = {
      proj_name: projectName,
      proj_desc: projectDescription,
      prod_owner_id: productOwner,
      mgr_id: manager,
      team_id: team,
    };

    try {
      const response = await axios.post('http://localhost:9000/api/projects/add', projectDetails);
      
      if (response.data.success) {
        alert('Project Created Successfully');
        setProjectName('');
        setProjectDescription('');
        setProductOwner('');
        setManager('');
        setTeam('');
      } else {
        alert('Error: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error while creating project:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Project Name'
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <textarea
        placeholder='Project Description'
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
      />
      <select onChange={(e) => setProductOwner(e.target.value)} value={productOwner}>
        <option value=''>Select Product Owner</option>
        {productOwners.map((owner) => (
          <option key={owner.id} value={owner.id}>
            {owner.name}
          </option>
        ))}
      </select>
      <select onChange={(e) => setManager(e.target.value)} value={manager}>
        <option value=''>Select Manager</option>
        {managers.map((mgr) => (
          <option key={mgr.id} value={mgr.id}>
            {mgr.name}
          </option>
        ))}
      </select>
      <select onChange={(e) => setTeam(e.target.value)} value={team}>
        <option value=''>Select Team</option>
        {teamList.map((team) => (
          <option key={team._id} value={team._id}>
            {team.team_name}
          </option>
        ))}
      </select>
      <button type='submit'>Create Project</button>
    </form>
  );
}

export default ProjectForm;