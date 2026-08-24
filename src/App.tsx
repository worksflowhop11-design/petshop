import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { OurProductsShowcase } from './components/OurProductsShowcase';
import { TrustSection } from './components/TrustSection';
import { AboutSection } from './components/AboutSection';
import { ProductCollection } from './components/ProductCollection';
import { WhyPetshop } from './components/WhyPetshop';
import { BenefitsGrid } from './components/BenefitsGrid';
import { DogFoodSection } from './components/DogFoodSection';
import { CatFoodSection } from './components/CatFoodSection';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { FeedingCalculator } from './components/FeedingCalculator';
import { ProductModal } from './components/ProductModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ScrollToTop } from './components/ScrollToTop';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsAndConditionsPage } from './components/TermsAndConditionsPage';
import { ProductItem } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [activeSection, setActiveSection] = useState('hero');
  const [searchOpen, setSearchOpen] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Sync route path changes via popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Track active landing section on scroll if on home route
  useEffect(() => {
    if (currentPath !== '/') return;

    const handleScroll = () => {
      const sections = [
        'hero',
        'our-products',
        'trust-achievements',
        'about',
        'dog-food',
        'cat-food',
        'products',
        'why-us',
        'benefits',
        'testimonials',
        'faq',
        'contact',
      ];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  // Unified navigation helper
  const handleNavigate = (path: string, sectionId?: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);

    if (path === '/' && sectionId) {
      setTimeout(() => {
        const cleanId = sectionId.startsWith('#') ? sectionId.slice(1) : sectionId;
        const el = document.getElementById(cleanId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#2B2B2B] font-sans selection:bg-[#F4C430] selection:text-[#2B2B2B] antialiased">
      {/* HEADER WITH TOP CONTACT BAR */}
      <Header
        activeSection={activeSection}
        currentPath={currentPath}
        onOpenSearch={() => setSearchOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* ROUTING VIEW LOGIC */}
      {currentPath === '/privacy-policy' ? (
        <PrivacyPolicyPage
          onBackToHome={(sec) => handleNavigate('/', sec)}
          onNavigateTerms={() => handleNavigate('/terms-and-conditions')}
        />
      ) : currentPath === '/terms-and-conditions' ? (
        <TermsAndConditionsPage
          onBackToHome={(sec) => handleNavigate('/', sec)}
          onNavigatePrivacy={() => handleNavigate('/privacy-policy')}
        />
      ) : (
        <>
          {/* HERO SECTION */}
          <HeroSection />

          {/* OUR PRODUCTS SHOWCASE */}
          <OurProductsShowcase onSelectProduct={(product) => setSelectedProduct(product)} />

          {/* SECTION 1: TRUST & ACHIEVEMENT */}
          <TrustSection />

          {/* SECTION 2: ABOUT PETSHOP */}
          <AboutSection />

          {/* PRODUCT COLLECTION (Dog & Cat Showcase) */}
          <ProductCollection
            onSelectProduct={(product) => setSelectedProduct(product)}
          />

          {/* WHY PETSHOP (10 Pillars) */}
          <WhyPetshop />

          {/* BENEFITS GRID (4 Core Promises) */}
          <BenefitsGrid />

          {/* DOG FOOD SPOTLIGHT */}
          <DogFoodSection
            onOpenCalculator={() => setCalculatorOpen(true)}
          />

          {/* CAT FOOD SPOTLIGHT */}
          <CatFoodSection
            onOpenCalculator={() => setCalculatorOpen(true)}
          />

          {/* TESTIMONIALS */}
          <Testimonials />

          {/* FAQ */}
          <FaqSection />

          {/* CONTACT */}
          <ContactSection />
        </>
      )}

      {/* FOOTER */}
      <Footer onNavigate={handleNavigate} />

      {/* SEARCH OVERLAY */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      {/* FEEDING CALCULATOR MODAL */}
      <FeedingCalculator
        isOpen={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
      />

      {/* PRODUCT FORMULA MODAL */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* FLOATING WHATSAPP BUTTON */}
      <WhatsAppButton />

      {/* SCROLL TO TOP FLOATING BUTTON */}
      <ScrollToTop />
    </div>
  );
}
