import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import './UserRegistration.css';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('auth/registration/', {
        username,
        email,
        password1: password,
        password2: confirmPassword,
      });

      const tokenResponse = await api.post('/token/', {
        username,
        password,
      });
      localStorage.setItem('access_token', tokenResponse.data.access);
      localStorage.setItem('refresh_token', tokenResponse.data.refresh);

      navigate('/home');
    } catch (err) {
      setError(`Registration failed: ${err.response?.data?.detail || err.message}`);
    }
  };

  return (
    <div className="registration-page-container">
      <div className="registration-box">
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
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
              <span> Email:</span>
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
            <label htmlFor="password">
              <span>Password:</span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-field">
            <label htmlFor="confirmPassword">
              <span>Confirm Password:</span>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">Register</button>
        </form>
        <div className="login-link">
          <p>
            Already have an account?
            <Link to="/login">Click here to login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;