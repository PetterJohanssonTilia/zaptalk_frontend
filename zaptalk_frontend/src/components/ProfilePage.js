import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log('Fetching profile for:', username); // Check this log
        const response = await api.get(`profiles/${username}/`); // This should match the API endpoint
        console.log('Profile data:', response.data); // Check the response data
        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error details:', err.response || err); // Check the error details
        setError('Failed to fetch profile: ' + (err.response?.data?.detail || err.message));
        setLoading(false);
      }
    };
  
    fetchProfile();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div>
      <h1>{profile.username}'s Profile</h1>
      <p>Bio: {profile.bio}</p>
      {/* Add more profile details here */}
    </div>
  );
}

export default ProfilePage;