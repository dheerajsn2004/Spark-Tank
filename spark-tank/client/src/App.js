import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Rules from './components/Rules';
import InvestPage from './components/InvestPage';
import './App.css';

const App = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null); // New state for userId

  // Load registration state and team info from localStorage on initial render
  useEffect(() => {
    const registrationState = JSON.parse(localStorage.getItem('isRegistered'));
    const username = JSON.parse(localStorage.getItem('loggedInUsername'));
    const user = JSON.parse(localStorage.getItem('loggedInUserId')); // Retrieve logged-in user info
    if (registrationState && username && user) {
      setIsRegistered(true);
      setUsername(username.username);
      setUserId(user.userId); // Set userId from localStorage
    }
  }, []);

  const handleRegistration = (username, userId) => {
    setIsRegistered(true);
    setUsername(username);
    setUserId(userId); // Set the userId when registration is successful
    localStorage.setItem('isRegistered', JSON.stringify(true));
    localStorage.setItem('loggedInUsername', JSON.stringify(username));
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/register"
            element={
              isRegistered ? (
                <Navigate to="/rules" replace />
              ) : (
                <Register onRegister={handleRegistration} />
              )
            }
          />
          <Route
            path="/rules"
            element={
              isRegistered ? (
                <Rules registeredTeam={username} />
              ) : (
                <Navigate to="/register" replace />
              )
            }
          />
          <Route
            path="/invest"
            element={
              isRegistered ? (
                <InvestPage registeredTeam={username} userId={userId} />
              ) : (
                <Navigate to="/register" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
