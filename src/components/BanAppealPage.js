import React, { useState } from 'react';
import api from '../api/axios';

function BanAppealPage() {
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
    <div>
      <h2>Submit Ban Appeal</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Why should your ban be lifted?</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Appeal</button>
      </form>
    </div>
  );
}

export default BanAppealPage;