import React, { useRef, useMemo } from 'react';

const AnimatedJaggedGraph = ({ 
  baseColorBlue = '#00F0FF', // Cyan
  baseColorPink = '#7B61FF', // Purple (Website color)
  pointsCount = 20
}) => {
  const containerRef = useRef(null);

  // Generate points with an upward trend for client growth
  const generateGrowthPoints = (count, startY) => {
    return Array.from({ length: count }, (_, i) => {
      const x = (i / (count - 1)) * 100; // 0 to 100%
      // Create a jagged but overall upward trend (client growth)
      const growthFactor = (count - i) * 0.5; // More growth toward the end
      const jitter = Math.sin(i * 2) * 5 + Math.cos(i * 1.5) * 3;
      const y = startY - growthFactor - jitter;
      return { x, y };
    });
  };

  const pointsBlue = useMemo(() => generateGrowthPoints(pointsCount, 95), [pointsCount]);
  const pointsPink = useMemo(() => generateGrowthPoints(pointsCount, 100), [pointsCount]);

  // Generate SVG path from points
  const createPath = (points) => {
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');
  };

  const pathBlue = createPath(pointsBlue);
  const pathPink = createPath(pointsPink);

  // Create a filled area under the blue line for emphasis
  const createAreaPath = (points) => {
    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');
    const lastPoint = points[points.length - 1];
    const firstPoint = points[0];
    return `${linePath} L ${lastPoint.x},100 L ${firstPoint.x},100 Z`;
  };

  const areaPath = createAreaPath(pointsBlue);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.3))' }}
      >
        {/* Filled area under the main line */}
        <path
          d={areaPath}
          fill="url(#blueGradient)"
          opacity="0.2"
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={baseColorBlue} stopOpacity="0.4" />
            <stop offset="100%" stopColor={baseColorBlue} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Main growth line - Blue */}
        <path
          d={pathBlue}
          fill="none"
          stroke={baseColorBlue}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Secondary growth line - Pink */}
        <path
          d={pathPink}
          fill="none"
          stroke={baseColorPink}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
        {/* Point markers on the blue line */}
        {pointsBlue.filter((_, i) => i % 4 === 0).map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="1.5"
            fill={baseColorBlue}
            stroke="#080810"
            strokeWidth="0.5"
          />
        ))}
      </svg>
    </div>
  );
};

export default AnimatedJaggedGraph;
