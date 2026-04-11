/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Play, Triangle, Music } from 'lucide-react';

type PatternType = 'wavy-lines' | 'dotted-wavy' | 'chevrons' | 'polka-dots' | 'diagonal-lines' | 'random-dashes';

interface CardProps {
  label: string;
  title: string;
  subtitle: string;
  footer: string;
  type: PatternType;
  icon?: React.ReactNode;
  iconBg?: string;
  date?: string;
}

const WavyLinesPattern = () => (
  <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden pointer-events-none">
    <svg viewBox="0 0 200 400" className="h-full w-full opacity-60">
      {[...Array(6)].map((_, i) => (
        <motion.path
          key={i}
          d={`M200,${i * 60} Q100,${i * 60 + 100} 200,${i * 60 + 200} T200,${i * 60 + 400}`}
          fill="none"
          stroke={`url(#gradient-${i})`}
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            d: [
              `M200,${i * 60} Q100,${i * 60 + 100} 200,${i * 60 + 200} T200,${i * 60 + 400}`,
              `M200,${i * 60} Q150,${i * 60 + 50} 200,${i * 60 + 200} T200,${i * 60 + 400}`,
              `M200,${i * 60} Q100,${i * 60 + 100} 200,${i * 60 + 200} T200,${i * 60 + 400}`
            ]
          }}
          transition={{ 
            pathLength: { duration: 2, delay: i * 0.2 },
            opacity: { duration: 2, delay: i * 0.2 },
            d: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      ))}
      <defs>
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
          stroke={i % 2 === 0 ? "#FACC15" : "#22D3EE"}
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
          className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[40px] border-b-[#FACC15] mb-[-20px]"
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
            className="absolute rounded-full bg-[#22C55E]"
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
  <div className="absolute bottom-0 right-0 w-1/2 h-1/2 overflow-hidden pointer-events-none">
    <div className="w-full h-full flex flex-col items-end justify-end">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ width: 0, opacity: 0.3 }}
          animate={{ 
            width: '140%',
            opacity: [0.3, 0.6, 0.3],
            x: [0, 10, 0]
          }}
          transition={{ 
            width: { duration: 0.8, delay: i * 0.05 },
            opacity: { repeat: Infinity, duration: 3, delay: i * 0.1 },
            x: { repeat: Infinity, duration: 4, delay: i * 0.1, ease: "easeInOut" }
          }}
          className="h-3 bg-[#EAB308] mb-2 rotate-[-45deg] origin-right"
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
            className="absolute h-1 bg-[#EF4444] rounded-full"
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

const PatternCard = ({ label, title, subtitle, footer, type, icon, iconBg, date }: CardProps) => {
  const mouseX = useMotionValue(200);
  const mouseY = useMotionValue(160);

  const springConfig = { damping: 20, stiffness: 150 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  // 3D Tilt values
  const rotateX = useTransform(mouseY, [0, 320], [10, -10]);
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

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
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
      className="perspective-1000 w-full h-80"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        variants={{
          hover: { scale: 1.05 }
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
          className="relative bg-[#1E1E1E] rounded-[11px] p-8 h-full flex flex-col justify-between overflow-hidden"
          style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
        >
          {/* Spotlight Effect (Interior) */}
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background }}
          />

          <div className="z-10 flex justify-between items-start" style={{ transform: "translateZ(40px)" }}>
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

          <div className="z-10" style={{ transform: "translateZ(50px)" }}>
            <motion.h3 
              variants={itemVariants}
              className="text-2xl font-bold text-white mb-1 leading-tight max-w-[80%]"
            >
              {title}
            </motion.h3>
            <motion.p 
              variants={itemVariants}
              className="text-white/60 text-lg font-medium"
            >
              {subtitle}
            </motion.p>
          </div>

          <div className="z-10" style={{ transform: "translateZ(30px)" }}>
            <motion.span 
              variants={itemVariants}
              className="text-white/40 text-xs font-medium"
            >
              {footer}
            </motion.span>
          </div>

          {/* Pattern Layer */}
          <div 
            className="absolute inset-0 z-0 opacity-40 group-hover:opacity-100 transition-opacity duration-500"
            style={{ transform: "translateZ(10px)" }}
          >
            {renderPattern()}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const cards: CardProps[] = [
    {
      label: "Winner",
      title: "MSMI Media UX Award",
      subtitle: "2018-19",
      footer: "Toronto, Canada",
      type: 'wavy-lines'
    },
    {
      label: "Gold Winner",
      title: "Apple Design Award",
      subtitle: "2018-19",
      footer: "United State",
      type: 'dotted-wavy'
    },
    {
      label: "Asia Pacific",
      title: "Yellow Dot Design Award",
      subtitle: "2019-20",
      footer: "United Nation",
      type: 'chevrons'
    },
    {
      label: "Runner up",
      title: "Indiana's Best Design",
      subtitle: "2019-20",
      footer: "North America",
      type: 'polka-dots',
      icon: <Play className="text-white fill-white" size={20} />,
      iconBg: "bg-[#22C55E]",
      date: "28 Nov 2019"
    },
    {
      label: "Silver Winner",
      title: "UMO UX India Award",
      subtitle: "2020-21",
      footer: "Hyderabad, India",
      type: 'diagonal-lines',
      icon: <Triangle className="text-white fill-white" size={20} />,
      iconBg: "bg-[#EAB308]",
      date: "30 Dec 2019"
    },
    {
      label: "Winner",
      title: "Best Music Album",
      subtitle: "2018-19",
      footer: "Mumbai, India",
      type: 'random-dashes',
      icon: <Music className="text-white" size={20} />,
      iconBg: "bg-[#EF4444]",
      date: "13 Aug 2019"
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212] p-8 md:p-16 font-sans">
      <header className="max-w-6xl mx-auto mb-12">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-white/20 text-sm font-bold uppercase tracking-[0.3em] mb-4"
        >
          Award Showcase
        </motion.h1>
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="h-px bg-white/10 w-full mb-12 origin-left" 
        />
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <PatternCard {...card} />
          </motion.div>
        ))}
      </main>

      <footer className="max-w-6xl mx-auto mt-24 pt-8 border-t border-white/10 flex justify-between items-center text-white/20 text-[10px] uppercase tracking-[0.2em]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Design Inspired by Award Portfolios
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          &copy; 2026
        </motion.div>
      </footer>
    </div>
  );
}
