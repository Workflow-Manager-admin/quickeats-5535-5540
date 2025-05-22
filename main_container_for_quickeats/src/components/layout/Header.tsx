'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// PUBLIC_INTERFACE
interface HeaderProps {
  toggleSidebar: () => void;
}

/**
 * Header component for QuickEats application containing logo, navigation, and user actions
 */
const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and menu button */}
          <div className="flex items-center">
            <button 
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 md:hidden"
              onClick={toggleSidebar}
              aria-label="Open sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <Link href="/" className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="text-orange-500 font-bold text-2xl">QuickEats</div>
              </div>
            </Link>
          </div>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link href="/restaurants" className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium">
              Restaurants
            </Link>
            <Link href="/orders" className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium">
              My Orders
            </Link>
          </nav>
          
          {/* User actions */}
          <div className="flex items-center space-x-4">
            {/* Search bar */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="absolute right-0 top-0 flex items-center">
                  <input
                    type="text"
                    placeholder="Search restaurants..."
                    className="border rounded-lg px-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-1 rounded-full text-gray-600 hover:bg-gray-100"
                  aria-label="Search restaurants"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Cart button */}
            <Link href="/cart" className="p-1 relative rounded-full text-gray-600 hover:bg-gray-100">
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </Link>
            
            {/* Account button */}
            <Link href="/account" className="p-1 rounded-full text-gray-600 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
