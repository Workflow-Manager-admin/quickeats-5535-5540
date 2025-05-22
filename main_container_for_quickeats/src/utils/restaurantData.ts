import { Restaurant, MenuCategory, MenuItem } from '@/types';

/**
 * Generate menu items for a specific category
 */
const generateMenuItems = (categoryId: string, count: number): MenuItem[] => {
  const items: MenuItem[] = [];
  
  for (let i = 1; i <= count; i++) {
    const popular = Math.random() > 0.7;
    const vegetarian = Math.random() > 0.7;
    const priceBase = Math.floor(Math.random() * 15) + 5;
    
    items.push({
      id: `${categoryId}-item-${i}`,
      name: getRandomDishName(categoryId),
      description: 'Delicious dish made with the finest ingredients',
      price: priceBase + Math.random() * 10,
      imageUrl: `/images/food-${Math.floor(Math.random() * 10) + 1}.jpg`,
      popular,
      vegetarian,
      vegan: vegetarian && Math.random() > 0.5,
      glutenFree: Math.random() > 0.8,
    });
  }
  
  return items;
};

/**
 * Get a random dish name based on category
 */
const getRandomDishName = (categoryId: string): string => {
  const categoryName = categoryId.split('-')[0];
  
  const dishNames: { [key: string]: string[] } = {
    pizza: ['Margherita Pizza', 'Pepperoni Pizza', 'Vegetarian Pizza', 'BBQ Chicken Pizza', 'Hawaiian Pizza', 'Supreme Pizza'],
    burger: ['Classic Burger', 'Cheeseburger', 'Bacon Burger', 'Mushroom Swiss Burger', 'Veggie Burger', 'Double Beef Burger'],
    sushi: ['California Roll', 'Spicy Tuna Roll', 'Dragon Roll', 'Rainbow Roll', 'Salmon Nigiri', 'Tuna Sashimi'],
    pasta: ['Spaghetti Bolognese', 'Fettuccine Alfredo', 'Penne Arrabbiata', 'Lasagna', 'Carbonara', 'Seafood Pasta'],
    salad: ['Caesar Salad', 'Greek Salad', 'Cobb Salad', 'Chicken Salad', 'Mediterranean Salad', 'Quinoa Salad'],
    dessert: ['Cheesecake', 'Chocolate Cake', 'Tiramisu', 'Ice Cream Sundae', 'Apple Pie', 'Crème Brûlée'],
    drinks: ['Soda', 'Iced Tea', 'Lemonade', 'Coffee', 'Smoothie', 'Milkshake'],
    appetizer: ['Mozzarella Sticks', 'Buffalo Wings', 'Garlic Bread', 'Nachos', 'Onion Rings', 'Calamari'],
    main: ['Grilled Chicken', 'Steak', 'Fish and Chips', 'Chicken Curry', 'Beef Stew', 'Vegetable Stir Fry']
  };
  
  // Default to main dishes if category not found
  const dishes = dishNames[categoryName] || dishNames.main;
  
  return dishes[Math.floor(Math.random() * dishes.length)];
};

/**
 * Generate restaurant data with associated menu
 */
