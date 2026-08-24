import React, { useEffect, useState } from 'react';
import { PawPrint, Heart, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { ASSETS } from '../data/petshopData';

export const HeroSection: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation state on mount
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full bg-gradient-to-b from-[#FFFDF8] via-[#FFFDF8] to-[#FFF9E6] overflow-hidden py-8 sm:py-12 lg:py-16 min-h-[700px] lg:h-[740px] flex items-center justify-center border-b border-[#FFE8A3]/40"
    >
      {/* Background Decorative Ambient Blur Effects */}
      <div className="absolute top-8 left-10 w-96 h-96 bg-[#FFE8A3]/30 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D62828]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ================= LEFT CONTENT COLUMN ================= */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* TOP BADGE */}
            <div
              className={`transition-all duration-700 ease-out transform ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              <button
                onClick={() => handleScrollTo('#products')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D62828] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-md hover:bg-[#B51F1F] hover:scale-105 transition-all duration-300 cursor-pointer border border-[#D62828]/20"
                aria-label="Premium Pet Food"
              >
                <PawPrint className="w-4 h-4 fill-current text-[#F4C430] shrink-0" />
                <span>PREMIUM PET FOOD</span>
              </button>
            </div>

            {/* MAIN HEADING */}
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[78px] font-black tracking-tight text-[#2B2B2B] leading-[1.05] transition-all duration-700 delay-100 ease-out transform ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Premium Nutrition <br className="hidden sm:block" />
              For <span className="text-[#D62828]">Happy Dogs</span> &amp;{' '}
              <span className="text-[#F4C430]">Cats</span>
            </h1>

            {/* DESCRIPTION */}
            <p
              className={`text-base sm:text-lg md:text-xl text-[#2B2B2B]/85 font-medium max-w-[580px] leading-relaxed transition-all duration-700 delay-200 ease-out transform ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Give your furry friends the healthiest and most delicious meals made with real meat, natural ingredients, balanced nutrition, and veterinarian-formulated recipes.
            </p>

            {/* CTA BUTTONS */}
            <div
              className={`flex flex-wrap items-center gap-4 pt-2 transition-all duration-700 delay-300 ease-out transform ${
                loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              {/* PRIMARY BUTTON */}
              <button
                onClick={() => handleScrollTo('#products')}
                className="px-8 py-4 rounded-full bg-[#D62828] text-white font-black text-sm sm:text-base shadow-md shadow-[#D62828]/25 hover:bg-[#B51F1F] hover:scale-[1.05] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                aria-label="Explore Products"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* SECONDARY BUTTON */}
              <button
                onClick={() => handleScrollTo('#why-us')}
                className="px-8 py-4 rounded-full bg-[#FFE8A3] text-[#2B2B2B] font-black text-sm sm:text-base border border-[#FFE8A3] hover:bg-[#F4C430] hover:border-[#F4C430] hover:scale-[1.05] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer uppercase tracking-wider shadow-xs"
                aria-label="Learn More"
              >
                Learn More
              </button>
            </div>

            {/* QUICK FEATURE PILLS */}
            <div
              className={`pt-2 flex flex-wrap items-center gap-3 text-xs font-bold text-[#2B2B2B]/75 transition-all duration-700 delay-400 ease-out transform ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#FFE8A3]">
                <ShieldCheck className="w-4 h-4 text-[#D62828]" />
                <span>Veterinarian Formulated</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#FFE8A3]">
                <Sparkles className="w-4 h-4 text-[#F4C430]" />
                <span>Real Deboned Meat #1</span>
              </div>
            </div>

          </div>

          {/* ================= RIGHT LIFESTYLE SHOWCASE COLUMN ================= */}
          <div
            className={`lg:col-span-5 relative transition-all duration-1000 delay-200 ease-out transform ${
              loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer Ambient Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#D62828]/15 via-[#F4C430]/25 to-[#1E4DB7]/15 rounded-[36px] blur-2xl pointer-events-none" />

              {/* MAIN HERO IMAGE CONTAINER */}
              <div className="relative rounded-[28px] overflow-hidden border-4 border-white shadow-2xl bg-white aspect-4/3 sm:aspect-16/11 lg:aspect-4/3 group">
                <img
                  src={ASSETS.heroBanner}
                  alt="PETSHOP Premium Adult Dog and Cat Food with Golden Retriever, Cat, and Fresh Ingredients"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                />

                {/* Subtle Bottom Image Gradient Overlay for Tag Visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 pointer-events-none" />

                {/* TOP FLOATING BADGE */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-[#FFE8A3] inline-flex items-center gap-2 text-xs sm:text-sm font-black text-[#2B2B2B]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D62828] shrink-0 animate-pulse" />
                  <span>100% Guaranteed Freshness</span>
                </div>

                {/* BOTTOM FLOATING REVIEW CARD */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 bg-[#2B2B2B]/90 backdrop-blur-md text-white p-3.5 sm:p-4 rounded-2xl shadow-xl border border-white/15 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#D62828] flex items-center justify-center text-white shrink-0 shadow-md">
                      <Heart className="w-5 h-5 fill-current text-[#F4C430]" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-black text-white leading-tight">
                        Loved by 100k+ Pet Parents
                      </p>
                      <p className="text-[11px] sm:text-xs text-[#F4C430] font-bold mt-0.5 tracking-wide">
                        ⭐⭐⭐⭐⭐ 4.9 Rating
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
