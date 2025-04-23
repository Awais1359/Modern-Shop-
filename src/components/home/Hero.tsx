import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gray-100 overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-70"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-200 rounded-full opacity-50 filter blur-3xl"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-300 rounded-full opacity-30 filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-28 lg:py-36 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Hero Content */}
          <div className="md:w-1/2 md:pr-12 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Discover Products That <span className="text-blue-600">Inspire</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Explore our curated collection of premium products designed to elevate your everyday experience. From cutting-edge tech to timeless essentials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/products" 
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition duration-300 inline-flex items-center justify-center"
              >
                Shop Now
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link 
                to="/products?category=Electronics" 
                className="bg-white text-blue-600 border border-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-blue-50 transition duration-300 inline-flex items-center justify-center"
              >
                Trending
              </Link>
            </div>
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                <img 
                  className="w-10 h-10 rounded-full border-2 border-white" 
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="User Avatar" 
                />
                <img 
                  className="w-10 h-10 rounded-full border-2 border-white" 
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="User Avatar" 
                />
                <img 
                  className="w-10 h-10 rounded-full border-2 border-white" 
                  src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="User Avatar" 
                />
              </div>
              <div className="ml-4">
                <p className="text-gray-700 font-medium">Trusted by 10,000+ customers</p>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-gray-600 text-sm">4.9/5</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="md:w-1/2">
            <div className="relative">
              <div className="bg-white p-2 rounded-3xl shadow-xl overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Premium headphones" 
                  className="w-full h-auto rounded-2xl"
                />
              </div>
              {/* Product cards positioned absolutely */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center">
                  <img 
                    src="https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Smart Watch" 
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="ml-3">
                    <h3 className="text-sm font-bold">Smart Watch</h3>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs ml-1">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center">
                  <img 
                    src="https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Smart Speaker" 
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="ml-3">
                    <h3 className="text-sm font-bold">Smart Speaker</h3>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs ml-1">4.9</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Brand Logos */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 mb-8">TRUSTED BY TOP BRANDS</p>
          <div className="flex justify-center flex-wrap gap-8 md:gap-16">
            {['Apple', 'Samsung', 'Sony', 'Google', 'Microsoft'].map((brand, index) => (
              <div key={index} className="text-gray-400 font-medium text-xl">{brand}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;