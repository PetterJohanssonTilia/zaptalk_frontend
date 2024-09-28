import React, { useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';
import './BanAppealPage.css';

const BanAppealPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setMessage('');
    try {
      await api.post('ban-appeals/', {
        username,
        email,
        content,
      });
      setMessage('Your ban appeal has been submitted successfully.');
      setUsername('');
      setEmail('');
      setContent('');
    } catch (err) {
      setErrorMessage(`Failed to submit ban appeal: ${err.response?.data?.detail || 'Unknown error'}`);
    }
  };

  return (
    <div className="ban-appeal-page-container">
      <div className="ban-appeal-box">
        <h2>Submit Ban Appeal</h2>
        {message && <p className="success">{message}</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="username">
              <span>Username:</span>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-field">
            <label htmlFor="email">
              <span>Email:</span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-field">
            <label htmlFor="content">
              <span>Why should your ban be lifted?</span>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </label>
          </div>
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