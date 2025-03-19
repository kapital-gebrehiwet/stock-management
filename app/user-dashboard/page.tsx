'use client';

import Link from 'next/link';

export default function UserDashboard() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">User Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-4">Profile Management</h2>
          <Link
            href="/user-dashboard/profiles"
            className="block bg-blue-600 text-white text-center px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors"
          >
            View Profile
          </Link>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-4">Update Your Information</h2>
          <Link
            href="/user-dashboard/update-profile"
            className="block bg-blue-600 text-white text-center px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors"
          >
            Update Profile
          </Link>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-4">Stock Overview</h2>
          <Link
            href="/user-dashboard/stocks"
            className="block bg-blue-600 text-white text-center px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors"
          >
            View Available Stocks
          </Link>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-4">Sell report</h2>
          <Link
            href="/add-sell"
            className="block bg-blue-600 text-white text-center px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors"
          >
            sell report
          </Link>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-4">Add stock</h2>
          <Link
            href="/add-stock"
            className="block bg-blue-600 text-white text-center px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors"
          >
            Add stock
          </Link>
        </div>
        
      </div>
    </div>
  );
}