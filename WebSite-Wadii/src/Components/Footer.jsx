import { useEffect, useState } from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isSubmitted) return;
    const timeoutId = setTimeout(() => setIsSubmitted(false), 3000);
    return () => clearTimeout(timeoutId);
  }, [isSubmitted]);

  const onNewsletterSubmit = (e) => {
    e.preventDefault();
    if (isSubmitted) return;

    const value = newsletterEmail.trim();

    if (!value) {
      setNewsletterError('Email is required');
      return;
    }

    const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    if (!isValidEmail) {
      setNewsletterError('Invalid email address');
      return;
    }

    setNewsletterError('');
    setIsSubmitted(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <div className="feature-content">
                <h4>Free Shipping</h4>
                <p>On orders over 500 DH</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <div className="feature-content">
                <h4>24/7 Support</h4>
                <p>Dedicated customer service</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <div className="feature-content">
                <h4>Easy Returns</h4>
                <p>30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="container">
          <div className="footer-top">
            <div className="brand-section">
              <h2 className="brand-name">Elegance & Natural Decor</h2>
              <p className="brand-description">
                Bringing nature-inspired elegance to your home with premium, handcrafted decor pieces from Morocco.
              </p>
              <div className="social-icons">
                <a
                  href="https://www.instagram.com/wadiiluv/"
                  className="social-icon"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Visit our Instagram"
                  title="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.facebook.com"
                  className="social-icon"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Visit our Facebook"
                  title="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://twitter.com"
                  className="social-icon"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Visit our Twitter"
                  title="Twitter"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://linkedin.com"
                  className="social-icon"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Visit our LinkedIn"
                  title="LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>

            <div className="newsletter-section">
              <h3>Stay Updated</h3>
              <p>Subscribe to our newsletter for exclusive offers and design inspiration.</p>
              <form className="newsletter-form" onSubmit={onNewsletterSubmit} noValidate>
                <input
                  type="email"
                  placeholder="Your email address"
                  className={`newsletter-input ${newsletterError ? 'error' : ''}`}
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (newsletterError) setNewsletterError('');
                  }}
                  aria-invalid={newsletterError ? 'true' : 'false'}
                  aria-describedby={newsletterError ? 'newsletter-error' : undefined}
                  required
                />
                {newsletterError && (
                  <span className="error-message" id="newsletter-error">
                    {newsletterError}
                  </span>
                )}
                <button 
                  type="submit" 
                  className="newsletter-button" 
                  disabled={isSubmitted}
                  aria-label={isSubmitted ? "Subscribed successfully" : "Subscribe to newsletter"}
                >
                  {isSubmitted ? 'Subscribed!' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>

          <div className="footer-grid">

          </div>
        </div>
      </div>

      
    </footer>
  );
};

export default Footer;