import React, { useEffect } from 'react';
import '../styles/about.css';
import storyImage from '/images/services-image.png';
import { FaJsSquare, FaReact, FaNodeJs, FaPaintBrush, FaDatabase, FaMobileAlt, FaLaptopCode, FaBullhorn, FaFilm, FaPencilRuler, FaCube } from 'react-icons/fa';
import Spline from '@splinetool/react-spline';

const services = [
  {
    icon: <FaLaptopCode />,
    title: 'Website Development',
    description: 'Custom websites and web applications built with modern technologies for optimal performance and user experience.',
  },
  {
    icon: <FaBullhorn />,
    title: 'Digital Marketing Ads',
    description: 'Strategic ad campaigns across Google, social media, and other platforms to maximize your ROI.',
  },
  {
    icon: <FaFilm />,
    title: 'AI Video Generation',
    description: 'Computer-Generated Imagery for product visualization, architectural renders, and immersive experiences.',
  },
  {
    icon: <FaPencilRuler />,
    title: 'Graphics Design',
    description: 'Professional graphic design services including logos, brand identity, and marketing materials.',
  },
  {
    icon: <FaCube />,
    title: '2D & 3D Animation',
    description: 'Captivating 2D and 3D animations for videos, advertisements, and digital content.',
  },
];

const teamMembers = [
  { img: '/images/team-member1.jpg', name: 'John Doe', role: 'Founder & CEO' },
  { img: '/images/team-member2.jpg', name: 'Jane Smith', role: 'Lead Designer' },
  { img: '/images/team-member3.jpg', name: 'Mike Johnson', role: 'Senior Developer' },
  { img: '/images/team-member4.jpg', name: 'Emily Davis', role: 'Project Manager' },
];

const values = [
  {
    title: 'Innovation',
    text: 'We embrace cutting-edge technologies to create unique digital experiences that stand out.',
  },
  {
    title: 'Integrity',
    text: 'Honesty and transparency are at the heart of our client relationships and internal culture.',
  },
  {
    title: 'Excellence',
    text: 'We strive for perfection in every project, delivering results that exceed expectations.',
  },
  {
    title: 'Collaboration',
    text: 'Teamwork and client partnership are key to achieving outstanding outcomes.',
  },
  {
    title: 'Sustainability',
    text: 'We prioritize eco-friendly practices in our digital solutions and operations.',
  },
];

const techItems = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'Blender',
  'Cinema 4D',
  'After Effects',
  'Premiere Pro',
  'Unreal Engine',
  'Figma',
  'Adobe Suite',
  'Google Ads',
  'SEO/SEM',
  'Tailwind',
  'Three.js',
  'Spline',
  'WordPress',
];

