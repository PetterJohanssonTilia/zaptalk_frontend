import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../contexts/AuthContext';
import './EditProfile.css';

const DEFAULT_AVATAR = 'https://res.cloudinary.com/dumvsoykz/image/upload/v1724754182/default_profile_yvdjcm.jpg';

function EditProfile() {
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [following, setFollowing] = useState([]);
  const [error, setError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { username: profileUsername } = useParams();

  useEffect(() => {
    const loadProfileAndFollowing = async () => {
      try {
        const profileResponse = await api.get(profileUsername ? `profiles/${profileUsername}/` : 'profiles/me/');
        const profileData = profileResponse.data;
        setProfile(profileData);
        setUsername(profileData.username);
        setEmail(profileData.email);
        setBio(profileData.bio || '');
        await fetchFollowing(profileData.username);
      } catch (error) {
        setError('Failed to load profile and following list. Please try again.');
      }
    };

    loadProfileAndFollowing();
  }, [profileUsername]);

  useEffect(() => {
    setUpdateSuccess(false);
  }, []);

  const fetchFollowing = async (username) => {
    try {
      const response = await api.get(`profiles/${username}/following_list/`);
      setFollowing(response.data);
    } catch (error) {
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
      await api.put('profiles/me/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUpdateSuccess(true);
    } catch (error) {
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await api.delete('profiles/me/');
        logout();
        navigate('/home');
      } catch (error) {
        setError('Failed to delete account. Please try again.');
      }
    }
  };

  const handleUnfollow = async (profileId) => {
    try {
      await api.post(`profiles/${profileId}/follow/`);
      setFollowing((prevFollowing) => prevFollowing.filter((user) => user.profile_id !== profileId));
    } catch (error) {
      setError('Failed to unfollow user. Please try again.');
    }
  };

  const isOwnProfile = !profileUsername || profileUsername === user.username;

  return (
    <div className="container mx-auto p-4">
      <div className="row">
        <div className="col-md-4 shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">{isOwnProfile ? 'Edit Profile' : `${profile.username}'s Profile`}</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {isOwnProfile && (
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium">Username:</label>
                <br></br>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark-input"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">Email:</label>
                <br></br>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark-input"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="bio" className="block text-sm font-medium">Bio:</label>
                <br></br>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark-input"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="avatar" className="block text-sm font-medium">Avatar:</label>
                <br></br>
                <input
                  type="file"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  accept="image/*"
                  className="mt-1 block w-full "
                />
              </div>
              <br></br>
              {updateSuccess && (
                <div className="profileupdated">
                  Profile updated!
                </div>
              )}
              <div className="mb-4">
                <button type="submit" className="rounded mb-4 custom-button">Update Profile</button>
                <br></br>
                {isOwnProfile && (
                <button
                    onClick={handleDeleteAccount}
                    className="rounded custom-button-delete"
                  >
                    Delete Account
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
  
        <div className="col-md-4 shadow-lg rounded-lg p-6 d-flex flex-column align-items-center">
          <h2 className="text-xl font-semibold mb-4">{profile?.username}</h2>
          <img
            src={profile?.avatar || DEFAULT_AVATAR}
            alt={`${profile?.username}'s avatar`}
            className='main-avatar'
          />
        </div>
  
        <div className="col-md-4 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Following</h2>
          {following.length > 0 ? (
            <ul className="space-y-4">
              {following.map((followedUser) => (
                <li key={followedUser.profile_id} className="d-flex justify-content-between align-items-center mb-4">
                  <div className="d-flex align-items-center">
                    <img
                      src={followedUser.avatar || DEFAULT_AVATAR}
                      alt={`${followedUser.username}'s avatar`}
                      className='followed-users-avatar'
                    />
                    <span>{followedUser.username}</span>
                  </div>
                  {isOwnProfile && (
                    <button
                      onClick={() => handleUnfollow(followedUser.profile_id)}
                      className="rounded custom-button-delete"
                    >
                      Unfollow
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>Not following anyone yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditProfile;