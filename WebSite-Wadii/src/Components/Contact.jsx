import React, { useState } from 'react';
import Navbar from './Navbar';
import GridBackground from './GridBackground';
import Aurora from './Aurora';
import Footer from './Footer';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^[\+]?[1-9][\d\s\-\(\)]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Contact form submitted:', formData);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-theme">
      <Navbar />
      <GridBackground>
        <div style={{ position: 'relative', width: '100vw', minHeight: '100vh' }}>
          <Aurora
            colorStops={["#8B7355", "#C4B5A0", "#FFD277"]}
            blend={0.4}
            amplitude={0.8}
          />
          <div style={{ position: 'relative', zIndex: 1, paddingTop: '80px' }}>
            <div className="contact-container">
              {/* Header */}
              <div className="contact-header">
                <h1>Get In Touch</h1>
                <p className="contact-subtitle">
                  Have questions about our products or need assistance?<br />
                  We're here to help! Reach out to us through any of the channels below.
                </p>
              </div>

              {/* Main Content */}
              <div className="contact-content">
                {/* Contact Info */}
                <div className="contact-info">
                  <div className="info-section">
                    <h2>Our Contact Information</h2>
                    <p>
                      We value your inquiries and feedback. Feel free to contact us using the 
                      information below, or fill out the form for a quicker response.
                    </p>

                    <div className="contact-details">
                      <div className="contact-item">
                        <span className="contact-icon">📍</span>
                        <div>
                          <h4>Address</h4>
                          <p>Casablanca, Morocco</p>
                        </div>
                      </div>

                      <div className="contact-item">
                        <span className="contact-icon">📞</span>
                        <div>
                          <h4>Phone</h4>
                          <p>+212 688-792101</p>
                        </div>
                      </div>

                      <div className="contact-item">
                        <span className="contact-icon">✉️</span>
                        <div>
                          <h4>Email</h4>
                          <p>+imanealhiane02@gmail.com</p>
                        </div>
                      </div>

                      <div className="contact-item">
                        <span className="contact-icon">🕒</span>
                        <div>
                          <h4>Business Time</h4>
                          <p>Throughout the whole week<br />24/7</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="contact-form-section">
                  {isSubmitted ? (
                    <div className="success-message">
                      <h3>Thank You!</h3>
                      <p>
                        Your message has been sent successfully. Our team will review 
                        your inquiry and get back to you within 24 hours.
                      </p>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="primary-btn"
                        style={{ marginTop: '1rem' }}
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form className="contact-form" onSubmit={handleSubmit} noValidate>
                      <h2>Send us a Message</h2>

                      {/* Full Name */}
                      <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={errors.name ? 'error' : ''}
                          placeholder="Your full name"
                          disabled={isSubmitting}
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                      </div>

                      {/* Email */}
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={errors.email ? 'error' : ''}
                          placeholder="your.email@example.com"
                          disabled={isSubmitting}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                      </div>

                      {/* Phone */}
                      <div className="form-group">
                        <label htmlFor="phone" className="optional">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={errors.phone ? 'error' : ''}
                          placeholder="+212 600-000-000"
                          disabled={isSubmitting}
                        />
                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                      </div>

                      {/* Subject */}
                      <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={errors.subject ? 'error' : ''}
                          disabled={isSubmitting}
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="order">Order Support</option>
                          <option value="product">Product Information</option>
                          <option value="custom">Custom Order Request</option>
                          <option value="wholesale">Wholesale Inquiry</option>
                          <option value="partnership">Business Partnership</option>
                        </select>
                        {errors.subject && <span className="error-message">{errors.subject}</span>}
                      </div>

                      {/* Message */}
                      <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className={errors.message ? 'error' : ''}
                          placeholder="Tell us how we can help you..."
                          disabled={isSubmitting}
                        />
                        {errors.message && <span className="error-message">{errors.message}</span>}
                      </div>

                      {/* Submit Button */}
                      <button 
                        type="submit" 
                        className="primary-btn"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                      
                      {errors.submit && (
                        <span className="error-message" style={{ display: 'block', marginTop: '1rem', textAlign: 'center' }}>
                          {errors.submit}
                        </span>
                      )}
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </GridBackground>

    </div>
  );
};

export default Contact;