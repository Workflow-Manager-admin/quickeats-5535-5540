'use client';

import React, { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';
import { Restaurant } from '@/types';
import { getRestaurants } from '@/utils/restaurantData';

/**
 * Component that displays a list of restaurants with search and filter functionality
 */
const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate API call with a slight delay
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real application, this would be an API call
        const data = getRestaurants();
        setTimeout(() => {
          setRestaurants(data);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Loading restaurants...</h2>
            <div className="mt-6 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">No restaurants found</h2>
            <p className="mt-4 text-gray-500">
              Try adjusting your filters or search criteria.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Restaurants near you
        </h2>
        <span className="text-gray-500 text-sm">
          {restaurants.length} restaurants found
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
