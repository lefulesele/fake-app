import React from 'react';
import { useAuth } from '../context/AuthContext';
import './pages.css';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>User Profile</h1>
      </div>
      
      <div className="content-card">
        <div className="profile-info">
          <div className="profile-item">
            <label>Name:</label>
            <span>{user?.name || 'N/A'}</span>
          </div>
          <div className="profile-item">
            <label>Email:</label>
            <span>{user?.email}</span>
          </div>
          <div className="profile-item">
            <label>Role:</label>
            <span>{user?.role || user?.user_type}</span>
          </div>
          <div className="profile-item">
            <label>User ID:</label>
            <span>{user?.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;