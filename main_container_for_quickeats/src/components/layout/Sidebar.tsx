'use client';

import React from 'react';
import Link from 'next/link';

// PUBLIC_INTERFACE
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

/**
 * Sidebar component for QuickEats offering filtering options and navigation for mobile devices
 */
const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  // Categories for food filtering
  const categories = [
    { id: 'all', name: 'All Cuisines' },
    { id: 'pizza', name: 'Pizza' },
    { id: 'burgers', name: 'Burgers' },
    { id: 'chinese', name: 'Chinese' },
    { id: 'indian', name: 'Indian' },
    { id: 'sushi', name: 'Sushi' },
    { id: 'mexican', name: 'Mexican' },
    { id: 'italian', name: 'Italian' },
    { id: 'thai', name: 'Thai' }
  ];
  
  // Sorting options
  const sortOptions = [
    { id: 'popularity', name: 'Most Popular' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'delivery_time', name: 'Fastest Delivery' },
    { id: 'price_low', name: 'Price: Low to High' },
    { id: 'price_high', name: 'Price: High to Low' }
  ];
  
  // Filter options
  const filterOptions = [
    { id: 'free_delivery', name: 'Free Delivery' },
    { id: 'deals', name: 'Deals & Offers' },
    { id: 'open_now', name: 'Open Now' }
  ];
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      
      {/* Sidebar content */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
          md:translate-x-0 md:static md:h-auto md:w-64 md:shadow-none md:z-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex justify-between items-center p-4 border-b md:hidden">
          <h2 className="font-bold text-lg">Filters</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-gray-800"
            aria-label="Close sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto">
          {/* Mobile Navigation */}
          <div className="mb-6 md:hidden">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Navigation</h3>
            <nav className="space-y-1">
              <Link href="/" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                Home
              </Link>
              <Link href="/restaurants" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                Restaurants
              </Link>
              <Link href="/orders" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                My Orders
              </Link>
              <Link href="/account" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                My Account
              </Link>
            </nav>
          </div>
          
          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Categories</h3>
            <div className="space-y-1">
              {categories.map(category => (
                <div key={category.id} className="flex items-center">
                  <input
                    id={`category-${category.id}`}
                    type="checkbox"
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`category-${category.id}`} className="ml-3 text-sm text-gray-600">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Sort by */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Sort By</h3>
            <div className="space-y-1">
              {sortOptions.map(option => (
                <div key={option.id} className="flex items-center">
                  <input
                    id={`sort-${option.id}`}
                    name="sort"
                    type="radio"
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                  />
                  <label htmlFor={`sort-${option.id}`} className="ml-3 text-sm text-gray-600">
                    {option.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Filters */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Filters</h3>
            <div className="space-y-1">
              {filterOptions.map(option => (
                <div key={option.id} className="flex items-center">
                  <input
                    id={`filter-${option.id}`}
                    type="checkbox"
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`filter-${option.id}`} className="ml-3 text-sm text-gray-600">
                    {option.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Clear and Apply buttons */}
          <div className="mt-8 flex space-x-3">
            <button className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
              Clear All
            </button>
            <button className="flex-1 px-4 py-2 border border-transparent rounded-md text-sm text-white bg-orange-500 hover:bg-orange-600">
              Apply Filters
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
