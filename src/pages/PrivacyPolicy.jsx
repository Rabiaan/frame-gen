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
      content: "Frame Gen ('we', 'us', 'our') is a full-service digital agency based in the United Kingdom, operating at frame-gen.com. We provide website design and development, 3D and CGI visualisation, motion graphics and animation, brand identity, e-commerce solutions, and digital advertising services to clients across the UK, USA, and internationally. This Privacy Policy explains how we collect, use, store, and protect your personal data when you visit our website or engage us for services."
    },
    {
      id: 2,
      title: "Data Controller",
      icon: <Mail className="w-5 h-5" />,
      content: "Frame Gen is the data controller for all personal data processed through this website and in connection with our services.",
      note: "Email: framegen.create@gmail.com | Website: frame-gen.com"
    },
    {
      id: 3,
      title: "Information We Collect",
      icon: <Eye className="w-5 h-5" />,
      content: "We may collect the following personal information:",
      list: [
        "Contact details: name, email address, phone number, company name, and job title.",
        "Project and account information: project requirements, briefs, content you provide, and login credentials you share solely for the purpose of development or design work.",
        "Technical data: browser type, device type, pages viewed, access times, IP address, and referring URLs, collected automatically when you visit our website.",
        "Billing and payment details: billing name, billing address, and limited payment information processed via our payment provider. We do not store full card details."
      ]
    },
    {
      id: 4,
      title: "How We Collect Information",
      icon: <Users className="w-5 h-5" />,
      content: "We collect information you provide directly — for example, when you fill in our contact or quote request form, send us an email, engage us via our website chat, or during project onboarding and discovery calls. Technical data is collected automatically through our website."
    },
    {
      id: 5,
      title: "Legal Bases for Processing",
      icon: <CheckCircle className="w-5 h-5" />,
      content: "We process your personal data under the following lawful bases as defined under UK GDPR and EU GDPR (Regulation 2016/679):",
      list: [
        "Contract: To take steps at your request before entering into a contract and to perform our contractual obligations to you.",
        "Legitimate interests: To operate, improve, and secure our services and communicate with prospects and clients in the normal course of business.",
        "Legal obligation: To comply with applicable laws, including HMRC tax and financial record-keeping requirements.",
        "Consent: For marketing communications, where you have opted in. You may withdraw consent at any time."
      ]
    },
    {
      id: 6,
      title: "How We Use Your Information",
      icon: <Lock className="w-5 h-5" />,
      content: "We use your personal data to:",
      list: [
        "Provide, manage, and deliver our services including web development, branding, 3D visualisation, motion graphics, e-commerce, and digital advertising.",
        "Communicate with you about proposals, project timelines, revisions, and ongoing support.",
        "Process invoices and payments.",
        "Improve our website, services, and user experience.",
        "Send you occasional updates or marketing communications where you have opted in or where permitted by law.",
        "Comply with legal and regulatory obligations."
      ]
    },
    {
      id: 7,
      title: "Cookies and Tracking Technologies",
      icon: <Globe className="w-5 h-5" />,
      content: "Our website may use cookies and similar technologies to remember preferences, analyse traffic, and improve performance. Where required by law, we will request your consent before placing non-essential cookies. You can manage or disable cookies at any time through your browser settings. Disabling non-essential cookies will not affect your ability to browse our website, though some features may be limited."
    },
    {
      id: 8,
      title: "Sharing of Information",
      icon: <Users className="w-5 h-5" />,
      content: "We do not sell your personal data. We may share your information only with:",
      list: [
        "Service providers that support our business operations, including web hosting providers, cloud storage, project management tools, email delivery services, and payment processors (such as Stripe). These providers are bound by data processing agreements and may only use your data to provide services to us.",
        "Professional advisers such as accountants or legal counsel, where reasonably necessary.",
        "Authorities or regulators where required by law, court order, or to protect the rights and security of Frame Gen or others."
      ]
    },
    {
      id: 9,
      title: "International Data Transfers",
      icon: <Globe className="w-5 h-5" />,
      content: "Frame Gen operates from the UK and uses third-party tools and service providers that may process data outside the UK or European Economic Area, including in the United States (for example, via Google Workspace or Stripe). Where such transfers occur, we ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) approved by the UK ICO or the European Commission, or transfers to countries recognised as providing adequate protection."
    },
    {
      id: 10,
      title: "Data Retention",
      icon: <Clock className="w-5 h-5" />,
      content: "We retain personal data only for as long as necessary for the purposes described in this Policy. As a general guide:",
      list: [
        "Client project files and correspondence are retained for a minimum of 3 years after project completion.",
        "Billing records and financial data are retained for 7 years in compliance with HMRC requirements.",
        "Enquiries that did not result in a project are retained for up to 12 months."
      ],
      note: "When data is no longer required, it is securely deleted or anonymised."
    },
    {
      id: 11,
      title: "Your Rights",
      icon: <Shield className="w-5 h-5" />,
      content: "Depending on your location, you may have the right to:",
      list: [
        "Access the personal data we hold about you.",
        "Request correction of inaccurate or incomplete data.",
        "Request deletion of your data ('right to be forgotten').",
        "Restrict or object to certain types of processing.",
        "Request portability of your data in a structured, machine-readable format.",
        "Withdraw consent at any time where processing is based on consent."
      ],
      note: "To exercise any of these rights, contact us at framegen.create@gmail.com. We will respond within 30 days."
    },
    {
      id: 12,
      title: "Security",
      icon: <Lock className="w-5 h-5" />,
      content: "We use appropriate technical and organisational measures to protect your personal information against unauthorised access, loss, misuse, or alteration. These include access controls, encrypted communications, and secure cloud storage. No online transmission or storage system is completely secure, and we cannot guarantee absolute security."
    },
    {
      id: 13,
      title: "Third-Party Links",
      icon: <Globe className="w-5 h-5" />,
      content: "Our website may contain links to third-party websites, tools, or platforms. This Privacy Policy does not apply to those third parties. We encourage you to review their privacy policies before submitting any personal information."
    },
    {
      id: 14,
      title: "Children's Privacy",
      icon: <Users className="w-5 h-5" />,
      content: "Our services are intended for business clients and are not directed to individuals under the age of 16. We do not knowingly collect personal data from children. If we become aware that we have collected data from a child, we will delete it promptly."
    },
    {
      id: 15,
      title: "Changes to This Policy",
      icon: <FileText className="w-5 h-5" />,
      content: "We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, or legal requirements. The 'Last updated' date at the top of this page will reflect the most recent version. Continued use of our website or services after any changes constitutes acceptance of the updated Policy. For significant changes, we will notify active clients directly."
    },
    {
      id: 16,
      title: "Contact Us",
      icon: <Mail className="w-5 h-5" />,
      content: "For any questions, requests, or complaints about this Privacy Policy or how we handle your data, please contact Frame Gen at framegen.create@gmail.com."
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