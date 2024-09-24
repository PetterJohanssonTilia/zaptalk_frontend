import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import './ProfileList.css';
const DEFAULT_AVATAR = 'https://res.cloudinary.com/dumvsoykz/image/upload/v1724754182/default_profile_yvdjcm.jpg';

function ProfileList() {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await api.get('profiles/');
        const sortedProfiles = response.data.sort((a, b) => (b.followers_count || 0) - (a.followers_count || 0));
        setProfiles(sortedProfiles);
        setFilteredProfiles(sortedProfiles);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profiles: ' + (err.response?.data?.detail || err.message));
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    const results = profiles.filter(profile =>
      profile.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProfiles(results);
  }, [searchTerm, profiles]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-danger">{error}</div>;

  return (
    <div className="container-fluid profile-list">
      <div className="row justify-content-center mb-4">
        <div className="col-md-8 col-lg-6">
          <h1 className="text-center mb-4">User Profiles</h1>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search profiles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-3">
        {filteredProfiles.map(profile => (
          <div key={profile.id} className="col">
            <div className="card h-100 bg-dark text-white profile-card">
              <div className="text-center mt-3">
                <div className="avatar-container">
                  <Link 
                    to={`/profile/${profile.username}`}
                    className="card-title h5 mb-0 d-block profile-username"
                  >
                    <img 
                      src={profile.avatar || DEFAULT_AVATAR}
                      alt={`${profile.username}'s avatar`} 
                      className="rounded-circle profile-avatar"
                      onError={(e) => {
                        e.target.src = DEFAULT_AVATAR;
                      }}
                    />
                  </Link>
                </div>
              </div>
              <div className="card-body text-center">
                <Link 
                  to={`/profile/${profile.username}`}
                  className="card-title h5 mb-0 d-block profile-username"
                >
                  {profile.username}
                </Link>
                <p className="card-text small mt-2">
                  <span className="d-block">{profile.followers_count || 0} Followers</span>
                  <span className="d-block">{profile.total_likes_received || 0} Karma</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileList;