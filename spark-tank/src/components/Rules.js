import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import './Rules.css';

const Rules = () => {
  // Handler to prevent navigation
  const handleClick = (e) => {
    e.preventDefault(); // Prevents navigation
  };

  return (
    <div className="Rules">
      <div className="Rules-content">
        <h1>Rules for Spark Tank Event</h1>
        <p>Here are the rules for participating in the Spark Tank event...</p>

        {/* Rules list */}
        <ul>
          <li>Each team gets 10 minutes to pitch their idea.</li>
          <li>Investors can ask questions after each pitch.</li>
          <li>The best ideas win amazing prizes!</li>
        </ul>

        {/* Invest Now Button */}
        <div className="navigation-buttons">
          <Link
            to="/invest"
            className="cta-btn"
            onClick={handleClick}  // Disable navigation
          >
            Invest Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Rules;
