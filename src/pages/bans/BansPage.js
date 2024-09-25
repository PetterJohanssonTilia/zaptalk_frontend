import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

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
      setMessage('Failed to fetch active bans. Please try again.');
    }
  };

  const fetchBanAppeals = async () => {
    try {
      const response = await api.get('ban-appeals/');
      setAppeals(response.data);
    } catch (error) {
      setMessage('Failed to fetch ban appeals. Please try again.');
    }
  };

  const handleBanSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('bans/ban_user/', { username, reason });
      setMessage(`User ${username} has been banned successfully.`);
      setUsername('');
      setReason('');
      fetchActiveBans();
    } catch (error) {
      setMessage('Failed to ban user. Please try again.');
    }
  };

  const handleUnban = async (username) => {
    try {
      const response = await api.post('bans/unban_user/', { username });
      setMessage(response.data.message);
      fetchActiveBans();
      fetchBanAppeals();
    } catch (error) {
      setMessage('Failed to unban user. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <div className="card bg-dark">
            <div className="card-body bg-dark">
              <h5 className="card-title text-center ">Ban User</h5>
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={handleBanSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username:</label>
                  <input
                    id="username"
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="reason" className="form-label">Reason for Ban:</label>
                  <textarea
                    id="reason"
                    className="form-control"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-danger w-100">Ban User</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card bg-dark text-white mb-4">
            <div className="card-body">
              <h2 className="card-title">Active Bans</h2>
              <ul className="list-group list-group-flush">
                {bans.map((ban) => (
                  <li key={ban.id} className="list-group-item bg-dark text-white">
                    <h5>{ban.user_username}</h5>
                    <p>Reason: {ban.reason}</p>
                    <p>Banned by: {ban.banned_by_username}</p>
                    <p>Banned at: {new Date(ban.banned_at).toLocaleString()}</p>
                    <button 
                      className="btn btn-success btn-sm" 
                      onClick={() => handleUnban(ban.user_username)}
                    >
                      Unban User
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card bg-dark text-white mb-4">
            <div className="card-body">
              <h2 className="card-title">Ban Appeals</h2>
              <ul className="list-group list-group-flush">
                {appeals.map((appeal) => (
                  <li key={appeal.id} className="list-group-item bg-dark text-white">
                    <h5>{appeal.user_username}</h5>
                    <p>Email: {appeal.email}</p>
                    <p>Message: {appeal.content}</p>
                    <button 
                      className="btn btn-success btn-sm" 
                      onClick={() => handleUnban(appeal.user_username)}
                    >
                      Unban User
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BanPage;