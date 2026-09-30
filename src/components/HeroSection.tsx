import React from 'react';
import { PawPrint, Sparkles, ShieldCheck } from 'lucide-react';
import { ASSETS } from '../data/petshopData';

export const HeroSection: React.FC = () => {
  const handleScrollTo = (id: string) => {
    const cleanId = id.startsWith('#') ? id.slice(1) : id;
    const el = document.getElementById(cleanId) || document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full max-w-full bg-[#FFFDF8] overflow-hidden min-h-[640px] lg:min-h-[680px] xl:min-h-[720px] 2xl:min-h-[760px] flex flex-col justify-between border-b border-[#FFE8A3]/30"
    >
      {/* 1. PETS ARTWORK BACKGROUND LAYER (Desktop & Large Screens) */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[58%] xl:w-[56%] 2xl:w-[54%] h-full z-0 pointer-events-none select-none overflow-hidden">
        <img
          src={ASSETS.heroBanner}
          alt="PETSHOP Golden Retriever, Adult Dog and Cat Food Bags, and Tabby Cat"
          loading="eager"
          fetchPriority="high"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[right_center] xl:object-right transform transition-transform duration-700 hover:scale-[1.01]"
        />
      </div>

      {/* 2. DEDICATED FULL-SIZE SMOOTH FADE OVERLAY LAYER (No grey strips, no hard seams) */}
      <div
        className="hidden lg:block absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, #FFFDF8 0%, #FFFDF8 36%, rgba(255, 253, 248, 0.94) 44%, rgba(255, 253, 248, 0.72) 52%, rgba(255, 253, 248, 0.3) 62%, rgba(255, 253, 248, 0) 70%, rgba(255, 253, 248, 0) 100%)',
        }}
      />

      {/* 3. MAIN HERO CONTENT CONTAINER (Stable Responsive Flexbox, No Absolute Clipping) */}
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-8 sm:pt-10 lg:pt-14 xl:pt-16 pb-12 sm:pb-16 lg:pb-20 relative z-20 flex-1 flex flex-col justify-center">
        
        {/* LEFT CONTENT COLUMN */}
        <div className="w-full lg:w-[54%] xl:w-[50%] 2xl:w-[46%] text-left space-y-5 sm:space-y-6">
          
          {/* TOP RED BADGE: "PREMIUM PET FOOD" */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#EE1630] text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-sm">
              <PawPrint className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFC21C] fill-[#FFC21C] shrink-0" />
              <span>PREMIUM PET FOOD</span>
            </div>
          </div>

          {/* THREE-LINE HEADING WITH CLAMP() SIZING (Never cut off) */}
          <h1
            className="font-black tracking-tight leading-[1.07] text-[#061B3A]"
            style={{ fontSize: 'clamp(2.2rem, 3.6vw, 4.25rem)' }}
          >
            <span className="block text-[#061B3A]">Premium Nutrition</span>
            <span className="block mt-1 sm:mt-1.5">
              <span className="text-[#061B3A]">For </span>
              <span className="text-[#FFC21C]">Happy </span>
              <span className="text-[#EE1630]">Dogs </span>
              <span className="text-[#061B3A]">&amp;</span>
            </span>
            <span className="text-[#FFC21C] block mt-1 sm:mt-1.5">Cats</span>
          </h1>

          {/* DESCRIPTION PARAGRAPH */}
          <p className="text-base sm:text-lg xl:text-xl text-[#061B3A]/80 font-normal leading-relaxed max-w-[540px] pt-1">
            Give your furry friends the healthiest and most delicious meals made with real meat, natural ingredients, balanced nutrition, and veterinarian-formulated recipes.
          </p>

          {/* TWO LARGE ROUNDED CTA BUTTONS */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
            {/* 1. Red: EXPLORE PRODUCTS → */}
            <button
              onClick={() => handleScrollTo('#products')}
              className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#EE1630] hover:bg-[#D61429] text-white font-black text-sm sm:text-base tracking-wider uppercase shadow-lg shadow-[#EE1630]/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              aria-label="Explore Products"
            >
              <span>EXPLORE PRODUCTS</span>
              <span className="text-lg font-bold leading-none">→</span>
            </button>

            {/* 2. Pale yellow: LEARN MORE */}
            <button
              onClick={() => handleScrollTo('#about')}
              className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#FFE082] hover:bg-[#FFD54F] text-[#061B3A] font-black text-sm sm:text-base tracking-wider uppercase shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              aria-label="Learn More"
            >
              <span>LEARN MORE</span>
            </button>
          </div>

          {/* TWO OUTLINED FEATURE PILLS */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white/95 border border-[#FFE8A3] shadow-xs text-xs sm:text-sm font-bold text-[#061B3A]">
              <ShieldCheck className="w-4 h-4 text-[#EE1630] shrink-0" />
              <span>Veterinarian Formulated</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white/95 border border-[#FFE8A3] shadow-xs text-xs sm:text-sm font-bold text-[#061B3A]">
              <Sparkles className="w-4 h-4 text-[#FFC21C] fill-[#FFC21C] shrink-0" />
              <span>Real Deboned Meat #1</span>
            </div>
          </div>

        </div>

        {/* TABLET & MOBILE VISUAL (Stacked below text, never clipped) */}
        <div className="lg:hidden w-full pt-8 pb-4">
          <div className="w-full relative h-[320px] sm:h-[420px] md:h-[480px] rounded-2xl overflow-hidden shadow-md">
            <img
              src={ASSETS.heroBanner}
              alt="PETSHOP Golden Retriever, Food Bags, and Tabby Cat"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-right"
            />
          </div>
        </div>

      </div>

      {/* 4. LAYERED CREAM-AND-YELLOW BOTTOM WAVE SHAPE */}
      <div className="w-full overflow-hidden leading-none pointer-events-none z-20 relative select-none">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-12 sm:h-16 lg:h-20 block"
        >
          {/* Back Wave in Golden Yellow #FFE082 */}
          <path
            d="M0,42 C280,95 540,20 860,58 C1140,92 1320,36 1440,22 L1440,100 L0,100 Z"
            fill="#FFE082"
            fillOpacity="0.85"
          />
          {/* Foreground Transition Wave into Section Background */}
          <path
            d="M0,66 C360,108 680,48 980,80 C1220,104 1340,68 1440,54 L1440,100 L0,100 Z"
            fill="#FFFDF8"
          />
        </svg>

        {/* Subtle Pale Paw-Print Decorations Near Lower-Left and Lower-Right */}
        <div className="absolute bottom-2 left-6 sm:left-12 text-[#FFC21C]/25 pointer-events-none">
          <PawPrint className="w-8 h-8 sm:w-12 sm:h-12 -rotate-12 fill-current" />
        </div>
        <div className="absolute bottom-3 right-6 sm:right-12 text-[#FFC21C]/25 pointer-events-none">
          <PawPrint className="w-8 h-8 sm:w-12 sm:h-12 rotate-12 fill-current" />
        </div>
      </div>
    </section>
  );
};
