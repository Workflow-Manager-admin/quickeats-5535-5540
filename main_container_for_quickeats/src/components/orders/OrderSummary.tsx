'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import { Order, CartItem } from '@/types';

// PUBLIC_INTERFACE
interface OrderSummaryProps {
  order?: Order;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  tax: number;
  onCheckout?: () => void;
}

/**
 * Displays the order summary including items, pricing, and checkout button
 */
const OrderSummary: React.FC<OrderSummaryProps> = ({
  order,
  items,
  subtotal,
  deliveryFee,
  serviceFee,
  tax,
  onCheckout
}) => {
  const total = subtotal + deliveryFee + serviceFee + tax;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
      
      {/* Order items */}
      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <div key={item.id} className="py-3 flex justify-between">
            <div>
              <div className="flex items-center">
                <span className="font-medium text-gray-800">{item.quantity} x</span>
                <span className="ml-2">{item.name}</span>
              </div>
              {item.options && item.options.length > 0 && (
                <div className="mt-1 text-xs text-gray-500 pl-6">
                  {item.options.map((option, idx) => (
                    <div key={idx}>{option}</div>
                  ))}
                </div>
              )}
            </div>
            <div className="text-gray-800 font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      
      {/* Pricing summary */}
      <div className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-800">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="text-gray-800">
            {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Service Fee</span>
          <span className="text-gray-800">${serviceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-800">${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      {/* Delivery time and address if order is placed */}
      {order && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-800">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Estimated delivery: {order.estimatedDeliveryTime}</span>
            </div>
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="font-medium">{order.deliveryAddress.name}</p>
                <p>{order.deliveryAddress.street}</p>
                <p>{order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Checkout or track button */}
      {!order && onCheckout && (
        <div className="mt-6">
          <Button variant="primary" fullWidth onClick={onCheckout}>
            Proceed to Checkout
          </Button>
        </div>
      )}
      
      {order && (
        <div className="mt-6">
          <Button variant="primary" fullWidth>
            Track Order
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
