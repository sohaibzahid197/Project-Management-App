import React, { useState } from 'react';
import ViewTeams from './ViewTeams';
import ViewProjects from './ViewProjects';
import ViewUserStories from './ViewUserStories';
import TaskListView from './TaskListView';

function HomePage({ setActivePage }) {
  const [homeActivePage, setHomeActivePage] = useState('viewTeams'); // Default page

  // Styles
  const pageStyle = {
    padding: '20px',
    fontFamily: '"Arial", sans-serif',
  };

  const headerStyle = {
    color: '#333',
    textAlign: 'center',
    marginBottom: '30px',
  };

  const buttonStyle = {
    margin: '5px 10px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#2E7D32',
    fontWeight: 'bold',
  };

  return (
    <div style={pageStyle}>
      <h1 style={headerStyle}>Welcome to Home Page</h1>
      {/* Buttons to switch between views */}
      <button 
        style={homeActivePage === 'viewTeams' ? activeButtonStyle : buttonStyle}
        onClick={() => setHomeActivePage('viewTeams')}>
          View Teams
      </button>
      <button 
        style={homeActivePage === 'viewProjects' ? activeButtonStyle : buttonStyle}
        onClick={() => setHomeActivePage('viewProjects')}>
          View Projects
      </button>
      <button 
        style={homeActivePage === 'viewUserStories' ? activeButtonStyle : buttonStyle}
        onClick={() => setHomeActivePage('viewUserStories')}>
          View User Stories
      </button>
      <button 
        style={homeActivePage === 'taskListView' ? activeButtonStyle : buttonStyle}
        onClick={() => setHomeActivePage('taskListView')}>
          Task List View
      </button>

      {/* Conditional Rendering */}
      {homeActivePage === 'viewTeams' && <ViewTeams />}
      {homeActivePage === 'viewProjects' && <ViewProjects />}
      {homeActivePage === 'viewUserStories' && <ViewUserStories />}
      {homeActivePage === 'taskListView' && <TaskListView />}
    </div>
  );
}

export default HomePage;
