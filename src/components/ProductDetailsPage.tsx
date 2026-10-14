import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  PawPrint,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  Share2,
  Heart,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { fetchProducts } from '../services/firestoreService';
import { FirestoreProduct } from '../types/admin';

interface ProductDetailsPageProps {
  productId: string;
  onBackToHome: (section?: string) => void;
  onNavigate: (path: string) => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  productId,
  onBackToHome,
  onNavigate,
}) => {
  const [product, setProduct] = useState<FirestoreProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const allProducts = await fetchProducts();
      const found = allProducts.find((p) => p.id === productId);
      if (found) {
        setProduct(found);
        setSelectedImage(found.packageImage);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 bg-[#FFFDF8]">
        <div className="w-10 h-10 border-4 border-[#EE1630] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-bold text-[#061B3A]">Loading PETSHOP nutrition formula...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4 text-center bg-[#FFFDF8]">
        <div className="w-16 h-16 rounded-full bg-red-100 text-[#EE1630] flex items-center justify-center mb-4">
          <PawPrint className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-[#061B3A]">Product Not Found</h2>
        <p className="text-sm text-slate-500 max-w-md mt-2 mb-6">
          The requested pet food formula might have been moved or updated.
        </p>
        <button
          onClick={() => onBackToHome('products')}
          className="px-6 py-3 rounded-full bg-[#EE1630] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#D61429] cursor-pointer"
        >
          Explore All Products
        </button>
      </div>
    );
  }

  const galleryImages = [
    product.packageImage,
    ...(product.additionalImages || []),
  ].filter(Boolean);

  const isDog = product.petType === 'dog';
  const hasDiscount = product.salePrice && product.salePrice < (product.price || 0);

  return (
    <div className="min-h-screen bg-[#FFFDF8] py-8 sm:py-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onBackToHome()}
              className="hover:text-[#EE1630] transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <button
              onClick={() => onBackToHome('products')}
              className="hover:text-[#EE1630] transition-colors cursor-pointer"
            >
              Products
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-[#061B3A] font-bold line-clamp-1">{product.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[#061B3A] hover:border-[#EE1630] transition-colors cursor-pointer shadow-xs text-xs font-bold"
            >
              <Share2 className="w-3.5 h-3.5 text-[#EE1630]" />
              <span>{copied ? 'Link Copied!' : 'Share Formula'}</span>
            </button>
          </div>
        </div>

        {/* Main Product Showcase Box */}
        <div className="bg-white rounded-3xl border border-[#FFE8A3]/70 shadow-sm p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Packaging Visuals (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
            <div className="relative w-full aspect-square max-w-[420px] rounded-3xl bg-gradient-to-b from-[#FFFDF8] to-white border border-slate-100 flex items-center justify-center p-6 shadow-xs group">
              <img
                src={selectedImage}
                alt={product.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />

              {hasDiscount && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#EE1630] text-white text-xs font-black shadow-sm">
                  SAVE ${(product.price! - product.salePrice!).toFixed(2)}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto py-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-2xl border-2 p-1 bg-white cursor-pointer transition-all ${
                      selectedImage === img
                        ? 'border-[#EE1630] shadow-md scale-105'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Details & Specs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EE1630] text-white text-[11px] font-black uppercase tracking-wider shadow-xs">
                <PawPrint className="w-3.5 h-3.5 text-[#FFC21C] fill-[#FFC21C]" />
                <span>{product.brand || 'PETSHOP'}</span>
              </span>

              <span className="px-3 py-1 rounded-full bg-[#FFE082]/60 text-[#061B3A] text-xs font-bold uppercase tracking-wider">
                {product.petTypeLabel || (isDog ? 'For Adult Dogs' : 'For Adult Cats')}
              </span>

              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                {product.packSize || '3 kg Bag'}
              </span>
            </div>

            {/* Title & Product Code */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#061B3A] tracking-tight leading-tight">
                {product.name}
              </h1>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Product SKU: {product.productCode || 'PET-AUTO'} • Suitable For: {product.suitableFor || 'All Breeds'}
              </p>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 pb-2 border-b border-slate-100">
              <span className="text-3xl font-black text-[#EE1630]">
                ${(product.salePrice || product.price || 29.99).toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-lg font-bold text-slate-400 line-through">
                  ${product.price?.toFixed(2)}
                </span>
              )}
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                In Stock &amp; Ready to Ship
              </span>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {product.longDescription || product.shortDescription}
            </p>

            {/* Key Nutrition Formula Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Protein</span>
                <span className="font-black text-sm text-[#061B3A]">{product.proteinPercentage || '32%'}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Fats</span>
                <span className="font-black text-sm text-[#061B3A]">{product.fatPercentage || '16%'}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Fiber</span>
                <span className="font-black text-sm text-[#061B3A]">{product.fiberPercentage || '3.8%'}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Primary</span>
                <span className="font-black text-xs text-[#EE1630] line-clamp-1">{product.mainProtein || 'Real Meat'}</span>
              </div>
            </div>

            {/* Action Buttons: Order via WhatsApp & Public Support */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={`https://wa.me/18002703585?text=Hello%20PETSHOP!%20I%20would%20like%20to%20order%20the%20${encodeURIComponent(product.name)}%20(${product.packSize || '3 kg'}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[200px] py-4 px-6 rounded-full bg-[#EE1630] hover:bg-[#D61429] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-[#EE1630]/25 transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-102"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order via Customer Desk</span>
              </a>

              <button
                onClick={() => onBackToHome('contact')}
                className="py-4 px-6 rounded-full bg-[#FFE082] hover:bg-[#FFD54F] text-[#061B3A] font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
              >
                Inquire &amp; Feeding Advice
              </button>
            </div>

          </div>

        </div>

        {/* Nutritional Breakdown & Ingredients Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Ingredients */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#FFE8A3]/70 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <ShieldCheck className="w-5 h-5 text-[#EE1630]" />
              <h3 className="font-black text-lg text-[#061B3A]">Real Ingredients Breakdown</h3>
            </div>
            
            <ul className="space-y-2 text-xs font-semibold text-slate-700">
              {Array.isArray(product.ingredients) && product.ingredients.length > 0 ? (
                product.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{ing}</span>
                  </li>
                ))
              ) : (
                <li className="text-slate-500">Real Deboned Meat, Whole Grains, Sweet Potatoes, Vitamins &amp; Chelated Minerals.</li>
              )}
            </ul>
          </div>

          {/* Benefits */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#FFE8A3]/70 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Sparkles className="w-5 h-5 text-[#FFC21C]" />
              <h3 className="font-black text-lg text-[#061B3A]">Key Health Benefits</h3>
            </div>
            
            <ul className="space-y-2 text-xs font-semibold text-slate-700">
              {Array.isArray(product.benefits) && product.benefits.length > 0 ? (
                product.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#FFC21C] text-[#061B3A] text-[9px] font-black flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>{b}</span>
                  </li>
                ))
              ) : (
                <li className="text-slate-500">Complete &amp; balanced nutrition formulated with clinical veterinarian guidance.</li>
              )}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
