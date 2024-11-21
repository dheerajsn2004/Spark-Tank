import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import './LandingPage.css';
import backgroundImage from '../images/finance.jpg';

const LandingPage = () => {
  return (
    <div
      className="LandingPage"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 60, 114, 0.6), rgba(30, 60, 114, 0.6)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="LandingPage-content">
        <h1>Welcome to Spark Tank Event</h1>
        <p>Pitch your ideas, invest wisely, and win big!</p>
        <div id="description">
          <h2 id="about">About the Event</h2>
          <p id="content">
            Join us for an exhilarating experience where creativity meets strategy! Teams will pitch their innovative business ideas, invest in each other's companies, and compete for the ultimate title.
          </p>
        </div>
        <div style={{ marginTop: "25px" }}>
          <Link to="/register" className="cta-btn">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
