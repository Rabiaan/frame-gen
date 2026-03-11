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
      content: "These Terms of Service ('Terms') govern your use of the FrameGen website and all website design, development, and related services we provide. By using our website, requesting a quote, or engaging FrameGen for services, you agree to be bound by these Terms."
    },
    {
      id: 2,
      title: "Services",
      icon: <Code className="w-5 h-5" />,
      content: "FrameGen provides services such as: website UI/UX design, website development, frontend and backend integration, and related digital services (collectively, the 'Services'). Specific project deliverables, timelines, and fees will be defined in proposals, order forms, or project agreements between you and FrameGen."
    },
    {
      id: 3,
      title: "Eligibility and Account",
      icon: <Users className="w-5 h-5" />,
      content: "You must be at least 18 years old and have the authority to enter into a binding agreement to use our Services. If you act on behalf of a company or organization, you represent that you are authorized to bind that entity to these Terms."
    },
    {
      id: 4,
      title: "Client Responsibilities",
      icon: <Briefcase className="w-5 h-5" />,
      content: "You agree to:",
      list: [
        "Provide accurate and complete information needed to scope and deliver the Services.",
        "Supply all required content (texts, images, logos, videos, branding assets) and confirm you have the necessary rights and permissions.",
        "Review and approve deliverables within reasonable timeframes so projects can progress.",
        "Keep any login credentials you share with us secure and only share them through agreed secure channels."
      ]
    },
    {
      id: 5,
      title: "Fees, Payment, and Taxes",
      icon: <DollarSign className="w-5 h-5" />,
      content: "Fees and payment terms are set out in the applicable proposal, invoice, or contract. Unless otherwise specified, fees exclude applicable taxes, which you are responsible for paying, and work may be paused for overdue payments."
    },
    {
      id: 6,
      title: "Scope Changes and Additional Work",
      icon: <Wrench className="w-5 h-5" />,
      content: "Changes in project requirements, additional features, or revisions beyond agreed rounds may require a change order, additional fees, and revised timelines. FrameGen will inform you of such changes and obtain your approval before proceeding with additional work."
    },
    {
      id: 7,
      title: "Intellectual Property",
      icon: <FileText className="w-5 h-5" />,
      content: "Unless otherwise agreed in writing:",
      list: [
        "Upon full payment of all outstanding amounts, you receive the rights or license described in your project agreement to use the final website and deliverables for your business.",
        "FrameGen retains ownership of pre‑existing tools, code libraries, components, designs, and know‑how used in delivering the Services.",
        "FrameGen may showcase non‑confidential parts of the project (for example screenshots, logos, or links) in its portfolio and marketing materials, unless you expressly request otherwise in writing."
      ]
    },
    {
      id: 8,
      title: "Third‑Party Services and Dependencies",
      icon: <Globe className="w-5 h-5" />,
      content: "Projects may rely on third‑party services or products such as hosting providers, domain registrars, CMS platforms, themes, plugins, analytics tools, or payment gateways. Your use of any third‑party services is subject to their own terms and privacy policies, and FrameGen is not responsible for their availability, security, or performance."
    },
    {
      id: 9,
      title: "Maintenance, Support, and Hosting",
      icon: <Terminal className="w-5 h-5" />,
      content: "Ongoing maintenance, support, content updates, or hosting are not automatically included in every project. Such services are only provided if explicitly included in the proposal or purchased under a separate maintenance/support plan, whose terms will define the exact scope."
    },
    {
      id: 10,
      title: "Acceptable Use",
      icon: <Scale className="w-5 h-5" />,
      content: "You agree not to use any website or deliverables created by FrameGen to:",
      list: [
        "Violate any applicable law or regulation.",
        "Distribute malware, spam, or malicious code.",
        "Infringe intellectual property or other rights of others.",
        "Host or promote illegal, hateful, or abusive content."
      ],
      note: "FrameGen may suspend or refuse Services where a project is used in ways that violate this clause or applicable law."
    },
    {
      id: 11,
      title: "Confidentiality",
      icon: <Lock className="w-5 h-5" />,
      content: "Each party must treat non‑public business, technical, or financial information received from the other as confidential and use it only to perform or receive the Services, except where disclosure is required by law."
    },
    {
      id: 12,
      title: "Disclaimers",
      icon: <Book className="w-5 h-5" />,
      content: "To the fullest extent permitted by law, the Services and deliverables are provided 'as is' and 'as available', without warranties of any kind, whether express or implied (including implied warranties of merchantability, fitness for a particular purpose, and non‑infringement). FrameGen does not guarantee that any website will be error‑free, uninterrupted, or achieve specific traffic, ranking, or revenue results."
    },
    {
      id: 13,
      title: "Limitation of Liability",
      icon: <Scale className="w-5 h-5" />,
      content: "To the maximum extent permitted by law, FrameGen' total liability for all claims arising out of or relating to these Terms or the Services will not exceed the total fees you paid to FrameGen for the specific project giving rise to the claim in the 12 months before the event. CodeHills will not be liable for any indirect, incidental, consequential, special, or punitive damages, or for loss of profits, revenue, data, or business opportunities."
    },
    {
      id: 14,
      title: "Indemnification",
      icon: <Shield className="w-5 h-5" />,
      content: "You agree to indemnify and hold harmless FrameGen, its owners, employees, and contractors from any claims, damages, or expenses arising from: (a) content you provide; (b) your misuse of the Services or deliverables; or (c) your breach of these Terms or applicable law."
    },
    {
      id: 15,
      title: "Term and Termination",
      icon: <Clock className="w-5 h-5" />,
      content: "These Terms apply from the moment you first use our website or engage our Services and continue until terminated according to this section. A project or contract may be terminated in accordance with its specific termination clause, or if not specified, by reasonable written notice; in all cases, you remain responsible for fees due for work already performed, and certain clauses (such as intellectual property, fees, limitations of liability, and indemnification) will survive termination."
    },
    {
      id: 16,
      title: "Governing Law and Jurisdiction",
      icon: <Globe className="w-5 h-5" />,
      content: "These Terms are governed by the laws of the Netherlands, without regard to conflict of law rules. Any disputes will be brought before the courts of Amsterdam, unless mandatory law specifies a different forum."
    },
    {
      id: 17,
      title: "Changes to These Terms",
      icon: <FileText className="w-5 h-5" />,
      content: "FrameGen may update these Terms from time to time; the latest version will be posted on this page with an updated 'Last updated' date. Continued use of the website or Services after changes become effective constitutes acceptance of the revised Terms."
    },
    {
      id: 18,
      title: "Contact",
      icon: <Mail className="w-5 h-5" />,
      content: "If you have questions about these Terms or our Services, you can contact FrameGen at contact@framegen.dev."
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
