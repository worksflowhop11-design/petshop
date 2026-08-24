import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../data/petshopData';
import { Star, ChevronLeft, ChevronRight, Quote, PawPrint } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TITLE */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE8A3] text-[#2B2B2B] text-xs font-bold uppercase tracking-wider mb-3">
            <PawPrint className="w-4 h-4 text-[#D62828]" />
            <span>Verified Customer Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2B2B2B]">
            Loved by Pets, <span className="text-[#D62828]">Trusted by Owners</span>
          </h2>
          <p className="text-sm text-[#2B2B2B]/70 font-medium mt-2">
            Read real feedback from pet parents and veterinary clinicians who switched to PETSHOP.
          </p>
        </div>

        {/* SLIDER CONTAINER */}
        <div
          className="max-w-4xl mx-auto relative bg-[#FFFDF8] rounded-3xl border-2 border-[#FFE8A3] p-6 sm:p-10 shadow-xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Quote className="absolute top-6 left-6 w-12 h-12 text-[#FFE8A3] opacity-60 -z-0" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* PHOTOS SIDE */}
            <div className="md:col-span-4 flex flex-col items-center justify-center">
              <div className="relative">
                {/* Pet Photo */}
                <div className="w-36 h-36 rounded-3xl overflow-hidden border-4 border-white shadow-lg bg-[#FFE8A3]">
                  <img
                    src={current.petPhoto}
                    alt={current.petName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Customer Avatar Overlay */}
                <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-2xl overflow-hidden border-3 border-white shadow-md bg-white">
                  <img
                    src={current.customerPhoto}
                    alt={current.customerName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-5 text-center">
                <h4 className="text-base font-extrabold text-[#2B2B2B]">{current.customerName}</h4>
                <p className="text-xs text-[#2B2B2B]/60 font-semibold">{current.customerLocation}</p>
                <div className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#D62828]/10 text-[#D62828] text-[10px] font-extrabold">
                  {current.petName} ({current.petBreed})
                </div>
              </div>
            </div>

            {/* REVIEW CONTENT SIDE */}
            <div className="md:col-span-8 space-y-4 text-left">
              {/* RATING STARS */}
              <div className="flex items-center gap-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#F4C430] text-[#F4C430]" />
                ))}
              </div>

              {/* REVIEW TEXT */}
              <p className="text-base sm:text-lg text-[#2B2B2B] font-medium leading-relaxed italic">
                "{current.reviewText}"
              </p>

              {/* VERIFIED BADGE */}
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#D62828]">
                <span className="w-2 h-2 rounded-full bg-[#D62828]" />
                <span>Verified PETSHOP Family Member</span>
              </div>
            </div>

          </div>

          {/* NAVIGATION CONTROLS */}
          <div className="mt-8 pt-4 border-t border-[#FFE8A3] flex items-center justify-between">
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-8 bg-[#D62828]' : 'w-2.5 bg-[#FFE8A3]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-white border border-[#FFE8A3] text-[#2B2B2B] hover:bg-[#D62828] hover:text-white transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full bg-white border border-[#FFE8A3] text-[#2B2B2B] hover:bg-[#D62828] hover:text-white transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
