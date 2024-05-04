// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import api from '../components/api';

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await api.get('/profile'); // Assuming endpoint for fetching user profile
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }

    fetchUserProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      {/* Add other profile information here */}
    </div>
  );
}

export default UserProfile;
