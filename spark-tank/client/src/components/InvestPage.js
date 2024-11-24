import React, { useState, useEffect } from 'react';
import { buyShares, fetchTransactionLogsForTeam } from '../api/transactionServices';
import { fetchTeamById } from '../api/teamServices'; // Assuming you have this API
import './InvestPage.css';

const InvestPage = ({ registeredTeam, userId }) => {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedPercentage, setSelectedPercentage] = useState('');
  const [equivalentValue, setEquivalentValue] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [availableTeams, setAvailableTeams] = useState([]);
  const [transactionLogs, setTransactionLogs] = useState([]);
  const [remainingStocks, setRemainingStocks] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [backendError, setBackendError] = useState('');

  const value = 5000; // Assuming base value is fixed

  // Fetch available shares using teamId
  const fetchRemainingStocks = async (teamId) => {
    try {
      const team = await fetchTeamById(teamId);
      return team.availableShares;
    } catch (error) {
      console.error('Error fetching remaining stocks:', error);
      throw error;
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const teamDetails = await fetchTeamById(userId);
        setWalletBalance(teamDetails.wallet);

        const logs = await fetchTransactionLogsForTeam(userId);
        setTransactionLogs(logs || []);

        const allTeams = JSON.parse(localStorage.getItem('teams')) || {};
        const teamsArray = Object.keys(allTeams)
          .filter((teamName) => teamName !== registeredTeam)
          .map((teamName) => ({
            id: allTeams[teamName].id,
            name: teamName,
          }));

        setAvailableTeams(teamsArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    loadInitialData();
  }, [userId, registeredTeam]);

  useEffect(() => {
    if (selectedPercentage) {
      setEquivalentValue((selectedPercentage / 100) * value);
    }
  }, [selectedPercentage]);

  useEffect(() => {
    const fetchStocks = async () => {
      if (selectedTeam) {
        try {
          const availableShares = await fetchRemainingStocks(selectedTeam);
          setRemainingStocks(availableShares);
          setErrorMessage('');
        } catch (error) {
          console.error('Error fetching stocks:', error);
          setRemainingStocks(null);
        }
      } else {
        setRemainingStocks(null);
      }
    };

    fetchStocks();
  }, [selectedTeam]);

  const handlePlaceOrder = async () => {
    setErrorMessage('');
    setBackendError('');
    if (!selectedTeam) {
      setErrorMessage('Please select a team to invest in.');
      return;
    }
    if (!selectedPercentage) {
      setErrorMessage('Please select a percentage to buy.');
      return;
    }

    const sharesToBuy = selectedPercentage;
    const transactionData = {
      purchasingTeamId: userId,
      sellingTeamId: selectedTeam,
      sharesToBuy,
      costPerShare: equivalentValue,
    };

    try {
      await buyShares(transactionData);
      alert(`Order placed for ${selectedPercentage}% shares in ${getTeamNameById(selectedTeam)}!`);
      const logs = await fetchTransactionLogsForTeam(userId);
      setTransactionLogs(logs || []);
    } catch (error) {
      console.error('Error placing order:', error);
      setBackendError(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  const getTeamNameById = (id) => {
    const allTeams = JSON.parse(localStorage.getItem('teams')) || {};
    const teamEntry = Object.entries(allTeams).find(([teamName, teamData]) => teamData.id === id);
    return teamEntry ? teamEntry[0] : 'Unknown Team';
  };

  return (
    <div className="InvestPage">
      <div className="presenting-team">
        <h1>Investing Team: {registeredTeam || 'Unknown'}</h1>
      </div>
      <div className="content">
        <div className="place-order">
          <h2>Place Your Order</h2>
          <div className="order-box">
            <div className="field">
              <label>Select Team to Invest In:</label>
              <select
                className="dropdown"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
              >
                <option value="">Select Team</option>
                {availableTeams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
              {remainingStocks !== null && (
                <p>Remaining Stocks: {40 - remainingStocks}%</p>
              )}
            </div>
            <div className="field">
              <label>Select Percentage to Buy:</label>
              <select
                className="dropdown"
                value={selectedPercentage}
                onChange={(e) => setSelectedPercentage(Number(e.target.value))}
              >
                <option value="">Select</option>
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
                value={`₹${equivalentValue.toFixed(2)}`}
                readOnly
              />
            </div>
            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {backendError && <p className="error">{backendError}</p>}
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
          <div className="transaction-logs">
            <h3>Transaction History</h3>
            {transactionLogs.length > 0 ? (
              <div className="logs-box">
                {transactionLogs.map((log, index) => (
                  <div key={index} className="log-item">
                    <p>
                      Bought {log.sharesBought}% shares for ₹{log.costPerShare} from{' '}
                      {getTeamNameById(log.sellingTeamId)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No transactions yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestPage;
