import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

function EditProfile() {
  const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => {
    fetchFollowedUsers();
  }, []);

  const fetchFollowedUsers = async () => {
    try {
      const response = await api.get('userprofiles/me/following/');
      setFollowedUsers(response.data);
    } catch (error) {
      console.error('Error fetching followed users:', error);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await api.post(`userprofiles/${userId}/follow/`);
      // Refresh the list after unfollowing
      fetchFollowedUsers();
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <h3>Users You Follow</h3>
      <ul>
        {followedUsers.map(user => (
          <li key={user.id}>
            {user.username}
            <button onClick={() => handleUnfollow(user.id)}>Unfollow</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EditProfile;