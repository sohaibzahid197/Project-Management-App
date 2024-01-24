import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

function AssignUserStories({ currentUserId }) {
  const [userStories, setUserStories] = useState([]);

  useEffect(() => {
    const fetchUnassignedUserStories = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/assignments/unassignedstories');
        const unassignedStories = response.data.userStories || [];
        setUserStories(unassignedStories);
      } catch (error) {
        console.error('Error fetching unassigned user stories:', error);
      }
    };

    fetchUnassignedUserStories();
  }, [currentUserId]); // Add currentUserId as a dependency to refresh when it changes

  const assignStoryToUser = async (storyId) => {
    if (!currentUserId) {
      alert('Current user ID is not set. Cannot assign the story.');
      return;
    }

    try {
      console.log('Assigning story to user. Story ID:', storyId, 'User ID:', currentUserId);

      const response = await axios.post(`http://localhost:9000/api/assignments/assign`, {
        user_story_id: storyId,
        user_id: currentUserId,
      });

      console.log('Assignment response:', response.data);

      if (response.data.success) {
        // Remove the assigned story from the list
        setUserStories(userStories.filter((story) => story._id !== storyId));
        alert('Story Assigned Successfully!');
      } else {
        console.error('Assignment not successful:', response.data.message);
      }
    } catch (error) {
      console.error('Error assigning user story:', error);
      alert(
        'Error assigning user story: ' +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  return (
    <div className="container">
      <table className="table">
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
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => assignStoryToUser(story._id)}
                  disabled={!currentUserId}
                >
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

AssignUserStories.propTypes = {
  currentUserId: PropTypes.string.isRequired,
};

export default AssignUserStories;
