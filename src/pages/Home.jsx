import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import AnimatedJaggedGraph from '../components/AnimatedJaggedGraph.jsx';
import BarGraph from '../components/BarGraph.jsx';
import { Line } from 'react-chartjs-2';
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

  // Load Spline scene
  useEffect(() => {
    document.title = "FrameGen — Web Development & Design Portfolio";

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
        el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
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

    return () => {
      anchors.forEach((a) => a.removeEventListener('click', anchorHandler));
      observer.disconnect();
      if (counterObserver) counterObserver.disconnect();
    };
  }, []);

  // Note: UnicornStudio removed due to memory issues
  // The external script was causing high memory usage

  return (
    <div className="relative z-10">
      <div className="mx-auto w-[calc(100%-20px)] max-w-[1400px] sm:w-[calc(100%-40px)]">
        {/* Top Spline Hero Section */}
        <section className="top-spline-hero">
          <div className="spline-background">
            <Spline scene="https://prod.spline.design/ou6jXp9yZJVo41BN/scene.splinecode" />
          </div>
          
          <div className="hero-overlay-content">
            <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 md:px-12 lg:px-20">
              <div className="w-full">
                <h1
                  id="hero-heading"
                  className="font-syne text-[32px] font-light leading-[1.1] sm:text-[40px] md:text-[56px] lg:text-[72px]"
                >
                  Experiences
                  <br />
                  That
                  <br />
                  Captivate
                </h1>
                <div className="hero-buttons mt-8 flex justify-center gap-3 sm:gap-4">
                  <Link
                    to="/contact"
                    className="btn-primary bg-[#7B61FF] px-6 py-3 font-syne text-[12px] text-white shadow-[0_0_0_rgba(123,97,255,0.28)] transition hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(123,97,255,0.28)] sm:px-[35px] sm:py-[15px] sm:text-[14px] rounded-md"
                  >
                    Book a call
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
              <div className="graph-container" style={{ height: '180px', padding: '10px 0' }}>
                <AnimatedJaggedGraph />
              </div>
              <div className="box-value text-[#7B61FF]">98%</div>
            </div>

            {/* Box 2: Monthly Growth */}
            <div className="grid-box box-growth reveal-card">
              <div className="box-label">Monthly Growth</div>
              <div className="growth-circle">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" className="circle-bg" />
                  <circle cx="50" cy="50" r="45" className="circle-progress" style={{ strokeDashoffset: '70' }} />
                </svg>
                <div className="growth-percent text-[#00F0FF]">+24%</div>
              </div>
              <div className="box-desc text-center">Average monthly client acquisition growth</div>
            </div>

            {/* Box 3: Best Choice 1 */}
            <div className="grid-box box-best-1 reveal-card">
              <div className="box-title">Expert Team</div>
              <div className="box-desc">Our team consists of industry veterans with over 10 years of combined experience in full-stack development and UI/UX design. We pride ourselves on our meticulous attention to detail and our ability to turn complex problems into elegant, scalable solutions.</div>
            </div>

            {/* Box 4: Best Choice 2 */}
            <div className="grid-box box-best-2 reveal-card">
              <div className="box-title">Modern Tech</div>
              <div className="box-desc">We leverage the latest advancements in web technology, including React 18, Next.js, Tailwinds CSS, and cloud-native architectures. Our tech stack is chosen specifically to ensure lightning-fast performance, robust security, and seamless scalability for your business.</div>
            </div>

            {/* Box 5: Problems & Solutions */}
            <div className="grid-box box-problems reveal-card">
              <div className="box-label">Industry Impact</div>
              <h3 className="box-title">Solving Core Challenges</h3>
              <p className="box-desc">We don't just build websites; we solve business problems. Whether it's optimizing user conversion rates, architecting complex database structures, or ensuring 100% mobile responsiveness, we address the root causes of digital friction to drive real growth.</p>
            </div>

            {/* Box 6: Trust Counter */}
            <div className="grid-box box-trust reveal-card" id="trust-section">
              <div className="box-label">Global Trust</div>
              <div className="flex items-baseline gap-2">
                <span className="box-value stat-number" data-target="500">0</span>
                <span className="text-[32px] font-bold text-[#7B61FF]">+</span>
              </div>
              <div className="box-desc">Trusted by businesses worldwide to deliver excellence.</div>
            </div>

            {/* Box 7: Best Choice 3 */}
            <div className="grid-box box-best-3 reveal-card">
              <div className="box-title">24/7 Support</div>
              <div className="box-desc">Your business never sleeps, and neither does our commitment to your success. We provide round-the-clock monitoring, immediate troubleshooting, and continuous updates to ensure your digital assets are always performing at their peak, no matter the time zone.</div>
            </div>

            {/* Box 8: Empty Placeholder */}
            <div className="grid-box box-empty reveal-card border-dashed border-white/10">
              <div className="flex h-full w-full items-center justify-center text-white/20 italic">
                {/* User will add content later */}
              </div>
            </div>
          </div>
        </section>
        
        {/* Bar Graph Section */}
        <section className="bar-graph-section">
          <BarGraph />
        </section>

        {/* Portfolio */}
        <section
          aria-labelledby="portfolio-heading"
          className="section-box relative my-12 overflow-hidden rounded-[16px] border border-white/5 bg-white/5 px-4 py-8 text-left shadow-[0_0_40px_rgba(123,97,255,0.08)] sm:my-16 sm:rounded-[20px] sm:px-6 sm:py-10 md:my-20 md:px-12 md:py-12 lg:px-20"
        >
          <div className="flex flex-col gap-6 md:gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="portfolio-section">
              <h2 className="mb-2 text-[14px] text-[#aaaaaa] sm:text-[15px]">Portfolio</h2>
              <h1
                id="portfolio-heading"
                className="mb-4 font-syne text-[32px] font-light leading-[1.1] sm:text-[40px] md:text-[50px] lg:text-[65px]"
              >
                Creative solutions
                <br />
                that make
                <br />
                impact.
              </h1>
              <div className="mb-4 flex flex-wrap gap-2 sm:mb-5">
                {['Frontend Development', 'UI/UX Design', 'E-Commerce', 'Brand Identity'].map(
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
                  to="/projects/website-development"
                  className="btn-primary bg-[#7B61FF] px-6 py-3 font-syne text-[12px] text-white transition hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(123,97,255,0.28)] sm:px-[35px] sm:py-[15px] sm:text-[14px]"
                >
                  View Portfolio
                </Link>
                <Link
                  to="/contact"
                  className="btn-secondary px-6 py-3 font-syne text-[12px] text-white transition hover:text-[#7B61FF] sm:px-[35px] sm:py-[15px] sm:text-[14px]"
                >
                  Start Project →
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
              <h1
                id="testimonials-heading"
                className="mb-4 font-syne text-[32px] font-light leading-[1.1] sm:text-[40px] md:text-[50px] lg:text-[65px]"
              >
                Clients love FrameGen
              </h1>
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

            {/* Testimonials Right - More spacing */}
            <div className="testimonials-right reveal-card mt-6 lg:mt-0 lg:w-[50%] lg:pl-8 xl:pl-12"> {/* Added padding on larger screens */}
              <div className="testimonial-slider h-[300px] overflow-hidden sm:h-[350px] md:h-[400px]">
                <div className="testimonial-track flex flex-col animate-[slideUp_20s_linear_infinite]">
                  {[1, 2, 3, 4].map((idx) => (
                    <div
                      key={idx}
                      className="testimonial-card mb-4 rounded-[10px] border border-white/10 bg-white/5 p-4 shadow-[0_0_20px_rgba(123,97,255,0.06)] transition hover:shadow-[0_0_30px_rgba(123,97,255,0.12)] sm:mb-6 sm:p-5 md:mb-[30px] md:p-7"
                    >
                      <div className="testimonial-author text-[16px] sm:text-[17px] md:text-[18px]">
                        {idx % 3 === 0 ? 'Mohsin Haroon': idx % 3 === 1 ? 'Fahad Abdul Aziz' : 'Muhammad Fayaz'}
                      </div>
                      <div className="testimonial-author-title text-[13px] text-[#888888] sm:text-[14px]">
                        {idx % 3 === 0 ? 'CEO, SamarTex' : idx % 3 === 1 ? 'RAAD AL ARABIA, Jeddah' : 'Asia Glory Company'}
                      </div>
                      <div className="stars mb-3 text-[14px] text-[#FFD700] sm:mb-[14px] sm:text-[16px]">
                        5.0 ★★★★
                      </div>
                      <p className="testimonial-text text-[13px] leading-[1.6] text-[#cccccc] sm:text-[14px] sm:leading-[1.75] md:text-[15px]">
                        {idx % 3 === 0
                          ? 'Working with FrameGen to build our eCommerce store was a seamless experience. The team understood our vision perfectly, created a visually stunning and highly functional website, and ensured a smooth checkout process for our customers. Managing products has never been easier. Highly recommended!'
                          : idx % 3 === 1 ? 'FrameGen delivered an exceptional website for our cold storage business. The site perfectly showcases our services, builds trust with clients, and provides clear information about our facilities. The team was professional, responsive, and attentive to every detail. Our online presence has improved' : 'FrameGen built a modern, responsive, and user-friendly website for us. They understood our needs perfectly, delivered on time, and exceeded our expectations. Highly professional in web development, Do recommend!'}
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
              <h1
                id="services-heading"
                className="mb-4 font-syne text-[32px] font-light leading-[1.1] sm:text-[40px] md:text-[50px] lg:text-[58px]"
              >
                Let's Build
                <br />
                Something
                <br />
                Extraordinary
              </h1>
              <div className="service-item reveal-card mb-3 rounded-[10px] border border-white/15 bg-white/5 p-4 sm:mb-4 sm:p-5">
                <h3 className="mb-1 text-[16px] sm:text-[17px]">Creative Development</h3>
                <p className="text-[13px] text-[#cccccc] sm:text-[14px]">
                  Crafting digital experiences that captivate and convert your audience.
                </p>
              </div>
              <div className="service-item reveal-card mb-3 rounded-[10px] border border-white/15 bg-white/5 p-4 sm:mb-4 sm:p-5">
                <h3 className="mb-1 text-[16px] sm:text-[17px]">Full-Stack Solutions</h3>
                <p className="text-[13px] text-[#cccccc] sm:text-[14px]">
                  Complete digital solutions from strategy to deployment and beyond.
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