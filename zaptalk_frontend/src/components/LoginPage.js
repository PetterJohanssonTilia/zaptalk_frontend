import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext/AuthContext';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      const response = await axios.post('https://zaptalk-api-c46804cb19e0.herokuapp.com/api/token/', {
        username,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data && response.data.access) {
        login(response.data.access);
        navigate('/home');
      } else {
        setError('Invalid response from server');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError(`Login failed: ${error.response?.data?.detail || 'Unknown error'}`);
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
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <div className="register-link">
          <p>Don't have an account? </p>
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