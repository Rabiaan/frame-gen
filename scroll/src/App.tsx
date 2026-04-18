/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Search, PenTool, Code, Rocket, LifeBuoy, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    id: '01',
    name: "Discovery",
    desc: "We research your goals, audience, and competitive landscape to build a solid foundation.",
    tags: ["RESEARCH", "STRATEGY", "PLANNING"],
    icon: Search,
    color: "#3B82F6",
  },
  {
    id: '02',
    name: "Design",
    desc: "We craft intuitive interfaces and cohesive visuals that elevate the user experience.",
    tags: ["UI DESIGN", "UX DESIGN", "VISUAL SYSTEM"],
    icon: PenTool,
    color: "#A855F7",
  },
  {
    id: '03',
    name: "Development",
    desc: "We build robust, scalable solutions with clean code and modern technologies.",
    tags: ["FRONTEND", "BACKEND", "QA TESTING"],
    icon: Code,
    color: "#22C55E",
  },
  {
    id: '04',
    name: "Delivery",
    desc: "We launch your product with care, ensuring a smooth rollout and seamless handoff.",
    tags: ["DEPLOYMENT", "TRAINING", "HANDOFF"],
    icon: Rocket,
    color: "#F59E0B",
  },
  {
    id: '05',
    name: "Support",
    desc: "We provide ongoing maintenance, analytics, and iterative improvements post-launch.",
    tags: ["MAINTENANCE", "ANALYTICS", "GROWTH"],
    icon: LifeBuoy,
    color: "#EF4444",
  },
];

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  });

  const activeIndex = useTransform(smoothProgress, (p) => {
    return Math.min(STEPS.length - 1, Math.floor(p * STEPS.length * 0.99));
  });

  const radius = 280;
  const centerY = 280; // Relative to bottom of orbital container

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#0A0A0A] text-[#FFFFFF] font-sans selection:bg-[#7b61ff]/30">
      
      {/* Fixed UI Overlay */}
      <div className="fixed inset-0 flex flex-col items-center justify-start pointer-events-none overscroll-none">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-16 md:pt-24 px-4 z-10"
        >
          <p className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] text-gray-500 mb-3 font-semibold">
            &gt; OUR PROCESS &lt;
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            A collaborative approach
          </h1>
        </motion.div>

        {/* Orbital Stage */}
        <div className="mt-auto relative w-full max-w-4xl aspect-[2/1] flex items-center justify-center">
          
          {/* Background Track SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 600 300" preserveAspectRatio="xMidYMax meet">
            <path 
              d="M 50 280 A 250 250 0 0 1 550 280" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Progress Path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 300" preserveAspectRatio="xMidYMax meet">
            <motion.path
              d="M 50 280 A 250 250 0 0 1 550 280"
              fill="none"
              stroke="#7b61ff"
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                pathLength: smoothProgress,
              }}
            />
          </svg>

          {/* Orbital Box Elements */}
          {STEPS.map((step, index) => {
            const angle = useTransform(smoothProgress, (p) => {
              const offset = (index - p * (STEPS.length - 1)) * 45;
              return 90 - offset;
            });

            const x = useTransform(angle, (a) => Math.cos((a * Math.PI) / 180) * radius);
            const y = useTransform(angle, (a) => -Math.sin((a * Math.PI) / 180) * radius);
            
            const opacity = useTransform(angle, [0, 45, 90, 135, 180], [0, 0.4, 1, 0.4, 0]);
            const scale = useTransform(angle, [45, 90, 135], [0.8, 1.1, 0.8]);

            return (
              <motion.div
                key={step.id}
                style={{
                  x,
                  y: useTransform(y, (val) => val + centerY),
                  opacity,
                  scale,
                  zIndex: useTransform(angle, [89, 90, 91], [10, 50, 10])
                }}
                className="absolute w-12 h-12 md:w-16 md:h-16 flex items-center justify-center pointer-events-auto"
              >
                <motion.div 
                  className="w-full h-full rounded-2xl shadow-2xl flex flex-col items-center justify-center overflow-hidden border-2 backdrop-blur-xl transition-all duration-300"
                  style={{
                    backgroundColor: useTransform(angle, [85, 90, 95], ["rgba(255,255,255,0.03)", `${step.color}20`, "rgba(255,255,255,0.03)"]),
                    borderColor: useTransform(angle, [85, 90, 95], ["rgba(255,255,255,0.1)", `${step.color}50`, "rgba(255,255,255,0.1)"]),
                  }}
                >
                  <span className="text-[8px] font-bold uppercase tracking-widest mb-1" style={{ color: `${step.color}ee` }}>Step</span>
                  <span className="text-xl md:text-2xl font-black" style={{ color: step.color }}>{step.id}</span>
                  
                  {/* Active Indicator Glow */}
                  <motion.div 
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at center, ${step.color}30, transparent 70%)`,
                      opacity: useTransform(angle, [85, 90, 95], [0, 1, 0])
                    }}
                  />
                </motion.div>
              </motion.div>
            );
          })}

          {/* Central Content */}
          <div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-full max-w-lg text-center px-6 pointer-events-auto">
            <AnimatePresence mode="wait">
              {STEPS.map((step, index) => (
                <StepContent 
                  key={step.id} 
                  step={step} 
                  index={index} 
                  activeIndex={activeIndex} 
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Bottom Pagination */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-auto">
            <motion.div className="text-[12px] font-bold text-gray-500 tracking-[0.2em] font-mono">
              {useTransform(smoothProgress, (p) => {
                const idx = Math.min(STEPS.length, Math.floor(p * STEPS.length) + 1);
                return `${String(idx).padStart(2, '0')} / ${String(STEPS.length).padStart(2, '0')}`;
              })}
            </motion.div>
            <div className="flex items-center gap-2">
              {STEPS.map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1 rounded-full bg-[#7b61ff]"
                  style={{
                    width: useTransform(smoothProgress, 
                      [(i - 0.2) / STEPS.length, i / STEPS.length, (i + 0.2) / STEPS.length], 
                      [6, 16, 6],
                      { clamp: true }
                    ),
                    opacity: useTransform(smoothProgress,
                      [(i - 0.5) / STEPS.length, i / STEPS.length, (i + 0.5) / STEPS.length],
                      [0.2, 1, 0.2]
                    )
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StepContentProps {
  step: typeof STEPS[0];
  index: number;
  activeIndex: any;
}

function StepContent({ step, index, activeIndex }: StepContentProps) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = activeIndex.on("change", (v: number) => {
      setVisible(Math.round(v) === index);
    });
    setVisible(Math.round(activeIndex.get()) === index);
    return unsubscribe;
  }, [activeIndex, index]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">{step.name}</h2>
      <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-[420px]">
        {step.desc}
      </p>
      
      <div className="flex items-center gap-3 mb-10 text-[11px] font-bold tracking-[0.2em] text-gray-500">
        {step.tags.map((tag, i) => (
          <React.Fragment key={tag}>
            <span>{tag}</span>
            {i < step.tags.length - 1 && <span style={{ color: step.color }} className="opacity-50">•</span>}
          </React.Fragment>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group flex items-center gap-3 text-white px-8 py-4 rounded-xl text-sm font-bold shadow-2xl transition-all"
        style={{ 
          backgroundColor: step.color,
          boxShadow: `0 10px 30px -10px ${step.color}60`
        }}
      >
        Start your project
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </motion.button>
    </motion.div>
  );
}
