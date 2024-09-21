import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../AuthContext/AuthContext';

const DEFAULT_AVATAR = 'https://res.cloudinary.com/dumvsoykz/image/upload/v1724754182/default_profile_yvdjcm.jpg';

function EditProfile() {
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [following, setFollowing] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { username: profileUsername } = useParams();

  useEffect(() => {
    const loadProfileAndFollowing = async () => {
      try {
        const profileResponse = await api.get(profileUsername ? `profiles/${profileUsername}/` : 'profiles/me/');
        const profileData = profileResponse.data;
        console.log('Profile data received:', profileData);
        setProfile(profileData);
        setUsername(profileData.username);
        setEmail(profileData.email);
        setBio(profileData.bio || '');
        
        // Use the username from the profile data to fetch the following list
        await fetchFollowing(profileData.username);
      } catch (error) {
        console.error('Error loading profile and following:', error);
        setError('Failed to load profile and following list. Please try again.');
      }
    };
  
    loadProfileAndFollowing();
  }, [profileUsername]);

  const fetchFollowing = async (username) => {
    const url = `profiles/${username}/following_list/`;
    console.log('Fetching following from URL:', url);
    try {
      const response = await api.get(url);
      console.log('Following data received:', response.data);
      setFollowing(response.data);
    } catch (error) {
      console.error('Error fetching following:', error);
      console.error('Error response:', error.response);
      setError('Failed to fetch following list. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('bio', bio);
    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      const response = await api.put('profiles/me/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Profile updated successfully:', response.data);
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await api.delete('profiles/me/');
        logout();
        navigate('/home');
      } catch (error) {
        console.error('Error deleting account:', error);
        setError('Failed to delete account. Please try again.');
      }
    }
  };

  const handleUnfollow = async (profileId) => {
    try {
      await api.post(`profiles/${profileId}/follow/`);
      // After unfollowing, remove the user from the following list
      setFollowing(prevFollowing => prevFollowing.filter(user => user.profile_id !== profileId));
    } catch (error) {
      console.error('Error unfollowing user:', error);
      setError('Failed to unfollow user. Please try again.');
    }
  };

  const isOwnProfile = !profileUsername || profileUsername === user.username;

  return (
    <div className="edit-profile p-4">
      <h1 className="text-2xl font-bold mb-4">{isOwnProfile ? 'Edit Profile' : `${profile.username}'s Profile`}</h1>
      {error && <div className="error-message text-red-500 mb-4">{error}</div>}
      {isOwnProfile && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio:</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Avatar:</label>
            <input
              type="file"
              onChange={(e) => setAvatar(e.target.files[0])}
              accept="image/*"
              className="mt-1 block w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Update Profile
          </button>
        </form>
      )}
      <h2 className="text-xl font-semibold mb-2">Following</h2>
      {following.length > 0 ? (
        <ul className="space-y-2">
          {following.map(followedUser => (
            <li key={followedUser.profile_id} className="flex items-center justify-between bg-white shadow rounded-lg p-2">
              <div className="flex items-center">
                <img
                  src={followedUser.avatar || DEFAULT_AVATAR}
                  alt={`${followedUser.username}'s avatar`}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <span className="text-gray-800">{followedUser.username}</span>
              </div>
              {isOwnProfile && (
                <button
                  onClick={() => handleUnfollow(followedUser.profile_id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
                >
                  Unfollow
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Not following anyone yet.</p>
      )}
      {isOwnProfile && (
        <button
          onClick={handleDeleteAccount}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Delete Account
        </button>
      )}
    </div>
  );
}

export default EditProfile;