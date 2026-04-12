import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

const WavyLinesPattern = () => (
  <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden pointer-events-none">
    <svg viewBox="0 0 200 400" className="h-full w-full opacity-60">
      {[...Array(6)].map((_, i) => (
        <React.Fragment key={i}>
          <motion.path
            d={`M200,${i * 60} Q100,${i * 60 + 100} 200,${i * 60 + 200} T200,${i * 60 + 400}`}
            fill="none"
            stroke={`url(#gradient-${i % 2})`}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: 1
            }}
            transition={{ 
              pathLength: { duration: 2, delay: i * 0.2 },
              opacity: { duration: 2, delay: i * 0.2 }
            }}
          />
          {/* Glowing Pulse Path */}
          <motion.path
            d={`M200,${i * 60} Q100,${i * 60 + 100} 200,${i * 60 + 200} T200,${i * 60 + 400}`}
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="20 180"
            filter="url(#glow)"
            animate={{ 
              strokeDashoffset: [0, -200],
              opacity: [0, 0.8, 0]
            }}
            transition={{ 
              strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.4 },
              opacity: { duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.4 }
            }}
          />
        </React.Fragment>
      ))}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="gradient-0" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const DottedWavyPattern = () => (
  <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden pointer-events-none">
    <svg viewBox="0 0 200 400" className="h-full w-full opacity-80">
      {[...Array(8)].map((_, i) => (
        <motion.path
          key={i}
          d={`M200,${i * 40} Q50,${i * 40 + 80} 200,${i * 40 + 160} T200,${i * 40 + 320}`}
          fill="none"
          stroke={i % 2 === 0 ? "#7B61FF" : "#3B82F6"}
          strokeWidth="4"
          strokeDasharray="1 8"
          strokeLinecap="round"
          animate={{
            strokeDashoffset: [0, -40],
          }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />
      ))}
    </svg>
  </div>
);

const GlowingRingsPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut",
          }}
          className="absolute -top-10 -left-10 w-20 h-20 rounded-full border-2 border-[#7B61FF]/20"
        >
          <div className="absolute inset-0 rounded-full shadow-[0_0_12px_rgba(123,97,255,0.15)]" />
        </motion.div>
      ))}
    </div>
  );
};

const ChevronsPattern = () => (
  <div className="absolute bottom-0 right-0 w-1/2 h-1/2 overflow-hidden pointer-events-none">
    <div className="flex flex-col items-end justify-end h-full pr-4 pb-4">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8, y: 0 }}
          animate={{ 
            opacity: 1 - i * 0.15, 
            scale: 1,
            y: [0, -10, 0]
          }}
          transition={{ 
            opacity: { delay: i * 0.1 },
            scale: { delay: i * 0.1 },
            y: { repeat: Infinity, duration: 2, delay: i * 0.2, ease: "easeInOut" }
          }}
          className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[40px] border-b-[#7B61FF] mb-[-20px]"
        />
      ))}
    </div>
  </div>
);

const PolkaDotsPattern = () => (
  <div className="absolute bottom-0 right-0 w-1/2 h-1/2 overflow-hidden pointer-events-none">
    <div className="relative w-full h-full">
      {[...Array(40)].map((_, i) => {
        const size = Math.random() * 12 + 4;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 2;
        return (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2 + Math.random() * 2,
              delay: delay
            }}
            className="absolute rounded-full bg-[#00F0FF]"
            style={{
              width: size,
              height: size,
              left: `${x}%`,
              top: `${y}%`,
            }}
          />
        );
      })}
    </div>
  </div>
);

const DiagonalLinesPattern = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="w-[150%] h-[150%] -rotate-45 -translate-x-1/4 -translate-y-1/4 flex flex-col items-center justify-center gap-8">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ width: 0, opacity: 0 }}
          animate={{ 
            width: '100%',
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{ 
            width: { duration: 2, delay: i * 0.1, ease: "easeOut" },
            opacity: { repeat: Infinity, duration: 6, delay: i * 0.3 }
          }}
          className="h-[3px] bg-[#3B82F6]/60 w-full"
        />
      ))}
    </div>
  </div>
);

const RandomDashesPattern = () => (
  <div className="absolute bottom-0 right-0 w-1/2 h-1/2 overflow-hidden pointer-events-none">
    <div className="relative w-full h-full">
      {[...Array(30)].map((_, i) => {
        const width = Math.random() * 30 + 10;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const rotation = Math.random() * 360;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.2, 0.6, 0.2],
              rotate: [rotation, rotation + 45, rotation],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2
            }}
            className="absolute h-1 bg-[#7B61FF] rounded-full"
            style={{
              width: width,
              left: `${x}%`,
              top: `${y}%`,
            }}
          />
        );
      })}
    </div>
  </div>
);

