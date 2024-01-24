import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewUserStories() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [userStories, setUserStories] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios.get('http://localhost:9000/api/projects');
      if (response.data.success && Array.isArray(response.data.projects)) {
        setProjects(response.data.projects);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchUserStories = async () => {
      let apiUrl = 'http://localhost:9000/api/userstories';
      if (selectedProject) {
        apiUrl += `?proj_id=${selectedProject}`;
      }
      const response = await axios.get(apiUrl);
      if (response.data.success && Array.isArray(response.data.userStories)) {
        setUserStories(response.data.userStories);
      }
    };
    fetchUserStories();
  }, [selectedProject]);

  const deleteUserStory = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/userstories/${id}`);
      setUserStories(userStories.filter(story => story._id !== id));
    } catch (err) {
      console.error('Delete Failed:', err);
    }
  };

  return (
    <div className="container" style={{ marginTop: '50px' }}>
      <h2 style={{ marginBottom: '30px' }}>View User Stories</h2>
      <div className="form-group">
        <select className="form-control" onChange={(e) => setSelectedProject(e.target.value)}>
          <option value=''>Select Project</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.proj_name}
            </option>
          ))}
        </select>
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>User Story</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userStories.map((story) => (
            <tr key={story._id}>
              <td>{story.user_story}</td>
              <td>{story.priority}</td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteUserStory(story._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewUserStories;