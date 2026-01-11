import React from 'react';
import './FloatingPic.css';
import DecorateIt from '../assets/images/DecorateIt.png';

const FloatingPic = () => {
  return (
    <div className="floating-pic-container">
      <div className="image-wrapper">
        <img
          src={DecorateIt}
          alt="Elegant home decor arrangement featuring natural elements and stylish accessories"
          className="floating-pic"
          loading="eager"
        />
        <div className="image-overlay">
          <div className="image-glow"></div>
          <div className="image-reflection"></div>
        </div>
      </div>
    </div>
  );
};

export default FloatingPic;