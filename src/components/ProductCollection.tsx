import React, { useState } from 'react';
import { PRODUCTS, ASSETS } from '../data/petshopData';
import { ProductCard } from './ProductCard';
import { ProductItem } from '../types';
import {
  LayoutGrid,
  Leaf,
  ShieldCheck,
  Activity,
  Utensils,
  Truck,
  HeartHandshake,
  Headphones,
  PawPrint,
  Sparkles
} from 'lucide-react';

interface ProductCollectionProps {
  onSelectProduct: (product: ProductItem) => void;
}

type FilterTab = 'all' | 'dog' | 'cat' | 'puppy' | 'kitten' | 'wet-food';

export const ProductCollection: React.FC<ProductCollectionProps> = ({ onSelectProduct }) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  // Filter products based on selected tab
  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'dog') {
      return product.petType === 'dog' && product.category !== 'wet-food';
    }
    if (activeTab === 'cat') {
      return product.petType === 'cat' && product.category !== 'wet-food';
    }
    if (activeTab === 'puppy') {
      return product.category === 'puppy' || product.id.includes('puppy');
    }
    if (activeTab === 'kitten') {
      return product.category === 'kitten' || product.id.includes('kitten');
    }
    if (activeTab === 'wet-food') {
      return product.category === 'wet-food' || product.id.includes('chunks');
    }
    return true;
  });

  const categories: { id: FilterTab; label: string; icon: string; emoji: string }[] = [
    { id: 'all', label: 'All Products', icon: 'grid', emoji: '⊞' },
    { id: 'dog', label: 'Dog Food', icon: 'dog', emoji: '🐶' },
    { id: 'cat', label: 'Cat Food', icon: 'cat', emoji: '🐱' },
    { id: 'puppy', label: 'Puppy Food', icon: 'puppy', emoji: '🐕' },
    { id: 'kitten', label: 'Kitten Food', icon: 'kitten', emoji: '🐾' },
    { id: 'wet-food', label: 'Wet Food', icon: 'can', emoji: '🥫' },
  ];

  return (
    <section id="products" className="py-14 sm:py-20 bg-[#FFFDF8] relative overflow-hidden">
      
      {/* BACKGROUND DECORATIVE GLOW & PAWS */}
      <div className="absolute top-10 left-10 text-[#FFE8A3]/30 pointer-events-none -z-0">
        <PawPrint className="w-36 h-36 rotate-12" />
      </div>
      <div className="absolute bottom-20 right-10 text-[#FFE8A3]/30 pointer-events-none -z-0">
        <PawPrint className="w-48 h-48 -rotate-12" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. PRODUCTS SECTION HERO HEADER BANNER                                      */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-r from-[#FFF4DB] via-[#FFF9EE] to-[#FFF4DB] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#FFE8A3] shadow-lg relative overflow-hidden mb-10">
          
          {/* Subtle Paw Background Pattern */}
          <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-around">
            <PawPrint className="w-16 h-16 text-[#F4C430]" />
            <PawPrint className="w-24 h-24 text-[#F4C430]" />
            <PawPrint className="w-20 h-20 text-[#F4C430]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* LEFT: TITLE & SUBHEADING */}
            <div className="lg:col-span-5 space-y-3 text-left">
              <div className="inline-flex items-center gap-1.5">
                <span className="text-[#D62828] font-black text-xs sm:text-sm tracking-widest uppercase">
                  OUR PRODUCTS
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2B2B2B] tracking-tight leading-[1.15]">
                Premium Nutrition,<br />
                <span className="text-[#D62828]">Happy Pets</span>
              </h2>

              <p className="text-sm sm:text-base text-[#2B2B2B]/75 font-medium max-w-md leading-relaxed pt-1">
                Carefully crafted food for every stage of your pet's life. Real ingredients. Real results.
              </p>
            </div>

            {/* CENTER: HAPPY DOG & CAT VISUAL */}
            <div className="lg:col-span-3 flex items-center justify-center">
              <div className="relative group">
                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white flex items-center justify-center">
                  <img
                    src={ASSETS.productsBannerPets}
                    alt="Happy Dog and Cat - Petshop Premium Nutrition"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Floating Paw Accent */}
                <div className="absolute -bottom-2 -right-2 bg-[#D62828] text-white p-2 rounded-full shadow-md">
                  <PawPrint className="w-4 h-4 fill-current text-[#FFE8A3]" />
                </div>
              </div>
            </div>

            {/* RIGHT: 4 BENEFIT ICONS */}
            <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3.5">
              
              {/* BENEFIT 1: REAL INGREDIENTS */}
              <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-3.5 border border-[#FFE8A3] shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center shrink-0">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#2B2B2B] leading-tight">Real Ingredients</h4>
                  <p className="text-[10px] text-[#2B2B2B]/60 font-medium">Farm fresh meats</p>
                </div>
              </div>

              {/* BENEFIT 2: NO PRESERVATIVES */}
              <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-3.5 border border-[#FFE8A3] shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#2B2B2B] leading-tight">No Preservatives</h4>
                  <p className="text-[10px] text-[#2B2B2B]/60 font-medium">100% pure & clean</p>
                </div>
              </div>

              {/* BENEFIT 3: HIGH PROTEIN */}
              <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-3.5 border border-[#FFE8A3] shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#2B2B2B] leading-tight">High Protein</h4>
                  <p className="text-[10px] text-[#2B2B2B]/60 font-medium">Strong lean muscle</p>
                </div>
              </div>

              {/* BENEFIT 4: HEALTHY DIGESTION */}
              <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-3.5 border border-[#FFE8A3] shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F4C430]/20 text-[#B8860B] flex items-center justify-center shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#2B2B2B] leading-tight">Healthy Digestion</h4>
                  <p className="text-[10px] text-[#2B2B2B]/60 font-medium">Probiotic enriched</p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. HORIZONTAL CATEGORY NAVIGATION BAR                                      */}
        {/* ========================================================================= */}
        <div className="mb-8 flex items-center justify-center">
          <div className="bg-white p-2 rounded-2xl sm:rounded-full border border-[#FFE8A3] shadow-md flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-full overflow-x-auto">
            {categories.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-4 sm:px-6 py-2.5 rounded-xl sm:rounded-full font-black text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer select-none whitespace-nowrap ${
                    isActive
                      ? 'bg-[#D62828] text-white shadow-md shadow-[#D62828]/25 scale-102'
                      : 'bg-transparent text-[#2B2B2B]/75 hover:bg-[#FFE8A3]/40 hover:text-[#2B2B2B]'
                  }`}
                >
                  {cat.id === 'all' ? (
                    <LayoutGrid className="w-4 h-4" />
                  ) : (
                    <span className="text-base">{cat.emoji}</span>
                  )}
                  <span>{cat.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white ml-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. PRODUCT CARDS GRID (4 PER ROW DESKTOP, 2 TABLET, 1 MOBILE)            */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>

        {/* EMPTY STATE IF NO PRODUCTS MATCH */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#FFE8A3] p-8 max-w-lg mx-auto">
            <PawPrint className="w-12 h-12 text-[#D62828] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-black text-[#2B2B2B]">No products found in this category</h3>
            <p className="text-sm text-gray-500 mt-1">Please select another category or view All Products.</p>
            <button
              onClick={() => setActiveTab('all')}
              className="mt-4 px-6 py-2 rounded-full bg-[#D62828] text-white font-bold text-xs uppercase"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. PREMIUM TRUST INFORMATION STRIP                                       */}
        {/* ========================================================================= */}
        <div className="mt-14 pt-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#FFE8A3] shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* TRUST ITEM 1 */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FFE8A3]/50 text-[#D62828] flex items-center justify-center shrink-0 border border-[#FFE8A3]">
                <Truck className="w-7 h-7" />
              </div>
              <div className="text-left">
                <h4 className="text-sm sm:text-base font-black text-[#2B2B2B] leading-snug">Fast & Safe Delivery</h4>
                <p className="text-xs text-[#2B2B2B]/65 font-medium mt-0.5">On-time doorstep delivery</p>
              </div>
            </div>

            {/* TRUST ITEM 2 */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FFE8A3]/50 text-[#D62828] flex items-center justify-center shrink-0 border border-[#FFE8A3]">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="text-left">
                <h4 className="text-sm sm:text-base font-black text-[#2B2B2B] leading-snug">100% Quality Assured</h4>
                <p className="text-xs text-[#2B2B2B]/65 font-medium mt-0.5">Premium quality guaranteed</p>
              </div>
            </div>

            {/* TRUST ITEM 3 */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FFE8A3]/50 text-[#D62828] flex items-center justify-center shrink-0 border border-[#FFE8A3]">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <div className="text-left">
                <h4 className="text-sm sm:text-base font-black text-[#2B2B2B] leading-snug">Loved by Pets</h4>
                <p className="text-xs text-[#2B2B2B]/65 font-medium mt-0.5">Trusted by pet parents</p>
              </div>
            </div>

            {/* TRUST ITEM 4 */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FFE8A3]/50 text-[#D62828] flex items-center justify-center shrink-0 border border-[#FFE8A3]">
                <Headphones className="w-7 h-7" />
              </div>
              <div className="text-left">
                <h4 className="text-sm sm:text-base font-black text-[#2B2B2B] leading-snug">Expert Support</h4>
                <p className="text-xs text-[#2B2B2B]/65 font-medium mt-0.5">We are here to help you</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
