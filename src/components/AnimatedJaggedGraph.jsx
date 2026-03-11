import React, { useRef, useEffect, useMemo } from 'react';

const AnimatedJaggedGraph = ({ 
  baseColorBlue = '#00F0FF', // Cyan
  baseColorPink = '#7B61FF', // Purple (Website color)
  pointsCount = 100,
  jitterSpeed = 0.25,      // Increased speed
  jitterAmount = 4         // Increased jitter for more zigzag
}) => {
  const containerRef = useRef(null);
  const pathBlueRef = useRef(null);
  const pathPinkRef = useRef(null);

  // Generate initial points with a trend
  const generatePoints = (count, startY, trendFn) => {
    return Array.from({ length: count }, (_, i) => {
      const x = (i / (count - 1)) * 100; // 0 to 100%
      const y = startY + trendFn(i);
      return { x, y, initialY: y };
    });
  };

  // Trend functions for the two paths - starting from bottom (90) and going up (decreasing Y)
  // Significantly increased frequency (0.8 -> 1.5) and amplitude (6 -> 10) for "more zigzag"
  const trendBlue = (i) => Math.sin(i * 1.5) * 8 - i * 0.8;
  const trendPink = (i) => Math.cos(i * 1.5) * 8 - i * 0.8;

  const pointsBlue = useMemo(() => generatePoints(pointsCount, 95, trendBlue), [pointsCount]);
  const pointsPink = useMemo(() => generatePoints(pointsCount, 105, trendPink), [pointsCount]);

  const hasEntered = useRef(false);

  useEffect(() => {
    let animationId;
    let startTime = null;
    let progress = 0;
    const duration = 1500; // 1.5s for the entry animation
    const bottomY = 120;   // Starting positions below the visible area (SVG is 0-100)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasEntered.current) {
          hasEntered.current = true;
          startTime = performance.now();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    const animate = (currentTime) => {
      if (hasEntered.current) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        progress = Math.min(elapsed / duration, 1);
        
        // Use a slight ease-out for the entry
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const timeFactor = currentTime * 0.002;

        const updatePath = (points, pathElement) => {
          if (!pathElement) return;
          
          const d = points.map((p, i) => {
            // Constant subtle noise
            const noise = Math.sin(timeFactor + i * 0.8) * jitterAmount + 
                          Math.cos(timeFactor * 1.2 + i * 0.5) * (jitterAmount * 0.8);
            
            const x = p.x;
            const targetY = p.initialY + noise;
            // Animate from bottomY to targetY based on easeProgress
            const currentY = bottomY + (targetY - bottomY) * easeProgress;
            
            return `${i === 0 ? 'M' : 'L'} ${x},${currentY}`;
          }).join(' ');

          pathElement.setAttribute('d', d);
        };

        updatePath(pointsBlue, pathBlueRef.current);
        updatePath(pointsPink, pathPinkRef.current);
      } else {
        // Keep at bottom before entering
        const hidePath = (points, pathElement) => {
          if (!pathElement) return;
          const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${bottomY}`).join(' ');
          pathElement.setAttribute('d', d);
        };
        hidePath(pointsBlue, pathBlueRef.current);
        hidePath(pointsPink, pathPinkRef.current);
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, [pointsBlue, pointsPink, jitterAmount, jitterSpeed]);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.3))' }}
      >
        <path
          ref={pathBlueRef}
          fill="none"
          stroke={baseColorBlue}
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-opacity duration-500"
        />
        <path
          ref={pathPinkRef}
          fill="none"
          stroke={baseColorPink}
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-opacity duration-500"
        />
      </svg>
    </div>
  );
};

export default AnimatedJaggedGraph;
