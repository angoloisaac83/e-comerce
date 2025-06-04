// src/pages/CartPage.js
import { FiShoppingCart, FiArrowLeft, FiTrash2, FiPlus, FiMinus, FiStar } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    removeFromCart, 
    updateCartItemQuantity, 
    getCartItemCount,
    getTotalPrice
  } = useContext(ShopContext);

  const subtotal = getTotalPrice();
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-indigo-600 hover:text-indigo-800 mr-4"
          >
            <FiArrowLeft className="mr-1" /> Continue Shopping
          </button>
          <h1 className="text-2xl font-bold flex items-center">
            <FiShoppingCart className="mr-2" /> Your Cart ({getCartItemCount()})
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
            <p className="mb-6 text-gray-600">Looks like you haven't added any items to your cart yet.</p>
            <Link 
              to="/"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
   <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Table header for md+ screens */}
            <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 font-medium text-gray-700">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {cart.map((item) => (
              <div key={item.id} className="p-4 border-b border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Product Info */}
                  <div className="md:col-span-5 flex items-center">
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg mr-4"
                      />
                    </Link>
                    <div>
                      <Link to={`/product/${item.id}`} className="font-medium hover:text-indigo-600">
                        {item.name}
                      </Link>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(item.rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                              }`}
                          />
                        ))}
                      </div>
                      <button
                        className="text-red-500 text-sm flex items-center mt-1"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <FiTrash2 className="mr-1" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 text-center md:text-center">
                    <span className="md:hidden font-medium text-gray-500">Price: </span>
                    ${item.price.toFixed(2)}
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-3 flex md:justify-center">
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                      >
                        <FiMinus />
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="md:col-span-2 text-right md:text-right">
                    <span className="md:hidden font-medium text-gray-500">Total: </span>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}

            <div className="p-4 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Continue Shopping
              </Link>
              <button
                className="text-gray-600 hover:text-gray-800 font-medium"
                onClick={() => console.log('Cart updated:', cart)}
              >
                Update Cart
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 mb-4"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>

            <div className="text-center text-sm text-gray-500">
              <p>or</p>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium mt-2">
                Checkout with PayPal
              </button>
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Promo Code</h3>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button className="bg-gray-800 text-white px-4 py-2 rounded-r-lg hover:bg-gray-700">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;