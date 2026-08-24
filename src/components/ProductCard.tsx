import React from 'react';
import { PawPrint, Info, Sparkles, Check } from 'lucide-react';
import { ProductItem } from '../types';

interface ProductCardProps {
  product: ProductItem;
  onSelectProduct: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  return (
    <div className="group bg-white rounded-3xl border-2 border-[#FFE8A3] shadow-md hover:shadow-xl hover:border-[#F4C430] transition-all duration-300 flex flex-col justify-between overflow-hidden">
      <div>
        {/* HEADER BADGE & IMAGES */}
        <div className="relative bg-gradient-to-b from-[#FFE8A3]/30 to-white p-4 text-center">
          
          {/* PET TYPE BADGE */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#D62828] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
              <PawPrint className="w-3 h-3 fill-current text-[#F4C430]" />
              {product.petTypeLabel}
            </span>
          </div>

          {/* PROTEIN PERCENTAGE TAG */}
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F4C430] text-[#2B2B2B] text-[11px] font-black shadow-xs">
              <Sparkles className="w-3 h-3 text-[#D62828]" />
              {product.proteinPercentage.split(' ')[0]}
            </span>
          </div>

          {/* DUAL IMAGE SHOWCASE: PACKAGE + PET */}
          <div className="relative pt-6 pb-2 flex items-center justify-center gap-2">
            
            {/* BRANDED BAG */}
            <div className="w-32 h-36 relative z-10 rounded-2xl overflow-hidden shadow-md border border-[#FFE8A3] bg-white transform group-hover:scale-105 transition-transform duration-300">
              <img
                src={product.packageImage}
                alt={`${product.name} PETSHOP Package`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-1 right-1 bg-[#D62828]/90 text-white text-[9px] font-black uppercase tracking-widest text-center py-0.5 rounded-md backdrop-blur-xs">
                PETSHOP
              </div>
            </div>

            {/* PET PHOTO */}
            <div className="w-24 h-28 rounded-2xl overflow-hidden shadow-sm border border-[#FFE8A3] bg-white -ml-6 mt-4">
              <img
                src={product.petImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* CARD CONTENT */}
        <div className="p-5 space-y-3 text-left">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#D62828] bg-[#D62828]/10 px-2.5 py-0.5 rounded-md">
              {product.ageCategory}
            </span>
            <span className="text-xs font-semibold text-[#2B2B2B]/60">• {product.mainProtein}</span>
          </div>

          <h3 className="text-lg font-black text-[#2B2B2B] group-hover:text-[#D62828] transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-[#2B2B2B]/70 font-medium leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>

          {/* INGREDIENTS PREVIEW */}
          <div className="pt-1">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#2B2B2B]/50 mb-1">
              Top Ingredients
            </p>
            <div className="flex flex-wrap gap-1">
              {product.ingredients.slice(0, 3).map((ing, i) => (
                <span
                  key={i}
                  className="text-[10px] font-semibold bg-[#FFFDF8] text-[#2B2B2B]/80 px-2 py-0.5 rounded-md border border-[#FFE8A3]"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* KEY BENEFITS */}
          <div className="pt-2 border-t border-[#FFE8A3]/60 space-y-1">
            {product.benefits.slice(0, 2).map((b, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[11px] font-bold text-[#2B2B2B]/90">
                <Check className="w-3.5 h-3.5 text-[#D62828] shrink-0" />
                <span className="truncate">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CARD ACTION BUTTON (INFO ONLY - NO CART / PRICE) */}
      <div className="p-5 pt-0">
        <button
          onClick={() => onSelectProduct(product)}
          className="w-full py-3 px-4 rounded-xl bg-[#FFFDF8] border-2 border-[#D62828] text-[#D62828] font-bold text-xs uppercase tracking-wider hover:bg-[#D62828] hover:text-white transition-all duration-200 shadow-xs flex items-center justify-center gap-2 group/btn"
        >
          <Info className="w-4 h-4 text-[#D62828] group-hover/btn:text-white transition-colors" />
          <span>Formula & Feeding Specs</span>
        </button>
      </div>
    </div>
  );
};
