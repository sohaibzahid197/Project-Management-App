import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserStoryForm() {
  const [userStory, setUserStory] = useState('');
  const [projId, setProjId] = useState('');
  const [priority, setPriority] = useState(0);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/projects');
        
        if (response.data.success && Array.isArray(response.data.projects)) {
          setProjects(response.data.projects);
        } else {
          console.error('Invalid API response:', response.data);
        }
      } catch (error) {
        console.error('Could not fetch projects:', error);
      }
    };
  
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userStory || !projId || typeof priority !== 'number') {
      alert('All fields are required.');
      return;
    }

    try {
      const selectedProject = projects.find((project) => project._id === projId);
      if (selectedProject) {
        const response = await axios.post('http://localhost:9000/api/userstories/add', {
          user_story: userStory,
          proj_id: selectedProject._id,
          priority: priority,
        });

        if (response.data.success) {
          alert('User Story Created');
          setUserStory('');
          setProjId('');
          setPriority(0);
        } else {
          alert(response.data.message);
        }
      } else {
        alert('Selected project not found');
      }
    } catch (err) {
      console.error('Error Details: ', err.response ? err.response.data : err);
      alert('Something  Went Wrong!');
    }
  };

  return (
    <div>
      <h2>Create User Story</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="User Story"
          value={userStory}
          onChange={(e) => setUserStory(e.target.value)}
        ></textarea>
        <select
          value={projId}
          onChange={(e) => setProjId(e.target.value)}
        >
          <option value="">Select Project</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.proj_name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Priority"
          value={priority}
          onChange={(e) => setPriority(parseInt(e.target.value))}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default UserStoryForm;
