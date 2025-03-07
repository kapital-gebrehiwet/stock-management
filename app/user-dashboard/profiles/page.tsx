'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface UserProfile {
  username: string;
  email: string;
  role: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          return;
        }

        // Make API request with Authorization header
        const { data } = await axios.get('/api/user/profile', {
          headers: {
            Authorization: `Bearer $localStorage.getItem('token')`, // Add token in the Authorization header
          },
        });

        setProfile(data);
      } catch (err) {
        setError('Failed to load profile. Please ensure you are logged in.');
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>
        <strong>Username:</strong> {profile.username}
      </p>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      <p>
        <strong>Role:</strong> {profile.role}
      </p>
    </div>
  );
}
