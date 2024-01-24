import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskListView() {
  const [tasks, setTasks] = useState([]);
  const [userStories, setUserStories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch tasks
        const tasksResponse = await axios.get('http://localhost:9000/api/tasks');
        if (tasksResponse.data.success) {
          setTasks(tasksResponse.data.tasks);
          console.log("Fetched Tasks:", tasksResponse.data.tasks); // Debugging
        }

        // Fetch user stories
        const storiesResponse = await axios.get('http://localhost:9000/api/userstories');
        if (storiesResponse.data.success) {
          setUserStories(storiesResponse.data.userStories);
          console.log("Fetched User Stories:", storiesResponse.data.userStories); // Debugging
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }

    fetchData();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.patch(`http://localhost:9000/api/tasks/${taskId}`, { status: newStatus });
      setTasks(tasks.map(task => task._id === taskId ? { ...task, status: newStatus } : task));
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  const getUserStoryDescription = (userStoryId) => {
    const story = userStories.find(story => story._id === userStoryId);
    return story ? story.user_story : 'No user story linked';
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Task List</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Task Description</th>
              <th>User Story</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.task}</td>
                <td>{getUserStoryDescription(task.user_story_id)}</td> {/* Ensure this field name matches */}
                <td>
                  <select
                    className="form-control"
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Awaiting Confirmation">Awaiting Confirmation</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskListView;
