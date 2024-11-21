import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage'; // Import LandingPage
import Register from './components/Register'; // Import Register component
import Rules from './components/Rules'; // Import Rules component
import './App.css';

const App = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  // Check if the user is registered from localStorage on initial load
  useEffect(() => {
    const registrationState = localStorage.getItem('isRegistered');
    if (registrationState === 'true') {
      setIsRegistered(true); // If user is registered, set isRegistered to true
    }
  }, []);

  const handleRegistration = () => {
    setIsRegistered(true);
    localStorage.setItem('isRegistered', 'true');  // Store registration state in localStorage
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
                <Navigate to="/rules" /> // If registered, redirect to rules
              ) : (
                <Register onRegister={handleRegistration} />
              )
            }
          />

          {/* Rules page, only accessible if registered */}
          <Route
            path="/rules"
            element={isRegistered ? <Rules /> : <Navigate to="/register" />} // Only accessible if registered
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
