import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { PRODUCTS, ASSETS } from '../data/petshopData';
import { ProductItem } from '../types';

interface OurProductsShowcaseProps {
  onSelectProduct?: (product: ProductItem) => void;
}

export const OurProductsShowcase: React.FC<OurProductsShowcaseProps> = ({ onSelectProduct }) => {
  // Curated lineup of PETSHOP family packs (Dog, Cat, Puppy, Kitten, Canned Wet Food)
  const lineupProducts = [
    PRODUCTS.find((p) => p.id === 'dog-premium-3kg') || PRODUCTS[0],
    PRODUCTS.find((p) => p.id === 'cat-premium-3kg') || PRODUCTS[1],
    PRODUCTS.find((p) => p.id === 'dog-chicken-chunks-can') || PRODUCTS[2],
    PRODUCTS.find((p) => p.id === 'dog-puppy-growth' || p.category === 'puppy') || PRODUCTS[4] || PRODUCTS[0],
    PRODUCTS.find((p) => p.id === 'cat-kitten-vitality' || p.category === 'kitten') || PRODUCTS[5] || PRODUCTS[1],
    PRODUCTS.find((p) => p.id === 'dog-lamb-veg') || PRODUCTS[3] || PRODUCTS[0],
    PRODUCTS.find((p) => p.id === 'cat-adult-salmon' || p.id === 'cat-tuna-chunks-can') || PRODUCTS[1],
  ];

  const totalProducts = lineupProducts.length;
  // Default to index 0 (PETSHOP Adult Dog Food 3kg in center)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const autoPlayIntervalMs = 4500;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalProducts);
  }, [totalProducts]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalProducts) % totalProducts);
  }, [totalProducts]);

  // Optional auto-play
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, autoPlayIntervalMs);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const activeProduct = lineupProducts[currentIndex];

  const handleScrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to fetch product by offset (-2, -1, 0, +1, +2)
  const getOffsetProduct = (offset: number) => {
    const index = (currentIndex + offset + totalProducts) % totalProducts;
    return {
      product: lineupProducts[index],
      index,
    };
  };

  return (
    <section
      id="our-products"
      className="py-14 sm:py-18 lg:py-22 bg-white text-[#061B3A] relative overflow-hidden select-none border-b border-gray-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* ================= 1. SECTION HEADING (PRESERVED AS REQUESTED) ================= */}
        <div className="max-w-3xl mx-auto space-y-2 mb-10 sm:mb-14">
          <p className="text-[#EE1630] font-bold text-xs sm:text-sm tracking-widest uppercase">
            OUR PRODUCTS
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#061B3A] tracking-tight">
            Premium Nutrition for <span className="text-[#EE1630]">Every Pet</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#061B3A]/70 font-medium max-w-2xl mx-auto leading-relaxed pt-1">
            Discover the PETSHOP range of thoughtfully crafted nutrition for happy, healthy dogs and cats.
          </p>
        </div>

        {/* ================= 2. DROOLS-STYLE CENTERED HORIZONTAL CAROUSEL ================= */}
        {/* Clean white background, overlapping product packs aligned on the exact same bottom baseline */}
        <div className="relative w-full max-w-5xl mx-auto my-4 min-h-[380px] sm:min-h-[440px] md:min-h-[490px] lg:min-h-[520px] flex items-end justify-center">
          
          {/* SUBTLE LEFT ARROW */}
          <button
            onClick={handlePrev}
            className="absolute left-0 sm:left-2 md:left-6 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-3 rounded-full text-gray-400 hover:text-[#061B3A] hover:bg-gray-100/80 transition-all duration-200 cursor-pointer group"
            aria-label="Previous Product"
            title="Previous Product"
          >
            <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:-translate-x-1" strokeWidth={1.8} />
          </button>

          {/* SUBTLE RIGHT ARROW */}
          <button
            onClick={handleNext}
            className="absolute right-0 sm:right-2 md:right-6 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-3 rounded-full text-gray-400 hover:text-[#061B3A] hover:bg-gray-100/80 transition-all duration-200 cursor-pointer group"
            aria-label="Next Product"
            title="Next Product"
          >
            <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:translate-x-1" strokeWidth={1.8} />
          </button>

          {/* OVERLAPPING ROW: 5 PACKS ALIGNED ON THE EXACT SAME BOTTOM BASELINE */}
          <div className="relative w-full h-[360px] sm:h-[420px] md:h-[470px] lg:h-[500px] flex items-end justify-center pb-2">
            {[-2, -1, 0, 1, 2].map((offset) => {
              const { product, index } = getOffsetProduct(offset);
              const isCenter = offset === 0;

              // Positioning styles based on relative offset
              let transformClasses = '';
              let zIndex = 10;
              let opacityClass = 'opacity-100';

              if (offset === 0) {
                // CENTER PRODUCT: In foreground, scale 1.05x, z-30
                transformClasses = 'translate-x-0 scale-100 sm:scale-105 z-30';
                zIndex = 30;
                opacityClass = 'opacity-100';
              } else if (offset === -1) {
                // IMMEDIATE LEFT (behind center, overlapping)
                transformClasses = '-translate-x-[110px] sm:-translate-x-[170px] md:-translate-x-[220px] lg:-translate-x-[260px] scale-90 sm:scale-95 z-20';
                zIndex = 20;
                opacityClass = 'opacity-95';
              } else if (offset === 1) {
                // IMMEDIATE RIGHT (behind center, overlapping)
                transformClasses = 'translate-x-[110px] sm:translate-x-[170px] md:translate-x-[220px] lg:translate-x-[260px] scale-90 sm:scale-95 z-20';
                zIndex = 20;
                opacityClass = 'opacity-95';
              } else if (offset === -2) {
                // OUTER LEFT (behind Left 1)
                transformClasses = '-translate-x-[190px] sm:-translate-x-[300px] md:-translate-x-[390px] lg:-translate-x-[470px] scale-80 sm:scale-85 z-10 hidden xs:flex sm:flex';
                zIndex = 10;
                opacityClass = 'opacity-85 sm:opacity-90';
              } else if (offset === 2) {
                // OUTER RIGHT (behind Right 1)
                transformClasses = 'translate-x-[190px] sm:translate-x-[300px] md:translate-x-[390px] lg:translate-x-[470px] scale-80 sm:scale-85 z-10 hidden xs:flex sm:flex';
                zIndex = 10;
                opacityClass = 'opacity-85 sm:opacity-90';
              }

              return (
                <div
                  key={`${product.id}-${offset}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`absolute bottom-0 flex flex-col items-center justify-end transition-all duration-500 ease-out cursor-pointer origin-bottom transform-gpu ${transformClasses} ${opacityClass}`}
                  style={{ zIndex }}
                >
                  <div className="relative group flex flex-col items-center justify-end">
                    
                    {/* PACKAGING IMAGE (Front-facing packaging pack, isolated on white, NO animals) */}
                    <div className="relative w-44 sm:w-56 md:w-64 lg:w-72 h-[300px] sm:h-[360px] md:h-[410px] lg:h-[440px] flex items-end justify-center">
                      <img
                        src={product.packageImage}
                        alt={`${product.name} PETSHOP Official Packaging`}
                        loading="eager"
                        fetchPriority={isCenter ? 'high' : 'auto'}
                        referrerPolicy="no-referrer"
                        className={`max-h-full max-w-full object-contain filter transition-all duration-500 ${
                          isCenter
                            ? 'drop-shadow-[0_18px_25px_rgba(0,0,0,0.18)] scale-100'
                            : 'drop-shadow-[0_12px_18px_rgba(0,0,0,0.12)] group-hover:scale-[1.02]'
                        }`}
                      />
                    </div>

                    {/* SOFT BASELINE FLOOR CONTACT SHADOW */}
                    <div
                      className={`h-3 sm:h-4 rounded-full bg-black/15 blur-sm transition-all duration-500 mt-0.5 ${
                        isCenter
                          ? 'w-36 sm:w-48 md:w-56 bg-black/25 blur-md'
                          : 'w-28 sm:w-36 md:w-44'
                      }`}
                    />

                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ================= 3. SMALL DOT INDICATORS CENTERED BELOW CAROUSEL ================= */}
        <div className="flex items-center justify-center gap-2 pt-6 pb-4">
          {lineupProducts.map((prod, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={prod.id}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-7 h-2 bg-[#EE1630] rounded-full'
                    : 'w-2 h-2 bg-gray-300 hover:bg-[#EE1630]/60'
                }`}
                aria-label={`Go to slide ${idx + 1}: ${prod.name}`}
                title={prod.name}
              />
            );
          })}
        </div>

        {/* ================= 4. ACTIVE PRODUCT DETAILS & SPECIFICATIONS ================= */}
        <div className="mt-4 max-w-2xl mx-auto text-center space-y-3 transition-all duration-500">
          
          {/* CATEGORY & WEIGHT PILL */}
          <div className="flex items-center justify-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-[#FFE082]/60 text-[#061B3A] text-xs font-bold uppercase tracking-wider">
              {activeProduct.petTypeLabel || 'Complete & Balanced'}
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider">
              {activeProduct.packSize || '3 kg'}
            </span>
          </div>

          {/* PRODUCT NAME (PETSHOP Bold Typography) */}
          <h3 className="text-2xl sm:text-3xl font-black text-[#061B3A] tracking-tight">
            {activeProduct.name}
          </h3>

          {/* SHORT FORMULA SUMMARY */}
          <p className="text-xs sm:text-sm md:text-base text-[#061B3A]/75 font-medium max-w-xl mx-auto leading-relaxed">
            {activeProduct.shortDescription}
          </p>

          {/* BENEFIT HIGHLIGHT PILLS */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-bold text-[#061B3A]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EE1630]/10 text-[#EE1630]">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>{activeProduct.proteinPercentage || 'High Protein'}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC21C]/20 text-[#061B3A]">
              <Sparkles className="w-3.5 h-3.5 text-[#EE1630]" />
              <span>{activeProduct.mainProtein || 'Real Deboned Meat'}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-[#061B3A]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0755B8]" />
              <span>Veterinarian Formulated</span>
            </div>
          </div>

          {/* EXPLORE PRODUCT CTA BUTTON */}
          <div className="pt-5">
            <button
              onClick={() => {
                if (onSelectProduct) {
                  onSelectProduct(activeProduct);
                } else {
                  handleScrollToProducts();
                }
              }}
              className="px-8 py-3.5 rounded-full bg-[#EE1630] hover:bg-[#D61429] text-white font-black text-sm sm:text-base tracking-wider uppercase shadow-md shadow-[#EE1630]/25 hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Formula</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
