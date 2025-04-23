import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  
  // Set page title
  useEffect(() => {
    document.title = 'Your Cart - ModernShop';
  }, []);
  
  // Shipping fee calculation (free shipping over $100)
  const shippingFee = totalPrice > 100 ? 0 : 9.99;
  
  // Tax calculation (for demo purposes)
  const taxRate = 0.08; // 8% tax
  const taxAmount = totalPrice * taxRate;
  
  // Grand total calculation
  const grandTotal = totalPrice + shippingFee + taxAmount - discountAmount;
  
  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple coupon code validation (in a real app, this would call an API)
    if (couponCode.toUpperCase() === 'DISCOUNT20' && !couponApplied) {
      // Apply 20% discount
      const discount = totalPrice * 0.2;
      setDiscountAmount(discount);
      setCouponApplied(true);
    }
  };
  
  return (
    <div className="pt-32 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cart</h1>
        <p className="text-gray-600 mb-8">
          {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
        </p>
        
        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag size={64} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200">
                  <div className="col-span-6">
                    <span className="font-medium text-gray-700">Product</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-medium text-gray-700">Price</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-medium text-gray-700">Quantity</span>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="font-medium text-gray-700">Subtotal</span>
                  </div>
                </div>
                
                {items.map(item => {
                  // Calculate item price (with discount if applicable)
                  const itemPrice = item.product.discountPercentage 
                    ? item.product.price * (1 - item.product.discountPercentage / 100) 
                    : item.product.price;
                  
                  const itemTotal = itemPrice * item.quantity;
                  
                  return (
                    <div key={item.product.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-200">
                      {/* Product */}
                      <div className="col-span-1 md:col-span-6 flex items-center">
                        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <Link 
                            to={`/products/${item.product.id}`}
                            className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-gray-500">{item.product.category}</p>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="col-span-1 md:col-span-2 flex items-center md:justify-center">
                        <span className="md:hidden font-medium text-gray-700 mr-2">Price:</span>
                        {item.product.discountPercentage ? (
                          <div>
                            <span className="text-gray-900 font-medium">${itemPrice.toFixed(2)}</span>
                            <span className="text-xs text-gray-500 line-through ml-1">${item.product.price.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span className="text-gray-900 font-medium">${itemPrice.toFixed(2)}</span>
                        )}
                      </div>
                      
                      {/* Quantity */}
                      <div className="col-span-1 md:col-span-2 flex items-center md:justify-center">
                        <span className="md:hidden font-medium text-gray-700 mr-2">Quantity:</span>
                        <div className="flex border border-gray-300 rounded">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              if (!isNaN(val) && val > 0) {
                                updateQuantity(item.product.id, val);
                              }
                            }}
                            className="w-10 text-center border-x border-gray-300 focus:outline-none"
                          />
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      {/* Subtotal */}
                      <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end">
                        <span className="md:hidden font-medium text-gray-700 mr-2">Subtotal:</span>
                        <div className="flex items-center">
                          <span className="text-gray-900 font-medium">${itemTotal.toFixed(2)}</span>
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-between mt-6">
                <Link
                  to="/products"
                  className="inline-flex items-center px-4 py-2 text-blue-600 hover:underline"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900 font-medium">
                      {shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900 font-medium">${taxAmount.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-gray-900">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Coupon Code */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Discount Code</h3>
                  <form onSubmit={handleCouponSubmit} className="flex">
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={couponApplied}
                      className={`flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        couponApplied ? 'bg-gray-100' : ''
                      }`}
                    />
                    <button
                      type="submit"
                      disabled={couponApplied}
                      className={`px-4 py-2 rounded-r-lg font-medium ${
                        couponApplied
                          ? 'bg-green-600 text-white cursor-default'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      } transition-colors`}
                    >
                      {couponApplied ? 'Applied' : 'Apply'}
                    </button>
                  </form>
                  {couponApplied && (
                    <p className="text-xs text-green-600 mt-1">
                      Coupon code "DISCOUNT20" applied successfully!
                    </p>
                  )}
                </div>
                
                {/* Checkout Button */}
                <button
                  className="w-full py-3 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  Checkout
                  <ArrowRight size={20} className="ml-2" />
                </button>
                
                {/* Secure Checkout Notice */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure Checkout
                  </p>
                </div>
              </div>
              
              {/* Payment Methods */}
              <div className="mt-4 bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">We Accept</h3>
                <div className="flex space-x-2">
                  {['Visa', 'Mastercard', 'Amex', 'PayPal'].map(method => (
                    <div key={method} className="px-3 py-1 bg-gray-100 rounded text-xs text-gray-800">
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;