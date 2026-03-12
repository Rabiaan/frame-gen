import React, { useEffect, useState, useCallback } from 'react';

// Global loading state that can be accessed by other components
export const loadingState = {
  isLoading: true,
  listeners: [],
  setLoading: function(loading) {
    this.isLoading = loading;
    this.listeners.forEach(fn => fn(loading));
  },
  subscribe: function(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(f => f !== fn);
    };
  }
};

function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [showText, setShowText] = useState(false);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const unsubscribe = loadingState.subscribe((loading) => {
      forceUpdate(n => n + 1);
    });
    
    const textTimer = setTimeout(() => setShowText(true), 350);
    const hideTimer = setTimeout(() => {
      setShow(false);
      loadingState.setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(hideTimer);
      unsubscribe();
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