import React, { useState } from 'react';
import './Register.css';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const teamCredentials = {
    'Team 1': 'pass123',
    'Team 2': 'secure456',
    'Team 3': 'innovate789',
    'Team 4': 'create000',
  };

  const handleRegister = () => {
    if (teamCredentials[username] === password) {
      setMessage(`Registration successful for ${username}!`);
      onRegister(username); // Update registration state in App.js
    } else {
      setMessage('Invalid username or password. Please try again.');
    }
    setUsername('');
    setPassword('');
  };

  return (
    <div className="Register">
      <h1>Register for Spark Tank</h1>

      <div className="register-box">
        <label htmlFor="username">Team Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your team username"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <button className="register-btn" onClick={handleRegister}>
          Register
        </button>
      </div>

      {message && <p className={message.includes('successful') ? 'success-message' : 'message'}>{message}</p>}
    </div>
  );
};

export default Register;
