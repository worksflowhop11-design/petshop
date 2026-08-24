import React, { useEffect } from 'react';
import {
  Scale,
  FileText,
  AlertCircle,
  Building2,
  Mail,
  Phone,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  ShieldAlert,
  Globe,
  Award,
  BookOpen
} from 'lucide-react';

interface TermsAndConditionsPageProps {
  onBackToHome: (sectionId?: string) => void;
  onNavigatePrivacy: () => void;
}

export const TermsAndConditionsPage: React.FC<TermsAndConditionsPageProps> = ({
  onBackToHome,
  onNavigatePrivacy,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#2B2B2B] antialiased">
      {/* HERO BANNER SECTION */}
      <section className="bg-gradient-to-b from-[#D62828] to-[#B51F1F] text-white py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden shadow-lg">
        {/* Subtle decorative background circles */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-[#F4C430]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          {/* Back Button */}
          <div className="flex justify-start mb-4">
            <button
              onClick={() => onBackToHome('hero')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition-all duration-200 backdrop-blur-xs cursor-pointer border border-white/15"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to PETSHOP Home</span>
            </button>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4C430]/20 border border-[#F4C430]/30 text-[#F4C430] text-xs font-extrabold uppercase tracking-widest">
            <Scale className="w-4 h-4" />
            <span>Terms of Service Agreement</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-sans">
            TERMS &amp; CONDITIONS
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-medium text-white/90 max-w-3xl mx-auto leading-relaxed">
            &ldquo;Please read these Terms &amp; Conditions carefully before using the PETSHOP website.&rdquo;
          </p>

          <p className="text-xs text-white/70 font-semibold pt-2">
            Effective Date: August 2026 • PETSHOP Nutrition Inc.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-8">

        {/* QUICK NAVIGATION BAR */}
        <div className="bg-white border border-[#FFE8A3] rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2B2B2B]">
            <Globe className="w-4 h-4 text-[#D62828]" />
            <span>Want to review our Privacy Policy?</span>
          </div>
          <button
            onClick={onNavigatePrivacy}
            className="px-4 py-2 rounded-full bg-[#FFE8A3]/60 hover:bg-[#D62828] hover:text-white text-[#2B2B2B] text-xs font-extrabold transition-colors duration-200 cursor-pointer"
          >
            Read Privacy Policy →
          </button>
        </div>

        {/* 1. ACCEPTANCE OF TERMS */}
        <section className="bg-white border border-[#FFE8A3] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md space-y-4">
          <div className="flex items-center gap-3 border-b border-[#FFE8A3]/60 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] uppercase tracking-tight">
              1. Acceptance of Terms
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            By accessing, browsing, or utilizing any portion of the <strong className="text-[#D62828]">PETSHOP</strong> website, digital calculators, product showcases, or interactive inquiry tools, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms &amp; Conditions.
          </p>
          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            If you do not agree with any part of these terms, you must refrain from using this website or purchasing PETSHOP products online.
          </p>
        </section>

        {/* 2. WEBSITE USAGE */}
        <section className="bg-white border border-[#FFE8A3] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md space-y-4">
          <div className="flex items-center gap-3 border-b border-[#FFE8A3]/60 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] uppercase tracking-tight">
              2. Website Usage
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            You agree to use the PETSHOP website exclusively for lawful purposes and in a manner that does not infringe upon the rights of, or restrict or inhibit the use and enjoyment of this site by any third party.
          </p>
          <div className="p-4 rounded-xl bg-[#FFFDF8] border border-[#FFE8A3] space-y-2">
            <h4 className="font-bold text-[#D62828] text-sm">Prohibited Activities Include:</h4>
            <ul className="text-xs sm:text-sm text-[#2B2B2B]/80 font-medium space-y-1.5 list-disc pl-5">
              <li>Automated data extraction, web scraping, or crawling of PETSHOP content without express written consent.</li>
              <li>Attempting to compromise site security, introduce computer viruses, or overload our web server infrastructure.</li>
              <li>Submitting fraudulent, misleading, or abusive inquiry forms or impersonating PETSHOP representatives.</li>
            </ul>
          </div>
        </section>

        {/* 3. PRODUCT INFORMATION & VETERINARY STANDARDS */}
        <section className="bg-white border border-[#FFE8A3] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md space-y-4">
          <div className="flex items-center gap-3 border-b border-[#FFE8A3]/60 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] uppercase tracking-tight">
              3. Product Information &amp; Standards
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            All PETSHOP canine and feline nutrition formulas are manufactured in accordance with strict international AAFCO (Association of American Feed Control Officials) dietary profiles.
          </p>
          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            While we make every effort to display accurate ingredient lists, guaranteed nutrient analysis, and packaging visuals, minor variations in natural raw ingredients or seasonal packaging designs may occur.
          </p>
        </section>

        {/* 4. PRICING DISCLAIMER */}
        <section className="bg-white border border-[#FFE8A3] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md space-y-4">
          <div className="flex items-center gap-3 border-b border-[#FFE8A3]/60 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] uppercase tracking-tight">
              4. Pricing &amp; Availability Disclaimer
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            All prices, product specifications, and promotional discounts featured on the PETSHOP website are subject to change without prior notice.
          </p>
          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            In the event a product price or nutritional detail is listed incorrectly due to a technical error, PETSHOP reserves the right to cancel or adjust any orders placed for that item prior to shipment dispatch.
          </p>
        </section>

        {/* 5. INTELLECTUAL PROPERTY */}
        <section className="bg-white border border-[#FFE8A3] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md space-y-4">
          <div className="flex items-center gap-3 border-b border-[#FFE8A3]/60 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] uppercase tracking-tight">
              5. Intellectual Property
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            All original content on this site—including but not limited to the PETSHOP logo, brand name, custom packaging graphics, product photography, text descriptions, feeding algorithms, and design elements—is the exclusive intellectual property of <strong className="text-[#D62828]">PETSHOP Nutrition Inc.</strong>
          </p>
          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            No material from this site may be copied, reproduced, republished, uploaded, posted, transmitted, or distributed in any way without prior explicit written permission.
          </p>
        </section>

        {/* 6. USER RESPONSIBILITIES */}
        <section className="bg-white border border-[#FFE8A3] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md space-y-4">
          <div className="flex items-center gap-3 border-b border-[#FFE8A3]/60 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] uppercase tracking-tight">
              6. User Responsibilities
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            When providing details regarding your pet species, weight, breed, or dietary preferences via our contact forms or feeding calculators, you agree to submit truthful and accurate information to receive appropriate feeding advice.
          </p>
        </section>

        {/* 7. LIMITATION OF LIABILITY */}
        <section className="bg-white border border-[#FFE8A3] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md space-y-4">
          <div className="flex items-center gap-3 border-b border-[#FFE8A3]/60 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] uppercase tracking-tight">
              7. Limitation of Liability
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            The information provided on this website—including feeding guidelines, nutritional articles, and automated calculations—is intended for general educational guidance only. It is not intended to replace personalized clinical advice from a licensed veterinarian.
          </p>
          <div className="p-4 rounded-xl bg-[#D62828]/5 border border-[#D62828]/20 flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-[#D62828] shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-[#2B2B2B]/90 font-semibold leading-relaxed">
              PETSHOP shall not be held liable for indirect, incidental, or consequential damages resulting from improper feeding portions, unaddressed medical conditions, or failure to consult a qualified veterinarian for specialized medical emergencies.
            </p>
          </div>
        </section>

        {/* 8. EXTERNAL LINKS */}
        <section className="bg-white border border-[#FFE8A3] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md space-y-4">
          <div className="flex items-center gap-3 border-b border-[#FFE8A3]/60 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] uppercase tracking-tight">
              8. External Links
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            Our website may contain links to official social media channels, delivery partners, or payment gateways. PETSHOP is not responsible for the content, security practices, or privacy policies of third-party external websites.
          </p>
        </section>

        {/* 9. PRIVACY REFERENCE */}
        <section className="bg-white border border-[#FFE8A3] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md space-y-4">
          <div className="flex items-center gap-3 border-b border-[#FFE8A3]/60 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] uppercase tracking-tight">
              9. Privacy Reference
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            Your submission of personal data through this website is governed by our{' '}
            <button
              onClick={onNavigatePrivacy}
              className="text-[#D62828] font-bold underline hover:text-[#1E4DB7] cursor-pointer"
            >
              PETSHOP Privacy Policy
            </button>
            , which details our collection practices, encryption protocols, and your data ownership rights.
          </p>
        </section>

        {/* 10. CHANGES TO TERMS */}
        <section className="bg-white border border-[#FFE8A3] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md space-y-4">
          <div className="flex items-center gap-3 border-b border-[#FFE8A3]/60 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] uppercase tracking-tight">
              10. Changes to Terms
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            PETSHOP reserves the right to modify, update, or revise these Terms &amp; Conditions at any time. Any changes will become effective immediately upon posting to this page. Your continued use of the PETSHOP website following posted changes constitutes your binding acceptance of the updated terms.
          </p>
        </section>

        {/* 11. GOVERNING LAW */}
        <section className="bg-white border border-[#FFE8A3] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md space-y-4">
          <div className="flex items-center gap-3 border-b border-[#FFE8A3]/60 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] uppercase tracking-tight">
              11. Governing Law &amp; Jurisdiction
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            These Terms &amp; Conditions are governed by and construed in accordance with the laws of <strong className="text-[#D62828]">Gujarat, India</strong>. Any disputes or claims arising out of or relating to the use of this website shall be subject to the exclusive jurisdiction of the competent courts located in Ahmedabad, Gujarat, India.
          </p>
        </section>

        {/* 12. CONTACT INFORMATION */}
        <section className="bg-gradient-to-br from-white to-[#FFFDF8] border-2 border-[#D62828]/30 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg space-y-6">
          <div className="flex items-center gap-3 border-b border-[#D62828]/20 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#D62828] text-white flex items-center justify-center font-bold shadow-md">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] uppercase tracking-tight">
                12. Contact Information
              </h2>
              <p className="text-xs text-[#2B2B2B]/60 font-bold uppercase tracking-wider">
                PETSHOP Corporate Legal Department
              </p>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            For questions, legal inquiries, or formal correspondence regarding these Terms &amp; Conditions, please reach out to:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* ADDRESS CARD */}
            <div className="p-5 rounded-2xl bg-white border border-[#FFE8A3] shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center mb-1">
                <MapPin className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-extrabold uppercase text-[#2B2B2B]/60 tracking-wider">
                Corporate Address
              </h4>
              <p className="text-xs sm:text-sm font-bold text-[#2B2B2B] leading-relaxed">
                PETSHOP Headquarters<br />
                101 Hill Town Impress<br />
                Nikol, Ahmedabad – 382350<br />
                Gujarat, India
              </p>
            </div>

            {/* PHONE CARD */}
            <div className="p-5 rounded-2xl bg-white border border-[#FFE8A3] shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center mb-1">
                <Phone className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-extrabold uppercase text-[#2B2B2B]/60 tracking-wider">
                Toll-Free Phone
              </h4>
              <a
                href="tel:18002703585"
                className="text-sm font-bold text-[#D62828] hover:underline hover:brightness-125 transition-all duration-200 block cursor-pointer"
              >
                1800-270-3585
              </a>
              <p className="text-[11px] text-[#2B2B2B]/60 font-semibold">
                Direct Legal Assistance
              </p>
            </div>

            {/* EMAIL CARD */}
            <div className="p-5 rounded-2xl bg-white border border-[#FFE8A3] shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center mb-1">
                <Mail className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-extrabold uppercase text-[#2B2B2B]/60 tracking-wider">
                Email Inquiries
              </h4>
              <a
                href="mailto:petshop@gmail.com"
                className="text-sm font-bold text-[#D62828] hover:underline transition-colors duration-200 block cursor-pointer"
              >
                petshop@gmail.com
              </a>
              <p className="text-[11px] text-[#2B2B2B]/60 font-semibold">
                Legal &amp; Policy Helpdesk
              </p>
            </div>
          </div>
        </section>

        {/* BOTTOM NAVIGATION FOOTNOTE */}
        <div className="text-center pt-6 pb-4">
          <button
            onClick={() => onBackToHome('hero')}
            className="px-8 py-3.5 rounded-full bg-[#D62828] hover:bg-[#1E4DB7] text-white text-sm font-black shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer uppercase tracking-wider"
          >
            Return to PETSHOP Landing Page
          </button>
        </div>

      </main>
    </div>
  );
};
