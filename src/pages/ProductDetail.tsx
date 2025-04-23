import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, ArrowLeft, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/product/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  
  // Fetch product details
  const product = id ? getProductById(parseInt(id)) : undefined;
  
  // Get related products
  const relatedProducts = product ? getRelatedProducts(product) : [];
  
  // Set page title
  useEffect(() => {
    if (product) {
      document.title = `${product.name} - ModernShop`;
    } else {
      document.title = 'Product Not Found - ModernShop';
    }
  }, [product]);
  
  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  // Calculate discounted price if applicable
  const discountedPrice = product?.discountPercentage 
    ? product.price * (1 - product.discountPercentage / 100) 
    : null;
  
  // Handle back button click
  const handleBack = () => {
    navigate(-1);
  };
  
  // If product not found
  if (!product) {
    return (
      <div className="pt-32 pb-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/products" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }
  
  // Multiple images simulation (in a real app, products would have multiple images)
  const productImages = [
    product.image,
    // In a real app, we would have multiple images per product
    // Using the same image here for demonstration
    product.image,
    product.image,
    product.image,
  ];

  return (
    <div className="pt-32 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <button onClick={handleBack} className="text-blue-600 hover:underline inline-flex items-center">
            <ArrowLeft size={16} className="mr-1" />
            Back
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="relative overflow-hidden rounded-xl bg-white">
              <div 
                className={`cursor-zoom-in transition-all duration-500 ${isImageZoomed ? 'scale-150' : 'scale-100'}`}
                onClick={() => setIsImageZoomed(!isImageZoomed)}
              >
                <img 
                  src={productImages[selectedImage]} 
                  alt={product.name} 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Discount badge */}
              {product.discountPercentage && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                  {product.discountPercentage}% OFF
                </div>
              )}
            </div>
            
            {/* Thumbnail images */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border rounded-lg overflow-hidden ${
                      selectedImage === index ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`Product thumbnail ${index + 1}`} className="w-full h-auto" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-500 mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-gray-600">{product.rating}</span>
              </div>
              <span className="text-gray-500">|</span>
              <span className="ml-2 text-gray-600">{product.category}</span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              {discountedPrice ? (
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">${discountedPrice.toFixed(2)}</span>
                  <span className="text-xl text-gray-500 line-through ml-3">${product.price.toFixed(2)}</span>
                  <span className="ml-3 text-green-600 font-medium">Save ${(product.price - discountedPrice).toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            {/* Description */}
            <p className="text-gray-700 mb-6">
              {product.description}
            </p>
            
            {/* Features */}
            {product.features && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check size={18} className="text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Add to cart */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <div className="flex items-center">
                    <button 
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      className="px-2 py-1 border border-gray-300 rounded-l-lg text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-14 text-center py-1 border-t border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
                    />
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2 py-1 border border-gray-300 rounded-r-lg text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-1">Availability</div>
                  {product.inStock ? (
                    <span className="text-green-600 flex items-center">
                      <Check size={16} className="mr-1" />
                      In Stock
                    </span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium flex items-center justify-center ${
                    product.inStock 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } transition-colors`}
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </button>
                <button className="py-3 px-6 rounded-lg font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                  <Heart size={20} className="mr-2" />
                  Save
                </button>
                <button className="py-3 px-6 rounded-lg font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center sm:flex-none">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
            
            {/* Shipping & Returns */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start">
                  <Truck size={20} className="text-blue-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">Free Shipping</h4>
                    <p className="text-sm text-gray-600">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield size={20} className="text-blue-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">2 Year Warranty</h4>
                    <p className="text-sm text-gray-600">Full coverage</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <RotateCcw size={20} className="text-blue-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">30 Day Returns</h4>
                    <p className="text-sm text-gray-600">Hassle-free returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;