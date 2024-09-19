import React, { useState, useEffect } from 'react';
import api from '../api/axios';



const BanPage = () => {
  const [username, setUsername] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [bans, setBans] = useState([]);

  useEffect(() => {
    fetchActiveBans();
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
    </div>
  );
};

export default BanPage;