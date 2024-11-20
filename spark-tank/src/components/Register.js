import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [teamNumber, setTeamNumber] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const teamCredentials = [
    { teamNumber: 'Team 1', password: 'pass123' },
    { teamNumber: 'Team 2', password: 'secure456' },
    { teamNumber: 'Team 3', password: 'innovate789' },
    { teamNumber: 'Team 4', password: 'create000' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const team = teamCredentials.find(
      (t) => t.teamNumber === teamNumber && t.password === password
    );

    if (team) {
      setMessage('Registration successful!');
    } else {
      setMessage('Invalid team number or password. Please try again.');
    }
  };

  return (
    <div className="Register">
      <div className="Register-content">
        <h1>Register for Spark Tank</h1>
        <form className="Register-form" onSubmit={handleSubmit}>
          <label htmlFor="teamNumber">Team Number:</label>
          <input
            type="text"
            id="teamNumber"
            placeholder="Enter your team number"
            value={teamNumber}
            onChange={(e) => setTeamNumber(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="register-btn">Register</button>
        </form>
        {message && <p className="message">{message}</p>}

        <div className="team-box">
          <h2>Team Numbers and Passwords</h2>
          <ul>
            {teamCredentials.map((team, index) => (
              <li key={index}>
                <strong>{team.teamNumber}</strong>: {team.password}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;