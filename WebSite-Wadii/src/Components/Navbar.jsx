import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fiftyVh = viewportHeight * 0.5;

      setIsScrolled(scrollPosition > fiftyVh);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="navbar-brand" aria-label="Home">
          <span className="brand-icon">⚡</span>
          <span className="brand-text">Wadii</span>
        </Link>
        
        

        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`nav-link ${isActive('/products') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/about"
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </div>

        <Link to="/cart" className="cart-link" aria-label={`Shopping cart with ${totalItems} items`}>
          <div className="cart-icon-container">
            <ShoppingCart size={24} aria-hidden="true" />
            {totalItems > 0 && (
              <span className="cart-count" aria-label={`${totalItems} items in cart`}>
                {totalItems}
              </span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;