'use client';

import { useState } from 'react';
import axios from 'axios';

export default function UpdateProfile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axios.put('/api/user/update', { username, email }); // Update endpoint
      setMessage(data.message || 'Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter new username"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter new email"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Update
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
