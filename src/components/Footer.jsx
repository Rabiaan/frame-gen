import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      {/* Main Footer Content */}
      <div className="mx-auto mt-20 mb-8 grid w-[calc(100%-40px)] max-w-[1400px] grid-cols-1 gap-8 border-t border-white/5 px-5 pt-10 pb-12 text-sm text-white sm:w-[calc(100%-80px)] md:grid-cols-3 md:px-10 lg:w-[calc(100%-200px)]">
        
        {/* Solutions We Offer */}
        <div className="space-y-3 text-center md:text-left">
          <h3 className="text-[16px] font-medium text-[#cccccc] sm:text-[18px]">Solutions We Offer</h3>
          <ul className="space-y-1 text-[#999999]">
            <li className="text-[14px] sm:text-base">Web Applications</li>
            <li className="text-[14px] sm:text-base">WordPress & CMS</li>
            <li className="text-[14px] sm:text-base">E-commerce Solutions</li>
            <li className="text-[14px] sm:text-base">3D & CGI Visualization</li>
            <li className="text-[14px] sm:text-base">Motion Graphics</li>
            <li className="text-[14px] sm:text-base">Brand Identity</li>
          </ul>
        </div>

        {/* Pages */}
        <div className="space-y-3 text-center md:text-left">
          <h3 className="text-[16px] font-medium text-[#cccccc] sm:text-[18px]">Pages</h3>
          <ul className="mx-auto flex flex-wrap justify-center gap-2 md:mx-0 md:justify-start">
            {["Home", "About", "Services", "Blog", "Website Development", "Digital Marketing", "Contact"].map((page) => (
              <li
                key={page}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[12px] text-[#999999] backdrop-blur sm:text-[14px]"
              >
                <Link
                  to={page === "Home" ? "/" : page === "Website Development" ? "/projects/website-development" : page === "Digital Marketing" ? "/projects/digital-marketing" : `/${page.toLowerCase()}`}
                  className="flex justify-center text-[#dddddd] transition hover:text-[#7B61FF]"
                >
                  {page}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect With Us */}
        <div className="space-y-3 text-center md:text-left">
          <h3 className="text-[16px] font-medium text-[#cccccc] sm:text-[18px]">Connect With Us</h3>
          <div className="flex justify-center gap-3 md:justify-start">
            <a
              href="#"
              className="footer-icon flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white backdrop-blur transition hover:scale-110 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] sm:h-12 sm:w-12 sm:p-3"
            >
              <FaGithub className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" />
            </a>

            <a
              href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile"
              className="footer-icon flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white backdrop-blur transition hover:scale-110 hover:border-[#0A66C2] hover:shadow-[0_0_20px_rgba(10,102,194,0.4)] sm:h-12 sm:w-12 sm:p-3"
            >
              <FaLinkedin className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" />
            </a>

            <a
              href="mailto:framegen.create@gmail.com"
              className="footer-icon flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white backdrop-blur transition hover:scale-110 hover:border-[#ff4444] hover:shadow-[0_0_20px_rgba(255,68,68,0.4)] sm:h-12 sm:w-12 sm:p-3"
            >
              <FaEnvelope className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" />
            </a>

            {/* <a
              href="#"
              className="footer-icon flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white backdrop-blur transition hover:scale-110 hover:border-[#1DA1F2] hover:shadow-[0_0_20px_rgba(29,161,242,0.4)] sm:h-12 sm:w-12 sm:p-3"
            >
              <FaTwitter className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" />
            </a> */}
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mx-auto w-[calc(100%-40px)] max-w-[1400px] border-t border-white/10 px-5 py-4 text-center sm:w-[calc(100%-80px)] md:px-10 lg:w-[calc(100%-200px)]">
        <p className="text-xs text-[#999999] sm:text-sm">
          © {currentYear} FrameGen. All rights reserved. 
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
    </footer>
  );
}

export default Footer;