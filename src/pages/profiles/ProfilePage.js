import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../contexts/AuthContext';
import './ProfilePage.css';

const DEFAULT_AVATAR = 'https://res.cloudinary.com/dumvsoykz/image/upload/v1724754182/default_profile_yvdjcm.jpg';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [followErrorMessage, setFollowErrorMessage] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { username } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrorMessage(null);
      try {
        const profileResponse = await api.get(`profiles/${username}/`);
        setProfile(profileResponse.data);
        setIsFollowing(profileResponse.data.is_following);

        if (isLoggedIn) {
          const currentUserResponse = await api.get('profiles/me/', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          setCurrentUser({
            ...currentUserResponse.data,
            is_superuser: currentUserResponse.data.is_superuser,
            is_banned: currentUserResponse.data.is_banned,
          });
        }
      } catch (err) {
        setErrorMessage(`Failed to fetch data: ${err.response?.data?.detail || err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, isLoggedIn]);

  const handleFollowToggle = async () => {
    if (!profile) return;

    try {
      await api.post(`profiles/${profile.id}/follow/`);
      setIsFollowing(!isFollowing);
      setProfile((prev) => ({
        ...prev,
        followers_count: isFollowing ? prev.followers_count - 1 : prev.followers_count + 1,
        is_following: !isFollowing,
      }));
      setFollowErrorMessage(null);
    } catch (err) {
      setFollowErrorMessage(`Failed to update follow status: ${err.response?.data?.detail || err.message}`);
    }
  };

  const handleDeleteUser = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteUser = async () => {
    try {
      await api.delete(`profiles/${profile.id}/`);
      navigate('/home');
    } catch (err) {
      setErrorMessage(`Failed to delete user: ${err.response?.data?.detail || err.message}`);
    }
    setShowDeleteConfirmation(false);
  };

  const cancelDeleteUser = () => {
    setShowDeleteConfirmation(false);
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (errorMessage) return <div className="text-center p-4 text-danger">{errorMessage}</div>;
  if (!profile) return <div className="text-center p-4">Profile not found</div>;

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <img
          src={profile.avatar || DEFAULT_AVATAR}
          alt={`${profile.username}'s avatar`}
          className="profilepage-avatar"
        />
        <h1 className="display-4 mb-3">{profile.username}</h1>
        <div className="mb-3">
          <span className="me-3">
            <strong>{profile.followers_count}</strong>
            {' '}
            Followers
          </span>
          <span>
            <strong>{profile.total_likes_received}</strong>
            {' '}
            Karma
          </span>
        </div>
        {followErrorMessage && (
          <div className="mb-3 fw-bold text-danger">{followErrorMessage}</div>
        )}
        <button
          type="button"
          onClick={handleFollowToggle}
          className="btn btn-dark text-white"
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
        {currentUser && currentUser.is_superuser && (
          <button
            type="button"
            onClick={handleDeleteUser}
            className="btn btn-danger ms-2"
          >
            Delete User
          </button>
        )}
      </div>

      <div className="mb-4 text-center">
        <h2 className="h4 mb-3">About me</h2>
        <p className="lead">{profile.bio || 'No biography available.'}</p>
      </div>

      {showDeleteConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm User Deletion</h2>
            <p>Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="modal-buttons">
              <button 
                type="button" 
                onClick={confirmDeleteUser} 
                className="btn btn-danger"
              >
                Yes, Delete User
              </button>
              <button 
                type="button" 
                onClick={cancelDeleteUser} 
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;