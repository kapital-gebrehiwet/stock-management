'use client';

import Link from 'next/link';

export default function UserDashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <ul className="list-none space-y-4">
        <li>
          <Link
            href="/user-dashboard/profiles"
            className="block bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            View Profile
          </Link>
        </li>
        <li>
          <Link
            href="/user-dashboard/update-profile"
            className="block bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            Update Profile
          </Link>
        </li>
        <li>
          <Link
            href="/user-dashboard/stocks"
            className="block bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            View Available Stocks
          </Link>
        </li>
      </ul>
    </div>
  );
}
