import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/petshopData';
import { ProductItem } from '../types';

interface OurProductsShowcaseProps {
  onSelectProduct?: (product: ProductItem) => void;
}

export const OurProductsShowcase: React.FC<OurProductsShowcaseProps> = ({ onSelectProduct }) => {
  const [currentIndex, setCurrentIndex] = useState(2); // Start on Puppy formula (Index 2)
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const totalProducts = PRODUCTS.length;
  const autoPlayIntervalMs = 3800;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalProducts);
  }, [totalProducts]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalProducts) % totalProducts);
  }, [totalProducts]);

  // Auto Play Effect
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
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const activeProduct = PRODUCTS[currentIndex];

  const handleScrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to compute items at relative offsets (-2, -1, 0, +1, +2)
  const getOffsetProduct = (offset: number) => {
    const index = (currentIndex + offset + totalProducts) % totalProducts;
    return {
      product: PRODUCTS[index],
      index,
    };
  };

  // Extract top 3 benefit items for active center product display
  const activeBenefits = activeProduct.benefits && activeProduct.benefits.length >= 3
    ? [
        activeProduct.benefits[0].replace(/^Promotes\s+/i, '').replace(/^DHA-enriched recipe for\s+/i, ''),
        activeProduct.benefits[1].replace(/^Single\s+/i, '').replace(/^Gentle on\s+/i, ''),
        activeProduct.benefits[2].replace(/^Rich in\s+/i, '').replace(/^Antioxidant Boost for\s+/i, '')
      ]
    : ['Complete Nutrition', 'Stronger Immunity', 'Healthy Growth'];

  return (
    <section
      id="our-products"
      className="py-12 sm:py-16 md:py-20 bg-[#FFFDF8] text-[#2B2B2B] relative overflow-hidden select-none border-b border-[#FFE8A3]/40"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* 1. SECTION HEADER */}
        <div className="max-w-3xl mx-auto space-y-2 mb-8 sm:mb-12">
          <p className="text-[#D62828] font-bold text-xs sm:text-sm tracking-widest uppercase">
            OUR PRODUCTS
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2B2B2B] tracking-tight">
            Premium Nutrition for <span className="text-[#D62828]">Every Pet</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#2B2B2B]/75 font-medium max-w-2xl mx-auto leading-relaxed pt-1">
            Discover the PETSHOP range of thoughtfully crafted nutrition for happy, healthy dogs and cats.
          </p>
        </div>

        {/* 2. MAIN HORIZONTAL PRODUCT CAROUSEL */}
        <div className="relative py-4 my-2 min-h-[360px] sm:min-h-[420px] md:min-h-[460px] flex items-center justify-center">
          
          {/* NAVIGATION ARROWS */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 md:left-12 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white text-[#2B2B2B] border border-[#FFE8A3] shadow-md hover:bg-[#D62828] hover:text-white hover:border-[#D62828] transition-all duration-300 flex items-center justify-center cursor-pointer group"
            aria-label="Previous Product"
            title="Previous PETSHOP Product"
          >
            <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 md:right-12 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white text-[#2B2B2B] border border-[#FFE8A3] shadow-md hover:bg-[#D62828] hover:text-white hover:border-[#D62828] transition-all duration-300 flex items-center justify-center cursor-pointer group"
            aria-label="Next Product"
            title="Next PETSHOP Product"
          >
            <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* 5-PRODUCT STACK (No cards, direct packaging standing on floor) */}
          <div className="w-full max-w-5xl mx-auto flex items-center justify-center h-[320px] sm:h-[380px] md:h-[430px] relative px-4 sm:px-12">
            {[-2, -1, 0, 1, 2].map((offset) => {
              const { product, index } = getOffsetProduct(offset);
              const isCenter = offset === 0;

              // Compute positioning & scale styles based on offset
              let transformStyle = '';
              let opacityStyle = '';
              let zIndexStyle = 10;
              let visibilityClasses = '';

              if (offset === 0) {
                // CENTER PRODUCT: Featured & Largest
                transformStyle = 'scale-110 sm:scale-120 md:scale-130 translate-x-0 -translate-y-3 z-30';
                opacityStyle = 'opacity-100 filter drop-shadow-2xl';
                zIndexStyle = 30;
                visibilityClasses = 'block';
              } else if (offset === -1) {
                // LEFT 1
                transformStyle = '-translate-x-[120px] sm:-translate-x-[190px] md:-translate-x-[260px] scale-85 sm:scale-95 md:scale-100 z-20';
                opacityStyle = 'opacity-85 sm:opacity-90 filter brightness-95';
                zIndexStyle = 20;
                visibilityClasses = 'block';
              } else if (offset === 1) {
                // RIGHT 1
                transformStyle = 'translate-x-[120px] sm:translate-x-[190px] md:translate-x-[260px] scale-85 sm:scale-95 md:scale-100 z-20';
                opacityStyle = 'opacity-85 sm:opacity-90 filter brightness-95';
                zIndexStyle = 20;
                visibilityClasses = 'block';
              } else if (offset === -2) {
                // FAR LEFT 2
                transformStyle = '-translate-x-[210px] sm:-translate-x-[330px] md:-translate-x-[440px] scale-70 sm:scale-75 md:scale-80 z-10';
                opacityStyle = 'opacity-40 sm:opacity-65 filter brightness-90';
                zIndexStyle = 10;
                visibilityClasses = 'hidden sm:block';
              } else if (offset === 2) {
                // FAR RIGHT 2
                transformStyle = 'translate-x-[210px] sm:translate-x-[330px] md:translate-x-[440px] scale-70 sm:scale-75 md:scale-80 z-10';
                opacityStyle = 'opacity-40 sm:opacity-65 filter brightness-90';
                zIndexStyle = 10;
                visibilityClasses = 'hidden sm:block';
              }

              return (
                <div
                  key={`${product.id}-${offset}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`absolute transition-all duration-700 ease-out cursor-pointer transform-gpu ${transformStyle} ${opacityStyle} ${visibilityClasses}`}
                  style={{ zIndex: zIndexStyle }}
                >
                  <div className="relative group flex flex-col items-center">
                    
                    {/* PACKAGING IMAGE (Sitting directly on the ground) */}
                    <div className="relative w-36 sm:w-48 md:w-56 h-52 sm:h-64 md:h-76 flex items-center justify-center">
                      <img
                        src={product.packageImage}
                        alt={`${product.name} PETSHOP Packaging`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain filter drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* FLOOR DROP SHADOW OVAL */}
                    <div
                      className={`w-28 sm:w-40 md:w-48 h-4 rounded-full bg-black/30 blur-md transition-all duration-500 mt-1 ${
                        isCenter ? 'bg-black/40 w-36 sm:w-52 md:w-60 h-6 blur-lg' : ''
                      }`}
                    />

                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* 3. CENTER PRODUCT INFORMATION DISPLAY */}
        <div className="mt-4 max-w-2xl mx-auto text-center space-y-3 transition-all duration-500">
          
          {/* PRODUCT NAME (UPPERCASE RED) */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#D62828] uppercase tracking-wide">
            {activeProduct.name.replace(/^PETSHOP\s+/i, '')}
          </h3>

          {/* SHORT DESCRIPTION */}
          <p className="text-xs sm:text-sm md:text-base text-[#2B2B2B]/85 font-medium max-w-xl mx-auto leading-relaxed">
            {activeProduct.shortDescription}
          </p>

          {/* THREE BENEFIT PILLS WITH CIRCULAR ICONS */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-bold text-[#2B2B2B]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#D62828] text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                ✓
              </span>
              <span>{activeBenefits[0]}</span>
            </div>

            <span className="text-black/20 hidden sm:inline">|</span>

            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#F4C430] text-[#2B2B2B] text-[10px] font-black flex items-center justify-center shadow-xs">
                ★
              </span>
              <span>{activeBenefits[1]}</span>
            </div>

            <span className="text-black/20 hidden sm:inline">|</span>

            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1E4DB7] text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                ♥
              </span>
              <span>{activeBenefits[2]}</span>
            </div>
          </div>

        </div>

        {/* 4. CTA BUTTON */}
        <div className="pt-7 pb-2">
          <button
            onClick={() => {
              if (onSelectProduct) {
                onSelectProduct(activeProduct);
              } else {
                handleScrollToProducts();
              }
            }}
            className="px-8 py-3.5 rounded-full bg-[#D62828] hover:bg-[#B51F1F] text-white font-black text-sm sm:text-base shadow-lg shadow-[#D62828]/25 hover:-translate-y-0.5 hover:scale-102 hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2.5 cursor-pointer uppercase tracking-wider"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5. PAGINATION DOTS */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {PRODUCTS.map((prod, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={prod.id}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-3 h-3 bg-[#D62828] scale-110 shadow-xs'
                    : 'w-2.5 h-2.5 bg-gray-300 hover:bg-[#D62828]/60'
                }`}
                aria-label={`View product ${idx + 1}: ${prod.name}`}
                title={prod.name}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};
