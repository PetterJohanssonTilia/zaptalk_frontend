import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import api from '../../api/axios';
import './NavBar.css';

function NavBar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn]);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('profiles/me/', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setUserProfile({
        ...response.data,
        is_superuser: response.data.is_superuser,
        is_banned: response.data.is_banned
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Link to="/home" className="nav-link">Logo</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/movies" className="nav-link">Movies</Link>
            <Link to="/profiles" className="nav-link">Profiles</Link>
            <Link to="/feed" className="nav-link">Feed</Link>
            {isLoggedIn ? (
              <>
                {userProfile?.is_superuser && (
                  <Link to="/bans" className="nav-link">Bans</Link>
                )}
                {userProfile?.is_banned ? (
                  <Link to="/ban-appeal" className="nav-link">Ban Appeal</Link>
                ) : (
                  <Link to="/edit-profile" className="nav-link">
                    <img 
                      src={userProfile?.avatar || '/path/to/default/avatar.png'} 
                      alt="User Avatar" 
                      style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '5px' }} 
                    />
                    Edit Profile
                  </Link>
                )}
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;