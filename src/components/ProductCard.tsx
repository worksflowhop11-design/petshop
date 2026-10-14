import React from 'react';
import { Eye, Info } from 'lucide-react';
import { ProductItem } from '../types';

interface ProductCardProps {
  product: ProductItem;
  onSelectProduct: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  // Determine dynamic button styles based on product type
  const isDog = product.petType === 'dog';
  const isWetFood = product.category === 'wet-food';

  const primaryBtnColor = isDog || isWetFood
    ? 'bg-[#D62828] hover:bg-[#B51F1F] text-white shadow-[#D62828]/20'
    : 'bg-[#F4C430] hover:bg-[#E0B225] text-[#2B2B2B] shadow-[#F4C430]/30';

  return (
    <div className="group bg-white rounded-3xl border border-[#FFE8A3]/80 shadow-md hover:shadow-2xl hover:border-[#F4C430] transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      <div>
        
        {/* TOP IMAGE CONTAINER */}
        <div className="relative bg-gradient-to-b from-[#FFFDF8] via-[#FFFDF8] to-white p-4 pt-5 text-center flex flex-col items-center">

          {/* MAIN PRODUCT PACKAGING IMAGE */}
          <div
            onClick={() => onSelectProduct(product)}
            className="w-full h-56 sm:h-60 relative flex items-center justify-center cursor-pointer group/img"
          >
            <img
              src={product.packageImage}
              alt={`${product.name} PETSHOP Packaging`}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="max-h-full max-w-full object-contain filter drop-shadow-xl transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500"
            />
            {/* Subtle Studio Floor Oval Shadow */}
            <div className="absolute bottom-1 w-32 sm:w-40 h-3.5 rounded-full bg-black/25 blur-md -z-10 group-hover:w-36 transition-all duration-300" />
          </div>

        </div>

        {/* PRODUCT DETAILS BODY */}
        <div className="p-5 pt-3 space-y-2.5 text-left">
          
          {/* CATEGORY / LIFE STAGE + PROTEIN HIGHLIGHT */}
          <div className="flex items-center flex-wrap gap-1.5 text-[11px]">
            <span className="font-bold text-[#D62828] bg-[#D62828]/10 px-2.5 py-0.5 rounded-md">
              {product.ageCategory}
            </span>
            <span className="font-semibold text-[#2B2B2B]/60 truncate">
              • {product.mainProtein}
            </span>
          </div>

          {/* PRODUCT NAME */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="text-base sm:text-lg font-black text-[#2B2B2B] group-hover:text-[#D62828] transition-colors leading-snug cursor-pointer line-clamp-1"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* SHORT DESCRIPTION */}
          <p className="text-xs text-[#2B2B2B]/75 font-medium leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>

          {/* TOP INGREDIENTS / BENEFIT PILLS */}
          <div className="pt-1.5">
            <div className="flex flex-wrap gap-1">
              {product.benefits && product.benefits.slice(0, 2).map((b, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-bold bg-[#FFFDF8] text-[#2B2B2B]/85 px-2 py-0.5 rounded-md border border-[#FFE8A3]"
                >
                  ✓ {b}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ACTION BUTTONS (VIEW DETAILS - NO PRICES) */}
      <div className="p-5 pt-2 pb-5 grid grid-cols-2 gap-2">
        <button
          onClick={() => onSelectProduct(product)}
          className={`py-2.5 px-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${primaryBtnColor}`}
          aria-label={`View full details for ${product.name}`}
        >
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">View Details</span>
        </button>

        <button
          onClick={() => onSelectProduct(product)}
          className="py-2.5 px-3 rounded-xl bg-[#FFFDF8] hover:bg-[#FFE8A3]/40 border border-[#FFE8A3] text-[#2B2B2B] font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 group/sec"
          aria-label={`Quick preview for ${product.name}`}
        >
          <Eye className="w-3.5 h-3.5 text-[#D62828] group-hover/sec:scale-110 transition-transform shrink-0" />
          <span className="truncate">Specs</span>
        </button>
      </div>

    </div>
  );
};
