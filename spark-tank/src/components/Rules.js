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
          <li>Each team must consist of 2-4 members.</li>
          <li>Teams are required to pitch their business idea within the allotted time of 5 minutes.</li>
          <li>Judges’ decisions will be final and binding.</li>
          <li>Investments must be made strategically; teams will have limited resources to invest.</li>
          <li>Use of offensive or inappropriate language during pitches is strictly prohibited.</li>
          <li>Participants must adhere to the time limits for presentations and discussions.</li>
          <li>All ideas must be original; plagiarism will lead to disqualification.</li>
          <li>Participants should arrive at the venue at least 15 minutes prior to the event start time.</li>
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
