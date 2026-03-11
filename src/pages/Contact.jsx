import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  // Reveal animation
  useEffect(() => {
    document.title = "Contact Us — FrameGen";
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );

    document.querySelectorAll('.contact-reveal').forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');

    emailjs
      .send(
        'service_g10k4dj',
        'template_x67c4vk',
        {
          from_name: formData.name,
          from_email: formData.email,
          service: formData.service,
          message: formData.message,
        },
        '1OgObupeDD-OMkFfU'
      )
      .then(() => {
        setStatus('Message sent successfully');
        setFormData({ name: '', email: '', service: '', message: '' });
      })
      .catch(() => {
        setStatus('Something went wrong..  Please try again.');
      });
  };

  return (
    <div className="relative z-10 mx-auto mt-[150px] w-[calc(100%-40px)] max-w-[1400px] text-white">
      {/* Hero */}
      <section
        aria-labelledby="services-hero-heading"  // change to about-hero-heading / contact-hero-heading / projects-heading depending on page
        className="about-banner relative mb-20 h-[400px] overflow-hidden rounded-[20px] border border-white/5 bg-center bg-cover bg-fixed shadow-[0_0_40px_rgba(123,97,255,0.08)] px-6 md:px-20"
        style={{ backgroundImage: "url('/images/contact-banner.jpg')" }}
      >
        <div className="hero-brand">
          CONTACT
          <br />
          US
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-section mb-10 grid gap-10 rounded-[20px] border border-white/5 bg-white/5 px-6 py-12 shadow-[0_0_40px_rgba(123,97,255,0.08)] backdrop-blur-[15px] md:grid-cols-[1.4fr_1fr] md:px-20">

        {/* LEFT: CONTACT FORM */}
        <form
          onSubmit={handleSubmit}
          className="contact-reveal contact-form rounded-[22px] border border-white/10 bg-white/5 p-8 shadow-[0_0_40px_rgba(123,97,255,0.12)] backdrop-blur-[12px]"
        >
          <h2 className="mb-2 font-syne text-[32px] font-semibold md:text-[38px]">
            Let's Build
            <br />
            Together
          </h2>

          <p className="mb-6 text-[15px] text-[#bbbbbb]">
            We just need a few details to bring your vision live.
          </p>

          <div className="mb-8 h-[1px] bg-white/20"></div>

          <div className="form-group mb-4">
            <label>Your Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label>Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label>What Are You Looking For?</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">Select one</option>
              <option>Ecommerce</option>
              <option>UI/UX Design</option>
              <option>Blogs</option>
              <option>WordPress Website</option>
              <option>Front-End Development</option>
              <option>Web Applications</option>
            </select>
          </div>

          <div className="form-group mb-4">
            <label>Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn mt-8">
            Send Message
          </button>

          {status && (
            <p className="mt-4 text-sm text-[#7B61FF]">{status}</p>
          )}
        </form>

        {/* RIGHT: CONTACT INFO BOX (RESTORED) */}
        <div className="contact-reveal contact-info-box rounded-[22px] border border-white/10 bg-white/5 p-8 shadow-[0_0_40px_rgba(123,97,255,0.12)] backdrop-blur-[12px]">

          <h3 className="mb-3 text-[32px] font-syne">Reach Us Directly</h3>

          <p className="mb-6 text-[15px] text-[#bbbbbb] leading-[1.7]">
            Prefer a direct conversation? No problem. Contact us through our E-mail below.
          </p>

          <div className="space-y-3 text-[15px]">
            <div>
              <span className="text-[#7B61FF]">Email:</span> framegen.dev@gmail.com
            </div>
          </div>

          <p className="mt-6 text-[15px] text-[#bbbbbb]">
            We reply quickly, usually in a few hours.
          </p>

          {/* WHY US */}
          <div className="mt-8">
            <h3 className="mb-2 text-[32px] font-syne">Why Us</h3>
            <p className="mb-3 text-[16px] text-[#cccccc]">
              Why our services are better than others?
            </p>

            <ul className="space-y-2 text-[15px]">
              {[
                'Quality Comes First',
                'Flexible Cooperation',
                'On-time Delivery',
                'Transparent Costs',
                'Qualified Developers',
                'Quick Scale-up',
              ].map((item) => (
                <li key={item} className="relative pl-5">
                  <span className="absolute left-0 text-[#7B61FF]">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
