import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDeleteAccount = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      await api.delete('profiles/me/');
      logout();
      navigate('/home');
    } catch (errorMessage) {
      setError('Failed to delete account. Please try again.');
    }
    setShowDeleteConfirmation(false);
  };

  const cancelDeleteAccount = () => {
    setShowDeleteConfirmation(false);
  };
  
  const fetchFollowing = async (usernameToFetch) => {
    try {
      const response = await api.get(`profiles/${usernameToFetch}/following_list/`);
      setFollowing(response.data);
    } catch (errorMessage) {
      setError('Failed to fetch following list. Please try again.');
    }
  };

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
      } catch (errorMessage) {
        setError('Failed to load profile and following list. Please try again.');
      }
    };

    loadProfileAndFollowing();
  }, [profileUsername]);

  useEffect(() => {
    setUpdateSuccess(false);
  }, []);

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
    } catch (errorMessage) {
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleUnfollow = async (profileId) => {
    try {
      await api.post(`profiles/${profileId}/follow/`);
      setFollowing((prevFollowing) =>
        prevFollowing.filter((followedUser) => followedUser.profile_id !== profileId));
    } catch (errorMessage) {
      setError('Failed to unfollow user. Please try again.');
    }
  };

  const isOwnProfile = !profileUsername || profileUsername === user.username;

  return (
    <div className="container mx-auto p-4">
      <div className="row">
        <div className="col-md-4 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">
            {isOwnProfile ? 'Edit Profile' : `${profile?.username}'s Profile`}
          </h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {isOwnProfile && (
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email:
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark-input"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label htmlFor="bio" className="block text-sm font-medium mb-2">
                  Bio:
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark-input"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label htmlFor="avatar" className="block text-sm font-medium mb-2">
                  Avatar:
                  <input
                    type="file"
                    id="avatar"
                    onChange={(e) => setAvatar(e.target.files[0])}
                    accept="image/*"
                    className="mt-1 block w-full"
                  />
                </label>
              </div>
              {updateSuccess && (
                <div className="profileupdated">
                  Profile updated!
                </div>
              )}
              <div className="mb-4 flex flex-col">
                <button type="submit" className="rounded mb-4 custom-button">Update Profile</button>
                <br />
                {isOwnProfile && (
                  <button
                    type="button"
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
          <h2 className="text-xl font-semibold mb-4 text-center">{profile?.username}</h2>
          <img
            src={profile?.avatar || DEFAULT_AVATAR}
            alt={`${profile?.username}'s avatar`}
            className="main-avatar"
          />
        </div>

        <div className="col-md-4 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Following</h2>
          {following.length > 0 ? (
            <div className="following-list">
              {following.map((followedUser) => (
                <div key={followedUser.profile_id} className="card bg-dark text-white mb-3">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div className="following-user">
                      <Link
                        to={`/profile/${followedUser.username}`}
                        className="profile-username"
                      >
                        <img
                          src={followedUser.avatar || DEFAULT_AVATAR}
                          alt={`${followedUser.username}'s avatar`}
                          className="followed-users-avatar"
                        />
                        <span>{followedUser.username}</span>
                      </Link>
                    </div>
                    {isOwnProfile && (
                      <button
                        type="button"
                        onClick={() => handleUnfollow(followedUser.profile_id)}
                        className="rounded custom-button-delete"
                      >
                        Unfollow
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Not following anyone yet.</p>
          )}
        </div>
      </div>

      {showDeleteConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Account Deletion</h2>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="modal-buttons">
              <button 
                type="button" 
                onClick={confirmDeleteAccount} 
                className="btn btn-danger"
              >
                Yes, Delete My Account
              </button>
              <button 
                type="button" 
                onClick={cancelDeleteAccount} 
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

export default EditProfile;