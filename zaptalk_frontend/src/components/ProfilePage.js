import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

const DEFAULT_AVATAR = 'https://res.cloudinary.com/dumvsoykz/image/upload/v1724754182/default_profile_yvdjcm.jpg';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const { username } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`profiles/${username}/`);
        setProfile(response.data);
        setIsFollowing(response.data.is_following);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to fetch profile: ' + (err.response?.data?.detail || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

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
      console.error('Error toggling follow status:', err);
      setError('Failed to update follow status: ' + (err.response?.data?.detail || err.message));
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
      </div>

      <div className="mb-4 text-center">
        <h2 className="h4 mb-3">About me</h2>
        <p className="lead">{profile.bio || 'No biography available.'}</p>
      </div>
    </div>
  );
}

export default ProfilePage;