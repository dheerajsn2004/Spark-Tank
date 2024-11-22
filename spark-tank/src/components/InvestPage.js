import React, { useState, } from 'react';
import './InvestPage.css';

const InvestPage = () => {
  // State variables
  const [companies, setCompanies] = useState([
    { name: 'Company A', value: 1000, sharesAvailable: 40 },
    { name: 'Company B', value: 2000, sharesAvailable: 40 },
    { name: 'Company C', value: 3000, sharesAvailable: 40 },
    { name: 'Company D', value: 4000, sharesAvailable: 40 },
  ]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [remainingPurse, setRemainingPurse] = useState(5000);
  const [sharesToBuy, setSharesToBuy] = useState(0);
  const [message, setMessage] = useState('');

  const handleInvest = () => {
    const company = companies.find(c => c.name === selectedCompany);
    const totalCost = company.value * sharesToBuy;

    if (sharesToBuy <= 0 || sharesToBuy > company.sharesAvailable) {
      setMessage('Please enter a valid number of shares to purchase.');
      return;
    }

    if (totalCost > remainingPurse) {
      setMessage('You do not have enough funds to make this purchase.');
      return;
    }

    // Update remaining purse
    setRemainingPurse(prev => prev - totalCost);

    // Update company's share value
    company.sharesAvailable -= sharesToBuy;
    company.value += company.value * 0.05; // Increase value by 5% per transaction

    setCompanies([...companies]);

    setMessage(`Successfully purchased ${sharesToBuy} shares in ${company.name}.`);
  };

  return (
    <div className="InvestPage">
      <div className="InvestPage-content">
        <h1>Invest in Companies</h1>
        <div className="dropdown-container">
          <label>Select Company:</label>
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            <option value="">Select a company</option>
            {companies.map((company, index) => (
              <option key={index} value={company.name}>
                {company.name} - Rs. {company.value} per share
              </option>
            ))}
          </select>
        </div>

        <div className="input-container">
          <label>Enter number of shares to purchase:</label>
          <input
            type="number"
            value={sharesToBuy}
            onChange={(e) => setSharesToBuy(Number(e.target.value))}
          />
        </div>

        <div className="purse-container">
          <p>Remaining Purse: Rs. {remainingPurse}</p>
        </div>

        <button className="invest-btn" onClick={handleInvest}>
          Invest Now
        </button>

        {message && <p className="message">{message}</p>}

        <div className="company-status">
          <h2>Company Status</h2>
          {companies.map((company, index) => (
            <div key={index} className="company-info">
              <p>
                <strong>{company.name}</strong>: Rs. {company.value} per share, {company.sharesAvailable} shares available
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestPage;
