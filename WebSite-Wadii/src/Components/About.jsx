import React from 'react';
import GridBackground from './GridBackground';
import Aurora from './Aurora';
import Navbar from './Navbar';
import Footer from './Footer';
import './About.css';

// Import a sample image for the story section
// You'll need to add this image to your assets
const storyImage = 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop';

const About = () => {
  return (
    <div className="about-page-theme">
      <Navbar />
      <GridBackground>
        <div style={{ position: 'relative', width: '100vw', minHeight: '100vh' }}>
          <Aurora
            colorStops={["#8B7355", "#C4B5A0", "#FFD277"]}
            blend={0.4}
            amplitude={0.8}
          />
          <div style={{ position: 'relative', zIndex: 1, paddingTop: '80px' }}>
            <div className="about-container">
              {/* Header Section */}
              <div className="about-header">
                <h1>About Elegance & Natural Decor</h1>
                <p className="about-subtitle">
                  Where timeless craftsmanship meets contemporary elegance
                </p>
              </div>

              <div className="about-content">
                {/* Story Section with Image */}
                <div className="about-section story-section">
                  <div className="story-content">
                    <h2>Our Story</h2>
                    <p>
                      Founded in the heart of Morocco, Elegance & Natural Decor emerged from a profound 
                      appreciation for the country's rich artistic heritage and natural beauty. Our journey 
                      began with a simple vision: to bring the exquisite craftsmanship of Moroccan artisans 
                      to homes worldwide.
                    </p>
                    <p>
                      What started as a small collection of handcrafted items has grown into a curated 
                      selection of premium home decor that celebrates the perfect harmony between 
                      traditional artistry and modern design sensibilities.
                    </p>
                    <p>
                      Today, we collaborate with skilled artisans across Morocco, preserving ancient 
                      techniques while embracing contemporary aesthetics to create pieces that are 
                      both meaningful and beautiful.
                    </p>
                  </div>
                  <div className="story-image">
                    <img 
                      src={storyImage} 
                      alt="Moroccan craftsmanship" 
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Mission Section */}
                <div className="about-section mission-section">
                  <h2>Our Mission & Vision</h2>
                  <p>
                    Our mission is to enrich living spaces with decor that tells a story of cultural 
                    heritage and natural elegance. We believe that your home should be a sanctuary 
                    that reflects your unique style while embracing sustainable, artisanal craftsmanship.
                  </p>
                  <p>
                    We envision a world where traditional craftsmanship thrives alongside modern design, 
                    creating timeless pieces that are cherished for generations. Every item in our 
                    collection is selected with intention—to bring beauty, quality, and soul into your home.
                  </p>
                </div>

                {/* Values Section */}
                <div className="about-section">
                  <h2>Our Core Values</h2>
                  <div className="features-grid">
                    <div className="feature-item">
                      <div className="value-icon">🎨</div>
                      <h3>Authentic Craftsmanship</h3>
                      <p>Each piece is handcrafted by skilled artisans using techniques passed down through generations, ensuring unique character and exceptional quality.</p>
                    </div>
                    <div className="feature-item">
                      <div className="value-icon">🌿</div>
                      <h3>Sustainable Practices</h3>
                      <p>We prioritize eco-friendly materials and sustainable production methods, minimizing our environmental impact while maximizing beauty.</p>
                    </div>
                    <div className="feature-item">
                      <div className="value-icon">✨</div>
                      <h3>Design Excellence</h3>
                      <p>Our collection features distinctive Moroccan-inspired patterns and natural motifs, blending traditional elegance with contemporary style.</p>
                    </div>
                  </div>
                </div>

                {/* Quality Section */}
                <div className="about-section">
                  <h2>Our Commitment to Quality</h2>
                  <p>
                    Every product in our collection undergoes rigorous quality control to ensure it meets 
                    our exacting standards. From material selection to final inspection, we are dedicated 
                    to delivering excellence. Our satisfaction guarantee means you can shop with confidence, 
                    knowing that we stand behind every piece.
                  </p>
                  <div className="values-grid">
                    <div className="value-item">
                      <h3>Premium Materials</h3>
                      <p>Only the finest natural materials selected for durability and beauty.</p>
                    </div>
                    <div className="value-item">
                      <h3>Attention to Detail</h3>
                      <p>Meticulous craftsmanship evident in every stitch, carve, and finish.</p>
                    </div>
                    <div className="value-item">
                      <h3>Timeless Design</h3>
                      <p>Pieces designed to transcend trends and remain beautiful for years.</p>
                    </div>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="about-section">
                  <h2>Visit Our Showroom</h2>
                  <p>
                    Experience the beauty and quality of our collection firsthand at our Casablanca 
                    showroom. Our knowledgeable team is always ready to help you find the perfect 
                    pieces for your home.
                  </p>
                  <div className="contact-info">
                    <p><strong>Address:</strong> 123 Design Street, Casablanca, Morocco</p>
                    <p><strong>Phone:</strong> +212 600-000-000</p>
                    <p><strong>Email:</strong> hello@elegantdecor.ma</p>
                    <p><strong>Hours:</strong> Monday - Friday: 9AM - 6PM | Saturday: 10AM - 4PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GridBackground>
    </div>
  );
};

export default About;