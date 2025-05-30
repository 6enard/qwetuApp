import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import { Product } from '../types';
import { products, categories, getProductsByCategory, searchProducts } from '../data/products';

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(getProductsByCategory(selectedCategory));
    } else if (searchQuery) {
      setFilteredProducts(searchProducts(searchQuery));
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setSearchQuery(''); // Clear search when changing category
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      setFilteredProducts(searchProducts(searchQuery));
      setSelectedCategory(null); // Clear category filter when searching
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      
      {/* Search Bar */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pr-10"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <Search size={20} />
          </button>
        </form>
      </div>
      
      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />
      
      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>
      </div>
      
      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-gray-600 mb-4">No products found.</p>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSearchQuery('');
              setFilteredProducts(products);
            }}
            className="btn btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;