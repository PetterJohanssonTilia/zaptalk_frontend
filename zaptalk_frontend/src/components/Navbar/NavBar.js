import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import api from '../../api/axios';
import './NavBar.css';
import zaptalklogo from '../../assets/zaptalklogo.webp';

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
        <Link to="/home" className="nav-link">
          <img 
            src={zaptalklogo} 
            alt="Zaptalk Logo" 
            className="logo" 
            style={{ width: '100px', height: 'auto' }} 
          />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/movies" className="nav-link">Movies</Link>
            <Link to="/profiles" className="nav-link">Profiles</Link>
            <Link to="/feed" className="nav-link">Feed</Link>
          </Nav>
          {isLoggedIn && (
            <Nav className="ms-auto">
              <Dropdown align="end">
                <Dropdown.Toggle as="a" className="nav-link" id="profile-dropdown">
                  <img 
                    src={userProfile?.avatar || '/path/to/default/avatar.png'} 
                    alt="User Avatar" 
                    style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '5px' }} 
                  />
                  Profile
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/edit-profile">Profile</Dropdown.Item>
                  {userProfile?.is_superuser && (
                    <Dropdown.Item as={Link} to="/bans">Bans</Dropdown.Item>
                  )}
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          )}
          {!isLoggedIn && (
            <Nav className="ms-auto">
              <Link to="/login" className="nav-link">Login</Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;