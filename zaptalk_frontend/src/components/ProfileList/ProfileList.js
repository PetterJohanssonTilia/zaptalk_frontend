import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

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

  const getAvatarUrl = (publicId) => {
    if (!publicId) return DEFAULT_AVATAR;
    return `https://res.cloudinary.com/dumvsoykz/image/upload/c_thumb,g_face,h_100,w_100/${publicId}`;
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Profiles</h1>
      <ul className="space-y-4">
        {profiles.map(profile => (
          <li key={profile.id} className="bg-white shadow rounded-lg p-4 flex items-center">
            <div className="mr-4">
              <img 
                src={getAvatarUrl(profile.avatar)}
                alt={`${profile.username}'s avatar`} 
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div>
              <Link 
                to={`/profile/${profile.id}`}
                className="text-lg font-semibold text-blue-600 hover:underline"
              >
                {profile.username}
              </Link>
              <div className="text-sm text-gray-600">
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