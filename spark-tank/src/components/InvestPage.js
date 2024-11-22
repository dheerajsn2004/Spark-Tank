import React, { useState } from 'react';
import './InvestPage.css';

const InvestPage = () => {
  const [teams, setTeams] = useState({
    'Team 1': { wallet: 5000, sharesBought: {} },
    'Team 2': { wallet: 5000, sharesBought: {} },
    'Team 3': { wallet: 5000, sharesBought: {} },
    'Team 4': { wallet: 5000, sharesBought: {} },
  });
  const [presentingTeam] = useState('Team 1');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [price, setPrice] = useState(0);

  const handlePlaceOrder = () => {
    const investingTeam = teams[presentingTeam];
    const otherTeam = teams[selectedTeam];

    if (percentage > 0 && percentage <= 40 && price <= investingTeam.wallet) {
      // Deduct from investing team's wallet
      investingTeam.wallet -= price;

      // Add to the presenting team's wallet
      otherTeam.wallet += price;

      // Update shares bought
      const updatedShares = { ...investingTeam.sharesBought };
      updatedShares[selectedTeam] = (updatedShares[selectedTeam] || 0) + percentage;
      investingTeam.sharesBought = updatedShares;

      // Update state
      setTeams({
        ...teams,
        [presentingTeam]: investingTeam,
        [selectedTeam]: otherTeam,
      });

      alert(`Successfully invested in ${selectedTeam}`);
    } else {
      alert('Invalid transaction. Ensure the percentage is within limits and you have sufficient funds.');
    }

    setPercentage(0);
    setPrice(0);
  };

  return (
    <div className="InvestPage">
      <h1>{presentingTeam}</h1>
      <div className="order-section">
        <h2>Place Your Order</h2>
        <div>
          <label>Percentage of Available Stocks:</label>
          <input
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(Number(e.target.value))}
            max="40"
          />
        </div>
        <div>
          <label>Select Team:</label>
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            <option value="" disabled>Select Team</option>
            {Object.keys(teams)
              .filter((team) => team !== presentingTeam)
              .map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <button onClick={handlePlaceOrder}>Place Order</button>
      </div>

      <div className="wallet-section">
        <h3>Your Wallet: ₹{teams[presentingTeam].wallet}</h3>
      </div>

      <div className="assets-section">
        <h3>Your Assets:</h3>
        {Object.entries(teams[presentingTeam].sharesBought).map(([team, shares]) => (
          <p key={team}>
            {team}: {shares}% shares
          </p>
        ))}
      </div>
    </div>
  );
};

export default InvestPage;
