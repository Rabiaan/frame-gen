import React, { useEffect, useState } from 'react';

function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 350);
    const hideTimer = setTimeout(() => setShow(false), 1500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`loading-screen fixed inset-0 z-[1000000] flex flex-col items-center justify-center bg-[#0A0A0A] transition-opacity duration-600 ${
        showText ? 'show-text' : ''
      }`}
      role="status"
      aria-label="Loading website"
    >
      <div className="equalizer" aria-hidden="true">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div className="loading-text font-syne text-[36px] font-semibold tracking-[4px]">
        Code Hills
      </div>
    </div>
  );
}

export default LoadingScreen;