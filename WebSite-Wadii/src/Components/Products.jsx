import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import GridBackground from './GridBackground';
import Aurora from './Aurora';
import ProductsSection from './ProductsSection';
import Footer from './Footer';
import './Products.css';

const Products = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    rating: 'all',
    sortBy: 'featured'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  const categories = [
    'All Categories',
    'Decorative Tray',
    'Floral Arrangement', 
    'Candle Holder',
    'Floral Vase',
    'Modern Lighting',
    'Artistic Cushion',
    'Vintage Mirror',
    'Wall Clock',
    'Jewelry Box',
    'Storage Basket'
  ];

  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under 50 DH', value: 'under-50' },
    { label: '50 - 100 DH', value: '50-100' },
    { label: '100 - 200 DH', value: '100-200' },
    { label: 'Over 200 DH', value: 'over-200' }
  ];

  const ratings = [
    { label: 'All Ratings', value: 'all' },
    { label: '4.5+ Stars', value: '4.5' },
    { label: '4.0+ Stars', value: '4.0' },
    { label: '3.5+ Stars', value: '3.5' }
  ];

  const sortOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
    { label: 'Rating: Highest First', value: 'rating' },
    { label: 'Newest Arrivals', value: 'newest' }
  ];

  useEffect(() => {
    let count = 0;
    if (filters.category !== 'all') count++;
    if (filters.priceRange !== 'all') count++;
    if (filters.rating !== 'all') count++;
    if (searchQuery.trim() !== '') count++;
    setActiveFilterCount(count);
  }, [filters, searchQuery]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      priceRange: 'all',
      rating: 'all',
      sortBy: 'featured'
    });
    setSearchQuery('');
  };

  return (
    <div className="products-page-theme">
      <Navbar />
      <GridBackground>
        <div style={{ position: 'relative', width: '100vw', minHeight: '100vh' }}>
          <Aurora
            colorStops={["#8B7355", "#C4B5A0", "#FFD277"]}
            blend={0.4}
            amplitude={0.8}
          />
          <div style={{ position: 'relative', zIndex: 1, paddingTop: '80px' }}>
            <div className="products-page-container">
              {/* Header Section */}
              <div className="products-header">
                <h1>Our Collection</h1>
                <p className="products-subtitle">
                  Discover our curated collection of elegant home decor pieces, 
                  each handcrafted with attention to detail and timeless design.
                </p>
              </div>

              {/* Search Bar */}
              <div className="search-container">
                <div className="search-box">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search products by name, category, or features..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button 
                      className="clear-search"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Filters Section */}
              <div className="filters-container">
                <div className="filters-header">
                  <h2>Filter Products</h2>
                  {activeFilterCount > 0 && (
                    <div className="filter-status">
                      <span className="active-filters">
                        {activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''}
                      </span>
                      <button 
                        className="clear-filters-btn"
                        onClick={handleClearFilters}
                      >
                        Clear All
                      </button>
                    </div>
                  )}
                </div>

                <div className="filters-grid">
                  {/* Category Filter */}
                  <div className="filter-group">
                    <label htmlFor="category">
                      <span className="filter-label">Category</span>
                      <div className="filter-select-wrapper">
                        <select
                          id="category"
                          value={filters.category}
                          onChange={(e) => handleFilterChange('category', e.target.value)}
                          className="filter-select"
                        >
                          {categories.map((category, index) => (
                            <option key={index} value={category === 'All Categories' ? 'all' : category.toLowerCase()}>
                              {category}
                            </option>
                          ))}
                        </select>
                        <span className="select-arrow">▼</span>
                      </div>
                    </label>
                  </div>

                  {/* Price Range Filter */}
                  <div className="filter-group">
                    <label htmlFor="priceRange">
                      <span className="filter-label">Price Range</span>
                      <div className="filter-select-wrapper">
                        <select
                          id="priceRange"
                          value={filters.priceRange}
                          onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                          className="filter-select"
                        >
                          {priceRanges.map((range, index) => (
                            <option key={index} value={range.value}>
                              {range.label}
                            </option>
                          ))}
                        </select>
                        <span className="select-arrow">▼</span>
                      </div>
                    </label>
                  </div>

                  {/* Rating Filter */}
                  <div className="filter-group">
                    <label htmlFor="rating">
                      <span className="filter-label">Minimum Rating</span>
                      <div className="filter-select-wrapper">
                        <select
                          id="rating"
                          value={filters.rating}
                          onChange={(e) => handleFilterChange('rating', e.target.value)}
                          className="filter-select"
                        >
                          {ratings.map((rating, index) => (
                            <option key={index} value={rating.value}>
                              {rating.label}
                            </option>
                          ))}
                        </select>
                        <span className="select-arrow">▼</span>
                      </div>
                    </label>
                  </div>

                  {/* Sort By */}
                  <div className="filter-group">
                    <label htmlFor="sortBy">
                      <span className="filter-label">Sort By</span>
                      <div className="filter-select-wrapper">
                        <select
                          id="sortBy"
                          value={filters.sortBy}
                          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                          className="filter-select"
                        >
                          {sortOptions.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <span className="select-arrow">▼</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Active Filters Display */}
                {activeFilterCount > 0 && (
                  <div className="active-filters-display">
                    <div className="active-filters-list">
                      {filters.category !== 'all' && (
                        <span className="active-filter-tag">
                          Category: {categories.find(c => c.toLowerCase() === filters.category) || filters.category}
                          <button 
                            onClick={() => handleFilterChange('category', 'all')}
                            className="remove-filter"
                          >
                            ✕
                          </button>
                        </span>
                      )}
                      {filters.priceRange !== 'all' && (
                        <span className="active-filter-tag">
                          {priceRanges.find(r => r.value === filters.priceRange)?.label}
                          <button 
                            onClick={() => handleFilterChange('priceRange', 'all')}
                            className="remove-filter"
                          >
                            ✕
                          </button>
                        </span>
                      )}
                      {filters.rating !== 'all' && (
                        <span className="active-filter-tag">
                          {ratings.find(r => r.value === filters.rating)?.label}
                          <button 
                            onClick={() => handleFilterChange('rating', 'all')}
                            className="remove-filter"
                          >
                            ✕
                          </button>
                        </span>
                      )}
                      {searchQuery && (
                        <span className="active-filter-tag">
                          Search: "{searchQuery}"
                          <button 
                            onClick={() => setSearchQuery('')}
                            className="remove-filter"
                          >
                            ✕
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Products Section */}
              <ProductsSection showAllProducts={true} />

              {/* Collections Info nigga bitch  hhh */}
              <div className="collections-info">
                <div className="info-card">
                  <div className="info-icon">🎨</div>
                  <h3>Handcrafted Excellence</h3>
                  <p>Each piece is carefully crafted by skilled artisans using traditional techniques and premium materials.</p>
                </div>
                <div className="info-card">
                  <div className="info-icon">🚚</div>
                  <h3>Free Shipping</h3>
                  <p>Enjoy free shipping on all orders over 500 DH within Morocco. Fast and secure delivery guaranteed.</p>
                </div>
                <div className="info-card">
                  <div className="info-icon">🔄</div>
                  <h3>30-Day Returns</h3>
                  <p>Not satisfied with your purchase? We offer a 30-day return policy for a full refund or exchange.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GridBackground>
    </div>
  );
};

export default Products;