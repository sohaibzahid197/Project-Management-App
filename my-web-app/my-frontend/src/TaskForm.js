import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function TaskListForm() {
  // State initialization
  const [task, setTask] = useState('');
  const [userStoryId, setUserStoryId] = useState('');
  const [status, setStatus] = useState('New'); // Default status is 'New'
  const [assignedUserStories, setAssignedUserStories] = useState([]);
  
  // Fetch assigned user stories when the component mounts
  useEffect(() => {
    async function fetchAssignedUserStories() {
      try {
        const response = await axios.get('http://localhost:9000/api/assignments/assignedstories');
        
        if (response.data.success) {
          setAssignedUserStories(response.data.assignedStories);
        }
      } catch (err) {
        console.error('Error fetching assigned user stories:', err);
      }
    }
    
    fetchAssignedUserStories();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9000/api/tasks/add', {
        task,
        user_story_id: userStoryId,
        created_by: assignedUserStories[0].user_id,
        status,
      });

      if (response.data.success) {
        alert('Task Created');
        setTask('');
        setUserStoryId('');
        setStatus('New');
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error('Error Details:', err.response ? err.response.data : err);
      alert('Something Went Wrong!');
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>User Story:</label>
          <select
            className="form-control"
            value={userStoryId}
            onChange={(e) => setUserStoryId(e.target.value)}
          >
            <option value="">Select User Story</option>
            {assignedUserStories.map((story) => (
              <option key={story.user_story_id._id} value={story.user_story_id._id}>
                {story.user_story_id.user_story}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Task Description:</label>
          <textarea
            className="form-control"
            placeholder="Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Awaiting Confirmation">Awaiting Confirmation</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
}

export default TaskListForm;
