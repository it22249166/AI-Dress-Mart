// src/pages/Profile.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(AuthContext);

  // Redirect to login if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="profile-container" style={{ padding: '2rem' }}>
      <h1>My Profile</h1>
      <div style={{ marginTop: '1rem' }}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.isAdmin ? 'Admin' : 'User'}</p>
      </div>
    </div>
  );
};

export default Profile;