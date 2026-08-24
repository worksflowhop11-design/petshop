import React, { useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Database,
  Eye,
  Cookie,
  UserCheck,
  Building2,
  Mail,
  Phone,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  FileCheck2,
  Globe
} from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBackToHome: (sectionId?: string) => void;
  onNavigateTerms: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
  onBackToHome,
  onNavigateTerms,
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
            <ShieldCheck className="w-4 h-4" />
            <span>Official Legal Document</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-sans">
            PRIVACY POLICY
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-medium text-white/90 max-w-3xl mx-auto leading-relaxed">
            &ldquo;Your privacy matters to PETSHOP. We are committed to protecting your personal information and maintaining your trust.&rdquo;
          </p>

          <p className="text-xs text-white/70 font-semibold pt-2">
            Last Updated: August 2026 • Version 2.4
          </p>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-8">
        
        {/* QUICK NAVIGATION BAR */}
        <div className="bg-white border border-[#FFE8A3] rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2B2B2B]">
            <Globe className="w-4 h-4 text-[#D62828]" />
            <span>Looking for Terms & Conditions?</span>
          </div>
          <button
            onClick={onNavigateTerms}
            className="px-4 py-2 rounded-full bg-[#FFE8A3]/60 hover:bg-[#D62828] hover:text-white text-[#2B2B2B] text-xs font-extrabold transition-colors duration-200 cursor-pointer"
          >
            Read Terms & Conditions →
          </button>
        </div>

        {/* 1. INTRODUCTION */}
        <section className="bg-white border border-[#FFE8A3] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md space-y-4">
          <div className="flex items-center gap-3 border-b border-[#FFE8A3]/60 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] uppercase tracking-tight">
              1. Introduction
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            Welcome to <strong className="text-[#D62828]">PETSHOP</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We prioritize the confidentiality and safety of your personal data. As a premier provider of veterinarian-formulated canine and feline nutrition, we hold ourselves to the highest standards of transparency and integrity.
          </p>
          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            This Privacy Policy outlines how PETSHOP collects, uses, protects, and discloses personal information when you visit our website, submit inquiries, interact with our feeding calculator tools, or communicate with our pet care support staff.
          </p>
        </section>

        {/* 2. INFORMATION WE COLLECT */}
        <section className="bg-white border border-[#FFE8A3] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md space-y-6">
          <div className="flex items-center gap-3 border-b border-[#FFE8A3]/60 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] uppercase tracking-tight">
              2. Information We Collect
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            To provide tailored dietary recommendations, responsive customer service, and seamless platform navigation, PETSHOP collects specific data points including:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {[
              { title: 'Full Name', desc: 'Provided during inquiries, support interactions, or order requests.' },
              { title: 'Email Address', desc: 'Used for nutritional consultations, responses, and optional updates.' },
              { title: 'Phone Number', desc: 'For direct support, toll-free inquiry assistance, or delivery alerts.' },
              { title: 'Shipping Address', desc: 'Required when requesting sample packages or product shipments.' },
              { title: 'Contact Messages', desc: 'Details shared when asking about pet diets or custom formulas.' },
              { title: 'Website Analytics', desc: 'Anonymous traffic metrics, page views, and navigation flows.' },
              { title: 'Cookies & Identifiers', desc: 'Essential session cookies for saved feeding calculations & preferences.' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#FFFDF8] border border-[#FFE8A3]/80 space-y-1">
                <div className="flex items-center gap-2 font-bold text-[#D62828] text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#F4C430] shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs text-[#2B2B2B]/75 font-medium leading-normal pl-6">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. HOW WE USE YOUR INFORMATION */}
        <section className="bg-white border border-[#FFE8A3] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md space-y-6">
          <div className="flex items-center gap-3 border-b border-[#FFE8A3]/60 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center font-bold">
              <Eye className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] uppercase tracking-tight">
              3. How We Use Your Information
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            We utilize the collected information strictly for operational, customer satisfaction, and product improvement purposes. PETSHOP does not sell or rent your personal information to third-party marketers.
          </p>

          <ul className="space-y-3 pt-1 text-sm sm:text-base text-[#2B2B2B]/85 font-medium">
            {[
              'Customer Support: Responding swiftly to inquiries submitted via our web forms, email, or telephone hotline.',
              'Product Recommendations: Tailoring formula suggestions based on your pet species, breed, age, and health sensitivity.',
              'Website Improvement: Analyzing website performance to optimize navigation, search tools, and loading speed.',
              'Marketing Emails (Optional): Sending periodic pet care advice, seasonal promotions, or new recipe releases (you may opt out anytime).',
              'Order Communication: Sending order status notifications, shipping confirmations, and billing receipts.',
            ].map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#D62828] mt-2 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 4. COOKIES POLICY */}
        <section className="bg-white border border-[#FFE8A3] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md space-y-4">
          <div className="flex items-center gap-3 border-b border-[#FFE8A3]/60 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center font-bold">
              <Cookie className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] uppercase tracking-tight">
              4. Cookies Policy
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            PETSHOP uses cookies and similar browser tracking technologies to elevate your browsing experience. Cookies are small text files stored on your device that help our website recognize your device, remember active search filters, and store feeding calculator inputs.
          </p>
          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            You can modify your browser settings to decline cookies or receive alerts when cookies are being sent. However, disabling cookies may limit your ability to use certain interactive tools on our site.
          </p>
        </section>

        {/* 5. DATA PROTECTION */}
        <section className="bg-white border border-[#FFE8A3] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md space-y-4">
          <div className="flex items-center gap-3 border-b border-[#FFE8A3]/60 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] uppercase tracking-tight">
              5. Data Protection
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            We implement comprehensive technical, administrative, and physical security measures to safeguard your personal information against unauthorized access, loss, misuse, or alteration.
          </p>
          <div className="p-4 rounded-xl bg-[#1E4DB7]/5 border border-[#1E4DB7]/20 flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-[#1E4DB7] shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-[#2B2B2B]/90 font-semibold leading-relaxed">
              All communications on the PETSHOP website are encrypted using standard 256-bit SSL (Secure Sockets Layer) technology. Our secure database infrastructure undergoes regular routine audits to ensure compliance with global data protection standards.
            </p>
          </div>
        </section>

        {/* 6. THIRD-PARTY SERVICES */}
        <section className="bg-white border border-[#FFE8A3] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md space-y-4">
          <div className="flex items-center gap-3 border-b border-[#FFE8A3]/60 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center font-bold">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] uppercase tracking-tight">
              6. Third-Party Services
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            PETSHOP may engage trusted third-party service providers to assist with secure payment processing, website analytics (e.g., Google Analytics), customer notification services, and order fulfillment.
          </p>
          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            These third parties are granted access to personal information strictly necessary to perform their specialized tasks and are bound by confidentiality agreements prohibiting them from using your data for any independent marketing purposes.
          </p>
        </section>

        {/* 7. CHILDREN'S PRIVACY */}
        <section className="bg-white border border-[#FFE8A3] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md space-y-4">
          <div className="flex items-center gap-3 border-b border-[#FFE8A3]/60 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] uppercase tracking-tight">
              7. Children&apos;s Privacy
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            PETSHOP products and online services are intended for adult pet owners. We do not knowingly collect or solicit personal information from children under the age of 18. If we learn that we have inadvertently collected data from a minor without verified parental consent, we will promptly delete that information from our servers.
          </p>
        </section>

        {/* 8. YOUR RIGHTS */}
        <section className="bg-white border border-[#FFE8A3] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md space-y-6">
          <div className="flex items-center gap-3 border-b border-[#FFE8A3]/60 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] uppercase tracking-tight">
              8. Your Rights & Options
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            You maintain full ownership over your personal data. As a valued PETSHOP customer, you may exercise the following rights at any time:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Access Data', desc: 'Request a copy of the personal information PETSHOP holds about you.' },
              { title: 'Update Data', desc: 'Correct or complete any inaccurate contact details or shipping addresses.' },
              { title: 'Delete Data', desc: 'Request the deletion of your account and associated communication logs.' },
              { title: 'Opt Out of Marketing', desc: 'Unsubscribe easily using the link in our emails or contacting support.' },
            ].map((r, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#FFE8A3]/20 border border-[#FFE8A3] space-y-1">
                <h4 className="font-bold text-[#D62828] text-sm">{r.title}</h4>
                <p className="text-xs text-[#2B2B2B]/80 font-medium">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. CONTACT INFORMATION */}
        <section className="bg-gradient-to-br from-white to-[#FFFDF8] border-2 border-[#D62828]/30 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg space-y-6">
          <div className="flex items-center gap-3 border-b border-[#D62828]/20 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#D62828] text-white flex items-center justify-center font-bold shadow-md">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] uppercase tracking-tight">
                9. Contact Information
              </h2>
              <p className="text-xs text-[#2B2B2B]/60 font-bold uppercase tracking-wider">
                PETSHOP Data Protection Team
              </p>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#2B2B2B]/85 leading-relaxed font-medium">
            If you have questions regarding this Privacy Policy, wish to exercise your data privacy rights, or need assistance with your personal details, please contact us at:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* ADDRESS CARD */}
            <div className="p-5 rounded-2xl bg-white border border-[#FFE8A3] shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center mb-1">
                <MapPin className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-extrabold uppercase text-[#2B2B2B]/60 tracking-wider">
                Office Address
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
                Mon - Fri: 8:00 AM - 6:00 PM PST
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
                Guaranteed response within 24 hours
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
