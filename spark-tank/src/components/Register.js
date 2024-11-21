import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Register.css';

const Register = ({ onRegister }) => {
  const [teamStates, setTeamStates] = useState({});
  const [message, setMessage] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [password, setPassword] = useState('');

  const teamCredentials = {
    'Team 1': 'pass123',
    'Team 2': 'secure456',
    'Team 3': 'innovate789',
    'Team 4': 'create000',
  };

  const handleRegister = () => {
    if (teamCredentials[selectedTeam] === password) {
      setTeamStates((prev) => ({ ...prev, [selectedTeam]: true }));
      setMessage(`Registration successful for ${selectedTeam}!`);
      onRegister();  // Update registration state in App.js
    } else {
      setMessage('Invalid team number or password. Please try again.');
    }
    setSelectedTeam('');
    setPassword('');
  };

  return (
    <div className="Register">
      <h1>Register for Spark Tank</h1>
      
      <div className="team-boxes">
        {Object.keys(teamCredentials).map((team) => (
          <div key={team} className="team-box">
            <h2>{team}</h2>
            <input
              type="password"
              placeholder="Enter password"
              value={selectedTeam === team ? password : ''}
              onChange={(e) => {
                setSelectedTeam(team);
                setPassword(e.target.value);
              }}
              disabled={!!teamStates[team]}  // Disable input if team is already registered
            />
            <button
              className="register-btn"
              onClick={handleRegister}
              disabled={!!teamStates[team]}  // Disable button if team is already registered
            >
              {teamStates[team] ? 'Registered' : 'Register'}
            </button>
          </div>
        ))}
      </div>
      {message && <p className={message.includes('successful') ? 'success-message' : 'message'}>{message}</p>}
      
      {/* Allow navigation back to LandingPage */}
      <Link to="/" className="back-link">Back to Landing Page</Link>
    </div>
  );
};

export default Register;
