'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Profile {
  fullName: string;
  phoneNumber: string;
  address: string;
  bio: string;
  avatar: string;
}

export default function UpdateProfile() {
  const [profile, setProfile] = useState<Profile>({
    fullName: '',
    phoneNumber: '',
    address: '',
    bio: '',
    avatar: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load existing profile data
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
    setLoading(false);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('authToken');
      const { data } = await axios.put(
        '/api/user/update-profile',
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      localStorage.setItem('userProfile', JSON.stringify(data.profile));
      setMessage('Profile updated successfully!');
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to update profile.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Update Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter your address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            rows={4}
            placeholder="Tell us about yourself"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Avatar URL</label>
          <input
            type="url"
            name="avatar"
            value={profile.avatar}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter avatar image URL"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Update Profile
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-4 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}
    </div>
  );
}
