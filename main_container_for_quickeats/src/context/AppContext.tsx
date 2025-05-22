'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Restaurant, CartItem, User, Address } from '@/types';
import { getRestaurants } from '@/utils/restaurantData';

// Define the shape of our context
interface AppContextType {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  
  // Restaurant state
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  setSelectedRestaurant: (restaurant: Restaurant | null) => void;
  
  // Cart state
  cartItems: CartItem[];
  cartRestaurant: Restaurant | null;
  addToCart: (item: CartItem, restaurant: Restaurant) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  
  // Checkout state
  deliveryAddress: Address | null;
  setDeliveryAddress: (address: Address | null) => void;
  
  // Calculations
  cartSubtotal: number;
  cartTax: number;
  cartServiceFee: number;
  cartDeliveryFee: number;
  cartTotal: number;
}

// Create the context with default values
const AppContext = createContext<AppContextType>({
  // User defaults
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  
  // Restaurant defaults
  restaurants: [],
  selectedRestaurant: null,
  setSelectedRestaurant: () => {},
  
  // Cart defaults
  cartItems: [],
  cartRestaurant: null,
  addToCart: () => {},
  updateCartItemQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  
  // Checkout defaults
  deliveryAddress: null,
  setDeliveryAddress: () => {},
  
  // Calculation defaults
  cartSubtotal: 0,
  cartTax: 0,
  cartServiceFee: 0,
  cartDeliveryFee: 0,
  cartTotal: 0,
});

// PUBLIC_INTERFACE
interface AppProviderProps {
  children: ReactNode;
}

/**
 * App Provider component that manages global state for the QuickEats application
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // User state
  const [user, setUser] = useState<User | null>(null);
  
  // Restaurant state
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartRestaurant, setCartRestaurant] = useState<Restaurant | null>(null);
  
  // Checkout state
  const [deliveryAddress, setDeliveryAddress] = useState<Address | null>(null);
  
  // Fetch restaurants on mount
  useEffect(() => {
    setRestaurants(getRestaurants());
  }, []);
  
  // Check if user is authenticated
  const isAuthenticated = !!user;
  
  // Cart operations
  const addToCart = (item: CartItem, restaurant: Restaurant) => {
    // Check if adding from a different restaurant
    if (cartRestaurant && cartRestaurant.id !== restaurant.id) {
      // Ask user if they want to clear cart and start new order
      const confirmNewOrder = window.confirm(
        `Your cart contains items from ${cartRestaurant.name}. Would you like to clear your cart and add items from ${restaurant.name} instead?`
      );
      
      if (!confirmNewOrder) return;
      
      // Clear cart and set new restaurant
      setCartItems([item]);
      setCartRestaurant(restaurant);
      return;
    }
    
    // If cart is empty, set the restaurant
    if (!cartRestaurant) {
      setCartRestaurant(restaurant);
    }
    
    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(
      cartItem => cartItem.menuItemId === item.menuItemId
    );
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += item.quantity;
      setCartItems(updatedCartItems);
    } else {
      // Add new item to cart
      setCartItems([...cartItems, item]);
    }
  };
  
  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity };
      }
      return item;
    });
    
    setCartItems(updatedCartItems);
  };
  
  const removeFromCart = (itemId: string) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
    
    // If cart becomes empty, reset restaurant
    if (updatedCartItems.length === 0) {
      setCartRestaurant(null);
    }
  };
  
  const clearCart = () => {
    setCartItems([]);
    setCartRestaurant(null);
  };
  
  // Calculate cart totals
  const cartSubtotal = cartItems.reduce((total, item) => 
    total + (item.price * item.quantity), 0);
  
  const cartDeliveryFee = cartRestaurant ? cartRestaurant.deliveryFee : 0;
  const cartServiceFee = cartSubtotal * 0.05; // 5% service fee
  const cartTax = cartSubtotal * 0.0725; // 7.25% tax
  const cartTotal = cartSubtotal + cartDeliveryFee + cartServiceFee + cartTax;
  
  const value = {
    // User
    user,
    setUser,
    isAuthenticated,
    
    // Restaurant
    restaurants,
    selectedRestaurant,
    setSelectedRestaurant,
    
    // Cart
    cartItems,
    cartRestaurant,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    
    // Checkout
    deliveryAddress,
    setDeliveryAddress,
    
    // Calculations
    cartSubtotal,
    cartTax,
    cartServiceFee,
    cartDeliveryFee,
    cartTotal,
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// PUBLIC_INTERFACE
/**
 * Custom hook for using the AppContext
 */
export const useAppContext = () => useContext(AppContext);
