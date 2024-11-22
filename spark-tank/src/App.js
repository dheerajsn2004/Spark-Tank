import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LandingPage from './components/LandingPage'; // Import LandingPage
import Register from './components/Register'; // Import Register component
import Rules from './components/Rules'; // Import Rules component
import InvestPage from './components/InvestPage'; // Import InvestPage component
import './App.css';

const App = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredTeam, setRegisteredTeam] = useState('');

  // Check if the user is registered from localStorage on initial load
  useEffect(() => {
    const registrationState = localStorage.getItem('isRegistered');
    const team = localStorage.getItem('registeredTeam');
    if (registrationState === 'true' && team) {
      setIsRegistered(true);
      setRegisteredTeam(team);
    }
  }, []);

  const handleRegistration = (team) => {
    setIsRegistered(true);
    setRegisteredTeam(team);
    localStorage.setItem('isRegistered', 'true'); // Store registration state
    localStorage.setItem('registeredTeam', team); // Store registered team
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing Page is the default route */}
          <Route path="/" element={<LandingPage />} />

          {/* Register page */}
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

          {/* Rules page, only accessible if registered */}
          <Route
            path="/rules"
            element={
              isRegistered ? (
                <Rules registeredTeam={registeredTeam} />
              ) : (
                <Navigate to="/register" replace />
              )
            }
          />

          {/* Invest page, only accessible if registered */}
          <Route
            path="/invest"
            element={
              isRegistered ? (
                <InvestPage registeredTeam={registeredTeam} />
              ) : (
                <Navigate to="/register" replace />
              )
            }
          />

          {/* Redirect any unknown routes to Landing Page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
