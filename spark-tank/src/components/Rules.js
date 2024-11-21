import React from 'react';
import './Rules.css';

const Rules = () => {
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
        <div className="navigation-buttons">
          {/* Single button: Invest Now */}
          <button className="cta-btn">Invest Now</button>
        </div>
      </div>
    </div>
  );
};

export default Rules;
