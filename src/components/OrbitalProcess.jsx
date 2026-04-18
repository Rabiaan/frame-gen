import React, { useEffect, useRef, useState } from 'react';
import '../styles/orbital-process.css';

const STEPS = [
  { id: '01', name: 'Discovery', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.3)', tags: ['RESEARCH', 'STRATEGY', 'PLANNING'], desc: 'We research your goals, audience, and competitive landscape to build a solid foundation for your project.' },
  { id: '02', name: 'Design', color: '#A855F7', bg: 'rgba(168, 85, 247, 0.1)', border: 'rgba(168, 85, 247, 0.3)', tags: ['UI/UX', 'PROTOTYPING', 'VISUALS'], desc: 'We craft intuitive interfaces, wireframes, and cohesive visuals that elevate your brand experience.' },
  { id: '03', name: 'Development', color: '#22C55E', bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.3)', tags: ['FRONTEND', 'BACKEND', 'QA TESTING'], desc: 'We build robust, scalable solutions with clean code using React, Next.js, and modern technologies.' },
  { id: '04', name: 'Delivery', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)', tags: ['DEPLOYMENT', 'TRAINING', 'HANDOFF'], desc: 'We launch your product with care, ensuring smooth rollout, SEO setup, and seamless handoff.' },
  { id: '05', name: 'Support', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)', tags: ['MAINTENANCE', 'ANALYTICS', 'GROWTH'], desc: 'We provide ongoing maintenance, performance monitoring, and iterative improvements.' }
];

