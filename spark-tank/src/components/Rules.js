import React from 'react';
import { Link } from 'react-router-dom';
import './Rules.css';

const Rules = () => {
  return (
    <div className="Rules">
      <div className="Rules-content">
        <h1>Rules for Spark Tank Event</h1>
        <p>Here are the rules for participating in the Spark Tank event:</p>

        {/* Rules list */}
        <ul>
          <li>Each team gets 10 minutes to pitch their idea.</li>
          <li>Investors can ask questions after each pitch.</li>
          <li>The best ideas win amazing prizes!</li>
          <li>Investors allocate funds based on the pitch.</li>
        </ul>

        {/* Invest Now Button */}
        <div className="navigation-buttons">
          <Link to="/invest" className="cta-btn">
            Invest Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Rules;
