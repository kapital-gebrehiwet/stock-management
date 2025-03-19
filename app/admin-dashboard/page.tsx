'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export default function AdminDashboard() {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Admin Dashboard</h1>

      <nav className="bg-gray-200 border p-6 rounded-lg mb-6 shadow-md">
        <ul className="flex space-x-6 justify-center">
          <li>
            <Link href="/admin-dashboard/stock-levels" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all">
              Current Stock Levels
            </Link>
          </li>
          <li>
            <Link href="/admin-dashboard/notifications" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all flex items-center space-x-2">
              <FontAwesomeIcon icon={faBell} />
              
            </Link>
          </li>

          <li>
          <Link href="/user-management" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all">
              view users
            </Link>
          </li>
          <li>
          <Link href="/admin-dashboard/sale-levels" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all">
              view sales
            </Link>
          </li>
        </ul>
      </nav>
      
    </div>
  );
}
