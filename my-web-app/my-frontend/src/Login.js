import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ handleSignupClick, handleLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:9000/api/users/login', {
        username: username,
        password: password,
        
      });
      if (response.data.success) {
        console.log(response.data)
        handleLoginSuccess(response.data.user._id);

      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error('Error Details:', err.response ? err.response.data : err);
      // setError('');
      alert('Error logging in. Please try again later.');

    }
  };
  return (
    <div className="form-container">
      <h1>Login</h1>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
        <p>
          Don't have an account?{' '}
          <button className="btn btn-link" onClick={handleSignupClick}>
            Signup
          </button>
        </p>
      </div>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default Login;
