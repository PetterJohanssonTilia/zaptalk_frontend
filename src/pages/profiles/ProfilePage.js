import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../contexts/AuthContext';

const DEFAULT_AVATAR = 'https://res.cloudinary.com/dumvsoykz/image/upload/v1724754182/default_profile_yvdjcm.jpg';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const { username } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [profileResponse, currentUserResponse] = await Promise.all([
          api.get(`profiles/${username}/`),
          isLoggedIn ? api.get('profiles/me/', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          }) : Promise.resolve(null)
        ]);

        setProfile(profileResponse.data);
        setIsFollowing(profileResponse.data.is_following);

        if (currentUserResponse) {
          setCurrentUser({
            ...currentUserResponse.data,
            is_superuser: currentUserResponse.data.is_superuser,
            is_banned: currentUserResponse.data.is_banned
          });
        }
      } catch (err) {
        setError('Failed to fetch data: ' + (err.response?.data?.detail || err.message));
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
      setProfile(prev => ({
        ...prev,
        followers_count: isFollowing ? prev.followers_count - 1 : prev.followers_count + 1,
        is_following: !isFollowing
      }));
    } catch (err) {
      setError('Failed to update follow status: ' + (err.response?.data?.detail || err.message));
    }
  };

  const handleDeleteUser = async () => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await api.delete(`profiles/${profile.id}/`);
        alert('User deleted successfully');
        navigate('/home');
      } catch (err) {
        setError('Failed to delete user: ' + (err.response?.data?.detail || err.message));
      }
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-danger">{error}</div>;
  if (!profile) return <div className="text-center p-4">Profile not found</div>;

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <img
          src={profile.avatar || DEFAULT_AVATAR}
          alt={`${profile.username}'s avatar`}
          className="img-fluid mb-3"
          style={{ width: '250px', height: '250px', objectFit: 'cover' }}
        />
        <h1 className="display-4 mb-3">{profile.username}</h1>
        <div className="mb-3">
          <span className="me-3"><strong>{profile.followers_count}</strong> Followers</span>
          <span><strong>{profile.total_likes_received}</strong> Karma</span>
        </div>
        <button
          onClick={handleFollowToggle}
          className="btn btn-dark text-white"
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
        {currentUser && currentUser.is_superuser && (
          <button
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
    </div>
  );
}

export default ProfilePage;