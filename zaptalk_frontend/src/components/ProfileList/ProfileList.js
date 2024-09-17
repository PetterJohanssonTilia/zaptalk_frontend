import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import './ProfileList.css';

const DEFAULT_AVATAR = 'https://res.cloudinary.com/dumvsoykz/image/upload/v1724754182/default_profile_yvdjcm.jpg';


function ProfileList() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await api.get('profiles/');
        console.log('Response:', response.data);
        setProfiles(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error details:', err.response || err);
        setError('Failed to fetch profiles: ' + (err.response?.data?.detail || err.message));
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 profile-list">
      <h1 className="text-2xl font-bold mb-4">User Profiles</h1>
      <ul className="space-y-4">
        {profiles.map(profile => (
          <li key={profile.id} className="bg-white shadow rounded-lg p-4 flex items-center">
            <div className="mr-4">
              <img 
                src={profile.avatar || DEFAULT_AVATAR}
                alt={`${profile.username}'s avatar`} 
                className="w-12 h-12 rounded-full object-cover profile-avatar"
                onError={(e) => {
                  console.error(`Error loading avatar for ${profile.username}:`, e);
                  e.target.src = DEFAULT_AVATAR;
                }}
              />
            </div>
            <div className="profile-info">
              <Link 
                to={`/profile/${profile.username}`}
                className="text-lg font-semibold text-blue-600 hover:underline profile-username"
              >
                {profile.username}
              </Link>
              <div className="text-sm text-gray-600 profile-stats">
                <span className="mr-4">{profile.followers_count || 0} followers</span>
                <span>{profile.total_likes_received || 0} likes</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileList;