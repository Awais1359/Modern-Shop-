import React, { useState, useEffect } from 'react';
import { products, categories } from '../../data/products';
import ProductCard from './ProductCard';
import { Filter, Grid, List, X } from 'lucide-react';
import { Product } from '../../types/product';

interface ProductListProps {
  selectedCategory?: string;
  searchQuery?: string;
}

const ProductList: React.FC<ProductListProps> = ({ 
  selectedCategory, 
  searchQuery = '' 
}) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>(selectedCategory || 'All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [sortOption, setSortOption] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filter and sort products when filters change
  useEffect(() => {
    let result = [...products];
    
    // Category filter
    if (activeCategoryFilter && activeCategoryFilter !== 'All') {
      result = result.filter(product => product.category === activeCategoryFilter);
    }
    
    // Price range filter
    result = result.filter(product => {
      const productPrice = product.discountPercentage 
        ? product.price * (1 - product.discountPercentage / 100) 
        : product.price;
        
      return productPrice >= priceRange[0] && productPrice <= priceRange[1];
    });
    
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => {
          const priceA = a.discountPercentage ? a.price * (1 - a.discountPercentage / 100) : a.price;
          const priceB = b.discountPercentage ? b.price * (1 - b.discountPercentage / 100) : b.price;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        result.sort((a, b) => {
          const priceA = a.discountPercentage ? a.price * (1 - a.discountPercentage / 100) : a.price;
          const priceB = b.discountPercentage ? b.price * (1 - b.discountPercentage / 100) : b.price;
          return priceB - priceA;
        });
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // In a real app, we would use a timestamp. Here we're using a reverse of the ID order
        result.sort((a, b) => b.id - a.id);
        break;
      default: // 'featured'
        result.sort((a, b) => b.rating - a.rating);
        break;
    }
    
    setFilteredProducts(result);
  }, [activeCategoryFilter, priceRange, searchQuery, sortOption]);
  
  // Apply category filter from props when it changes
  useEffect(() => {
    if (selectedCategory) {
      setActiveCategoryFilter(selectedCategory);
    }
  }, [selectedCategory]);
  
  // Handle price range input changes
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>, index: 0 | 1) => {
    const value = parseInt(event.target.value);
    setPriceRange(prev => {
      const newRange = [...prev] as [number, number];
      newRange[index] = value;
      return newRange;
    });
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Mobile filter button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="w-full bg-white border border-gray-300 rounded-lg py-2 px-4 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Filter size={18} className="mr-2" />
          Filter Products
        </button>
      </div>
      
      {/* Sidebar filters - Desktop */}
      <aside className="w-64 flex-shrink-0 hidden md:block">
        <div className="sticky top-24 pr-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Categories</h3>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category}>
                  <button
                    onClick={() => setActiveCategoryFilter(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors hover:bg-gray-100 ${
                      activeCategoryFilter === category ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Price Range</h3>
            <div className="px-2">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">${priceRange[0]}</span>
                <span className="text-gray-600">${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1500"
                step="50"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                className="w-full mb-2"
              />
              <input
                type="range"
                min="0"
                max="1500"
                step="50"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </aside>
      
      {/* Mobile filter sidebar */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileFilterOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button onClick={() => setIsMobileFilterOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-6">
              <h3 className="text-base font-semibold mb-3">Categories</h3>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category}>
                    <button
                      onClick={() => {
                        setActiveCategoryFilter(category);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors hover:bg-gray-100 ${
                        activeCategoryFilter === category ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-base font-semibold mb-3">Price Range</h3>
              <div className="px-2">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">${priceRange[0]}</span>
                  <span className="text-gray-600">${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1500"
                  step="50"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-full mb-2"
                />
                <input
                  type="range"
                  min="0"
                  max="1500"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-full"
                />
              </div>
            </div>
            
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
      
      {/* Main product grid */}
      <div className="flex-1">
        {/* Product list header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-900">
              {searchQuery 
                ? `Search Results: "${searchQuery}"` 
                : activeCategoryFilter === 'All' 
                  ? 'All Products' 
                  : activeCategoryFilter}
            </h2>
            <p className="text-gray-600 mt-1">{filteredProducts.length} products</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Sort dropdown */}
            <div className="relative z-10">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {/* View switcher */}
            <div className="flex bg-white border border-gray-300 rounded-lg">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                aria-label="Grid view"
              >
                <Grid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {/* No results message */}
        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
        
        {/* Products grid view */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        {/* Products list view */}
        {viewMode === 'list' && (
          <div className="space-y-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="sm:w-48 md:w-64">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 sm:h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col">
                  <div className="mb-auto">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-xs text-gray-500 ml-2">{product.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 line-clamp-2">{product.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      {product.discountPercentage ? (
                        <div className="flex items-center">
                          <span className="text-gray-900 font-bold text-lg">
                            ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                          </span>
                          <span className="text-gray-500 text-sm line-through ml-2">${product.price.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className="text-gray-900 font-bold text-lg">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                        aria-label="Add to wishlist"
                      >
                        <Heart size={18} />
                      </button>
                      <button 
                        onClick={() => {
                          if (product.inStock) {
                            const { addToCart } = useCart();
                            addToCart(product);
                          }
                        }}
                        disabled={!product.inStock}
                        className={`py-2 px-4 rounded-lg ${
                          product.inStock 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        } transition-colors flex items-center`}
                      >
                        <ShoppingCart size={18} className="mr-2" />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;