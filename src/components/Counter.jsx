// src/components/Counter.jsx
import { useEffect, useState } from 'react';

function Counter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 20);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 20);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <div className="font-sans text-[24px] text-[#FFFFFF]">{count}+</div>;
}

export default Counter;
