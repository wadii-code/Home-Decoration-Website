import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import GridBackground from './GridBackground';
import Aurora from './Aurora';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    alert(`Proceeding to checkout with ${totalItems} items totaling ${totalPrice.toFixed(2)} DH`);
    // Add actual checkout logic here
  };

  if (cart.length === 0) {
    return (
      <div>
        <Navbar />
        <GridBackground>
          <div style={{ position: 'relative', width: '100vw', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Aurora
              colorStops={["#FFB6C1", "#87CEEB", "#DDA0DD"]}
              blend={0.6}
              amplitude={1.2}
            />
            <div style={{ position: 'relative', zIndex: 1, color: '#333', padding: '2rem 1rem', textAlign: 'center' }}>
              <div className="empty-cart">
                <h1>Your Cart is Empty</h1>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <Link to="/products" className="shop-now-btn">
                  Start Shopping
                </Link>
              </div>
            </div>
          </div>
        </GridBackground>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <GridBackground>
        <div style={{ position: 'relative', width: '100vw', minHeight: '100vh' }}>
          <Aurora
            colorStops={["#FFB6C1", "#87CEEB", "#DDA0DD"]}
            blend={0.6}
            amplitude={1.2}
          />
          <div style={{ position: 'relative', zIndex: 1, color: '#333', padding: '2rem 1rem' }}>
            <div className="cart-container">
              <h1>Shopping Cart ({totalItems} items)</h1>

              <div className="cart-content">
                <div className="cart-items">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="item-image">
                        <img src={item.image || '/api/placeholder/80/80'} alt={item.name} />
                      </div>
                      <div className="item-details">
                        <h3>{item.name}</h3>
                        <p className="item-category">{item.category}</p>
                        <p className="item-price">{item.price} DH</p>
                      </div>
                      <div className="item-quantity">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="quantity-btn"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="quantity-btn"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <div className="item-total">
                        <p>{(item.price * item.quantity).toFixed(2)} DH</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="remove-btn"
                        aria-label="Remove item"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="summary-content">
                    <h2>Order Summary</h2>
                    <div className="summary-row">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>{totalPrice.toFixed(2)} DH</span>
                    </div>
                    <div className="summary-row">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="summary-row">
                      <span>Tax</span>
                      <span>{(totalPrice * 0.1).toFixed(2)} DH</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total</span>
                      <span>{(totalPrice * 1.1).toFixed(2)} DH</span>
                    </div>
                    <button className="checkout-btn" onClick={handleCheckout}>
                      Proceed to Checkout
                    </button>
                    <button onClick={clearCart} className="clear-cart-btn">
                      Clear Cart
                    </button>
                    <Link to="/products" className="continue-shopping">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GridBackground>
      <Footer />
    </div>
  );
};

export default Cart;