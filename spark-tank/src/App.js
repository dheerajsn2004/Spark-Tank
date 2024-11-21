import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';  // Import LandingPage
import Register from './components/Register';  // Import Register component
import Rules from './components/Rules';        // Import Rules component
import './App.css';

const App = () => {
  // Track registration state
  const [isRegistered, setIsRegistered] = useState(false);

  // Handle registration (set global state)
  const handleRegistration = () => {
    setIsRegistered(true);
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
            element={isRegistered ? <Navigate to="/rules" /> : <Register onRegister={handleRegistration} />}
          />

          {/* Rules page, only accessible if registered */}
          <Route
            path="/rules"
            element={isRegistered ? <Rules /> : <Navigate to="/register" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
