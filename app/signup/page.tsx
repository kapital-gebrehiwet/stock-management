'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
      });

      if (res.ok) {
        alert('Sign-up successful! Redirecting to sign-in page.');
        router.push('/signin');
      } else {
        const error = await res.json();
        alert(error.message);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        required
      />
      <button type="submit" className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600">Sign Up</button>
      <p className="text-center mt-4">
        Do you have an account?{' '}
        <a href="/signin" className="text-blue-500 hover:underline">Sign in</a>
      </p>
    </form>
  );
}