const OrbitalProcess = () => {
  const containerRef = useRef(null);
  const progressPathRef = useRef(null);
  const boxRefs = useRef([]);
  const dotRefs = useRef([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  // Animation values
  const animationState = useRef({
    smoothProgress: 0,
    currentProgress: 0,
    lastActiveIndex: 0,
    velocity: 0,
    settings: { RADIUS: 240, CENTER_Y: 240, PATH_LENGTH: 754 }
  });

  const spring = {
    stiffness: 100,
    damping: 30,
    mass: 1
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let settings;
      if (width < 640) {
        settings = { RADIUS: 170, CENTER_Y: 160, PATH_LENGTH: 534 };
      } else if (width < 1024) {
        settings = { RADIUS: 210, CENTER_Y: 200, PATH_LENGTH: 660 };
      } else {
        settings = { RADIUS: 240, CENTER_Y: 240, PATH_LENGTH: 754 };
      }
      animationState.current.settings = settings;
      
      if (progressPathRef.current) {
        progressPathRef.current.style.strokeDasharray = settings.PATH_LENGTH;
        progressPathRef.current.style.strokeDashoffset = settings.PATH_LENGTH;
      }
    };

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress based on the container's position relative to viewport
      const totalScrollable = containerHeight - viewportHeight;
      const scrollY = -rect.top;
      const progress = Math.min(1, Math.max(0, scrollY / totalScrollable));
      animationState.current.currentProgress = progress;
    };

    const calculateAngle = (progress, index) => {
      const offset = (index - progress * (STEPS.length - 1)) * 60;
      return 90 - offset;
    };

    const calculatePosition = (angle, radius) => {
      const rad = (angle * Math.PI) / 180;
      return {
        x: Math.cos(rad) * radius,
        y: -Math.sin(rad) * radius
      };
    };

    const calculateScale = (angle) => {
      const normalizedAngle = Math.max(0, Math.min(180, angle));
      const distance = Math.abs(90 - normalizedAngle);
      const maxDistance = 50;
      return 1.1 - (distance / maxDistance) * 0.4;
    };

    const calculateOpacity = (angle) => {
      const normalizedAngle = Math.max(0, Math.min(180, angle));
      if (normalizedAngle === 0) return 0;
      if (normalizedAngle <= 45) return (normalizedAngle / 45) * 0.6;
      if (normalizedAngle <= 90) return 0.6 + ((normalizedAngle - 45) / 45) * 0.4;
      if (normalizedAngle <= 135) return 1 - ((normalizedAngle - 90) / 45) * 0.4;
      if (normalizedAngle <= 180) return 0.6 - ((normalizedAngle - 135) / 45) * 0.6;
      return 0;
    };

    const updateUI = (progress) => {
      const { settings } = animationState.current;
      
      // Update Boxes
      boxRefs.current.forEach((box, index) => {
        if (!box) return;
        const angle = calculateAngle(progress, index);
        const pos = calculatePosition(angle, settings.RADIUS);
        const scale = calculateScale(angle);
        const opacity = calculateOpacity(angle);
        const zIndex = (angle >= 45 && angle <= 135) ? 50 : 10;
        
        box.style.transform = `translate(${pos.x}px, ${pos.y + settings.CENTER_Y}px) scale(${scale})`;
        box.style.opacity = opacity;
        box.style.zIndex = zIndex;

        const glow = box.querySelector('.box-glow');
        if (glow) {
          const normalizedGlowAngle = Math.max(85, Math.min(95, angle));
          const glowOpacity = normalizedGlowAngle >= 85 && normalizedGlowAngle <= 95
            ? (normalizedGlowAngle >= 90 ? 1 - (normalizedGlowAngle - 90) / 5 : (normalizedGlowAngle - 85) / 5)
            : 0;
          glow.style.opacity = glowOpacity;
        }
      });

      // Update Path
      if (progressPathRef.current) {
        const dashOffset = settings.PATH_LENGTH * (1 - progress);
        progressPathRef.current.style.strokeDashoffset = dashOffset;
        progressPathRef.current.style.opacity = progress < 0.05 ? progress / 0.05 : 1;
      }

      // Update Active Index / Step Content
      const newActiveIndex = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
      if (newActiveIndex !== animationState.current.lastActiveIndex) {
        setActiveIndex(newActiveIndex);
        setCurrentStep(newActiveIndex + 1);
        animationState.current.lastActiveIndex = newActiveIndex;
      }
    };

    let lastTime = performance.now();
    let frameId;

    const animate = (currentTime) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const state = animationState.current;
      
      // Spring physics
      const springForce = -spring.stiffness * (state.smoothProgress - state.currentProgress);
      const dampingForce = -spring.damping * state.velocity;
      const acceleration = (springForce + dampingForce) / spring.mass;
      state.velocity += acceleration * dt;
      state.smoothProgress += state.velocity * dt;

      updateUI(state.smoothProgress);
      frameId = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="orbital-container" ref={containerRef}>
      <div className="sticky-wrapper">
        <div className="text-left mb-0 mt-4 px-6 md:px-20 max-w-[1400px] w-full">
          <h2 className="font-syne text-[36px] md:text-[48px] font-light mb-2">Our Process</h2>
          <p className="text-[16px] leading-[1.6] text-[#cccccc] max-w-[800px]">
            Our structured workflow ensures every project is delivered with clarity, quality, and measurable results.
          </p>
          <div className="mt-8 h-[1px] bg-white/20 w-full mb-4"></div>
        </div>

        <div className="orbital-wrapper">
          <div className="orbital-stage">
            <svg className="background-arc" viewBox="0 0 540 290">
              <ellipse cx="270" cy="290" rx="240" ry="240" strokeDasharray="4 4" />
              <ellipse cx="270" cy="290" rx="210" ry="210" />
            </svg>

            <svg className="progress-arc" viewBox="0 0 540 290">
              <path 
                className="progress-path" 
                ref={progressPathRef} 
                d="M 30 290 A 240 240 0 0 1 510 290" 
              />
            </svg>

            {STEPS.map((step, idx) => (
              <div 
                key={step.id} 
                className="orbital-box" 
                ref={el => boxRefs.current[idx] = el}
              >
                <div 
                  className="box-inner"
                  style={{ 
                    backgroundColor: step.bg, 
                    borderColor: step.border 
                  }}
                >
                  <span className="box-step-label" style={{ color: step.color + '90' }}>Step</span>
                  <span className="box-step-number" style={{ color: step.color }}>{step.id}</span>
                  <div 
                    className="box-glow" 
                    style={{ background: `radial-gradient(circle at center, ${step.color}30, transparent 70%)` }}
                  />
                </div>
              </div>
            ))}

            <div className="central-content">
              {STEPS.map((step, idx) => (
                <div 
                  key={step.id} 
                  className={`step-content ${idx === activeIndex ? 'active fade-in' : ''}`}
                >
                  <div className="step-tags">
                    {step.tags.map(tag => (
                      <span key={tag} className="step-tag">{tag}</span>
                    ))}
                  </div>
                  <h2 className="step-name">{step.name}</h2>
                  <p className="step-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pagination">
            <div className="pagination-dots">
              {STEPS.map((_, idx) => (
                <div 
                  key={idx} 
                  className="pagination-dot" 
                  style={{ 
                    width: idx === activeIndex ? '24px' : '8px',
                    opacity: idx === activeIndex ? 1 : 0.2
                  }}
                />
              ))}
            </div>
            <div className="pagination-counter">
              <span>{String(currentStep).padStart(2, '0')}</span> / <span>05</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrbitalProcess;
