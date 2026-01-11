import React, { useEffect, useState } from 'react';
import './Footer.css';

const FooterEnhanced = () => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 60 + 20, // 20-80px
      position: Math.random() * 100, // 0-100%
      time: Math.random() * 3 + 2, // 2-5s
      delay: Math.random() * 5, // 0-5s
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <>
      <footer className="footer">
        <div className="bubbles">
          {bubbles.map(bubble => (
            <div
              key={bubble.id}
              className="bubble"
              style={{
                '--size': `${bubble.size}px`,
                '--position': `${bubble.position}%`,
                '--time': `${bubble.time}s`,
                '--delay': `${bubble.delay}s`,
                width: bubble.size,
                height: bubble.size,
                left: `${bubble.position}%`,
                animation: `bubble-size ${bubble.time}s ease-in infinite ${bubble.delay}s,
                           bubble-move ${bubble.time}s ease-in infinite ${bubble.delay}s`
              }}
            />
          ))}
        </div>
        
        <div className="footer-content">
        </div>
        
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Elegance & Natural Decor. All rights reserved.</p>
          <p>Made with ❤️ in Morocco</p>
        </div>
      </footer>
      
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="blob">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" 
              result="blob" 
            />
            <feComposite in="SourceGraphic" in2="blob" operator="atop" />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default FooterEnhanced;