const PatternCard = ({ label, title, subtitle, features = [], footer, type, icon, iconBg, date }) => {
  const mouseX = useMotionValue(200);
  const mouseY = useMotionValue(160);

  const springConfig = { damping: 20, stiffness: 150 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  // 3D Tilt values
  const rotateX = useTransform(mouseY, [0, 400], [10, -10]);
  const rotateY = useTransform(mouseX, [0, 400], [-10, 10]);
  
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const background = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 40%)`
  );

  const borderBackground = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) => `radial-gradient(300px circle at ${x}px ${y}px, rgba(255,255,255,0.3), transparent 40%)`
  );

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleMouseLeave() {
    mouseX.set(200); // Reset to center
    mouseY.set(160);
  }

  const renderPattern = () => {
    switch (type) {
      case 'wavy-lines': return <WavyLinesPattern />;
      case 'dotted-wavy': return <DottedWavyPattern />;
      case 'chevrons': return <ChevronsPattern />;
      case 'polka-dots': return <PolkaDotsPattern />;
      case 'diagonal-lines': return <DiagonalLinesPattern />;
      case 'random-dashes': return <RandomDashesPattern />;
      case 'glowing-rings': return <GlowingRingsPattern />;
      default: return null;
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: { 
      y: -12,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 15 
      }
    }
  };

  return (
    <div 
      className="perspective-1000 w-full min-h-[450px] h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        variants={{
          hover: { scale: 1.02 }
        }}
        style={{ 
          rotateX: springRotateX, 
          rotateY: springRotateY,
          transformStyle: "preserve-3d"
        }}
        whileHover="hover"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.05 }}
        className="relative p-[1px] rounded-xl overflow-hidden group h-full cursor-pointer shadow-2xl"
      >
        {/* Animated Rotating Border Layer */}
        <div className="absolute inset-[-100%] z-0 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_120deg,rgba(255,255,255,0.4)_180deg,transparent_240deg,transparent_360deg)] animate-border-rotate" />
        </div>

        {/* Border Glow Layer (Mouse Reactive) */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: borderBackground }}
        />

        {/* Main Card Content */}
        <div 
          className="relative bg-[#1E1E1E] rounded-[11px] p-8 h-full flex flex-col overflow-hidden"
          style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
        >
          {/* Spotlight Effect (Interior) */}
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background }}
          />

          <div className="z-10 flex justify-between items-start mb-6" style={{ transform: "translateZ(40px)" }}>
            <div className="flex flex-col gap-4">
              {icon && (
                <motion.div 
                  variants={itemVariants}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBg} shadow-lg`}
                >
                  {icon}
                </motion.div>
              )}
              <motion.span 
                variants={itemVariants}
                className="text-white/40 text-xs font-medium uppercase tracking-wider"
              >
                {label}
              </motion.span>
            </div>
            {date && (
              <motion.span 
                variants={itemVariants}
                className="text-white/40 text-xs font-medium"
              >
                {date}
              </motion.span>
            )}
          </div>

          <div className="z-10 mb-6" style={{ transform: "translateZ(50px)" }}>
            <motion.h3 
              variants={itemVariants}
              className="text-2xl font-bold text-white mb-2 leading-tight"
            >
              {title}
            </motion.h3>
            <motion.p 
              variants={itemVariants}
              className="text-white/60 text-sm font-medium leading-relaxed"
            >
              {subtitle}
            </motion.p>
          </div>

          {/* Features List */}
          {features && features.length > 0 && (
            <div className="z-10 mt-auto mb-6" style={{ transform: "translateZ(40px)" }}>
              <ul className="space-y-2">
                {features.map((feature, i) => (
                  <motion.li 
                    key={i} 
                    variants={itemVariants}
                    className="flex items-center gap-3 text-sm text-white/50"
                  >
                    <div className="h-1 w-1 rounded-full bg-[#7B61FF]" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {footer && (
            <div className="z-10 pt-4 border-t border-white/5" style={{ transform: "translateZ(30px)" }}>
              <motion.span 
                variants={itemVariants}
                className="text-white/40 text-xs font-medium uppercase tracking-wider"
              >
                {footer}
              </motion.span>
            </div>
          )}

          {/* Pattern Layer */}
          <div 
            className="absolute inset-0 z-0 opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ transform: "translateZ(10px)" }}
          >
            {renderPattern()}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PatternCard;
