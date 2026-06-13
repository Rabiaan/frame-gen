import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';

export default function NotFound() {
  return (
    <>
      <SEO 
        title="Page Not Found" 
        description="The page you are looking for does not exist or has been moved."
        noIndex={true}
      />
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-syne font-extrabold text-8xl md:text-9xl tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#7B61FF] to-[#00F0FF]">
          404
        </h1>
        <h2 className="font-syne font-bold text-2xl md:text-3xl text-white mb-6">
          Lost in Space?
        </h2>
        <p className="text-gray-400 max-w-md mb-8 text-base md:text-lg">
          The page you are looking for does not exist, has been removed, or has had its name changed.
        </p>
        <Link
          to="/"
          className="px-8 py-3.5 bg-gradient-to-r from-[#7B61FF] to-[#00F0FF] text-white rounded-full font-medium shadow-[0_0_20px_rgba(123,97,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
}
