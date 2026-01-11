import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './QuickViewModal.css';

const QuickViewModal = ({ product, onClose }) => {
  const modalRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [orderInfo, setOrderInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const calculateTotal = () => {
    return product.price * quantity;
  };

  const validateForm = () => {
    const errors = {};
    if (!orderInfo.name.trim()) errors.name = 'Name is required';
    if (!orderInfo.phone.trim()) errors.phone = 'Phone number is required';
    if (!orderInfo.email.trim()) errors.email = 'Email is required';
    if (!orderInfo.address.trim()) errors.address = 'Address is required';
    if (!orderInfo.city.trim()) errors.city = 'City is required';
    return errors;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // hdi n prepari data bach nseftha l supabase hhaahaha
      const orderData = {
        Full_Name: orderInfo.name,
        Phone_Number: orderInfo.phone,
        Email_Address: orderInfo.email,
        Delivery_Address: orderInfo.address,
        City: orderInfo.city,
        Additional_Notes: orderInfo.notes,
        Product_Name: product.name,
        Quantity: quantity.toString(),
        Price: product.price
      };
      
      // hdi hna khss i3tdar itseft produc api
      const response = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('Order placed successfully:', result);
        setIsOrderPlaced(true);
        
        setOrderInfo({
          name: '',
          phone: '',
          email: '',
          address: '',
          city: '',
          notes: ''
        });
        setQuantity(1);
      } else {
        console.error('Order submission error:', result.error);
        alert('Failed to place order: ' + result.error);
      }
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) return null;

  return ReactDOM.createPortal(
    <div className="quickview-overlay">
      <div className="quickview-modal order-modal" ref={modalRef}>
        <div className="modal-header">
          <h2 className="modal-title">Order Confirmation</h2>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          {isOrderPlaced ? (
            <div className="order-success">
              <div className="success-icon">✓</div>
              <h3>Order Confirmed!</h3>
              <p className="success-message">
                Thank you for your order! We've received your order for <strong>{product.name}</strong>.
              </p>
              <div className="order-summary">
                <p><strong>Product:</strong> {product.name}</p>
                <p><strong>Quantity:</strong> {quantity}</p>
                <p><strong>Total Amount:</strong> {calculateTotal()} DH</p>
              </div>
              <p className="success-note">
                Our team will contact you within 24 hours to confirm your order details and arrange delivery.
              </p>
              <div className="success-actions">
                <button className="primary-btn" onClick={onClose}>
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <div className="order-form-container">
              {/* Product Summary */}
              <div className="product-summary">
                <div className="product-image-container">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-image"
                  />
                </div>
                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <div className="product-rating">
                    <span className="stars">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                    </span>
                    <span className="rating-count">({product.reviewCount} reviews)</span>
                  </div>
                </div>
                
                <div className="quantity-price-section">
                  <div className="quantity-control">
                    <span className="quantity-label">Quantity:</span>
                    <div className="quantity-buttons">
                      <button 
                        className="quantity-btn decrease"
                        onClick={decreaseQuantity}
                        type="button"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity-display">{quantity}</span>
                      <button 
                        className="quantity-btn increase"
                        onClick={increaseQuantity}
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="price-section">
                    <div className="unit-price">
                      <span className="price-label">Unit Price:</span>
                      <span className="price-value">{product.price} DH</span>
                    </div>
                    <div className="total-price">
                      <span className="total-label">Total:</span>
                      <span className="total-value">{calculateTotal()} DH</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Form */}
              <form className="order-form" onSubmit={handleSubmitOrder}>
                <h3 className="form-title">Shipping Information</h3>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">
                      Full Name *
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={orderInfo.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      Phone Number *
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={orderInfo.phone}
                        onChange={handleInputChange}
                        placeholder="+212 600-000-000"
                        required
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      Email Address *
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={orderInfo.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">
                      Delivery Address *
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={orderInfo.address}
                        onChange={handleInputChange}
                        placeholder="Street address, apartment, suite"
                        required
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="city">
                      City *
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={orderInfo.city}
                        onChange={handleInputChange}
                        placeholder="Casablanca"
                        required
                      />
                    </label>
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="notes">
                      Additional Notes (Optional)
                      <textarea
                        id="notes"
                        name="notes"
                        value={orderInfo.notes}
                        onChange={handleInputChange}
                        placeholder="Special delivery instructions or requests"
                        rows="3"
                      />
                    </label>
                  </div>
                </div>

            

                <div className="form-actions">
                  <button
                    type="submit"
                    className="primary-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Confirm Order'}
                  </button>
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                </div>

                <div className="order-notice">
                  <p>📞 We'll contact you to confirm your order and arrange delivery.</p>
                  <p>🔄 30-day return policy applies to all orders.</p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default QuickViewModal;