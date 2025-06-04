// src/pages/Homepage.js
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { FiStar } from 'react-icons/fi';
import { ShopContext } from '../context/ShopContext';
import { useState } from 'react';
import { FiHeart } from 'react-icons/fi';

const Homepage = () => {
  const { products, addToCart } = useContext(ShopContext);
  const [featuredCategories] = useState([
    { id: 1, name: 'Electronics', image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 2, name: 'Fashion', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 3, name: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold mb-4">Summer Sale Up To 50% Off</h2>
              <p className="text-lg mb-6">Shop the latest trends and save big on your favorite items.</p>
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300">
                Shop Now
              </button>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map(category => (
              <div key={category.id} className="relative rounded-xl overflow-hidden group">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-64 object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <Link to={`/product/${product.id}`}>
                  <div className="relative">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <button 
                      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add to wishlist functionality would go here
                      }}
                    >
                      <FiHeart className="text-gray-600 hover:text-red-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-gray-600 text-sm ml-1">({product.rating})</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                      <button 
                        className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition duration-300"
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

                <section className="mb-12">
          <div className="bg-gray-800 rounded-xl p-8 text-white">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="mb-6">Get the latest updates on new products and upcoming sales</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="bg-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Homepage;