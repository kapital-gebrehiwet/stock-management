'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignIn() {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/signin', { username, password });
      const { token, role } = data;
      
      localStorage.setItem('authToken', token);

      router.push(role === 'Admin' ? '/admin-dashboard' : '/user-dashboard');
    } catch (error: any) {
      console.error('Sign-in error:', error);
      alert(error.response?.data?.message || 'Sign-In Failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20">
      <h1 className="text-xl font-bold mb-6">Sign In</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setusername(e.target.value)}
        placeholder="Username"
        required
        className="w-full border mb-4 p-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full border mb-4 p-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
      >
        Sign In
      </button>
    </form>
  );
}
