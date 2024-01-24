import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ handleLoginClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:9000/api/users/signup', {
        username: username,
        password: password,
        fname: firstName,
        lname: lastName,
      });
  
      if (response.data.success) {
        alert('Signup successful!');
        handleLoginClick();
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error(err);
      // setError('Error signing up. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleSignup}>
          Signup
        </button>
        <p>
          Already have an account?{' '}
          <button className="btn btn-link" onClick={handleLoginClick}>
            Login
          </button>
        </p>
      </div>
      
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default Signup;
