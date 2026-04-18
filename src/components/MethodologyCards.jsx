import React, { useEffect, useRef } from 'react';
import '../styles/methodology-cards.css';

const MethodologyCards = () => {
  const cards = [
    {
      title: 'Advanced Web Development',
      description: 'Engineering high-performance, scalable web ecosystems using React and modern tech for unbeatable speed and SEO-optimized user experiences.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="3"/>
          <circle cx="4" cy="8" r="1.5"/>
          <circle cx="20" cy="8" r="1.5"/>
          <circle cx="4" cy="16" r="1.5"/>
          <circle cx="20" cy="16" r="1.5"/>
          <path d="M4 8c0 1.5 1.5 2 3 2s3-.5 3-2c0-1.5-1.5-2-3-2s-3 .5-3 2"/>
          <path d="M14 16c-1.5 0-2 1.5-2 2s.5 2 2 2c1.5 0 2-1.5 2-2s-.5-2-2-2"/>
          <path d="M14 8c-1.5 0-2 1.5-2 2s.5 2 2 2c1.5 0 2-1.5 2-2s-.5-2-2-2"/>
        </svg>
      ),
      id: 'meth-1'
    },
    {
      title: 'Innovative 3D & Branding',
      description: 'Crafting unique brand identities with high-end 3D CGI and motion graphics designed to differentiate your business in a crowded marketplace.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      ),
      id: 'meth-2'
    },
    {
      title: 'ROI-Driven Digital Marketing',
      description: 'Strategic, data-backed marketing engines and SEO solutions engineered to maximize conversions and drive measurable global business growth.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"/>
          <path d="M7 16l4-4 4 4 5-6"/>
        </svg>
      ),
      id: 'meth-3'
    }
  ];

  return (
    <div className="methodology-container mx-auto">
      <div className="methodology-grid">
        {cards.map((card) => (
          <MethodologyCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

const MethodologyCard = ({ card }) => {
  const bubblesRef = useRef(null);

  useEffect(() => {
    if (!bubblesRef.current) return;
    
    const container = bubblesRef.current;
    const bubbleCount = 15;
    
    // Clear existing bubbles if any
    container.innerHTML = '';
    
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'meth-bubble';
      
      const size = 1 + Math.random() * 2;
      const left = Math.random() * 100;
      const duration = 4 + Math.random() * 6;
      const delay = Math.random() * 5;
      
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}%`;
      bubble.style.animationDuration = `${duration}s`;
      bubble.style.animationDelay = `${delay}s`;
      
      container.appendChild(bubble);
    }
  }, []);

  return (
    <div className="methodology-card about-reveal">
      <div className="meth-icon-section">
        <div className="meth-grid-bg"></div>
        <div className="meth-bubbles-container" ref={bubblesRef}></div>
        <div className="meth-icon-wrapper">
          {card.icon}
        </div>
      </div>
      <div className="meth-text-section">
        <h3 className="meth-card-title">{card.title}</h3>
        <p className="meth-card-description">{card.description}</p>
      </div>
      <div className="meth-bottom-border"></div>
    </div>
  );
};

export default MethodologyCards;
