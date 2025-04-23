import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from '../components/product/ProductList';

const Products: React.FC = () => {
  const location = useLocation();
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Set page title
  useEffect(() => {
    document.title = category 
      ? `${category} Products - ModernShop` 
      : 'All Products - ModernShop';
  }, [category]);
  
  useEffect(() => {
    // Parse query parameters
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    
    setCategory(categoryParam || undefined);
    setSearchQuery(searchParam || '');
  }, [location.search]);
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ProductList selectedCategory={category} searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Products;