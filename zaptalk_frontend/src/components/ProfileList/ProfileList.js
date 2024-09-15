import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

function ProfileList() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        console.log('Token:', localStorage.getItem('token')); // Log the token
        const response = await api.get('profiles/');
        console.log('Response:', response.data); // Log the response
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>User Profiles</h1>
      <ul>
        {profiles.map(profile => (
          <li key={profile.id}>
            <Link to={`/profile/${profile.id}`}>
              {profile.username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileList;