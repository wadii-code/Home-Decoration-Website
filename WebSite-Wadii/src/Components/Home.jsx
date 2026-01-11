import React from 'react';
import HeroText from './HeroText';
import './Home.css';
import GridBackground from './GridBackground';
import Aurora from './Aurora';
import Navbar from './Navbar';
import FloatingPic from './FloatingPic';
import ProductsSection from './ProductsSection';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <GridBackground>
        <div className="home-hero-section">
          <Aurora
            colorStops={["#FFB6C1", "#87CEEB", "#DDA0DD"]}
            blend={0.6}
            amplitude={1.2}
          />
          <div className="hero-content-wrapper">
            <div className="hero-inner">
              <HeroText />
              <FloatingPic />
            </div>
          </div>
        </div>
        <div className="home-products-section" id="ProductSection">
          <ProductsSection />
        </div>
      </GridBackground>
    </div>
  );
};

export default Home;