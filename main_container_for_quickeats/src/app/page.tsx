'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import MainContainer from '@/components/layout/MainContainer';
import Button from '@/components/ui/Button';
import RestaurantList from '@/components/restaurants/RestaurantList';
import { getRestaurants } from '@/utils/restaurantData';
import { Restaurant } from '@/types';

export default function Home() {
  const [popularRestaurants, setPopularRestaurants] = useState<Restaurant[]>([]);
  
  useEffect(() => {
    // Get all restaurants and sort by rating to find popular ones
    const restaurants = getRestaurants();
    const sorted = [...restaurants].sort((a, b) => b.rating - a.rating);
    setPopularRestaurants(sorted.slice(0, 3)); // Get top 3 highest rated
  }, []);
  
  return (
    <MainContainer>
      {/* Hero section */}
      <section className="relative h-96 overflow-hidden rounded-xl mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
        <Image
          src="/images/hero-background.jpg" 
          alt="Delicious food delivery"
          className="object-cover"
          priority
          fill
        />
        <div className="relative z-20 flex flex-col justify-center h-full p-6 sm:p-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Food delivery <span className="text-orange-500">made easy</span>
          </h1>
          <p className="text-lg md:text-xl text-white mb-6 max-w-lg">
            Order food from the best local restaurants and have it delivered to your door in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg">Browse Restaurants</Button>
            <Button size="lg" variant="outline">How It Works</Button>
          </div>
        </div>
      </section>
      
      {/* Categories section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Explore Food Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Pizza', 'Burgers', 'Sushi', 'Mexican', 'Chinese', 'Italian', 'Desserts', 'Healthy'].map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 text-center hover:bg-orange-50 transition-colors cursor-pointer">
              <div className="h-16 w-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-3">
                {/* Simple placeholder for category icon */}
                <div className="text-orange-500 text-2xl font-bold">{category.charAt(0)}</div>
              </div>
              <h3 className="font-medium">{category}</h3>
            </div>
          ))}
        </div>
      </section>
      
      {/* Popular restaurants section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Popular Restaurants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-40 w-full">
                <Image
                  src={restaurant.imageUrl || '/images/restaurant-placeholder.jpg'}
                  alt={restaurant.name}
                  className="object-cover"
                  fill
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{restaurant.name}</h3>
                  <div className="flex items-center bg-green-500 text-white rounded-full px-2 py-1 text-xs font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    {restaurant.rating}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{restaurant.cuisines.join(', ')}</p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {restaurant.deliveryTime} min
                  <span className="mx-2">•</span>
                  {restaurant.deliveryFee === 0 ? 'Free delivery' : `$${restaurant.deliveryFee.toFixed(2)} delivery`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* How it works section */}
      <section className="mb-12 bg-gray-50 p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">How QuickEats Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-orange-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-orange-500 text-2xl font-bold">1</span>
            </div>
            <h3 className="font-semibold mb-2">Browse Restaurants</h3>
            <p className="text-gray-600">Explore local restaurants and browse their menus to find your favorite dishes</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-orange-500 text-2xl font-bold">2</span>
            </div>
            <h3 className="font-semibold mb-2">Place Your Order</h3>
            <p className="text-gray-600">Add items to your cart, customize as needed, and place your order with just a few clicks</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-orange-500 text-2xl font-bold">3</span>
            </div>
            <h3 className="font-semibold mb-2">Enjoy Your Food</h3>
            <p className="text-gray-600">Track your delivery in real-time and enjoy hot, fresh food delivered straight to your door</p>
          </div>
        </div>
      </section>
      
      {/* Featured restaurants section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">All Restaurants</h2>
        <RestaurantList />
      </section>
    </MainContainer>
  );
}
