import React from 'react';
import './GridBackground.css'; 

const GridBackground = ({ children }) => {
  return (
    <div className="grid-wrapper">
      <div className="grid-background"></div>
      {children}
    </div>
  );
};

export default GridBackground;