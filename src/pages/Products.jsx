import React, { useState, useMemo } from 'react';
import { products as allProducts, priceRanges } from '../utils/mockData';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import './Products.css';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'All',
    priceRangeIndex: 0,
    sortBy: 'name-asc',
  });

  const handleFilterChange = (key, value) => {
    if (key === 'reset') {
      setFilters({
        category: 'All',
        priceRangeIndex: 0,
        sortBy: 'name-asc',
      });
      setSearchQuery('');
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filters.category !== 'All') {
      filtered = filtered.filter((product) => product.category === filters.category);
    }

    // Price range filter
    const priceRange = priceRanges[filters.priceRangeIndex];
    filtered = filtered.filter(
      (product) => product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, filters]);

  return (
    <div className="products-page">
      <div className="container">
        <h1>Products</h1>
        
        <div className="search-section">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="products-layout">
          <aside className="sidebar">
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
          </aside>

          <main className="products-main">
            <div className="products-header">
              <p className="products-count">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <p>No products found matching your criteria.</p>
                <button onClick={() => handleFilterChange('reset')} className="btn btn-primary">
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
