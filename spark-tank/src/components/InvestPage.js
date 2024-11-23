import React, { useState, useEffect } from 'react';
import './InvestPage.css';

const InvestPage = ({ registeredTeam }) => {
  const [selectedPercentage, setSelectedPercentage] = useState(5);
  const [equivalentValue, setEquivalentValue] = useState(0);
  const walletBalance = 5000;

  useEffect(() => {
    setEquivalentValue((selectedPercentage / 100) * walletBalance); // Example calculation
  }, [selectedPercentage]);

  const handlePercentageChange = (e) => {
    const percentage = parseInt(e.target.value, 10);
    setSelectedPercentage(percentage);
  };

  const handlePlaceOrder = () => {
    alert(`Order placed for ${selectedPercentage}% shares!`);
  };

  return (
    <div className="InvestPage">
      <div className="presenting-team">
        <h1>Presenting Team: {registeredTeam || 'Unknown'}</h1>
      </div>

      <div className="content">
        <div className="place-order">
          <h2>Place Your Order</h2>
          <div className="order-box">
            <div className="field">
              <label>Percentage of Available Stocks:</label>
              <input
                className="fixed-percentage"
                type="text"
                value="40%"
                readOnly
              />
            </div>
            <div className="field">
              <label>Select Percentage to Buy:</label>
              <select
                className="dropdown"
                value={selectedPercentage}
                onChange={handlePercentageChange}
              >
                {[5, 10, 15, 20, 25, 30, 35, 40].map((percent) => (
                  <option key={percent} value={percent}>
                    {percent}%
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Equivalent Value:</label>
              <input
                className="value-box"
                type="text"
                value={`₹${equivalentValue}`}
                readOnly
              />
            </div>

            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>

        <div className="wallet-assets">
          <div className="wallet">
            <h3>Your Wallet</h3>
            <input
              className="wallet-balance"
              type="text"
              value={`₹${walletBalance}`}
              readOnly
            />
          </div>

          <div className="assets">
            <h3>Your Assets</h3>
            <div className="assets-box"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestPage;
