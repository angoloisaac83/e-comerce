// src/pages/ProductDetailPage.js
import { useState, useEffect, useContext } from 'react';
import { FiShoppingCart, FiHeart, FiChevronLeft, FiStar, FiMinus, FiPlus } from 'react-icons/fi';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactImageMagnify from 'react-image-magnify';
import { ShopContext } from '../context/ShopContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { products, addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    // Find the product by ID
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Find similar products (same category or related)
      const similar = products
        .filter(p => p.id !== foundProduct.id)
        .slice(0, 3);
      setSimilarProducts(similar);
    }
  }, [id, products]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <FiChevronLeft className="mr-1" /> Back to Shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="mb-4 bg-white rounded-xl overflow-hidden">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: product.name,
                  isFluidWidth: true,
                  src: product.images[selectedImage],
                },
                largeImage: {
                  src: product.images[selectedImage],
                  width: 1200,
                  height: 1200
                },
                enlargedImagePosition: 'over',
                lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' }
              }}
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`border-2 rounded-lg overflow-hidden ${selectedImage === index ? 'border-indigo-600' : 'border-transparent'}`}
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-gray-600">{product.rating} ({product.reviews} reviews)</span>
          </div>

          <div className="text-2xl font-bold text-indigo-600 mb-6">${product.price.toFixed(2)}</div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="mb-6">
            <h3 className="font-bold mb-2">Features:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-bold mb-2">Color:</h3>
            <div className="flex space-x-2">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center mb-6">
            <span className="font-bold mr-4">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button 
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <FiMinus />
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button 
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                onClick={() => setQuantity(quantity + 1)}
              >
                <FiPlus />
              </button>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <FiShoppingCart className="mr-2" /> Add to Cart
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100">
              <FiHeart className="text-gray-600 hover:text-red-500" />
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            {product.inStock ? (
              <span className="text-green-600">In Stock - Ready to ship</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <Link to={`/product/${product.id}`}>
                  <div className="relative">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
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
        </div>
      )}

      {/* Reviews Section remains the same */}
    </div>
  );
};

export default ProductDetailPage; 