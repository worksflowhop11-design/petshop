import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-5 left-5 sm:bottom-[30px] sm:left-[30px] z-[9998] w-12 h-12 rounded-full bg-[#1E4DB7] text-white flex items-center justify-center border-2 border-white/20 shadow-[0_10px_25px_rgba(30,77,183,0.35)] hover:bg-[#D62828] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group"
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200" />
    </button>
  );
};
