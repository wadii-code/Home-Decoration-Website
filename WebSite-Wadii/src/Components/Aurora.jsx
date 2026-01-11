import React, { useState, useEffect } from 'react';
import './Aurora.css';

const Aurora = ({ colorStops = ["#3A29FF", "#FF94B4", "#FF3232"], amplitude = 1.0, blend = 0.5 }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 50 + 20,
      color: colorStops[Math.floor(Math.random() * colorStops.length)],
      speed: Math.random() * 0.5 + 0.3,
      opacity: Math.random() * 0.4 + 0.1,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);

    const jitter = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + (Math.random() - 0.5) * 3 + 100) % 100,
        y: (p.y + (Math.random() - 0.5) * 3 + 100) % 100,
      })));
    }, 4000);

    return () => clearInterval(jitter);
  }, [colorStops]);

  return (
    <div className="aurora-container" aria-hidden>
      <div className="aurora-overlay" />
      <div className="aurora-particles">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="aurora-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size * amplitude}px`,
              height: `${particle.size * amplitude}px`,
              background: `radial-gradient(circle, ${particle.color} 0%, rgba(0,0,0,0) 70%)`,
              opacity: particle.opacity * blend,
              animation: `particle-float ${25 / particle.speed}s ${particle.delay}s infinite ease-in-out`,
              transform: 'translate(-50%, -50%)',
              mixBlendMode: 'soft-light',
              pointerEvents: 'none',
              filter: 'blur(25px)'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Aurora;