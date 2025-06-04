// src/context/ShopContext.js
import { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    // Mock product data - in a real app, you'd fetch this from an API
const mockProducts = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.5,
    reviews: 128,
    description: 'Experience crystal-clear sound with our premium wireless headphones.',
    features: ['Noise Cancellation', '30-hour battery', 'Bluetooth 5.0'],
    colors: ['Black', 'Silver'],
    inStock: true
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    price: 149.99,
    images: [
      'https://images.unsplash.com/photo-1588702546044-6b5e4e0b8b6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1595433687793-5d7a4c3c3b2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.7,
    reviews: 200,
    description: 'Track your fitness goals with our smart fitness watch.',
    features: ['Heart Rate Monitor', 'GPS', 'Water Resistant'],
    colors: ['Black', 'Rose Gold'],
    inStock: true
  },
  {
    id: 3,
    name: '4K Ultra HD Smart TV',
    price: 799.99,
    images: [
      'https://images.unsplash.com/photo-1586208659494-e52c3d2a7d5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1521737604893-5a810fda9664?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.8,
    reviews: 150,
    description: 'Enjoy stunning picture quality with our 4K Ultra HD Smart TV.',
    features: ['HDR', 'Smart Connectivity', 'Voice Control'],
    colors: ['Black'],
    inStock: true
  },
  {
    id: 4,
    name: 'Portable Bluetooth Speaker',
    price: 69.99,
    images: [
      'https://images.unsplash.com/photo-1542820300-a2b615f5d9f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1561800340-0a4a858a1f4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.5,
    reviews: 320,
    description: 'Take your music anywhere with our portable Bluetooth speaker.',
    features: ['12-hour battery', 'Water Resistant', 'Built-in Microphone'],
    colors: ['Blue', 'Black', 'Red'],
    inStock: true
  },
  {
    id: 5,
    name: 'Gaming Laptop',
    price: 1299.99,
    images: [
      'https://images.unsplash.com/photo-1518779578248-9b4d1bba0c2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1593642632822-e7b3f2e8ec5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.6,
    reviews: 75,
    description: 'Powerful gaming laptop for the ultimate gaming experience.',
    features: ['16GB RAM', '1TB SSD', 'NVIDIA RTX 3060'],
    colors: ['Black'],
    inStock: true
  },
  {
    id: 6,
    name: 'Smart Home Security Camera',
    price: 99.99,
    images: [
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1581202309620-0c3b7d2c8d9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.4,
    reviews: 180,
    description: 'Keep your home safe with our smart security camera.',
    features: ['Night Vision', 'Motion Detection', 'Two-Way Audio'],
    colors: ['White', 'Black'],
    inStock: true
  },
  {
    id: 7,
    name: 'Electric Toothbrush',
    price: 59.99,
    images: [
      'https://images.unsplash.com/photo-1593642632822-e7b3f2e8ec5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1601055508325-1b6c5e1f56b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.3,
    reviews: 220,
    description: 'Achieve a brighter smile with our electric toothbrush.',
    features: ['Timer', 'Multiple Modes', 'Waterproof'],
    colors: ['White', 'Pink'],
    inStock: true
  },
  {
    id: 8,
    name: 'Wireless Charging Pad',
    price: 29.99,
    images: [
      'https://images.unsplash.com/photo-1593642632822-e7b3f2e8ec5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1614166460583-1c8e2a0e00e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.2,
    reviews: 150,
    description: 'Keep your devices charged wirelessly with our charging pad.',
    features: ['Fast Charging', 'Compatible with most devices'],
    colors: ['Black', 'White'],
    inStock: true
  },
  {
    id: 9,
    name: 'Smart LED Desk Lamp',
    price: 49.99,
    images: [
      'https://images.unsplash.com/photo-1593642632822-e7b3f2e8ec5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1541445661707-9c3e7c6e0b5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.6,
    reviews: 100,
    description: 'Illuminate your workspace with our smart LED desk lamp.',
    features: ['Adjustable Brightness', 'USB Charging', 'Touch Control'],
    colors: ['White', 'Black'],
    inStock: true
  },
  {
    id: 10,
    name: 'Fitness Resistance Bands',
    price: 25.99,
    images: [
      'https://images.unsplash.com/photo-1588702546044-6b5e4e0b8b6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1588702546044-6b5e4e0b8b6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.5,
    reviews: 350,
    description: 'Enhance your workouts with our fitness resistance bands.',
    features: ['Durable', 'Portable', 'Multiple Resistance Levels'],
    colors: ['Black', 'Green', 'Blue'],
    inStock: true
  },
  {
    id: 11,
    name: 'Compact Digital Camera',
    price: 499.99,
    images: [
      'https://images.unsplash.com/photo-1512252022613-3d8b9ea6c1a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1575731129601-e9c2b8e4f3b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.7,
    reviews: 90,
    description: 'Capture stunning photos with our compact digital camera.',
    features: ['20MP', '4K Video', 'Wi-Fi Connectivity'],
    colors: ['Black', 'Silver'],
    inStock: true
  },
  {
    id: 12,
    name: 'Cordless Vacuum Cleaner',
    price: 299.99,
    images: [
      'https://images.unsplash.com/photo-1584829456735-ca3e9c6c6d9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1584829456735-ca3e9c6c6d9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.5,
    reviews: 110,
    description: 'Effortlessly clean your home with our cordless vacuum cleaner.',
    features: ['Lightweight', 'Strong Suction', 'Washable Filter'],
    colors: ['Red', 'Blue'],
    inStock: true
  },
  {
    id: 13,
    name: 'High-Performance Blender',
    price: 199.99,
    images: [
      'https://images.unsplash.com/photo-1621864265589-2a6855a4e1f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1604403222006-4e0d4b94a2d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.8,
    reviews: 60,
    description: 'Make smoothies and soups easily with our high-performance blender.',
    features: ['Multiple Speed Settings', 'Easy Clean', 'Durable'],
    colors: ['Black', 'Silver'],
    inStock: true
  },
  {
    id: 14,
    name: 'Wireless Earbuds',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1593642632822-e7b3f2e8ec5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1593642632822-e7b3f2e8ec5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.4,
    reviews: 130,
    description: 'Enjoy music on the go with our wireless earbuds.',
    features: ['Touch Controls', 'Noise Isolation', 'Water Resistant'],
    colors: ['Black', 'White'],
    inStock: true
  },
  {
    id: 15,
    name: 'Yoga Mat',
    price: 39.99,
    images: [
      'https://images.unsplash.com/photo-1520330172639-3e8e7a2d99c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1612202255235-4d89e3c3b41e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.6,
    reviews: 200,
    description: 'Practice your poses comfortably with our yoga mat.',
    features: ['Non-Slip Surface', 'Eco-Friendly', 'Lightweight'],
    colors: ['Purple', 'Blue'],
    inStock: true
  },
  {
    id: 16,
    name: 'Wireless Gaming Mouse',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1588702546044-6b5e4e0b8b6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1604403222006-4e0d4b94a2d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.5,
    reviews: 150,
    description: 'Enhance your gaming experience with our wireless gaming mouse.',
    features: ['Adjustable DPI', 'Ergonomic Design', 'Customizable Buttons'],
    colors: ['Black', 'RGB'],
    inStock: true
  },
  {
    id: 17,
    name: 'Electric Kettle',
    price: 39.99,
    images: [
      'https://images.unsplash.com/photo-1588702546044-6b5e4e0b8b6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1521737604893-5a810fda9664?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.3,
    reviews: 180,
    description: 'Boil water quickly with our electric kettle.',
    features: ['Automatic Shut-off', 'Stainless Steel', 'Cordless'],
    colors: ['Silver', 'Black'],
    inStock: true
  },
  {
    id: 18,
    name: 'Travel Backpack',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.6,
    reviews: 120,
    description: 'Carry your essentials comfortably with our travel backpack.',
    features: ['Waterproof', 'Multiple Compartments', 'Adjustable Straps'],
    colors: ['Gray', 'Black'],
    inStock: true
  },
  {
    id: 19,
    name: 'Portable Power Bank',
    price: 49.99,
    images: [
      'https://images.unsplash.com/photo-1593642632822-e7b3f2e8ec5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1593642632822-e7b3f2e8ec5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.5,
    reviews: 160,
    description: 'Keep your devices charged on the go with our portable power bank.',
    features: ['Fast Charging', 'Compact Design', 'Multiple Ports'],
    colors: ['Black', 'White'],
    inStock: true
  },
  {
    id: 20,
    name: 'High-Quality Chef Knife',
    price: 59.99,
    images: [
      'https://images.unsplash.com/photo-1579163033832-6e7c1b3a172e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1588702546044-6b5e4e0b8b6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.8,
    reviews: 90,
    description: 'Prepare meals like a pro with our high-quality chef knife.',
    features: ['Stainless Steel', 'Ergonomic Handle', 'Easy to Clean'],
    colors: ['Silver'],
    inStock: true
  },
  {
    id: 21,
    name: 'Noise-Cancelling Ear Muffs',
    price: 34.99,
    images: [
      'https://images.unsplash.com/photo-1588702546044-6b5e4e0b8b6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1593642632822-e7b3f2e8ec5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    rating: 4.3,
    reviews: 150,
    description: 'Protect your hearing with our noise-cancelling ear muffs.',
    features: ['Adjustable Headband', 'Comfortable Fit', 'Lightweight'],
    colors: ['Silver'],
    inStock: true
  },
]
    setProducts(mockProducts);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ShopContext.Provider
      value={{
        cart,
        products: filteredProducts,
        searchQuery,
        setSearchQuery,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        getCartItemCount,
        getTotalPrice
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};