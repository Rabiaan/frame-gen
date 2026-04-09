import React, { useEffect, useRef, useCallback } from 'react';

/**
 * Antigravity - Canvas-based particle field component
 * Particles are repelled by the mouse and drift back to their origin.
 */
function Antigravity({
  count = 300,
  magnetRadius = 100,
  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 2,
  lerpSpeed = 0.1,
  color = '#7b61ff',
  autoAnimate = false,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = 'capsule',
  fieldStrength = 10,
  style,
  className,
}) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const stateRef = useRef({
    particles: [],
    mouse: { x: -9999, y: -9999 },
    time: 0,
  });

  const initParticles = useCallback((canvas) => {
    const { width, height } = canvas;
    const particles = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * Math.min(width, height) * 0.45;
      const cx = width / 2;
      const cy = height / 2;
      const ox = cx + Math.cos(angle) * radius;
      const oy = cy + Math.sin(angle) * radius;
      const sizeVariance = particleSize + (Math.random() - 0.5) * particleVariance;
      const depth = 0.5 + Math.random() * 0.5;
      particles.push({
        ox, oy,
        x: ox, y: oy,
        vx: 0, vy: 0,
        size: sizeVariance * depth * depthFactor,
        phase: Math.random() * Math.PI * 2,
        rotAngle: Math.random() * Math.PI * 2,
        depth,
      });
    }

    stateRef.current.particles = particles;
  }, [count, particleSize, particleVariance, depthFactor]);

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { particles, mouse, time: t } = stateRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const pulseFactor = 1 + Math.sin(t * pulseSpeed) * 0.1;

    for (const p of particles) {
      const waveOffsetX = Math.cos(t * waveSpeed + p.phase) * waveAmplitude;
      const waveOffsetY = Math.sin(t * waveSpeed + p.phase + Math.PI / 3) * waveAmplitude;
      const tx = p.ox + waveOffsetX;
      const ty = p.oy + waveOffsetY;

      // Mouse repulsion
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      let fx = 0, fy = 0;

      if (dist < magnetRadius) {
        const force = ((magnetRadius - dist) / magnetRadius) * fieldStrength;
        fx = (dx / Math.max(dist, 1)) * force;
        fy = (dy / Math.max(dist, 1)) * force;
      }

      // Ring snap
      if (dist < ringRadius && dist > 0) {
        const ringForce = (ringRadius - dist) / ringRadius;
        fx -= (dx / dist) * ringForce * fieldStrength * 2;
        fy -= (dy / dist) * ringForce * fieldStrength * 2;
      }

      // Lerp toward target
      p.vx += (tx + fx - p.x) * lerpSpeed;
      p.vy += (ty + fy - p.y) * lerpSpeed;
      p.vx *= 0.7;
      p.vy *= 0.7;
      p.x += p.vx;
      p.y += p.vy;

      // Auto animate drift
      if (autoAnimate) {
        p.x += Math.cos(t * 0.3 + p.phase) * 0.3;
        p.y += Math.sin(t * 0.3 + p.phase) * 0.3;
      }

      // Rotation
      p.rotAngle += rotationSpeed * 0.01;

      // Draw
      const ps = p.size * pulseFactor;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotAngle);

      // Parse color for alpha based on depth
      const alpha = 0.5 + p.depth * 0.5;

      // Build stroke/fill styles - handle hex color with alpha
      let r = 123, g = 97, b = 255;
      const hex = color.replace('#', '');
      if (hex.length === 6) {
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
      }
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.shadowColor = `rgba(${r},${g},${b},0.4)`;
      ctx.shadowBlur = 4;

      if (particleShape === 'capsule') {
        const w = ps * 2;
        const h = ps * 0.6;
        const rr = h / 2;
        ctx.beginPath();
        ctx.moveTo(-w / 2 + rr, -h / 2);
        ctx.lineTo(w / 2 - rr, -h / 2);
        ctx.arcTo(w / 2, -h / 2, w / 2, 0, rr);
        ctx.arcTo(w / 2, h / 2, w / 2 - rr, h / 2, rr);
        ctx.lineTo(-w / 2 + rr, h / 2);
        ctx.arcTo(-w / 2, h / 2, -w / 2, 0, rr);
        ctx.arcTo(-w / 2, -h / 2, -w / 2 + rr, -h / 2, rr);
        ctx.closePath();
        ctx.fill();
      } else if (particleShape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, ps, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // square
        ctx.fillRect(-ps / 2, -ps / 2, ps, ps);
      }

      ctx.restore();
    }

    stateRef.current.time += 0.016;
    animRef.current = requestAnimationFrame(loop);
  }, [
    color, magnetRadius, ringRadius, waveSpeed, waveAmplitude,
    lerpSpeed, autoAnimate, rotationSpeed, pulseSpeed, fieldStrength,
    particleShape, ringRadius,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver(() => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles(canvas);
    });

    resizeObserver.observe(canvas);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initParticles(canvas);
    animRef.current = requestAnimationFrame(loop);

    return () => {
      resizeObserver.disconnect();
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [initParticles, loop]);

  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    stateRef.current.mouse = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    stateRef.current.mouse = { x: -9999, y: -9999 };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', ...style }}
    />
  );
}

export default Antigravity;
