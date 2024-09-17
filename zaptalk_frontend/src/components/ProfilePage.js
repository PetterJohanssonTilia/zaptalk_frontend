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
      const response = await api.post(`profiles/${profile.id}/follow/`);
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
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!profile) return <div className="text-center p-4">Profile not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex items-center mb-6">
            <img
              src={profile.avatar || DEFAULT_AVATAR}
              alt={`${profile.username}'s avatar`}
              className="w-24 h-24 rounded-full object-cover mr-6"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{profile.username}</h1>
              <div className="mt-2 text-gray-600">
                <span className="mr-4">{profile.followers_count} followers</span>
                <span>{profile.total_likes_received} likes</span>
              </div>
              <button
                onClick={handleFollowToggle}
                className={`mt-2 px-4 py-2 rounded ${
                  isFollowing
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Biography</h2>
            <p className="text-gray-600">{profile.bio || 'No biography available.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;