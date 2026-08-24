import React, { useState, useEffect, useRef } from 'react';
import { PawPrint, Heart, Trophy } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayCount1, setDisplayCount1] = useState('0');
  const [displayCount2, setDisplayCount2] = useState('0');
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationStartedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationStartedRef.current) {
          animationStartedRef.current = true;
          setIsVisible(true);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smooth requestAnimationFrame counter animation with cubic ease-out
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2800; // 2.8 seconds
    const targetValue = 1000000;
    let frameId: number;
    let startTime: number | null = null;

    // Cubic ease-out curve for natural slowdown
    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      const currentValue = Math.floor(easedProgress * targetValue);

      if (progress < 1) {
        // Formatted with commas while counting
        const formatted = currentValue.toLocaleString();
        setDisplayCount1(formatted);
        setDisplayCount2(formatted);
        frameId = requestAnimationFrame(step);
      } else {
        // Final value upon completion
        setDisplayCount1('1 Million+');
        setDisplayCount2('1 Million+');
      }
    };

    frameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frameId);
  }, [isVisible]);

  return (
    <section
      id="trust-achievements"
      ref={sectionRef}
      className="bg-white py-20 lg:py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3 STATISTIC CARDS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          
          {/* CARD 1: 1 Million+ Products Sold */}
          <div
            className={`bg-[#1E4DB7]/95 backdrop-blur-sm border border-white/10 rounded-[16px] p-8 md:p-10 text-white shadow-xl shadow-[#1E4DB7]/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#1E4DB7]/30 transition-all duration-300 flex flex-col items-center text-center group relative overflow-hidden ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transition: 'all 600ms ease-out' }}
          >
            {/* Ambient inner glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
            
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mb-6 text-white group-hover:bg-[#F4C430] group-hover:text-[#2B2B2B] transition-colors duration-300 shadow-inner">
              <PawPrint className="w-8 h-8 fill-current" />
            </div>

            <div className="text-[42px] sm:text-[52px] lg:text-[64px] font-[800] tracking-tight leading-none mb-3 font-sans text-white drop-shadow-sm min-h-[64px] flex items-center justify-center">
              {displayCount1}
            </div>

            <p className="text-lg font-bold tracking-wide text-white/90 uppercase text-xs tracking-widest font-sans">
              Products Sold
            </p>
          </div>

          {/* CARD 2: 1 Million+ Happy Pet Parents */}
          <div
            className={`bg-[#1E4DB7]/95 backdrop-blur-sm border border-white/10 rounded-[16px] p-8 md:p-10 text-white shadow-xl shadow-[#1E4DB7]/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#1E4DB7]/30 transition-all duration-300 flex flex-col items-center text-center group relative overflow-hidden ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transition: 'all 600ms ease-out 150ms' }}
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mb-6 text-white group-hover:bg-[#E1262E] group-hover:text-white transition-colors duration-300 shadow-inner">
              <Heart className="w-8 h-8 fill-current" />
            </div>

            <div className="text-[42px] sm:text-[52px] lg:text-[64px] font-[800] tracking-tight leading-none mb-3 font-sans text-white drop-shadow-sm min-h-[64px] flex items-center justify-center">
              {displayCount2}
            </div>

            <p className="text-lg font-bold tracking-wide text-white/90 uppercase text-xs tracking-widest font-sans">
              Happy Pet Parents
            </p>
          </div>

          {/* CARD 3: Premium Quality Pet Nutrition (STATIC) */}
          <div
            className={`bg-[#1E4DB7]/95 backdrop-blur-sm border border-white/10 rounded-[16px] p-8 md:p-10 text-white shadow-xl shadow-[#1E4DB7]/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#1E4DB7]/30 transition-all duration-300 flex flex-col items-center text-center group relative overflow-hidden md:col-span-2 lg:col-span-1 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transition: 'all 600ms ease-out 300ms' }}
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mb-6 text-white group-hover:bg-[#F4C430] group-hover:text-[#2B2B2B] transition-colors duration-300 shadow-inner">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="text-[32px] sm:text-[40px] lg:text-[44px] font-[800] tracking-tight leading-none mb-3 font-sans text-white drop-shadow-sm min-h-[64px] flex items-center justify-center">
              Premium Quality
            </div>

            <p className="text-lg font-bold tracking-wide text-white/90 uppercase text-xs tracking-widest font-sans">
              Pet Nutrition
            </p>
          </div>

        </div>

        {/* BOTTOM TRUST BANNER */}
        <div
          className={`w-full bg-[#E1262E] text-white rounded-3xl py-10 md:py-12 px-6 text-center shadow-2xl relative overflow-hidden group transform transition-all duration-700 ${
            isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          {/* Subtle background decorative shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -z-0 pointer-events-none group-hover:scale-125 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-2xl -z-0 pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white font-sans drop-shadow-md">
              1 Million Products Sold.
            </h2>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-[#FFE8A3] font-sans drop-shadow-md">
              1 Million Happy Pet Parents.
            </h2>
          </div>
        </div>

      </div>
    </section>
  );
};
