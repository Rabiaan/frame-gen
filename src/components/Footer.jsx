import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaEnvelope, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

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
             <li className="text-[13px] sm:text-[14px]">Web Applications</li>
             <li className="text-[13px] sm:text-[14px]">WordPress & CMS</li>
             <li className="text-[13px] sm:text-[14px]">E-commerce Solutions</li>
             <li className="text-[13px] sm:text-[14px]">3D & CGI Visualization</li>
             <li className="text-[13px] sm:text-[14px]">Motion Graphics</li>
             <li className="text-[13px] sm:text-[14px]">Brand Identity</li>
           </ul>
        </div>

        {/* Pages */}
        <div className="space-y-3 text-center md:text-left">
          <h3 className="text-[16px] font-medium text-[#cccccc] sm:text-[18px]">Pages</h3>
           <ul className="flex flex-wrap gap-2 md:mx-0 md:justify-start justify-start">
             {["Home", "About", "Services", "Blog", "Website Development", "Digital Marketing", "Contact"].map((page) => (
               <li
                 key={page}
                 className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] text-[#999999] backdrop-blur sm:text-[12px]"
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
           <div className="flex flex-col gap-4 items-start md:items-start">
             <a
               href="https://www.linkedin.com/company/framegen"
               target="_blank"
               rel="noopener noreferrer"
               className="footer-link flex items-center gap-3 text-[#dddddd] transition hover:text-white hover:underline decoration-white underline-offset-4"
             >
               <FaLinkedin className="h-5 w-5" />
               <span className="text-[13px] sm:text-[14px]">LinkedIn</span>
             </a>

             <a
               href="https://www.instagram.com/frame_gen_/"
               target="_blank"
               rel="noopener noreferrer"
               className="footer-link flex items-center gap-3 text-[#dddddd] transition hover:text-white hover:underline decoration-white underline-offset-4"
             >
               <FaInstagram className="h-5 w-5" />
               <span className="text-[13px] sm:text-[14px]">Instagram</span>
             </a>

             <a
               href="https://twitter.com/framegen"
               target="_blank"
               rel="noopener noreferrer"
               className="footer-link flex items-center gap-3 text-[#dddddd] transition hover:text-white hover:underline decoration-white underline-offset-4"
             >
               <FaTwitter className="h-5 w-5" />
               <span className="text-[13px] sm:text-[14px]">Twitter</span>
             </a>

             <a
               href="https://www.facebook.com/profile.php?id=61589079031778"
               target="_blank"
               rel="noopener noreferrer"
               className="footer-link flex items-center gap-3 text-[#dddddd] transition hover:text-white hover:underline decoration-white underline-offset-4"
             >
               <FaFacebook className="h-5 w-5" />
               <span className="text-[13px] sm:text-[14px]">Facebook</span>
             </a>

             <a
               href="mailto:framegen.create@gmail.com"
               className="footer-link flex items-center gap-3 text-[#dddddd] transition hover:text-white hover:underline decoration-white underline-offset-4"
             >
               <FaEnvelope className="h-5 w-5" />
               <span className="text-[13px] sm:text-[14px]">Email</span>
             </a>
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