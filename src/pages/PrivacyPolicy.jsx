import React, { useEffect, useRef } from 'react';
import '../styles/globals.css';
import { Shield, Mail, Lock, Eye, FileText, Users, Globe, Clock, CheckCircle } from 'lucide-react';

const PrivacyPolicy = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js';
    script.onload = () => {
      initMatter();
    };
    document.head.appendChild(script);

    function initMatter() {
      const Matter = window.Matter;
      const Engine = Matter.Engine;
      const World = Matter.World;
      const Bodies = Matter.Bodies;
      const Mouse = Matter.Mouse;
      const MouseConstraint = Matter.MouseConstraint;

      const engine = Engine.create();
      engine.world.gravity.y = 0.3;

      const privacyWords = ['PRIVACY', 'SECURE',  'WEB', 'SAFE', 'ENCRYPT', 'COOKIE','DATA', 'LEGAL', 'POLICY'];
      const letters = ['P', 'R', 'I', 'V', 'A', 'C', 'Y', 'S', 'E', 'C', 'U', 'R', 'E', 'D', 'T', 'G', 'L', 'K'];

      const ground = Bodies.rectangle(canvas.width / 2, canvas.height + 200, canvas.width, 400, { isStatic: true });
      const leftWall = Bodies.rectangle(-200, canvas.height / 2, 400, canvas.height, { isStatic: true });
      const rightWall = Bodies.rectangle(canvas.width + 200, canvas.height / 2, 400, canvas.height, { isStatic: true });
      World.add(engine.world, [ground, leftWall, rightWall]);

      const fallingObjects = [];

      function createFallingLetter() {
        const x = Math.random() * canvas.width;
        const y = -300;
        const allTexts = [...letters, ...privacyWords];
        const text = allTexts[Math.floor(Math.random() * allTexts.length)];
        const fontSize = Math.random() * 10 + 200;
        const letterWidth = text.length * fontSize * 0.6;
        const letterHeight = fontSize;

        const body = Bodies.rectangle(x, y, letterWidth, letterHeight, {
          frictionAir: 0.01,
          restitution: 0.3,
          density: 0.0005,
          angle: (Math.random() - 0.5) * 0.5,
        });

        body.text = text;
        body.fontSize = fontSize;
        body.opacity = Math.random() * 0.3 + 0.1;
        body.color = `rgba(${100 + Math.random() * 100}, ${100 + Math.random() * 100}, ${120 + Math.random() * 135}, ${body.opacity})`;

        World.add(engine.world, body);
        fallingObjects.push(body);
      }

      const mouse = Mouse.create(canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false }
        }
      });
      World.add(engine.world, mouseConstraint);
      mouse.element = canvas;

      const applyMagnetForce = (e) => {
        const rect = canvas.getBoundingClientRect();
        let mx, my;

        if (e.touches) {
          const t = e.touches[0];
          mx = t.clientX - rect.left;
          my = t.clientY - rect.top;
        } else {
          mx = e.clientX - rect.left;
          my = e.clientY - rect.top;
        }

        fallingObjects.forEach(body => {
          const dx = body.position.x - mx;
          const dy = body.position.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 250 && dist > 0) {
            const forceMagnitude = 0.000003 * body.mass;
            Matter.Body.applyForce(body, body.position, {
              x: -dx * forceMagnitude,
              y: -dy * forceMagnitude
            });
          }
        });
      };

      canvas.addEventListener('mousemove', applyMagnetForce);
      canvas.addEventListener('touchmove', applyMagnetForce, { passive: true });

      function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        fallingObjects.forEach((body, index) => {
          if (body.position.y > canvas.height + 500) {
            World.remove(engine.world, body);
            fallingObjects.splice(index, 1);
            return;
          }

          ctx.save();
          ctx.translate(body.position.x, body.position.y);
          ctx.rotate(body.angle);
          ctx.font = `700 ${body.fontSize}px Inter, sans-serif`;
          ctx.fillStyle = body.color;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.shadowColor = body.color;
          ctx.shadowBlur = 20;
          ctx.fillText(body.text, 0, 0);
          ctx.restore();
        });
      }

      function animate() {
        Engine.update(engine, 1000 / 60);
        render();
        requestAnimationFrame(animate);
      }

      setInterval(createFallingLetter, 2000);
      for (let i = 0; i < 3; i++) {
        setTimeout(createFallingLetter, i * 800);
      }

      animate();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const sectionColors = [
    { bg: '#3B82F6', text: '#3B82F6' },
    { bg: '#A855F7', text: '#A855F7' },
    { bg: '#10B981', text: '#10B981' },
    { bg: '#F59E0B', text: '#F59E0B' },
    { bg: '#EF4444', text: '#EF4444' },
    { bg: '#3B82F6', text: '#3B82F6' },
    { bg: '#A855F7', text: '#A855F7' },
    { bg: '#10B981', text: '#10B981' },
    { bg: '#F59E0B', text: '#F59E0B' },
    { bg: '#EF4444', text: '#EF4444' },
    { bg: '#3B82F6', text: '#3B82F6' },
    { bg: '#A855F7', text: '#A855F7' },
    { bg: '#10B981', text: '#10B981' },
    { bg: '#F59E0B', text: '#F59E0B' },
    { bg: '#EF4444', text: '#EF4444' },
    { bg: '#3B82F6', text: '#3B82F6' },
  ];

  const sections = [
    {
      id: 1,
      title: "Introduction",
      icon: <FileText className="w-5 h-5" />,
      content: "FrameGen provides website design and development and related digital services. This Privacy Policy explains how we collect, use, disclose, and safeguard personal information when you visit our website or work with us as a client."
    },
    {
      id: 2,
      title: "Data Controller and Contact",
      icon: <Mail className="w-5 h-5" />,
      content: "FrameGen is the data controller for personal data processed through this website and in connection with our services. For any questions about this Policy or your rights, contact us at: framegen.dev@gmail.com."
    },
    {
      id: 3,
      title: "Information We Collect",
      icon: <Eye className="w-5 h-5" />,
      content: "We may collect the following categories of personal information when you contact us, request a quote, or use our services:",
      list: [
        "Contact details: name, email address, phone number, company name, role.",
        "Project and account information: project requirements, content you provide, login details you share for development work.",
        "Technical data: Browser type, device identifiers, pages viewed, access times, and referring URLs.",
        "Billing details: billing name, address, fax number, limited payment information"
      ]
    },
    {
      id: 4,
      title: "How We Collect Information",
      icon: <Users className="w-5 h-5" />,
      content: "We collect information that you provide directly (for example via contact forms, email, chat, or during discovery and onboarding). We also collect certain info via FrameGen form that you fill on the contact page"
    },
    {
      id: 5,
      title: "Legal Bases for Processing",
      icon: <CheckCircle className="w-5 h-5" />,
      content: "We process your personal data based on:",
      list: [
        "Banking Information according to our company privacy policy/requirment",
        "Performance of a contract or to take steps at your request before entering into a contract.",
        "Our legitimate interests in operating, improving, and securing our services.",
        "Your consent, such as for certain marketing",
        "Legal obligations, such as Banking Taxation laws tax and accounting rules."
      ]
    },
    {
      id: 6,
      title: "How We Use Personal Information",
      icon: <Lock className="w-5 h-5" />,
      content: "We use your information to:",
      list: [
        "Provide, manage, and deliver website development and related services.",
        "Communicate about proposals, timelines, revisions, and support.",
        "Process invoices and payments.",
        "Improve our website, services, and user experience.",
        "Send occasional updates or marketing if you have opted in or if permitted by law (you can opt out at any time).",
        "Comply with legal and regulatory requirements."
      ]
    },
    {
      id: 7,
      title: "Cookies and Similar Technologies",
      icon: <Globe className="w-5 h-5" />,
      content: "Our website may use cookies and similar technologies to remember preferences, analyze traffic, and improve performance. Where required, you can manage cookie preferences via your browser settings or any cookie banner we provide, and you may disable non‑essential cookies, which could affect some site features."
    },
    {
      id: 8,
      title: "Sharing of Information",
      icon: <Users className="w-5 h-5" />,
      content: "We may share personal information with:",
      list: [
        "Service providers that help us operate our business (hosting, analytics, email delivery, project management, payment processors).",
        "Professional advisers (such as lawyers and accountants) where reasonably necessary.",
        "Authorities, regulators, or other third parties when required by law or to protect our rights, security, or users."
      ],
      note: "FrameGen does not sell personal information."
    },
    {
      id: 9,
      title: "International Data Transfers",
      icon: <Globe className="w-5 h-5" />,
      content: "If personal data is transferred outside your country or the European Economic Area/UK, we use appropriate safeguards such as standard contractual clauses or transfer to countries recognized as providing adequate protection."
    },
    {
      id: 10,
      title: "Data Retention",
      icon: <Clock className="w-5 h-5" />,
      content: "We keep personal data only for as long as necessary for the purposes described in this Policy, including to meet legal, accounting, or reporting requirements. Retention periods may vary, for example project and billing records are commonly kept for several years under tax law. According to Domain & Hosting Company Policy"
    },
    {
      id: 11,
      title: "Your Rights",
      icon: <Shield className="w-5 h-5" />,
      content: "Depending on your location, you may have the right to request:",
      list: [
        "Access to your personal data.",
        "Correction of inaccurate or incomplete data.",
        "Deletion of your data.",
        "Restriction or objection to certain processing.",
        "Data portability.",
        "Withdrawal of consent where processing is based on consent."
      ],
      note: "To exercise these rights, contact us using the details above."
    },
    {
      id: 12,
      title: "Security",
      icon: <Lock className="w-5 h-5" />,
      content: "We use reasonable technical and organizational measures to protect personal information against unauthorized access, loss, misuse, or alteration. No online transmission or storage system is completely secure, so we cannot guarantee absolute security."
    },
    {
      id: 13,
      title: "Third‑Party Links",
      icon: <Globe className="w-5 h-5" />,
      content: "Our website may contain links to third‑party websites, tools, or services. This Privacy Policy does not apply to those third parties, and you should review their privacy policies before providing information."
    },
    {
      id: 14,
      title: "Children's Privacy",
      icon: <Users className="w-5 h-5" />,
      content: "Our services are intended for business users and are not directed to children under 16. We do not knowingly collect personal information from children, and will delete such data if we become aware of it."
    },
    {
      id: 15,
      title: "Changes to This Privacy Policy",
      icon: <FileText className="w-5 h-5" />,
      content: "We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, or legal requirements. The \"Last updated\" date will indicate the latest version, and continued use of our website or services after changes means you accept the updated Policy."
    },
    {
      id: 16,
      title: "Contact Us",
      icon: <Mail className="w-5 h-5" />,
      content: "For questions, requests, or complaints about this Privacy Policy or our data practices, you can contact FrameGen at contact@framegen.dev."
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white antialiased overflow-x-hidden">
      {/* Interactive Physics Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      <div className="relative" style={{ zIndex: 10 }}>

        {/* HERO SECTION - Now with proper top margin and constrained width */}
        <section aria-labelledby="privacy-hero-heading" className="privacy-hero">

          <div className="hero-brand text-start">
            PRIVACY
            <br />
            POLICY
          </div>
        </section>

        {/* Main Content */}
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-5 lg:pt-16 lg:pb-4">
          <div className="space-y-8">
            {sections.map((section, index) => {
              const color = sectionColors[index] || sectionColors[0];

              return (
                <div
                  key={section.id}
                  className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 lg:p-8 hover:bg-zinc-900/50 hover:border-zinc-700/50 transition-all duration-300"
                  style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`, opacity: 0 }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                      style={{ 
                        backgroundColor: `${color.bg}15`,
                        border: `2px solid ${color.bg}40`,
                        color: color.text
                      }}
                    >
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl lg:text-2xl font-bold text-white mb-3">
                        {section.id}. {section.title}
                      </h2>
                      <p className="text-zinc-300 leading-relaxed mb-4">
                        {section.content}
                      </p>
                      {section.list && (
                        <ul className="space-y-2 ml-4">
                          {section.list.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-zinc-300">
                              <div 
                                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                style={{ backgroundColor: color.text }}
                              ></div>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.note && (
                        <div 
                          className="mt-4 text-zinc-400 italic rounded-lg p-3 border-l-2"
                          style={{ 
                            backgroundColor: `${color.bg}10`,
                            borderLeftColor: color.text
                          }}
                        >
                          {section.note}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Copyright Section */}
          <div className="mt-16 pt-7 border-t border-zinc-800/50">
            <div className="text-center">
              <p className="text-sm text-zinc-400">
                © {new Date().getFullYear()} FrameGen. All rights reserved.
                <span className="mx-2">|</span>
                <a 
                  href="/privacy" 
                  className="transition hover:text-[#cccccc] hover:underline"
                >
                  Privacy Policy
                </a>
                <span className="mx-2">|</span>
                <a 
                  href="/terms" 
                  className="transition hover:text-[#cccccc] hover:underline"
                >
                  Terms of Service
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-brand {
          font-size: clamp(80px, 15vw, 200px);
          font-weight: 900;
          line-height: 0.85;
          letter-spacing: -0.05em;
          background: linear-gradient(to bottom, #ffffff, #a0a0a0);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;