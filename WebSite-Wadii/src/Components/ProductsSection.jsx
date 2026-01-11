import React, { useState } from 'react';
import QuickViewModal from './QuickViewModal';
import './ProductsSection.css';

import img1 from '../assets/images/img1.jpeg';
import img2 from '../assets/images/img2.jpeg';
import img3 from '../assets/images/img3.jpeg';
import img4 from '../assets/images/img4.jpeg';
import img5 from '../assets/images/img5.jpeg';
import img6 from '../assets/images/img6.jpeg';
import img7 from '../assets/images/img7.jpeg';
import img8 from '../assets/images/img8.jpeg';


const PRODUCTS_DATA = [
  { 
    id: 1, 
    name: "Deco Tray", 
    price: 35,
    image: img1,
    category: "Decorative Tray",
    description: "Handcrafted wooden serving tray with intricate Moroccan patterns. Perfect for serving tea or displaying decor items.",
    rating: 4.5,
    reviewCount: 24,
    tag: "Popular"
  },
  { 
    id: 2, 
    name: "Floral Arrangement", 
    price: 90,
    image: img2,
    category: "Floral Arrangement",
    description: "Premium white rose arrangement preserved to maintain its beauty indefinitely. A timeless addition to any room.",
    rating: 4.8,
    reviewCount: 32,
    tag: "Premium"
  },
  { 
    id: 3, 
    name: "Candle Holder", 
    price: 70,
    image: img3,
    category: "Candle Holder",
    description: "Ceramic candle cup with decorative lid. Creates a warm, ambient glow perfect for relaxing evenings.",
    rating: 4.3,
    reviewCount: 18,
    tag: "Bestseller"
  },
  { 
    id: 4, 
    name: "Floral Vase", 
    price: 130,
    image: img4,
    category: "Floral Vase",
    description: "Hand-blown glass flower vase with elegant curves. Showcases your favorite flowers in style.",
    rating: 4.9,
    reviewCount: 28,
    tag: "Premium"
  },
  { 
    id: 5, 
    name: "Luminaire Moderne", 
    price: 180,
    image: img5,
    category: "Modern Lighting",
    description: "Contemporary lighting fixture with adjustable arms and warm LED lighting. Creates perfect ambiance.",
    rating: 4.7,
    reviewCount: 21,
    tag: "New"
  },
  { 
    id: 6, 
    name: "Coussin Art", 
    price: 45,
    image: img6,
    category: "Artistic Cushion",
    description: "Decorative cushion with traditional Moroccan embroidery. Adds color and comfort to any seating.",
    rating: 4.4,
    reviewCount: 16,
    tag: "Popular"
  },
  { 
    id: 7, 
    name: "Miroir Antique", 
    price: 220,
    image: img7,
    category: "Vintage Mirror",
    description: "Ornate antique-style mirror with hand-carved wooden frame. Makes any space appear larger and brighter.",
    rating: 4.9,
    reviewCount: 19,
    tag: "Premium"
  },
  { 
    id: 8, 
    name: "Horloge Murale", 
    price: 95,
    image: img8,
    category: "Wall Clock",
    description: "Elegant modern wall clock with minimalist design and silent quartz movement. A functional art piece.",
    rating: 4.6,
    reviewCount: 23,
    tag: "Bestseller"
  },
];

const ProductsSection = ({ showAllProducts = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const initialDisplayCount = 4;
  const displayProducts = isExpanded || showAllProducts 
    ? PRODUCTS_DATA 
    : PRODUCTS_DATA.slice(0, initialDisplayCount);

  const handleQuickView = (productId) => {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'unset';
  };

  const handleExpandToggle = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsExpanded(!isExpanded);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <>
        <span className="stars">
          {'★'.repeat(fullStars)}
          {hasHalfStar && '½'}
          {'☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0))}
        </span>
      </>
    );
  };

  return (
    <>
      {selectedProduct && (
        <QuickViewModal 
          product={selectedProduct} 
          onClose={closeQuickView} 
        />
      )}
      
      <section className="products-section" id="products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              {showAllProducts ? 'Our Collection' : 'Best Sellers'}
            </h2>
            <p className="section-subtitle">
              Curated collection of handcrafted pieces that blend tradition with contemporary design
            </p>
          </div>
          
          <div className={`products-grid ${isExpanded ? 'expanded' : ''}`}>
            {displayProducts.map((product, index) => (
              <article 
                key={product.id} 
                className="product-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="product-image-container">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                  />
                  
         
                  <div className="product-tag">
                    {product.tag}
                  </div>

                  {/*wadii bogos */}
                
                 
                  
                  <div className="product-overlay">
                    <button 
                      className="primary-btn"
                      onClick={() => handleQuickView(product.id)}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      Quick View
                    </button>
                  </div>
                </div>
                {/*yarbi mansach had l9lawi  */}
                

                <div className="product-category-below">
                  <span className="category-text">{product.category}</span>
                </div>
                
                <div className="product-details">
                  <header className="product-header">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-rating">
                      {renderStars(product.rating)}
                      <span className="rating-count">({product.reviewCount})</span>
                    </div>
                  </header>
                  
                  <p className="product-description">{product.description}</p>
                  
                  <footer className="product-footer">
                    <div className="price-container">
                      <span className="product-price">{product.price} DH</span>
                      <span className="price-unit">per item</span>
                    </div>
                    <button 
                      className="secondary-btn"
                      onClick={() => handleQuickView(product.id)}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      View Details
                    </button>
                  </footer>
                </div>
              </article>
            ))}
          </div>
          
          {!showAllProducts && (
        <div className="section-footer">
          <button 
            className="primary-btn"
            onClick={handleExpandToggle}
            disabled={isAnimating}
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Show Less' : `View All  Products`}
          </button>
        </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductsSection;