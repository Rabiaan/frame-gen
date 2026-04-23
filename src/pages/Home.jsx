import React, { useEffect, useRef, lazy, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import StatisticsGraph from '../components/StatisticsGraph.jsx';
import MetricsPieChart from '../components/MetricsPieChart.jsx';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import servicesImage from '/images/services-image.png';
import p1 from '/images/portfolio1.jpg';
import p2 from '/images/portfolio2.jpg';
import p3 from '/images/portfolio3.jpg';
import p4 from '/images/portfolio4.jpg';
import p5 from '/images/portfolio5.jpg';
import '../styles/home.css';

// Deferred Spline import — only fetched when triggered
const Spline = lazy(() => import('@splinetool/react-spline'));

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function Home() {
  const splineRef = useRef(null);
  const heroRef = useRef(null);
  // splineReady: false = placeholder shown, true = Spline component mounted
  const [splineReady, setSplineReady] = useState(false);

  // Step chart data with 101 data points
  const chartData = {
    labels: Array.from({ length: 101 }, (_, i) => i + 1),
    datasets: [
      {
        data: [10,15,12,18,15,22,20,25,22,30,28,32,30,35,32,38,35,40,38,42,40,45,42,48,45,50,48,52,50,55,52,58,55,60,58,62,60,65,62,68,65,70,68,72,70,75,72,78,75,80,78,82,80,85,82,88,85,90,88,92,90,95,92,98,95,100,98,102,100,105,102,108,105,110,108,112,110,115,112,118,115,120,118,122,120,125,122,128,125,130,128,132,130,135,132,138,135,140,138,142,140],
        borderColor: '#FF4D4D',
        tension: 0,
        pointRadius: 0,
        borderWidth: 2,
        stepped: true
      },
      {
        data: [15,18,22,20,25,28,24,30,32,28,35,38,35,40,42,38,45,48,44,50,52,48,55,58,55,62,65,60,68,70,65,72,75,70,78,80,75,85,88,82,90,92,88,95,98,92,100,102,98,105,108,102,110,112,108,115,118,112,120,122,118,125,128,122,130,132,128,135,138,132,140,142,138,145,148,142,150,152,148,155,158,152,160,162,158,165,168,162,170,172,168,175,178,172,180,182,178,185,188,182,190],
        borderColor: '#4D9EFF',
        tension: 0,
        pointRadius: 0,
        borderWidth: 2,
        stepped: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeOutQuart'
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    },
    scales: {
      x: { display: false },
      y: { display: false }
    },
    elements: {
      line: {
        capBezierPoints: true
      }
    }
  };

  // Defer Spline loading: trigger after 2 seconds OR on first scroll,
  // whichever comes first. This keeps TBT and LCP low.
  useEffect(() => {
    let triggered = false;
    const triggerSpline = () => {
      if (!triggered) {
        triggered = true;
        setSplineReady(true);
        cleanup();
      }
    };
    const cleanup = () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', triggerSpline, { passive: true });
      window.removeEventListener('touchstart', triggerSpline, { passive: true });
      window.removeEventListener('mousemove', triggerSpline);
    };
    // Auto-trigger after 2s so non-interactive visitors still see Spline
    const timer = setTimeout(triggerSpline, 2000);
    // Also trigger immediately on first user interaction
    window.addEventListener('scroll', triggerSpline, { passive: true });
    window.addEventListener('touchstart', triggerSpline, { passive: true });
    window.addEventListener('mousemove', triggerSpline);
    return cleanup;
  }, []);

  useEffect(() => {

    // Smooth scroll for in-page anchors (if any)
    const anchorHandler = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((a) => a.addEventListener('click', anchorHandler));

    // Reveal on scroll
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -80px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document
      .querySelectorAll('.reveal-card')
      .forEach((el) => {
        el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-1500');
        observer.observe(el);
      });

    // Improved animated counters when testimonials section comes into view
    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute('data-target') || '0', 10);
      const duration = 2000; // 2 seconds
      const steps = 60;
      const step = target / steps;
      let current = 0;
      
      const updateCount = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current);
          setTimeout(updateCount, duration / steps);
        } else {
          counter.textContent = String(target);
        }
      };
      updateCount();
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('.stat-number');
          counters.forEach(animateCounter);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const counterSections = document.querySelectorAll('#testimonials-section, #trust-section');
    counterSections.forEach(section => counterObserver.observe(section));

    // Feature Card Animations
    // Animation 1: Bar Chart
    const barHeights = [[55,40,70,50,65],[30,65,45,75,35],[70,30,55,40,60],[45,80,35,60,50],[60,50,75,30,70]];
    let barFrame = 0;
    function animateBars() {
      const bars = document.querySelectorAll('#bar-chart-anim .bar');
      if (bars.length) {
        const next = barHeights[barFrame % barHeights.length];
        bars.forEach((bar, i) => {
          bar.style.transition = 'height 6.0s cubic-bezier(0.4,0,0.2,1)';
          bar.style.height = next[i] + 'px';
        });
        barFrame++;
      }
    }
    if (document.querySelector('#bar-chart-anim')) {
      setInterval(animateBars, 22000);
    }

    // Animation 2: Icon Rows
    function setupIconAnimation() {
      const rows = [
        { 
          gearId: 'gear-top-anim', 
          iconIds: ['ri1-anim','ri2-anim','ri3-anim'], 
        },
        { 
          gearId: 'gear-bot-anim', 
          iconIds: ['bi1-anim','bi2-anim','bi3-anim'], 
        },
      ];
      
      rows.forEach(row => {
        let step = 0;
        const gear = document.getElementById(row.gearId);
        const icons = row.iconIds.map(id => document.getElementById(id)).filter(Boolean);
        if (!gear || icons.length === 0) return;
        
        function cycle() {
          if (step < icons.length) {
            const el = icons[step];
            if (el && gear) {
              const gearRect = gear.getBoundingClientRect();
              const elRect = el.getBoundingClientRect();
              const dx = gearRect.left - elRect.left;
              el.style.transition = 'transform 2.0s ease-in, opacity 1.5s ease-in';
              el.style.transform = `translateX(${dx}px) scale(0.4)`;
              el.style.opacity = '0';
            }
            step++;
            setTimeout(cycle, 1500);
          } else {
            gear.style.transition = 'transform 2.5s ease-in-out';
            gear.style.transform = 'rotate(180deg)';
            setTimeout(() => {
              gear.style.transform = 'rotate(360deg)';
              setTimeout(() => {
                icons.forEach(el => {
                  if (el) { 
                    el.style.transition = 'none'; 
                    el.style.transform = ''; 
                    el.style.opacity = '1'; 
                  }
                });
                gear.style.transition = 'none';
                gear.style.transform = 'rotate(0deg)';
                step = 0;
                setTimeout(cycle, 5000);
              }, 3000);
            }, 3000);
          }
        }
        setTimeout(cycle, row.gearId === 'gear-top-anim' ? 1500 : 4000);
      });
    }
    if (document.querySelector('.icon-rows')) {
      setupIconAnimation();
    }

    // Animation 3: Task Rows
    const taskOrders = [[0,1,2,3],[2,0,3,1],[1,3,0,2],[3,1,2,0],[0,2,1,3]];
    let taskFrame = 0;
    function animateTasks() {
      const taskListAni = document.getElementById('task-list-anim');
      if (!taskListAni) return;
      taskFrame = (taskFrame + 1) % taskOrders.length;
      const order = taskOrders[taskFrame];
      const taskRowsAni = ['tr0-anim','tr1-anim','tr2-anim','tr3-anim'].map(id => document.getElementById(id)).filter(Boolean);
      if (taskRowsAni.length < 4) return;
      const rowHeight = taskRowsAni[0].offsetHeight + 7;
      const containerTop = taskListAni.getBoundingClientRect().top;
      const currentPositions = taskRowsAni.map(r => r.getBoundingClientRect().top - containerTop);
      taskRowsAni.forEach((row, i) => {
        const targetIndex = order.indexOf(i);
        const targetY = targetIndex * rowHeight;
        const dy = targetY - currentPositions[i];
        row.style.transition = 'transform 6.0s cubic-bezier(0.4,0,0.2,1)';
        row.style.transform = `translateY(${dy}px)`;
      });
      setTimeout(() => {
        taskRowsAni.forEach(r => { r.style.transition = 'none'; r.style.transform = ''; });
        order.map(i => taskRowsAni[i]).forEach(r => { if (r) taskListAni.appendChild(r); });
      }, 6500);
    }
    if (document.querySelector('#task-list-anim')) {
      setInterval(animateTasks, 15000);
    }

    // Animation 4: Node Animation - Seamless Integration (Network animation)
    (function(){
      const cv   = document.getElementById('nc');
      if (!cv) return;
      const ctx  = cv.getContext('2d');
      const wrap = cv.parentElement;
      const PR = window.devicePixelRatio || 1;

      let W, H;
      function resize() {
        const rect = wrap.getBoundingClientRect();
        W = rect.width; H = rect.height;
        cv.width = W * PR; cv.height = H * PR;
        cv.style.width = W + 'px'; cv.style.height = H + 'px';
        ctx.scale(PR, PR);
      }
      resize();

      const nodeDefs = [
        { px: 0.50, py: 0.50, r: 9 },
        { px: 0.15, py: 0.22, r: 6.5 },
        { px: 0.83, py: 0.20, r: 6.5 },
        { px: 0.10, py: 0.76, r: 6 },
        { px: 0.86, py: 0.74, r: 6 },
        { px: 0.40, py: 0.10, r: 5.5 },
        { px: 0.63, py: 0.88, r: 5.5 },
      ];

      const connDefs = [
        { a:0, b:1, wamp:8,  wfreq:2.5 },
        { a:0, b:2, wamp:7,  wfreq:2.5 },
        { a:0, b:3, wamp:9,  wfreq:2.2 },
        { a:0, b:4, wamp:8,  wfreq:2.2 },
        { a:0, b:5, wamp:6,  wfreq:3   },
        { a:0, b:6, wamp:7,  wfreq:2.8 },
        { a:1, b:5, wamp:5,  wfreq:3   },
        { a:2, b:5, wamp:6,  wfreq:3   },
        { a:3, b:6, wamp:6,  wfreq:2.8 },
        { a:4, b:6, wamp:5,  wfreq:2.8 },
        { a:1, b:3, wamp:10, wfreq:2   },
        { a:2, b:4, wamp:10, wfreq:2   },
      ];

      let nodes = [];
      let conns = [];

      function init() {
        nodes = nodeDefs.map(d => ({
          x: d.px * W, y: d.py * H, r: d.r,
          lit: false, pulse: 0, scale: 0
        }));
        conns = connDefs.map(d => ({
          ...d, progress: 0, active: false, waveOffset: 0
        }));
      }
      init();

      function wavyPath(x1, y1, x2, y2, amp, freq, progress, waveOffset) {
        const dx = x2 - x1, dy = y2 - y1;
        const len = Math.sqrt(dx*dx + dy*dy);
        const nx = -dy / len, ny = dx / len;
        const segments = Math.round(freq * 10);
        const pts = [];
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          if (t > progress) break;
          const px = x1 + dx * t;
          const py = y1 + dy * t;
          const wave = Math.sin(t * freq * Math.PI * 2 + waveOffset) * amp;
          pts.push({ x: px + nx * wave, y: py + ny * wave });
        }
        return pts;
      }

      const animQueue = [
        { type:'node', i:0 },
        { type:'conn', i:0 }, { type:'conn', i:1 },
        { type:'node', i:1 }, { type:'node', i:2 },
        { type:'conn', i:2 }, { type:'conn', i:3 },
        { type:'node', i:3 }, { type:'node', i:4 },
        { type:'conn', i:4 }, { type:'conn', i:5 },
        { type:'node', i:5 }, { type:'node', i:6 },
        { type:'conn', i:6 }, { type:'conn', i:7 },
        { type:'conn', i:8 }, { type:'conn', i:9 },
        { type:'conn', i:10 }, { type:'conn', i:11 },
      ];

      let animIdx = 0;
      let drawingConns = [];
      const CONN_SPEED = 0.005;
      const STEP_INTERVAL = 800;
      let lastStep = 0;
      let allDone = false;
      let doneTime = 0;
      const HOLD = 8000;
      let globalTime = 0;

      function loop(ts) {
        if (!loop.last) loop.last = ts;
        const dt = ts - loop.last;
        loop.last = ts;
        globalTime += dt * 0.002;

        ctx.clearRect(0, 0, W, H);

        drawingConns = drawingConns.filter(ci => {
          conns[ci].progress += CONN_SPEED;
          if (conns[ci].progress >= 1) { conns[ci].progress = 1; return false; }
          return true;
        });

        if (!allDone && drawingConns.length === 0) {
          if (ts - lastStep > STEP_INTERVAL && animIdx < animQueue.length) {
            const step = animQueue[animIdx++];
            if (step.type === 'node') {
              nodes[step.i].lit = true;
            } else {
              conns[step.i].active = true;
              drawingConns.push(step.i);
            }
            lastStep = ts;
          } else if (animIdx >= animQueue.length && drawingConns.length === 0) {
            allDone = true;
            doneTime = ts;
          }
        }

        if (allDone && ts - doneTime > HOLD) {
          nodes.forEach(n => { n.lit = false; n.pulse = 0; n.scale = 0; });
          conns.forEach(c => { c.progress = 0; c.active = false; });
          animIdx = 0; drawingConns = []; allDone = false; lastStep = ts;
        }

        nodes.forEach(n => {
          if (n.lit) n.scale = Math.min(n.scale + dt * 0.004, 1);
        });

        conns.forEach(c => {
          if (!c.active && c.progress === 0) return;
          c.waveOffset += dt * 0.003;
          const na = nodes[c.a], nb = nodes[c.b];
          const pts = wavyPath(na.x, na.y, nb.x, nb.y, c.wamp, c.wfreq, c.progress, c.waveOffset);
          if (pts.length < 2) return;

          ctx.beginPath();
          ctx.moveTo(pts[0].x, pts[0].y);
          for (let k = 1; k < pts.length; k++) ctx.lineTo(pts[k].x, pts[k].y);
          ctx.strokeStyle = '#2a2547';
          ctx.lineWidth = 1;
          ctx.stroke();

          const grad = ctx.createLinearGradient(na.x, na.y, nb.x, nb.y);
          grad.addColorStop(0, '#7b61ff33');
          grad.addColorStop(0.5, '#7b61ffbb');
          grad.addColorStop(1, '#7b61ff55');
          ctx.beginPath();
          ctx.moveTo(pts[0].x, pts[0].y);
          for (let k = 1; k < pts.length; k++) ctx.lineTo(pts[k].x, pts[k].y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.shadowColor = '#7b61ff';
          ctx.shadowBlur = 7;
          ctx.stroke();
          ctx.shadowBlur = 0;

          if (c.progress < 1) {
            const tip = pts[pts.length - 1];
            ctx.beginPath();
            ctx.arc(tip.x, tip.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#7b61ff';
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });

        nodes.forEach(n => {
          const s = n.scale;
          if (s === 0) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = '#2a2547';
            ctx.fill();
            return;
          }

          const aura = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3.5);
          aura.addColorStop(0, `rgba(123,97,255,${0.22 * s})`);
          aura.addColorStop(1, 'rgba(123,97,255,0)');
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = aura;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * s, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(123,97,255,${0.85 * s})`;
          ctx.lineWidth = 1.5;
          ctx.shadowColor = '#7b61ff';
          ctx.shadowBlur = 12;
          ctx.stroke();
          ctx.shadowBlur = 0;

          const fill = ctx.createRadialGradient(n.x - n.r*0.3, n.y - n.r*0.3, 0, n.x, n.y, n.r * s);
          fill.addColorStop(0, `rgba(80,60,180,${s})`);
          fill.addColorStop(1, `rgba(30,22,70,${s})`);
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * s, 0, Math.PI * 2);
          ctx.fillStyle = fill;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(n.x - n.r*0.25, n.y - n.r*0.25, n.r * 0.22 * s, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${0.5 * s})`;
          ctx.fill();
        });

        requestAnimationFrame(loop);
      }

      resize();
      new ResizeObserver(() => { resize(); init(); }).observe(wrap);
      requestAnimationFrame(loop);
    })();

    return () => {
      anchors.forEach((a) => a.removeEventListener('click', anchorHandler));
      observer.disconnect();
      if (counterObserver) counterObserver.disconnect();
    };
  }, []);

  // Note: UnicornStudio removed due to memory issues
  // The external script was causing high memory usage

  // Agency-level JSON-LD schema
  const agencySchema = {
    '@context': 'https://schema.org',
    '@type': 'MarketingAgency',
    name: 'FrameGen',
    url: 'https://framegen.vercel.app',
    logo: 'https://framegen.vercel.app/frame_gen.png',
    description:
      'FrameGen is a premium digital agency offering web development, 3D CGI visualization, motion graphics, brand identity, and digital marketing services.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PK',
    },
    sameAs: [],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Agency Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '3D CGI Visualization' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Motion Graphics' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Identity Design' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Marketing' } },
      ],
    },
  };

  return (
    <div className="relative z-10">
      <SEO
        title="Digital Marketing, SEO & Web Development Agency"
        description="FrameGen is a top-rated digital marketing agency specializing in ROI-driven performance marketing, expert SEO services, and premium web development. Scale your business today."
        canonical="https://framegen.vercel.app"
        schema={agencySchema}
      />

      <div className="mx-auto w-[calc(100%-20px)] max-w-[1400px] sm:w-[calc(100%-40px)]">
        {/* Top Spline Hero Section */}
        <section className="top-spline-hero" ref={heroRef}>
          <div className="spline-background">
            {splineReady ? (
              /* Spline only mounts after user interaction or 2s delay */
              <Suspense fallback={
                <div
                  className="w-full h-full"
                  style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(123,97,255,0.18) 0%, rgba(10,10,10,0) 70%)' }}
                />
              }>
                <Spline scene="https://prod.spline.design/ou6jXp9yZJVo41BN/scene.splinecode" />
              </Suspense>
            ) : (
              /* Lightweight gradient placeholder — renders instantly, no JS blocked */
              <div
                className="w-full h-full"
                style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(123,97,255,0.22) 0%, rgba(10,10,10,0) 70%)' }}
                aria-hidden="true"
              />
            )}
          </div>
          
          <div className="hero-overlay-content">
            <div className="relative z-10 flex flex-col items-start text-left px-4 sm:px-6 md:px-12 lg:px-20">
              <div className="w-full">
                <h1
                  id="hero-heading"
                  className="font-syne text-[32px] font-light leading-[1.1] sm:text-[40px] md:text-[56px] lg:text-[72px]"
                >
                  Build Websites,<br /> 
                  Brands & 3D <br />Experiences
                  That <br />Grow Businesses
                </h1>
                <p className="mt-4 text-[14px] text-[#aaaaaa] sm:text-[16px] md:text-[18px] max-w-[600px]">
                  Custom websites, motion graphics, and digital branding designed to increase engagement and drive conversions.
                </p>
                <div className="hero-buttons mt-8 flex justify-start gap-3 sm:gap-4">
                  <Link
                    to="/contact"
                    className="btn-primary bg-[#7B61FF] px-6 py-3 font-syne text-[12px] text-white shadow-[0_0_0_rgba(123,97,255,0.28)] transition hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(123,97,255,0.28)] sm:px-[35px] sm:py-[15px] sm:text-[14px]"
                  >
                    Start your Project
                  </Link>
                  <Link
                    to="/services"
                    className="btn-secondary px-6 py-3 font-syne text-[12px] text-white transition hover:text-[#7B61FF] sm:px-[35px] sm:py-[15px] sm:text-[14px]"
                  >
                    View Services →
                  </Link>
                </div>
              </div>
            </div>
            
          </div>
        </section>
        
        {/* Results & Growth Grid */}
        <section className="results-growth-section">
          <div className="results-grid">
            {/* Box 1: Results Graph */}
            <div className="grid-box box-graph reveal-card">
              <div>
                <div className="box-label text-[#7B61FF]">Client Success</div>
                <div className="box-title text-[24px] md:text-[28px]">Delivering Proven Results</div>
              </div>
              <div className="graph-container" style={{ height: '220px', padding: '0 5px' }}>
                <StatisticsGraph />
              </div>
            </div>


            {/* Box 2: Trust Signals Chart */}
            <div className="grid-box box-growth reveal-card">
              <div className="box-label">Key Metrics Impact</div>
              <div className="flex-1 w-full min-h-0 pt-2">
                <MetricsPieChart />
              </div>
            </div>

            {/* Box 3: Global Trust (swapped from Box 6) */}
            <div className="grid-box box-trust reveal-card" id="trust-section" style={{ gridColumn: 'span 1' }}>
              <div className="box-label">Global Trust</div>
              <div className="flex items-baseline gap-2">
                <span className="box-value stat-number" data-target="50">0</span>
                <span className="text-[32px] font-bold text-[#7B61FF]">+</span>
              </div>
              <div className="box-desc">Trusted by 50+ businesses across multiple industries to deliver excellence.</div>
            </div>

            {/* Box 4: 24/7 Support (swapped from Box 7) */}
            <div className="grid-box box-best-3 reveal-card">
              <div className="box-title">24/7 Support</div>
              <div className="box-desc">Your business never sleeps, and neither does our commitment to your success. We provide round-the-clock monitoring, immediate troubleshooting, and continuous updates to ensure your digital assets are always performing at their peak, no matter the time zone.</div>
            </div>

            {/* Animation 1: Bar Chart - Performance-First Tech */}
            <div className="grid-box box-best-1 reveal-card" style={{ gridColumn: 'span 1' }}>
              <div className="box-label">Performance-First Tech</div>
              <h3 className="box-title">Fast, Secure & Scalable</h3>
              <div className="feature-card-anim" style={{ width: '100%', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="bar-chart" id="bar-chart-anim">
                    <div className="bar" style={{ height: '55px' }}></div>
                    <div className="bar" style={{ height: '40px' }}></div>
                    <div className="bar active" style={{ height: '70px' }}></div>
                    <div className="bar" style={{ height: '50px' }}></div>
                    <div className="bar active" style={{ height: '65px' }}></div>
                  </div>
                  <div className="bar-base"></div>
                  <div className="bar-btns">
                    <div className="bar-btn active"></div>
                    <div className="bar-btn"></div>
                    <div className="bar-btn active"></div>
                    <div className="bar-btn"></div>
                    <div className="bar-btn"></div>
                  </div>
                </div>
              </div>
              <p className="box-desc mb-3">We use modern technologies and optimized development practices to build fast, secure, and scalable websites that perform flawlessly across all devices.</p>
            </div>

            {/* Animation 2: Icon Rows - Expert Team */}
            <div className="grid-box box-best-2 reveal-card" style={{ gridColumn: 'span 1' }}>
              <div className="box-label">Expert Team</div>
              <h3 className="box-title">Years of Experience</h3>
              <div className="feature-card-anim" style={{ width: '100%', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                <div className="icon-rows" id="icon-rows-anim">
                  <div className="icon-row">
                    <div className="icon-circle gear" id="gear-top-anim"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M18.66 5.34l1.41-1.41"/></svg></div>
                    <div className="icon-circle" id="ri1-anim"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6m-6 4h6m-6 4h4"/></svg></div>
                    <div className="icon-circle" id="ri2-anim"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/></svg></div>
                    <div className="icon-circle" id="ri3-anim"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></div>
                  </div>
                  <div className="icon-row">
                    <div className="icon-circle" id="bi1-anim"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></div>
                    <div className="icon-circle" id="bi2-anim"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6m-6 4h6m-6 4h4"/></svg></div>
                    <div className="icon-circle" id="bi3-anim"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2"/><path d="M16 2H8a2 2 0 0 0-2 2v3h12V4a2 2 0 0 0-2-2z"/></svg></div>
                    <div className="icon-circle gear" id="gear-bot-anim"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M18.66 5.34l1.41-1.41"/></svg></div>
                  </div>
                </div>
              </div>
              <p className="box-desc mb-3">Our team of developers and designers combines years of experience in building high-performance websites and intuitive user interfaces.</p>
            </div>

            {/* Animation 3: Task Rows - Industry Impact */}
            <div className="grid-box box-problems reveal-card" style={{ gridColumn: 'span 1' }}>
              <div className="box-label">Industry Impact</div>
              <h3 className="box-title" style={{ marginBottom: '12px' }}>Solving Core Challenges</h3>
              <div className="feature-card-anim" style={{ width: '100%', height: '120px', marginTop: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 8px' }}>
                <div className="task-list" id="task-list-anim">
                  <div className="task-row" id="tr0-anim"><div className="task-icon" style={{ background: '#7b61ff' }}></div><div className="task-bar-wrap"><div className="task-bar-fill" style={{ width: '72%' }}></div></div><div className="task-dot" style={{ background: '#3d2f7a' }}></div></div>
                  <div className="task-row" id="tr1-anim"><div className="task-icon" style={{ background: '#5a45cc' }}></div><div className="task-bar-wrap"><div className="task-bar-fill" style={{ width: '55%', background: '#5a45cc' }}></div></div><div className="task-dot"></div></div>
                  <div className="task-row" id="tr2-anim"><div className="task-icon" style={{ background: '#7b61ff' }}></div><div className="task-bar-wrap"><div className="task-bar-fill" style={{ width: '85%' }}></div></div><div className="task-dot" style={{ background: '#3d2f7a' }}></div></div>
                  <div className="task-row" id="tr3-anim"><div className="task-icon" style={{ background: '#4a3899' }}></div><div className="task-bar-wrap"><div className="task-bar-fill" style={{ width: '40%', background: '#4a3899' }}></div></div><div className="task-dot"></div></div>
                </div>
              </div>
              <p className="box-desc">We don't just build websites; we solve business problems. Whether it's optimizing user conversion rates, architecting complex database structures, or ensuring 100% mobile responsiveness, we address the root causes of digital friction to drive real growth.</p>
            </div>

            {/* Animation 4: Node Animation - Seamless Integration */}
            <div className="grid-box reveal-card" style={{ gridColumn: 'span 1' }}>
              <div className="box-label">Streamline Workflows</div>
              <h3 className="box-title">Seamless Integration</h3>
              <div className="feature-card-anim" style={{ width: '100%', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                <canvas id="nc" style={{ width: '100%', height: '100%' }}></canvas>
              </div>
              <p className="box-desc">We connect your tools and platforms for seamless data flow and improved productivity.</p>
            </div>

          </div>
        </section>
        
        {/* Bar Graph Section */}


        {/* Portfolio */}
        <section
          aria-labelledby="portfolio-heading"
          className="section-box relative my-12 overflow-hidden rounded-[16px] border border-white/5 bg-white/5 px-4 py-8 text-left shadow-[0_0_40px_rgba(123,97,255,0.08)] sm:my-16 sm:rounded-[20px] sm:px-6 sm:py-10 md:my-20 md:px-12 md:py-12 lg:px-20"
        >
          <div className="flex flex-col gap-6 md:gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="portfolio-section">
              <h2 className="mb-2 text-[14px] text-[#aaaaaa] sm:text-[15px]">Portfolio</h2>
              <h2
                id="portfolio-heading"
                className="mb-4 font-syne text-[32px] font-light leading-[1.1] sm:text-[40px] md:text-[50px] lg:text-[65px]"
              >
                Our Work That
                <br />
                Delivers Results.
              </h2>
              <div className="mb-4 flex flex-wrap gap-2 sm:mb-5">
                {['Web Applications', 'WordPress & CMS', 'E-commerce Solutions', '3D & CGI Visualization', 'Motion Graphics', 'Brand Identity'].map(
                  (label) => (
                    <span
                      key={label}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] sm:px-4 sm:py-2 sm:text-[14px]"
                    >
                      {label}
                    </span>
                  ),
                )}
              </div>
              <p className="mb-4 text-[14px] text-[#cccccc] sm:text-[15px] md:text-[16px]">
                Available for projects
                <br />
                Crafting digital experiences with clean code, thoughtful design, and user-first
                approach.
              </p>
              <div className="hero-buttons flex flex-wrap gap-3 sm:gap-4">
                <Link
                  to="/digital-marketing"
                  className="btn-primary bg-[#7B61FF] px-6 py-3 font-syne text-[12px] text-white transition hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(123,97,255,0.28)] sm:px-[35px] sm:py-[15px] sm:text-[14px]"
                >
                  Digital Marketing
                </Link>
                <Link
                  to="/projects/website-development"
                  className="btn-secondary px-6 py-3 font-syne text-[12px] text-white transition hover:text-[#7B61FF] sm:px-[35px] sm:py-[15px] sm:text-[14px]"
                >
                  Website Development →
                </Link>
              </div>
            </div>

            {/* Portfolio Grid - Centered on mobile */}
            <div className="portfolio-grid mt-6 grid w-full max-w-[500px] grid-cols-1 place-items-center gap-4 mx-auto sm:max-w-none sm:grid-cols-2 sm:gap-5 lg:mt-0 lg:w-auto lg:grid-cols-3 lg:gap-6 lg:self-center">
              {/* First big card */}
              <div className="portfolio-img-card group h-full w-full max-w-[300px] overflow-hidden rounded-[12px] border border-white/10 bg-white/5 cursor-pointer transition-all duration-250 ease-in-out hover:-translate-y-[6px] hover:border-[#7B61FF] hover:shadow-[0_0_25px_rgba(123,97,255,0.25)] sm:max-w-none sm:col-span-2 sm:row-span-2">
                <span className="portfolio-badge absolute left-3 top-3 z-20 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium tracking-[0.06em] text-white backdrop-blur sm:left-[14px] sm:top-[14px] sm:px-4 sm:py-1.5 sm:text-[12px]">
                  UI Design
                </span>
                <img
                  src={p1}
                  alt="Portfolio 1"
                  loading="lazy"
                  className="h-full w-full rounded-[12px] object-cover transition-all duration-500 grayscale group-hover:scale-105 group-hover:grayscale-0 sm:rounded-[14px]"
                />
              </div>

              {/* Second medium card */}
              <div className="portfolio-img-card group h-full w-full max-w-[300px] overflow-hidden rounded-[12px] border border-white/10 bg-white/5 cursor-pointer transition-all duration-250 ease-in-out hover:-translate-y-[6px] hover:border-[#7B61FF] hover:shadow-[0_0_25px_rgba(123,97,255,0.25)] sm:max-w-none sm:row-span-2">
                <span className="portfolio-badge absolute left-3 top-3 z-20 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium tracking-[0.06em] text-white backdrop-blur sm:left-[14px] sm:top-[14px] sm:px-4 sm:py-1.5 sm:text-[12px]">
                  Front-end 
                </span>
                <img
                  src={p2}
                  alt="Portfolio 2"
                  loading="lazy"
                  className="h-full w-full rounded-[12px] object-cover transition-all duration-500 grayscale group-hover:scale-105 group-hover:grayscale-0 sm:rounded-[14px]"
                />
              </div>

              {/* Third medium card */}
              <div className="portfolio-img-card group h-full w-full max-w-[300px] overflow-hidden rounded-[12px] border border-white/10 bg-white/5 cursor-pointer transition-all duration-250 ease-in-out hover:-translate-y-[6px] hover:border-[#7B61FF] hover:shadow-[0_0_25px_rgba(123,97,255,0.25)] sm:max-w-none">
                <span className="portfolio-badge absolute left-3 top-3 z-20 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium tracking-[0.06em] text-white backdrop-blur sm:left-[14px] sm:top-[14px] sm:px-4 sm:py-1.5 sm:text-[12px]">
                  E-commerce
                </span>
                <img
                  src={p3}
                  alt="Portfolio 3"
                  loading="lazy"
                  className="h-full w-full rounded-[12px] object-cover transition-all duration-500 grayscale group-hover:scale-105 group-hover:grayscale-0 sm:rounded-[14px]"
                />
              </div>

              {/* Fourth small card */}
              <div className="portfolio-img-card group h-full w-full max-w-[300px] overflow-hidden rounded-[12px] border border-white/10 bg-white/5 cursor-pointer transition-all duration-250 ease-in-out hover:-translate-y-[6px] hover:border-[#7B61FF] hover:shadow-[0_0_25px_rgba(123,97,255,0.25)] sm:max-w-none">
                <span className="portfolio-badge absolute left-3 top-3 z-20 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium tracking-[0.06em] text-white backdrop-blur sm:left-[14px] sm:top-[14px] sm:px-4 sm:py-1.5 sm:text-[12px]">
                  Web Development
                </span>
                <img
                  src={p5}
                  alt="Portfolio 4"
                  loading="lazy"
                  className="h-full w-full rounded-[12px] object-cover transition-all duration-500 grayscale group-hover:scale-105 group-hover:grayscale-0 sm:rounded-[14px]"
                />
              </div>

              {/* Fifth medium card */}
              <div className="portfolio-img-card group h-full w-full max-w-[300px] overflow-hidden rounded-[12px] border border-white/10 bg-white/5 cursor-pointer transition-all duration-250 ease-in-out hover:-translate-y-[6px] hover:border-[#7B61FF] hover:shadow-[0_0_25px_rgba(123,97,255,0.25)] sm:max-w-none">
                <span className="portfolio-badge absolute left-3 top-3 z-20 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium tracking-[0.06em] text-white backdrop-blur sm:left-[14px] sm:top-[14px] sm:px-4 sm:py-1.5 sm:text-[12px]">
                  Brand Identity
                </span>
                <img
                  src={p4}
                  alt="Portfolio 5"
                  loading="lazy"
                  className="h-full w-full rounded-[12px] object-cover transition-all duration-500 grayscale group-hover:scale-105 group-hover:grayscale-0 sm:rounded-[14px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          id="testimonials-section"
          aria-labelledby="testimonials-heading"
          className="section-box relative my-12 overflow-hidden rounded-[16px] border border-white/5 bg-white/5 px-4 py-8 text-left shadow-[0_0_40px_rgba(123,97,255,0.08)] sm:my-16 sm:rounded-[20px] sm:px-6 sm:py-10 md:my-20 md:px-12 md:py-12 lg:px-20"
        >
          <div className="flex flex-col gap-8 md:gap-12 lg:flex-row lg:items-start lg:justify-between"> {/* Increased gap */}
            <div className="w-full lg:max-w-[45%]"> {/* Reduced width to create more space */}
              <h2 className="mb-2 text-[14px] text-[#aaaaaa] sm:text-[15px]">Testimonials</h2>
              <h2
                id="testimonials-heading"
                className="mb-4 font-syne text-[32px] font-light leading-[1.1] sm:text-[40px] md:text-[50px] lg:text-[65px]"
              >
                Clients love FrameGen
              </h2>
              <p className="mb-4 text-[14px] text-[#cccccc] sm:text-[15px] md:text-[16px]">
                Trusted by innovative companies, delivering exceptional digital experiences that
                drive results.
              </p>
              
              {/* Stats - Fixed layout with value and symbol in same row */}
              <div className="stats mb-4 flex flex-wrap gap-6 sm:mb-6 md:flex-nowrap">
                <div className="stat flex-1 text-center sm:flex-none">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="stat-number block text-[28px] font-bold leading-none sm:text-[32px] md:text-[36px]" data-target="50">
                      0
                    </span>
                    <span className="text-[20px] font-bold sm:text-[24px] md:text-[28px]">+</span>
                  </div>
                  <p className="stat-label mt-1 text-[12px] text-[#aaaaaa] sm:text-[13px] md:text-[14px]">Projects delivered</p>
                </div>
                <div className="stat flex-1 text-center sm:flex-none">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="stat-number block text-[28px] font-bold leading-none sm:text-[32px] md:text-[36px]" data-target="5">
                      0
                    </span>
                    <span className="text-[20px] font-bold sm:text-[24px] md:text-[28px] invisible">+</span> {/* Invisible spacer for alignment */}
                  </div>
                  <p className="stat-label mt-1 text-[12px] text-[#aaaaaa] sm:text-[13px] md:text-[14px]">Years experience</p>
                </div>
                <div className="stat flex-1 text-center sm:flex-none">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="stat-number block text-[28px] font-bold leading-none sm:text-[32px] md:text-[36px]" data-target="100">
                      0
                    </span>
                    <span className="text-[20px] font-bold sm:text-[24px] md:text-[28px]">%</span>
                  </div>
                  <p className="stat-label mt-1 text-[12px] text-[#aaaaaa] sm:text-[13px] md:text-[14px]">Client satisfaction</p>
                </div>
              </div>
              
              <div className="hero-buttons flex flex-wrap gap-3 sm:gap-4">
                <Link
                  to="/contact"
                  className="btn-primary bg-[#7B61FF] px-6 py-3 font-syne text-[12px] text-white transition hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(123,97,255,0.28)] sm:px-[35px] sm:py-[15px] sm:text-[14px]"
                >
                  Book a call
                </Link>
                <Link
                  to="/services"
                  className="btn-secondary px-6 py-3 font-syne text-[12px] text-white transition hover:text-[#7B61FF] sm:px-[35px] sm:py-[15px] sm:text-[14px]"
                >
                  We Offer →
                </Link>
              </div>
            </div>

            <div className="testimonials-right reveal-card mt-6 lg:mt-0 lg:w-[50%] lg:pl-8 xl:pl-12"> {/* Added padding on larger screens */}
              <div className="testimonial-slider h-[300px] overflow-hidden sm:h-[350px] md:h-[400px]">
                <div className="testimonial-track flex flex-col animate-[slideUp_20s_linear_infinite]">
                  {[
                    {
                      name: 'Mohsin Haroon',
                      title: 'CEO, SamarTex',
                      content: 'Working with FrameGen to build our eCommerce store was a seamless experience. The team understood our vision perfectly, created a visually stunning and highly functional website, and ensured a smooth checkout process for our customers. Managing products has never been easier. Highly recommended!'
                    },
                    {
                      name: 'Fahad Abdul Aziz',
                      title: 'RAAD AL ARABIA, Jeddah',
                      content: 'FrameGen built a modern website for our cold storage business that improved our online credibility and made it easier for clients to understand our services. The team was professional, responsive, and attentive to every detail. Our online presence has significantly improved.'
                    },
                    {
                      name: 'Muhammad Fayaz',
                      title: 'Asia Glory Company',
                      content: 'FrameGen built a modern, responsive, and user-friendly website for us. They understood our needs perfectly, delivered on time, and exceeded our expectations. Highly professional in web development, Do recommend!'
                    }
                  ].map((t, idx) => (
                    <div
                      key={idx}
                      className="testimonial-card mb-4 rounded-[10px] border border-white/10 bg-white/5 p-4 shadow-[0_0_20px_rgba(123,97,255,0.06)] transition hover:shadow-[0_0_30px_rgba(123,97,255,0.12)] sm:mb-6 sm:p-5 md:mb-[30px] md:p-7"
                    >
                      <div className="testimonial-author text-[16px] sm:text-[17px] md:text-[18px]">
                        {t.name}
                      </div>
                      <div className="testimonial-author-title text-[13px] text-[#888888] sm:text-[14px]">
                        {t.title}
                      </div>
                      <div className="stars mb-3 text-[14px] text-[#FFD700] sm:mb-[14px] sm:text-[16px]">
                        5.0 ★★★★
                      </div>
                      <p className="testimonial-text text-[13px] leading-[1.6] text-[#cccccc] sm:text-[14px] sm:leading-[1.75] md:text-[15px]">
                        {t.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Services */}
        <section
          aria-labelledby="services-heading"
          className="section-box relative my-12 overflow-hidden rounded-[16px] border border-white/5 bg-white/5 px-4 py-8 text-left shadow-[0_0_40px_rgba(123,97,255,0.08)] sm:my-16 sm:rounded-[20px] sm:px-6 sm:py-10 md:my-20 md:px-12 md:py-12 lg:px-20"
        >
          <div className="flex flex-col gap-6 md:gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full lg:max-w-[50%]">
              <h2 className="mb-2 text-[14px] text-[#aaaaaa] sm:text-[15px]">Services</h2>
              <h2
                id="services-heading"
                className="mb-4 font-syne text-[32px] font-light leading-[1.1] sm:text-[40px] md:text-[50px] lg:text-[58px]"
              >
                Let's Build
                <br />
                Something
                <br />
                Extraordinary
              </h2>
              <div className="service-item reveal-card mb-3 rounded-[10px] border border-white/15 bg-white/5 p-4 sm:mb-4 sm:p-5">
                <h3 className="mb-1 text-[16px] sm:text-[17px]">Website Development</h3>
                <p className="text-[13px] text-[#cccccc] sm:text-[14px]">
                  Custom websites and web applications built for performance and scalability.
                </p>
              </div>
              <div className="service-item reveal-card mb-3 rounded-[10px] border border-white/15 bg-white/5 p-4 sm:mb-4 sm:p-5">
                <h3 className="mb-1 text-[16px] sm:text-[17px]">Brand Identity & Graphic Design</h3>
                <p className="text-[13px] text-[#cccccc] sm:text-[14px]">
                  Logos, brand systems, and marketing visuals that establish strong brand presence.
                </p>
              </div>
              <div className="service-item reveal-card mb-3 rounded-[10px] border border-white/15 bg-white/5 p-4 sm:mb-4 sm:p-5">
                <h3 className="mb-1 text-[16px] sm:text-[17px]">3D & Motion Graphics</h3>
                <p className="text-[13px] text-[#cccccc] sm:text-[14px]">
                  Cinematic animations and CGI visuals that elevate digital experiences.
                </p>
              </div>
              <div className="service-item reveal-card mb-3 rounded-[10px] border border-white/15 bg-white/5 p-4 sm:mb-4 sm:p-5">
                <h3 className="mb-1 text-[16px] sm:text-[17px]">Digital Marketing & Growth</h3>
                <p className="text-[13px] text-[#cccccc] sm:text-[14px]">
                  SEO and advertising strategies designed to grow traffic and conversions.
                </p>
              </div>
              <div className="hero-buttons mt-4 flex flex-wrap gap-3 sm:gap-4">
                <Link
                  to="/services"
                  className="btn-primary bg-[#7B61FF] px-6 py-3 font-syne text-[12px] text-white transition hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(123,97,255,0.28)] sm:px-[35px] sm:py-[15px] sm:text-[14px]"
                >
                  View services
                </Link>
                <Link
                  to="/contact"
                  className="btn-secondary px-6 py-3 font-syne text-[12px] text-white transition hover:text-[#7B61FF] sm:px-[35px] sm:py-[15px] sm:text-[14px]"
                >
                  Start project →
                </Link>
              </div>
            </div>
            
            {/* Services Image - Centered and wider on tablet */}
            <div className="services-right reveal-card mt-6 flex w-full items-center justify-center lg:mt-0 lg:w-[50%] lg:self-center">
              <img
                src={servicesImage}
                alt="Services mockup"
                className="max-h-[300px] w-[140%] max-w-[140%] rounded-[10px] object-contain transition duration-300 hover:-translate-y-5 sm:max-h-[350px] md:max-h-[420px] md:w-[120%] md:max-w-[120%] lg:w-full lg:max-w-[480px]"
              />
            </div>
          </div>
        </section>

        {/* Contact preview */}
        <section
          aria-labelledby="contact-heading"
          className="section-box mb-8 mt-16 rounded-[16px] border border-white/5 bg-white/5 px-4 py-8 text-center shadow-[0_0_40px_rgba(123,97,255,0.12)] sm:mb-10 sm:mt-20 sm:rounded-[20px] sm:px-6 sm:py-10 md:px-12 lg:px-20"
        >
          <h2 id="contact-heading" className="mb-4 text-[28px] font-syne sm:text-[32px] md:text-[36px] lg:text-[40px]">
            Let's Build Something Great
          </h2>
          <Link
            to="/contact"
            className="inline-block animate-[float_3s_ease_infinite] rounded-md bg-gradient-to-tr from-[#7B61FF] to-[#00F0FF] px-8 py-3 text-[14px] text-white shadow-[0_0_0_rgba(123,97,255,0.28)] transition hover:-translate-y-[3px] hover:shadow-[0_0_20px_rgba(123,97,255,0.28)] sm:px-10 sm:py-4 sm:text-[16px]"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Home;