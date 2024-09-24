import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
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

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserProfile();
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    } else {
      setUserProfile(null);
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (dropdownOpened) {
      const markAsRead = async () => {
        try {
          await api.post('notifications/mark_all_as_read/', null, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
          setUnreadCount(0);
          setDropdownOpened(false);
        } catch (error) {
          console.error('Error marking notifications as read:', error);
        }
      };
      markAsRead();
    }
  }, [dropdownOpened]);

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
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await api.get('notifications/', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const allNotifications = response.data;
      setNotifications(allNotifications.slice(0, 10)); // Limit to 10 notifications
      setUnreadCount(allNotifications.filter(notif => !notif.is_read).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleLogout = () => {
    logout();
    setUserProfile(null);
    navigate('/home');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar expand="lg" className="custom-navbar navbar-dark">
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
                      <span>{notification.sender_username} {notification.notification_type === 'follow' ? 'followed' : 'liked'} you</span>
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