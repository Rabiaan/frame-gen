import React, { useEffect, useRef } from 'react';
import '../styles/globals.css';
import { FileText, Mail, Shield, Scale, Clock, Globe, Book, Briefcase, CheckCircle, Users, Lock, DollarSign, Terminal, Code, Wrench } from 'lucide-react';

const TermsOfService = () => {
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

      const termsWords = ['TERMS', 'SERVICE', 'AGREEMENT', 'CONTRACT', 'LEGAL', 'POLICY', 'RULES', 'GUIDELINES', 'CONDITIONS', 'COMPLIANCE'];
      const letters = ['T', 'E', 'R', 'M', 'S', 'S', 'E', 'R', 'V', 'I', 'C', 'E', 'L', 'A', 'W', 'G', 'U', 'I', 'D', 'E'];

      const ground = Bodies.rectangle(canvas.width / 2, canvas.height + 200, canvas.width, 400, { isStatic: true });
      const leftWall = Bodies.rectangle(-200, canvas.height / 2, 400, canvas.height, { isStatic: true });
      const rightWall = Bodies.rectangle(canvas.width + 200, canvas.height / 2, 400, canvas.height, { isStatic: true });
      World.add(engine.world, [ground, leftWall, rightWall]);

      const fallingObjects = [];

      function createFallingLetter() {
        const x = Math.random() * canvas.width;
        const y = -300;
        const allTexts = [...letters, ...termsWords];
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
    { bg: '#A855F7', text: '#A855F7' },
    { bg: '#10B981', text: '#10B981' },
    { bg: '#3B82F6', text: '#3B82F6' },
  ];

  const sections = [
    {
      id: 1,
      title: "Introduction",
      icon: <FileText className="w-5 h-5" />,
      content: "These Terms of Service ('Terms') govern your use of the Frame Gen website at frame-gen.com and all services we provide. By visiting our website, submitting a quote request, or engaging Frame Gen for any services, you agree to be bound by these Terms. Please read them carefully before proceeding."
    },
    {
      id: 2,
      title: "About Us",
      icon: <Globe className="w-5 h-5" />,
      content: "Frame Gen ('we', 'us', 'our') is a full-service digital agency based in the United Kingdom. We provide website design and development, 3D and CGI visualisation, motion graphics and animation, brand identity, e-commerce solutions, and digital advertising services.",
      note: "Email: framegen.create@gmail.com | Website: frame-gen.com"
    },
    {
      id: 3,
      title: "Services",
      icon: <Briefcase className="w-5 h-5" />,
      content: "Frame Gen provides the following services (collectively, the 'Services'):",
      list: [
        "Website UI/UX design and development",
        "Frontend and backend development (React, Next.js, WordPress, CMS)",
        "E-commerce development (Shopify, WooCommerce)",
        "3D visualisation and CGI rendering",
        "Motion graphics and animation",
        "Brand identity and visual design",
        "Digital advertising and social media strategy"
      ],
      note: "Specific deliverables, timelines, and fees are defined in project agreements."
    },
    {
      id: 4,
      title: "Eligibility",
      icon: <Users className="w-5 h-5" />,
      content: "You must be at least 18 years old and have full legal authority to enter into a binding contract to use our Services. If you are acting on behalf of a company or organisation, you confirm that you are authorised to bind that entity to these Terms."
    },
    {
      id: 5,
      title: "Client Responsibilities",
      icon: <Terminal className="w-5 h-5" />,
      content: "To allow us to deliver your project effectively, you agree to:",
      list: [
        "Provide accurate, complete, and timely information required to scope and deliver the Services.",
        "Supply all required content (text, images, logos, etc.) and confirm ownership/rights.",
        "Review and provide feedback or approval within agreed timeframes.",
        "Keep any login credentials shared secure.",
        "Ensure the website or deliverables comply with applicable laws in your jurisdiction."
      ]
    },
    {
      id: 6,
      title: "Fees, Payment, and Taxes",
      icon: <DollarSign className="w-5 h-5" />,
      content: "Fees and payment schedules are set out in the applicable proposal or invoice. Unless otherwise stated:",
      list: [
        "A deposit (typically 50%) is required before work commences.",
        "Invoices are due within 14 days of the invoice date.",
        "Frame Gen reserves the right to pause work on unpaid projects.",
        "All fees quoted are exclusive of VAT or applicable taxes.",
        "Refunds are not available once work has commenced."
      ]
    },
    {
      id: 7,
      title: "Scope Changes and Additional Work",
      icon: <Wrench className="w-5 h-5" />,
      content: "Changes in project requirements, additional features, or revisions beyond agreed rounds may require additional fees and revised timelines. Frame Gen will notify you of such changes and obtain approval via email or change order before proceeding."
    },
    {
      id: 8,
      title: "Intellectual Property",
      icon: <Shield className="w-5 h-5" />,
      content: "Unless otherwise agreed in writing:",
      list: [
        "Upon full payment, you are granted the license to use the final deliverables for your business.",
        "Frame Gen retains ownership of pre-existing tools, code frameworks, and methodologies.",
        "Third-party assets (fonts, plugins, etc.) remain subject to their own licenses.",
        "Frame Gen reserves the right to display non-confidential elements in its portfolio."
      ]
    },
    {
      id: 9,
      title: "Confidentiality",
      icon: <Lock className="w-5 h-5" />,
      content: "Both parties agree to keep confidential any non-public business, technical, or financial information disclosed in connection with the Services. This obligation survives termination of these Terms."
    },
    {
      id: 10,
      title: "Third-Party Services and Platforms",
      icon: <Globe className="w-5 h-5" />,
      content: "Your project may integrate with third-party services (hosting, domain, Shopify, WordPress, etc.). Your use of these services is governed by the provider's own terms. Frame Gen is not responsible for their availability, security, or performance."
    },
    {
      id: 11,
      title: "Maintenance, Support, and Hosting",
      icon: <Book className="w-5 h-5" />,
      content: "Ongoing maintenance, support, and hosting are not included in a one-time project fee unless explicitly stated. Such services are available under a separate maintenance or retainer agreement."
    },
    {
      id: 12,
      title: "Acceptable Use",
      icon: <Scale className="w-5 h-5" />,
      content: "You agree not to use any deliverables to violate laws, distribute malware, infringe rights, or host illegal content. Frame Gen may suspend services for violations of this clause."
    },
    {
      id: 13,
      title: "Disclaimers",
      icon: <Scale className="w-5 h-5" />,
      content: "Services and deliverables are provided 'as is' and 'as available' without warranties of any kind. Frame Gen does not guarantee that any website will be error-free or achieve specific ranking or revenue results."
    },
    {
      id: 14,
      title: "Limitation of Liability",
      icon: <Scale className="w-5 h-5" />,
      content: "To the maximum extent permitted by law, Frame Gen's total liability will not exceed the total fees paid by you for the specific project in the 12 months preceding the claim.",
      note: "Frame Gen is not liable for indirect, incidental, or consequential damages."
    },
    {
      id: 15,
      title: "Indemnification",
      icon: <Shield className="w-5 h-5" />,
      content: "You agree to indemnify Frame Gen from claims arising from content you provide, misuse of services, or breach of these Terms."
    },
    {
      id: 16,
      title: "Term and Termination",
      icon: <Clock className="w-5 h-5" />,
      content: "Either party may terminate by providing reasonable written notice. You remain liable for fees due for work completed up to the date of termination.",
      note: "Certain clauses (IP, Confidentiality, Liability, etc.) survive termination."
    },
    {
      id: 17,
      title: "Governing Law and Jurisdiction",
      icon: <Globe className="w-5 h-5" />,
      content: "These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales."
    },
    {
      id: 18,
      title: "Changes to These Terms",
      icon: <FileText className="w-5 h-5" />,
      content: "Frame Gen may update these Terms from time to time. Continued use of our website or Services after changes constitutes your acceptance of the updated Terms."
    },
    {
      id: 19,
      title: "Contact",
      icon: <Mail className="w-5 h-5" />,
      content: "For any questions or concerns about these Terms, please contact Frame Gen at framegen.create@gmail.com."
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

        {/* HERO SECTION - Same as Privacy Policy */}
        <section aria-labelledby="terms-hero-heading" className="terms-hero">
          <div className="hero-brand text-start">
            TERMS OF 
            <br />
            SERVICE
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

export default TermsOfService;
