'use client';

import Link from 'next/link';
import { useState } from 'react';
import './globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with actual auth check logic
  const [userRole, setUserRole] = useState('User'); // Track role ('Admin' or 'User')

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUserRole('User'); // Reset role on sign out
  };

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <nav className="bg-blue-600 p-4 fixed w-full top-0 z-10 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-white font-bold text-xl">Stock Management</div>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">
                  Home
                </Link>
              </li>
              {!isAuthenticated && (
                <>
                  <li>
                    <Link
                      href="/signup"
                      className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signin"
                      className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
                    >
                      Sign In
                    </Link>
                  </li>
                </>
              )}
              {isAuthenticated && (
                <>
                  <li>
                    <Link
                      href={userRole === 'Admin' ? '/admin-dashboard' : '/user-dashboard'}
                      className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/stocks"
                      className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
                    >
                      Stocks
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/add-stock"
                      className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
                    >
                      Add Stock
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="text-white bg-red-500 hover:bg-red-700 px-3 py-2 rounded-md"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
