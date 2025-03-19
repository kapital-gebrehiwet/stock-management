'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Ensure your Next.js version supports this
import axios from 'axios';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/signin', { username, password });
      const { token, role, user } = data;

      // Store token and user info in local storage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', user?.id || '');
      localStorage.setItem('userRole', role);
      localStorage.setItem('userProfile', JSON.stringify(user?.profile || {}));

      // Redirect based on user role
      router.push(role === 'Admin' ? '/admin-dashboard' : '/user-dashboard');
    } catch (error: any) {
      console.error('Sign-in error:', error);
      alert(error.response?.data?.message || 'Sign-In Failed');
    }
  };

  const redirectToSignup = () => {
    router.push('/signup'); // Redirect to signup page
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-20">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-md w-full hover:bg-green-600"
      >
        Sign In
      </button>
      <p className="text-center mt-4">
        Don't have an account?{' '}
        <span onClick={redirectToSignup} className="text-blue-500 hover:underline cursor-pointer">
          Sign Up
        </span>
      </p>
    </form>
  );
}