function About() {
  // Reveal animations for team members and value cards
  useEffect(() => {
    document.title = "About Us — FrameGen";
    const options = { threshold: 0.1, rootMargin: '0px 0px -80px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const elements = document.querySelectorAll('.about-reveal');
    elements.forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative z-10 mx-auto mt-[150px] w-[calc(100%-40px)] max-w-[1400px] text-white">
      {/* Hero */}
      <section
        aria-labelledby="services-hero-heading"  // change to about-hero-heading / contact-hero-heading / projects-heading depending on page
        className="about-banner relative mb-20 h-[400px] overflow-hidden rounded-[20px] border border-white/5 bg-center bg-cover bg-fixed shadow-[0_0_40px_rgba(123,97,255,0.08)] px-6 md:px-20"
        style={{ backgroundImage: "url('/images/about_hero.jpg')" }}
      >
        <div className="hero-brand">
          ABOUT
          <br />
          US
        </div>
      </section>

      {/* Skills & Experience */}
      <section
        aria-labelledby="skills-heading"
        className="mb-20 rounded-[20px] border border-white/5 bg-white/5 px-6 py-12 shadow-[0_0_40px_rgba(123,97,255,0.08)] backdrop-blur-[15px] md:px-20"
      >
        <h2 className="mb-2 text-[15px] text-[#aaaaaa]">Skills & Experience</h2>
        <h1
          id="skills-heading"
          className="mb-6 font-syne text-[40px] font-light leading-[1.06] md:text-[65px]"
        >
          Agency Expertise
        </h1>
        
        {/* Divider */}
        <div className="mb-8 h-[1px] bg-white/20"></div>
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-[15px] text-[#aaaaaa]">Achievements</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="about-reveal rounded-[10px] border border-white/10 bg-white/5 p-5">
                <div className="text-[24px] text-[#FFFFFF]">150+</div>
                <div className="text-[14px] text-[#cccccc]">Projects Completed</div>
              </div>
              <div className="about-reveal rounded-[10px] border border-white/10 bg-white/5 p-5">
                <div className="text-[24px] text-[#FFFFFF]">50+</div>
                <div className="text-[14px] text-[#cccccc]">Happy Clients</div>
              </div>
              <div className="about-reveal rounded-[10px] border border-white/10 bg-white/5 p-5">
                <div className="text-[24px] text-[#FFFFFF]">4</div>
                <div className="text-[14px] text-[#cccccc]">Years Experience</div>
              </div>
              <div className="about-reveal rounded-[10px] border border-white/10 bg-white/5 p-5">
                <div className="text-[24px] text-[#FFFFFF]">24/7</div>
                <div className="text-[14px] text-[#cccccc]">Passionate About Design</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-[15px] text-[#aaaaaa]">Our Specializations</h3>

            {/* UPDATED GRID with diverse skills */}
            <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* Dev */}
              <div className="about-reveal rounded-[10px] border border-white/10 bg-white/5 p-3 text-center">
                <div className="mx-auto mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl border bg-[#61DAFB]/10" style={{ borderColor: '#61DAFB40' }}>
                  <FaLaptopCode className="text-[22px] text-[#61DAFB]" />
                </div>
                <div className="text-[13px]">Development</div>
                <div className="text-[11px] text-[#cccccc]">React, Next.js, WebGL</div>
              </div>

              {/* 3D/CGI */}
              <div className="about-reveal rounded-[10px] border border-white/10 bg-white/5 p-3 text-center">
                <div className="mx-auto mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl border bg-[#FF4D8D]/10" style={{ borderColor: '#FF4D8D40' }}>
                  <FaCube className="text-[22px] text-[#FF4D8D]" />
                </div>
                <div className="text-[13px]">3D & CGI</div>
                <div className="text-[11px] text-[#cccccc]">Blender, Cinema 4D</div>
              </div>

              {/* Marketing */}
              <div className="about-reveal rounded-[10px] border border-white/10 bg-white/5 p-3 text-center">
                <div className="mx-auto mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl border bg-[#00F0FF]/10" style={{ borderColor: '#00F0FF40' }}>
                  <FaBullhorn className="text-[22px] text-[#00F0FF]" />
                </div>
                <div className="text-[13px]">Marketing</div>
                <div className="text-[11px] text-[#cccccc]">Google Ads, SEO</div>
              </div>

              {/* Design */}
              <div className="about-reveal rounded-[10px] border border-white/10 bg-white/5 p-3 text-center">
                <div className="mx-auto mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl border bg-[#A259FF]/10" style={{ borderColor: '#A259FF40' }}>
                  <FaPaintBrush className="text-[22px] text-[#A259FF]" />
                </div>
                <div className="text-[13px]">Fine Arts</div>
                <div className="text-[11px] text-[#cccccc]">Brand Identity, UI/UX</div>
              </div>

              {/* Motion */}
              <div className="about-reveal rounded-[10px] border border-white/10 bg-white/5 p-3 text-center">
                <div className="mx-auto mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl border bg-[#10B981]/10" style={{ borderColor: '#10B98140' }}>
                  <FaFilm className="text-[22px] text-[#10B981]" />
                </div>
                <div className="text-[13px]">Motion Graphics</div>
                <div className="text-[11px] text-[#cccccc]">After Effects</div>
              </div>

              {/* Strategy */}
              <div className="about-reveal rounded-[10px] border border-white/10 bg-white/5 p-3 text-center">
                <div className="mx-auto mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl border bg-[#F59E0B]/10" style={{ borderColor: '#F59E0B40' }}>
                  <FaPencilRuler className="text-[22px] text-[#F59E0B]" />
                </div>
                <div className="text-[13px]">Digital Strategy</div>
                <div className="text-[11px] text-[#cccccc]">Consulting & Growth</div>
              </div>
            </div>
          </div>

        </div>
        <h3 className="mb-2 text-[15px] text-[#aaaaaa]">Our Tech Stack</h3>
        <div className="flex flex-wrap gap-3">
          {techItems.map((item) => (
            <div
              key={item}
              className="about-reveal flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[14px] text-white shadow-[0_0_10px_rgba(123,97,255,0.12)] transition hover:text-[#7B61FF] hover:shadow-[0_0_20px_rgba(123,97,255,0.18)]"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Our Services */}
      <section
        aria-labelledby="services-heading"
        className="mb-20 rounded-[20px] border border-white/5 bg-white/5 px-6 py-12 shadow-[0_0_40px_rgba(123,97,255,0.08)] backdrop-blur-[15px] md:px-20"
      >
        <div className="mb-10 w-full md:max-w-[60%]">
          <h2 className="mb-2 text-[15px] text-[#aaaaaa]">What We Do</h2>
          <h1
            id="services-heading"
            className="mb-6 font-syne text-[40px] font-light leading-[1.06] md:text-[65px]"
          >
            Our Services
          </h1>
          <p className="about-description text-[14px] leading-[1.6] text-[#cccccc]">
            We are a multi-disciplinary studio providing a comprehensive range of creative and technical services to bring your brand's vision to life across all digital touchpoints.
          </p>
        </div>
        {/* Divider */}
        <div className="mb-8 h-[1px] bg-white/20"></div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="about-reveal rounded-[10px] border border-white/10 bg-white/5 p-6 text-left shadow-[0_0_20px_rgba(123,97,255,0.06)] transition hover:shadow-[0_0_30px_rgba(123,97,255,0.15)] hover:border-[#7B61FF]/30"
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-[#7B61FF]/10">
                <span className="text-[24px] text-[#7B61FF]">{service.icon}</span>
              </div>
              <h3 className="mb-3 text-[18px] font-medium text-white">{service.title}</h3>
              <p className="text-[14px] leading-[1.6] text-[#cccccc]">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section
        aria-labelledby="story-heading"
        className="mb-20 rounded-[20px] border border-white/5 bg-white/5 px-6 py-12 shadow-[0_0_40px_rgba(123,97,255,0.08)] backdrop-blur-[15px] md:px-20"
      >
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <h2 className="mb-2 text-[15px] text-[#aaaaaa]">Our Story</h2>
            <h1
              id="story-heading"
              className="mb-6 font-syne text-[40px] font-light leading-[1.06] md:text-[65px]"
            >
              From Vision
              <br />
              to Reality
            </h1>
            {/* Divider */}
            <div className="mb-8 h-[1px] bg-white/20"></div>
            <p className="about-description mb-6 text-[14px] leading-[1.6] text-[#cccccc]">
              FrameGen began as a group of innovative developers and
              designers, but we quickly realized that modern brands need more than just code. We've evolved into a 
              full-service creative agency, bridging the gap between high-end software development, 
              cinematic CGI, and high-conversion digital marketing. Today, we are a global partner 
              delivering end-to-end digital transformations that empower businesses to lead in their industries.
            </p>
          </div>
          <div className="about-reveal h-[300px] sm:h-[400px] w-full relative">
            <div className="h-full w-full rounded-[10px] border border-white/10 bg-white/5 overflow-hidden shadow-[0_0_30px_rgba(123,97,255,0.18)]">
              <img 
                src={storyImage} 
                alt="FrameGen Services" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      {/* <section
        aria-labelledby="team-heading"
        className="mb-20 rounded-[20px] border border-white/5 bg-white/5 px-6 py-12 shadow-[0_0_40px_rgba(123,97,255,0.08)] backdrop-blur-[15px] md:px-20"
      >
        <div className="mb-10 max-w-[60%] md:max-w-[60%]">
          <h2 className="mb-2 text-[15px] text-[#aaaaaa]">Our Team</h2>
          <h1
            id="team-heading"
            className="mb-6 font-syne text-[40px] font-light leading-[1.06] md:text-[65px]"
          >
            Meet the
            <br />
            Creators
          </h1>
          <p className="about-description text-[14px] leading-[1.6] text-[#cccccc]">
            Our diverse team of experts brings together skills in development, design, and strategy
            to deliver exceptional results.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="about-reveal flex flex-col items-center rounded-[10px] border border-white/10 bg-white/5 p-5 text-center shadow-[0_0_20px_rgba(123,97,255,0.06)] transition hover:shadow-[0_0_30px_rgba(123,97,255,0.12)]"
            >
              <img
                src={member.img}
                alt={member.name}
                className="mb-4 h-[150px] w-[150px] rounded-full object-cover"
              />
              <h3 className="mb-1 text-[20px] font-medium">{member.name}</h3>
              <p className="text-[14px] text-[#aaaaaa]">{member.role}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Our Values */}
      <section
        aria-labelledby="values-heading"
        className="mb-20 rounded-[20px] border border-white/5 bg-white/5 px-6 py-12 shadow-[0_0_40px_rgba(123,97,255,0.08)] backdrop-blur-[15px] md:px-20"
      >
        <div className="mb-10 w-full md:max-w-[60%]">
          <h2 className="mb-2 text-[15px] text-[#aaaaaa]">Our Values</h2>
          <h1
            id="values-heading"
            className="mb-6 font-syne text-[40px] font-light leading-[1.06] md:text-[65px]"
          >
            What Drives
            <br />
            Us Forward
          </h1>
          <p className="about-description text-[14px] leading-[1.6] text-[#cccccc]">
            At FrameGen, our core values guide everything we do, ensuring we deliver high-quality,
            ethical, and innovative solutions.
          </p>
        </div>
        {/* Divider */}
        <div className="mb-8 h-[1px] bg-white/20"></div>
        <div className="grid gap-5">
          {/* First row: 3 columns */}
          <div className="grid gap-5 md:grid-cols-3">
            {values.slice(0, 3).map((v) => (
              <div
                key={v.title}
                className="about-reveal rounded-[10px] border border-white/10 bg-white/5 p-5 text-left shadow-[0_0_20px_rgba(123,97,255,0.06)] transition hover:shadow-[0_0_20px_rgba(123,97,255,0.12)]"
              >
                <h3 className="mb-2 text-[18px] font-medium">{v.title}</h3>
                <p className="text-[14px] leading-[1.6] text-[#cccccc]">{v.text}</p>
              </div>
            ))}
          </div>

          {/* Second row: 2 columns */}
          <div className="grid gap-5 md:grid-cols-2">
            {values.slice(3).map((v) => (
              <div
                key={v.title}
                className="about-reveal rounded-[10px] border border-white/10 bg-white/5 p-5 text-left shadow-[0_0_20px_rgba(123,97,255,0.06)] transition hover:shadow-[0_0_20px_rgba(123,97,255,0.12)]"
              >
                <h3 className="mb-2 text-[18px] font-medium">{v.title}</h3>
                <p className="text-[14px] leading-[1.6] text-[#cccccc]">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;