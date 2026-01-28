import React from 'react';
import { categories, priceRanges } from '../utils/mockData';
import './FilterPanel.css';

const FilterPanel = ({ filters, onFilterChange }) => {
  return (
    <div className="filter-panel">
      <h3>Filters</h3>
      
      <div className="filter-section">
        <h4>Category</h4>
        <div className="filter-options">
          {categories.map((category) => (
            <label key={category} className="filter-option">
              <input
                type="radio"
                name="category"
                value={category}
                checked={filters.category === category}
                onChange={(e) => onFilterChange('category', e.target.value)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="filter-section">
        <h4>Price Range</h4>
        <div className="filter-options">
          {priceRanges.map((range, index) => (
            <label key={index} className="filter-option">
              <input
                type="radio"
                name="priceRange"
                value={index}
                checked={filters.priceRangeIndex === index}
                onChange={(e) => onFilterChange('priceRangeIndex', parseInt(e.target.value))}
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="filter-section">
        <h4>Sort By</h4>
        <select
          className="form-input"
          value={filters.sortBy}
          onChange={(e) => onFilterChange('sortBy', e.target.value)}
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="rating-desc">Rating (High to Low)</option>
        </select>
      </div>
      
      <button
        className="btn btn-secondary"
        onClick={() => onFilterChange('reset')}
        style={{ width: '100%', marginTop: '1rem' }}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterPanel;
