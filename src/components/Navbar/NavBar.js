import React, { useState, useEffect, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api/axios';
import './NavBar.css';
import zaptalklogo from '../../assets/zaptalklogo.webp';
import { Bell } from 'react-bootstrap-icons';

function NavBar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [userProfile, setUserProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = useCallback(() => {
    logout();
    setUserProfile(null);
    navigate('/home');
  }, [logout, navigate]);

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await api.get('profiles/me/', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setUserProfile({
        ...response.data,
        is_superuser: response.data.is_superuser,
        is_banned: response.data.is_banned
      });
    } catch (err) {
      setError('Error fetching user profile');
      if (err.response && err.response.status === 401) {
        handleLogout();
      }
    }
  }, [handleLogout]);

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await api.get('notifications/', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const allNotifications = response.data;
      setNotifications(allNotifications.slice(0, 10)); // Limit to 10 notifications
      setUnreadCount(allNotifications.filter(notif => !notif.is_read).length);
    } catch (err) {
      setError('Error fetching notifications');
    }
  }, []);

  useEffect(() => {
    let interval;
    if (isLoggedIn) {
      fetchUserProfile();
      fetchNotifications();
      interval = setInterval(fetchNotifications, 30000);
    } else {
      setUserProfile(null);
      setNotifications([]);
      setUnreadCount(0);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isLoggedIn, fetchUserProfile, fetchNotifications]);

  useEffect(() => {
    if (dropdownOpened) {
      const markAsRead = async () => {
        try {
          await api.post('notifications/mark_all_as_read/', null, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
          setUnreadCount(0);
          setDropdownOpened(false);
        } catch (err) {
          setError('Error marking notifications as read');
        }
      };
      markAsRead();
    }
  }, [dropdownOpened]);

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar expand="lg" className="custom-navbar navbar-dark">
      <Container>
        {error && (
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
            {error}
          </Alert>
        )}
        <Link to="/home" className="nav-link nav-link-logo">
          <img 
            src={zaptalklogo} 
            alt="Zaptalk Logo" 
            className="logo"             
          />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/movies" className={`nav-link ${isActive('/movies') ? 'active' : ''}`}>Movies</Link>
            <Link to="/profiles" className={`nav-link ${isActive('/profiles') ? 'active' : ''}`}>Profiles</Link>
            <Link to="/feed" className={`nav-link ${isActive('/feed') ? 'active' : ''}`}>Feed</Link>
          </Nav>
          {isLoggedIn && userProfile ? (
            <Nav className="ms-auto">
              <Dropdown 
                align="end" 
                className="me-2"
                onToggle={(isOpen) => {
                  if (isOpen && !dropdownOpened) {
                    setDropdownOpened(true);
                  }
                }}
              >
                <Dropdown.Toggle as="a" className="nav-link" id="notification-dropdown">
                  <Bell color={unreadCount > 0 ? 'red' : 'white'} />
                  {unreadCount > 0 && <span className="badge bg-danger">{unreadCount}</span>}
                </Dropdown.Toggle>
                <Dropdown.Menu className="bg-dark notification-dropdown">
                  {notifications.map(notification => (
                    <Dropdown.Item 
                      key={notification.id} 
                      onClick={() => navigate(`/profile/${notification.sender_username}`)}
                    >
                      <img 
                        src={notification.sender_avatar || '/path/to/default/avatar.png'} 
                        alt="Sender Avatar" 
                        className="notification-avatar" 
                      />
                      <span className="notification-text">{notification.sender_username} {notification.notification_type === 'follow' ? 'followed' : 'liked'} you</span>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown align="end">
                <Dropdown.Toggle as="a" className="nav-link" id="profile-dropdown">
                  <img 
                    src={userProfile.avatar || '/path/to/default/avatar.png'} 
                    alt="User Avatar" 
                    className="notification-avatar"
                  />
                  {userProfile.username || 'Profile'}
                </Dropdown.Toggle>
                <Dropdown.Menu className="bg-dark">
                  <Dropdown.Item as={Link} to="/edit-profile">Profile</Dropdown.Item>
                  {userProfile.is_superuser && (
                    <Dropdown.Item as={Link} to="/bans">Bans</Dropdown.Item>
                  )}
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <Link to="/login" className={`nav-link ${isActive('/login') ? 'active' : ''}`}>Login</Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;