import React, { useState } from 'react';
import { X, Search, PawPrint, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../data/petshopData';
import { ProductItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: ProductItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectProduct }) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const searchResults = PRODUCTS.filter((p) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.ingredients.some((i) => i.toLowerCase().includes(q)) ||
      p.petTypeLabel.toLowerCase().includes(q) ||
      p.benefits.some((b) => b.toLowerCase().includes(q))
    );
  });

  const popularTags = ['Chicken', 'Salmon', 'Puppy', 'Kitten', 'Lamb', 'Taurine', 'Hairball', 'Senior'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#FFFDF8] rounded-3xl shadow-2xl border-2 border-[#FFE8A3] p-6 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#FFE8A3]/50 text-[#2B2B2B] hover:bg-[#D62828] hover:text-white transition-colors"
          aria-label="Close search"
        >
          <X className="w-5 h-5" />
        </button>

        {/* INPUT */}
        <div className="relative mt-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D62828]" />
          <input
            type="text"
            autoFocus
            placeholder="Search food recipes, ingredients (e.g. salmon, puppy, lamb)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl border-2 border-[#FFE8A3] bg-white text-base font-bold text-[#2B2B2B] focus:outline-none focus:border-[#D62828] shadow-inner"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#2B2B2B]/50 hover:text-[#D62828]"
            >
              Clear
            </button>
          )}
        </div>

        {/* POPULAR SUGGESTIONS */}
        {!query && (
          <div className="mt-6 space-y-3">
            <p className="text-xs font-extrabold uppercase text-[#2B2B2B]/60 tracking-wider">
              Popular Search Topics
            </p>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3.5 py-1.5 rounded-full bg-white border border-[#FFE8A3] text-xs font-bold text-[#2B2B2B] hover:bg-[#F4C430] transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULTS LIST */}
        {query && (
          <div className="mt-6 max-h-80 overflow-y-auto space-y-3 pr-1">
            <p className="text-xs font-extrabold uppercase text-[#2B2B2B]/60 tracking-wider">
              Search Results ({searchResults.length})
            </p>

            {searchResults.length === 0 ? (
              <div className="py-8 text-center text-sm font-medium text-[#2B2B2B]/60 bg-white rounded-2xl border border-[#FFE8A3]">
                No PETSHOP formulas match "{query}". Try searching for 'chicken', 'salmon', or 'puppy'.
              </div>
            ) : (
              searchResults.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="p-3 rounded-2xl bg-white border border-[#FFE8A3] hover:border-[#D62828] shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FFE8A3]/40 p-1 shrink-0">
                      <img
                        src={p.packageImage}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold text-[#D62828] uppercase">
                        {p.petTypeLabel}
                      </span>
                      <h4 className="text-sm font-extrabold text-[#2B2B2B] group-hover:text-[#D62828] transition-colors">
                        {p.name}
                      </h4>
                      <p className="text-xs text-[#2B2B2B]/60 font-medium line-clamp-1">
                        {p.mainProtein} • {p.proteinPercentage}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-[#D62828] group-hover:translate-x-1 transition-transform" />
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};
