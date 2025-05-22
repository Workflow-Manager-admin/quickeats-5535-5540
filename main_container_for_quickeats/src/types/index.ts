// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

// Restaurant related types
export interface Restaurant {
  id: string;
  name: string;
  imageUrl: string;
  coverImageUrl?: string;
  cuisines: string[];
  rating: number;
  ratingCount: number;
  address: string;
  deliveryTime: number;
  deliveryFee: number;
  minOrder: number;
  promoCode?: string;
  isOpen: boolean;
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
    }
  };
  categories: MenuCategory[];
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  options?: MenuItemOption[];
  popular?: boolean;
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
}

export interface MenuItemOption {
  id: string;
  name: string;
  selections: {
    id: string;
    name: string;
    price: number;
  }[];
  required: boolean;
  multiSelect: boolean;
}

// Order related types
export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  options?: string[];
  specialInstructions?: string;
}

export enum OrderStatus {
  PLACED = 'PLACED',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  READY_FOR_PICKUP = 'READY_FOR_PICKUP',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  tax: number;
  tip: number;
  total: number;
  status: OrderStatus;
  placedAt: string;
  estimatedDeliveryTime: string;
  deliveryAddress: Address;
  paymentMethod: string;
  driver?: {
    name: string;
    phone: string;
    photoUrl?: string;
  };
}
