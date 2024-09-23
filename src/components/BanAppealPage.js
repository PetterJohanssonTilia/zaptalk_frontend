import React, { useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import './BanAppealPage.css';  // Import the CSS file

const BanAppealPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await api.post('ban-appeals/', {
        username,
        email,
        content
      });

      setMessage('Your ban appeal has been submitted successfully.');
      setUsername('');
      setEmail('');
      setContent('');
    } catch (error) {
      console.error('Ban appeal submission failed:', error);
      setError(`Failed to submit ban appeal: ${error.response?.data?.detail || 'Unknown error'}`);
    }
  };

  return (
    <div className="ban-appeal-page-container">
      <div className="ban-appeal-box">
        <h2>Submit Ban Appeal</h2>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="content">Why should your ban be lifted?</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit">Submit Appeal</button>
        </form>
        <div className="login-link">
          <p>Want to try logging in?</p>
          <Link to="/login">Click here to login</Link>
        </div>
      </div>
    </div>
  );
};

export default BanAppealPage;