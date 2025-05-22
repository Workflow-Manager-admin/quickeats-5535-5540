'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Restaurant } from '@/types';

// PUBLIC_INTERFACE
interface RestaurantCardProps {
  restaurant: Restaurant;
}

/**
 * Component that displays restaurant information in a card format
 */
const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const { id, name, imageUrl, cuisines, rating, deliveryTime, deliveryFee, minOrder } = restaurant;
  
  return (
    <Link href={`/restaurants/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl || '/images/restaurant-placeholder.jpg'}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
          {restaurant.promoCode && (
            <div className="absolute top-0 left-0 bg-orange-500 text-white px-3 py-1 text-xs font-bold">
              {restaurant.promoCode}
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900 flex-1">{name}</h3>
            <div className="flex items-center bg-green-500 text-white rounded-full px-2 py-1 text-xs font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              {rating}
            </div>
          </div>
          
          <p className="mt-1 text-sm text-gray-500">{cuisines.join(', ')}</p>
          
          <div className="mt-4 flex items-center text-sm text-gray-500 divide-x divide-gray-300">
            <div className="flex items-center pr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {deliveryTime} min
            </div>
            
            <div className="flex items-center px-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              {deliveryFee === 0 ? 'Free delivery' : `$${deliveryFee.toFixed(2)} delivery`}
            </div>
            
            <div className="flex items-center pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Min: ${minOrder}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
