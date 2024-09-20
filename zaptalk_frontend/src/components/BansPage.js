import React, { useState, useEffect } from 'react';
import api from '../api/axios';



const BanPage = () => {
  const [username, setUsername] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [bans, setBans] = useState([]);
  const [appeals, setAppeals] = useState([]);

 useEffect(() => {
    fetchActiveBans();
    fetchBanAppeals();
  }, []);

  const fetchActiveBans = async () => {
    try {
      const response = await api.get('bans/active_bans/');
      setBans(response.data);
    } catch (error) {
      console.error('Error fetching active bans:', error.response?.data || error.message);
      setMessage('Failed to fetch active bans. Please try again.');
    }
  };

  const fetchBanAppeals = async () => {
    try {
      const response = await api.get('ban-appeals/');
      setAppeals(response.data);
    } catch (error) {
      console.error('Error fetching ban appeals:', error.response?.data || error.message);
      setMessage('Failed to fetch ban appeals. Please try again.');
    }
  };

  const handleBanSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('bans/ban_user/', { username, reason });
      console.log('Ban response:', response.data);
      setMessage(`User ${username} has been banned successfully.`);
      setUsername('');
      setReason('');
      fetchActiveBans();
    } catch (error) {
      console.error('Error banning user:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        setMessage(error.response.data.message || `Error: ${error.response.status}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        setMessage('No response received from server. Please try again.');
      } else {
        console.error('Error message:', error.message);
        setMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleUnban = async (username) => {
    try {
      const response = await api.post('bans/unban_user/', { username });
      setMessage(response.data.message);
      fetchActiveBans();
      fetchBanAppeals();
    } catch (error) {
      console.error('Error unbanning user:', error);
      setMessage('Failed to unban user. Please try again.');
    }
  };

  return (
    <div>
      <h1>Ban User</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleBanSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="reason">Reason for Ban:</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ban User</button>
      </form>

      <h2>Active Bans</h2>
      <ul>
        {bans.map((ban) => (
          <li key={ban.id}>
            <p>User: {ban.user_username}</p>
            <p>Reason: {ban.reason}</p>
            <p>Banned by: {ban.banned_by_username}</p>
            <p>Banned at: {new Date(ban.banned_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>

      <h2>Ban Appeals</h2>
      <ul>
        {appeals.map((appeal) => (
          <li key={appeal.id}>
            <p>User: {appeal.user_username}</p>
            <p>Email: {appeal.email}</p>
            <p>Message: {appeal.content}</p>
            <button onClick={() => handleUnban(appeal.user_username)}>Unban User</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BanPage;