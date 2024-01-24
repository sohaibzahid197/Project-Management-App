import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import ProjectForm from './ProjectForm';
import TeamForm from './TeamForm';
import TeamRosterForm from './TeamRosterForm';
import UserStoryForm from './UserStoryForm';
import TaskForm from './TaskForm';
import AddTeamMembers from './AddTeamMembers'; 
import RemoveTeamMembers from './RemoveTeamMembers'; 
import AssignUserStories from './AssignUserStories';
import HomePage from './HomePage';


import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './style.css';

function App() {
  const [activePage, setActivePage] = useState('login');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [currentUserId, setCurrentUserId] = useState(null); 


  const handlePageChange = (page) => {
    if(page === 'logout') setIsLoggedIn(false); 
    else setActivePage(page);
  };

  const handleLoginSuccess = (userId) => {
    setIsLoggedIn(true);
    setCurrentUserId(userId); 
  };
  
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="text-center">
              {!isLoggedIn && ( 
                <>
                  <button className="btn btn-primary" onClick={() => handlePageChange('login')}>Login</button>
                  <button className="btn btn-secondary" onClick={() => handlePageChange('signup')}>Signup</button>
                </>
              )}
              {isLoggedIn && ( 
                <>
                  <button className="btn btn-info" onClick={() => handlePageChange('project')}>Create Project</button>
                  <button className="btn btn-info" onClick={() => handlePageChange('team')}>Create Team</button>
                  <button className="btn btn-info" onClick={() => handlePageChange('roster')}>Team Roster</button>
                  <button className="btn btn-info" onClick={() => handlePageChange('userStory')}>User Story</button>
                  <button className="btn btn-info" onClick={() => handlePageChange('task')}>Create Task</button>
                  <button className="btn btn-info" onClick={() => handlePageChange('addTeamMembers')}>Add Team Members</button>
                  <button className="btn btn-info" onClick={() => handlePageChange('removeTeamMembers')}>Remove Team Members</button>
                  <button className="btn btn-info" onClick={() => handlePageChange('assignUserStories')}>Assign User Stories</button>
                  <button className="btn btn-danger" onClick={() => handlePageChange('logout')}>Logout</button>
                  <button className="btn btn-primary" onClick={() => handlePageChange('home')}>Home</button>

                </>
              )}
            </div>
            {activePage === 'login' && !isLoggedIn && ( 
              <Login
                users={users}
                handleLoginSuccess={handleLoginSuccess} 
              />
            )}
            {activePage === 'signup' && !isLoggedIn && ( 
              <Signup
                setIsSignedUp={setIsSignedUp}
                users={users}
                setUsers={setUsers}
              />
            )}
            {activePage === 'project' && isLoggedIn && <ProjectForm />}
            {activePage === 'team' && isLoggedIn &&  <TeamForm />}
            {activePage === 'roster' && isLoggedIn && <TeamRosterForm />}
            {activePage === 'userStory' && isLoggedIn && <UserStoryForm />}
            {activePage === 'task' && isLoggedIn && <TaskForm />}
      
            {activePage === 'addTeamMembers' && isLoggedIn && <AddTeamMembers />}
            {activePage === 'removeTeamMembers' && isLoggedIn && <RemoveTeamMembers />}
            {activePage === 'assignUserStories' && isLoggedIn && <AssignUserStories currentUserId={currentUserId} />}
            {activePage === 'home' && isLoggedIn && <HomePage />} {/* Added condition to display HomePage */}

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