const generateRestaurants = (): Restaurant[] => {
  const restaurants: Restaurant[] = [
    {
      id: 'r1',
      name: 'Pizza Paradise',
      imageUrl: '/images/restaurant-1.jpg',
      coverImageUrl: '/images/restaurant-cover-1.jpg',
      cuisines: ['Italian', 'Pizza'],
      rating: 4.7,
      ratingCount: 342,
      address: '123 Main St, Foodville, CA 12345',
      deliveryTime: 30,
      deliveryFee: 2.99,
      minOrder: 15,
      promoCode: '20% OFF',
      isOpen: true,
      openingHours: {
        'Monday': { open: '11:00', close: '22:00' },
        'Tuesday': { open: '11:00', close: '22:00' },
        'Wednesday': { open: '11:00', close: '22:00' },
        'Thursday': { open: '11:00', close: '22:00' },
        'Friday': { open: '11:00', close: '23:00' },
        'Saturday': { open: '11:00', close: '23:00' },
        'Sunday': { open: '12:00', close: '21:00' },
      },
      categories: []
    },
    {
      id: 'r2',
      name: 'Burger Bliss',
      imageUrl: '/images/restaurant-2.jpg',
      coverImageUrl: '/images/restaurant-cover-2.jpg',
      cuisines: ['American', 'Burgers'],
      rating: 4.5,
      ratingCount: 256,
      address: '456 Oak Ave, Foodville, CA 12345',
      deliveryTime: 25,
      deliveryFee: 1.99,
      minOrder: 10,
      isOpen: true,
      openingHours: {
        'Monday': { open: '10:00', close: '22:00' },
        'Tuesday': { open: '10:00', close: '22:00' },
        'Wednesday': { open: '10:00', close: '22:00' },
        'Thursday': { open: '10:00', close: '22:00' },
        'Friday': { open: '10:00', close: '23:30' },
        'Saturday': { open: '10:00', close: '23:30' },
        'Sunday': { open: '11:00', close: '21:00' },
      },
      categories: []
    },
    {
      id: 'r3',
      name: 'Sushi Sensation',
      imageUrl: '/images/restaurant-3.jpg',
      coverImageUrl: '/images/restaurant-cover-3.jpg',
      cuisines: ['Japanese', 'Sushi', 'Asian'],
      rating: 4.8,
      ratingCount: 189,
      address: '789 Maple Dr, Foodville, CA 12345',
      deliveryTime: 35,
      deliveryFee: 3.99,
      minOrder: 20,
      promoCode: 'FREE DRINK',
      isOpen: true,
      openingHours: {
        'Monday': { open: '11:30', close: '21:30' },
        'Tuesday': { open: '11:30', close: '21:30' },
        'Wednesday': { open: '11:30', close: '21:30' },
        'Thursday': { open: '11:30', close: '21:30' },
        'Friday': { open: '11:30', close: '22:30' },
        'Saturday': { open: '11:30', close: '22:30' },
        'Sunday': { open: '12:00', close: '21:00' },
      },
      categories: []
    },
    {
      id: 'r4',
      name: 'Taco Town',
      imageUrl: '/images/restaurant-4.jpg',
      coverImageUrl: '/images/restaurant-cover-4.jpg',
      cuisines: ['Mexican', 'Latin American'],
      rating: 4.3,
      ratingCount: 215,
      address: '101 Pine St, Foodville, CA 12345',
      deliveryTime: 20,
      deliveryFee: 0,
      minOrder: 15,
      isOpen: true,
      openingHours: {
        'Monday': { open: '10:00', close: '22:00' },
        'Tuesday': { open: '10:00', close: '22:00' },
        'Wednesday': { open: '10:00', close: '22:00' },
        'Thursday': { open: '10:00', close: '22:00' },
        'Friday': { open: '10:00', close: '23:00' },
        'Saturday': { open: '10:00', close: '23:00' },
        'Sunday': { open: '11:00', close: '21:00' },
      },
      categories: []
    },
    {
      id: 'r5',
      name: 'Noodle House',
      imageUrl: '/images/restaurant-5.jpg',
      coverImageUrl: '/images/restaurant-cover-5.jpg',
      cuisines: ['Chinese', 'Asian', 'Noodles'],
      rating: 4.6,
      ratingCount: 178,
      address: '202 Cedar Ln, Foodville, CA 12345',
      deliveryTime: 40,
      deliveryFee: 2.49,
      minOrder: 15,
      promoCode: '10% OFF',
      isOpen: true,
      openingHours: {
        'Monday': { open: '11:00', close: '21:30' },
        'Tuesday': { open: '11:00', close: '21:30' },
        'Wednesday': { open: '11:00', close: '21:30' },
        'Thursday': { open: '11:00', close: '21:30' },
        'Friday': { open: '11:00', close: '22:30' },
        'Saturday': { open: '11:00', close: '22:30' },
        'Sunday': { open: '12:00', close: '21:00' },
      },
      categories: []
    },
    {
      id: 'r6',
      name: 'Fresh Salads',
      imageUrl: '/images/restaurant-6.jpg',
      coverImageUrl: '/images/restaurant-cover-6.jpg',
      cuisines: ['Healthy', 'Salads', 'Vegan'],
      rating: 4.4,
      ratingCount: 123,
      address: '303 Elm St, Foodville, CA 12345',
      deliveryTime: 15,
      deliveryFee: 1.49,
      minOrder: 12,
      isOpen: true,
      openingHours: {
        'Monday': { open: '09:00', close: '20:00' },
        'Tuesday': { open: '09:00', close: '20:00' },
        'Wednesday': { open: '09:00', close: '20:00' },
        'Thursday': { open: '09:00', close: '20:00' },
        'Friday': { open: '09:00', close: '21:00' },
        'Saturday': { open: '09:00', close: '21:00' },
        'Sunday': { open: '10:00', close: '19:00' },
      },
      categories: []
    }
  ];
  
  // Generate categories and menu items for each restaurant
  restaurants.forEach(restaurant => {
    const categories: MenuCategory[] = [];
    
    const categoryTypes = {
      'r1': ['pizza', 'pasta', 'salad', 'dessert', 'drinks'],
      'r2': ['burger', 'appetizer', 'salad', 'dessert', 'drinks'],
      'r3': ['sushi', 'appetizer', 'main', 'dessert', 'drinks'],
      'r4': ['main', 'appetizer', 'salad', 'dessert', 'drinks'],
      'r5': ['main', 'appetizer', 'pasta', 'dessert', 'drinks'],
      'r6': ['salad', 'appetizer', 'main', 'dessert', 'drinks']
    };
    
    const restaurantCategories = categoryTypes[restaurant.id as keyof typeof categoryTypes] || ['main', 'appetizer', 'dessert', 'drinks'];
    
    restaurantCategories.forEach((categoryType, index) => {
      const category: MenuCategory = {
        id: `${categoryType}-${restaurant.id}-${index}`,
        name: categoryType.charAt(0).toUpperCase() + categoryType.slice(1),
        items: []
      };
      
      // Generate 5-10 items per category
      const itemCount = 5 + Math.floor(Math.random() * 6);
      category.items = generateMenuItems(category.id, itemCount);
      
      categories.push(category);
    });
    
    restaurant.categories = categories;
  });
  
  return restaurants;
};

// Mock restaurants data
const restaurants = generateRestaurants();

/**
 * Get all restaurants
 */
export const getRestaurants = (): Restaurant[] => {
  return restaurants;
};

/**
 * Get a restaurant by ID
 */
export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find(restaurant => restaurant.id === id);
};
