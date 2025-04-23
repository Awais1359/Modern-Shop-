import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getFeaturedProducts } from '../../data/products';
import ProductCard from '../product/ProductCard';

const FeaturedProducts: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const slideInterval = useRef<number | null>(null);
  
  const productsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3; // Default for SSR
  };
  
  const [itemsPerView, setItemsPerView] = useState(productsPerView());
  
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(productsPerView());
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const maxIndex = featuredProducts.length - itemsPerView;
  
  const startAutoSlide = () => {
    if (slideInterval.current !== null) return;
    slideInterval.current = window.setInterval(() => {
      setCurrentIndex(prevIndex => 
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, 5000);
  };
  
  const stopAutoSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
      slideInterval.current = null;
    }
  };
  
  useEffect(() => {
    if (isHovering) {
      stopAutoSlide();
    } else {
      startAutoSlide();
    }
    
    return () => stopAutoSlide();
  }, [isHovering, itemsPerView]);
  
  const handlePrev = () => {
    setCurrentIndex(prevIndex => 
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    setCurrentIndex(prevIndex => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-600 mt-2">Shop our most popular premium products</p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={handlePrev}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
              aria-label="Previous products"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
              aria-label="Next products"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {featuredProducts.map(product => (
              <div 
                key={product.id} 
                className="px-3"
                style={{ flex: `0 0 ${100 / itemsPerView}%` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;