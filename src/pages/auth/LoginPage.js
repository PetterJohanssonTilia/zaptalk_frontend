import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username || !password) {
      setErrorMessage('Please enter both username and password');
      return;
    }

    try {
      const response = await axios.post('https://zaptalk-api-c46804cb19e0.herokuapp.com/api/token/', {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data && response.data.access) {
        login(response.data.access);
        navigate('/home');
      } else {
        setErrorMessage('Invalid response from server');
      }
    } catch (err) {
      setErrorMessage(`Login failed: ${err.response?.data?.detail || 'Unknown error'}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  if (isLoggedIn) {
    return (
      <div className="login-page-container">
        <div className="login-box">
          <h2>You are logged in</h2>
          <button type="button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page-container">
      <div className="login-box">
        <h2>Login</h2>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="username">
              <span>Username:</span>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              />
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="register-link">
          <p>Don&apos;t have an account? </p>
          <Link to="/register">Click here to register</Link>
        </div>
        <div className="ban-appeal">
          <p>Has your account been banned?</p>
          <Link to="/ban-appeal">Click here to submit a ban appeal</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;