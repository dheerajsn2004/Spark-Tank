import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate for redirection
import './Rules.css';

const Rules = () => {
  useEffect(() => {
    const registrationState = localStorage.getItem('isRegistered');
    if (registrationState !== 'true') {
      // If not registered, redirect to register page
      <Navigate to="/register" />;
    }
  }, []);

  return (
    <div className="Rules">
      <div className="Rules-content">
        <h1>Event Rules</h1>
        <p>
          Welcome to the Spark Tank Event! Please read the following rules carefully to ensure a smooth and fair experience.
        </p>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <p>Good luck, and may the best team win!</p>
        
        {/* Include Invest Now button */}
        <div className="navigation-buttons">
          <button className="cta-btn">Invest Now</button>
        </div>
      </div>
    </div>
  );
};

export default Rules;