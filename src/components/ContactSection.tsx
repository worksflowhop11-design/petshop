import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, PawPrint, Navigation, ExternalLink } from 'lucide-react';

const SHOP_ADDRESS = '101 Hill Town Impress, Nikol, Ahmedabad – 382350, Gujarat, India';
const GOOGLE_MAPS_SEARCH_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SHOP_ADDRESS)}`;
const GOOGLE_MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SHOP_ADDRESS)}`;

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    petType: 'dog',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D62828] text-white text-xs font-bold uppercase tracking-wider">
            <PawPrint className="w-4 h-4 text-[#F4C430] fill-current" />
            <span>Get In Touch</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#2B2B2B]">
            Contact Our <span className="text-[#D62828]">Pet Care Team</span>
          </h2>

          <p className="text-base text-[#2B2B2B]/75 font-medium">
            Have questions about our recipes, dietary consultations, or finding a local PETSHOP authorized partner? We are here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: CONTACT INFO & MAP PLACEHOLDER */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="bg-[#FFFDF8] rounded-3xl border-2 border-[#FFE8A3] p-6 sm:p-8 space-y-6 shadow-md">
              <h3 className="text-xl font-black text-[#2B2B2B]">PETSHOP Headquarters</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <a
                    href={GOOGLE_MAPS_SEARCH_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View 101 Hill Town Impress on Google Maps"
                    aria-label="View 101 Hill Town Impress on Google Maps"
                    className="w-10 h-10 rounded-xl bg-[#D62828]/10 text-[#D62828] flex items-center justify-center shrink-0 cursor-pointer hover:bg-[#D62828] hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-xs"
                  >
                    <MapPin className="w-5 h-5" />
                  </a>
                  <div>
                    <p className="text-xs font-extrabold uppercase text-[#2B2B2B]/60 tracking-wider">Address</p>
                    <a
                      href={GOOGLE_MAPS_SEARCH_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View location on Google Maps"
                      className="text-sm font-bold text-[#2B2B2B] hover:text-[#D62828] leading-relaxed transition-colors block cursor-pointer"
                    >
                      101 Hill Town Impress<br />
                      Nikol<br />
                      Ahmedabad – 382350<br />
                      Gujarat, India
                    </a>
                    <a
                      href={GOOGLE_MAPS_DIRECTIONS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Get directions to PETSHOP on Google Maps"
                      aria-label="Get directions to PETSHOP on Google Maps"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D62828] hover:text-[#b01e1e] hover:underline mt-2 transition-colors cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Directions</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D62828]/10 text-[#D62828] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold uppercase text-[#2B2B2B]/60 tracking-wider">Email Inquiries</p>
                    <a
                      href="mailto:petshop@gmail.com"
                      className="text-sm font-bold text-[#2B2B2B] hover:text-[#D62828] hover:underline transition-colors duration-200 inline-block cursor-pointer"
                    >
                      petshop@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D62828]/10 text-[#D62828] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold uppercase text-[#2B2B2B]/60 tracking-wider">Toll-Free Phone</p>
                    <a
                      href="tel:18002703585"
                      className="text-sm font-bold text-[#2B2B2B] hover:text-[#D62828] hover:brightness-125 transition-all duration-200 inline-block cursor-pointer"
                    >
                      1800-270-3585
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D62828]/10 text-[#D62828] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold uppercase text-[#2B2B2B]/60 tracking-wider">Working Hours</p>
                    <p className="text-sm font-bold text-[#2B2B2B]">Mon - Fri: 8:00 AM - 6:00 PM PST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* STYLIZED MAP GRAPHIC / CLICKABLE LOCATION CARD */}
            <a
              href={GOOGLE_MAPS_SEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Open PETSHOP on Google Maps (101 Hill Town Impress, Nikol, Ahmedabad)"
              aria-label="Open PETSHOP Nutrition Center location on Google Maps"
              className="group relative rounded-3xl overflow-hidden border-2 border-[#FFE8A3] bg-[#FFE8A3]/30 hover:bg-[#FFE8A3]/50 h-52 shadow-md hover:shadow-xl hover:border-[#D62828]/40 transition-all duration-300 flex items-center justify-center cursor-pointer block transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#D62828_1px,transparent_1px)] [background-size:16px_16px] group-hover:opacity-60 transition-opacity" />
              
              <div className="relative z-10 text-center p-4">
                <div className="w-12 h-12 rounded-full bg-[#D62828] text-white flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 group-hover:shadow-red-500/30 transition-transform duration-300 animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <p className="text-xs font-black text-[#2B2B2B] mt-2 group-hover:text-[#D62828] transition-colors">
                  PETSHOP Nutrition Center
                </p>
                <p className="text-[11px] font-semibold text-[#2B2B2B]/70">
                  Nikol, Ahmedabad • Gujarat, India
                </p>
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#FFE8A3] text-[11px] font-bold text-[#D62828] group-hover:bg-[#D62828] group-hover:text-white group-hover:border-[#D62828] transition-all shadow-xs">
                  <Navigation className="w-3 h-3" />
                  <span>Open in Google Maps & Directions</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                </div>
              </div>
            </a>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="lg:col-span-7 bg-[#FFFDF8] rounded-3xl border-2 border-[#FFE8A3] p-6 sm:p-8 shadow-xl text-left">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#D62828] text-white flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-[#2B2B2B]">Thank You for Contacting PETSHOP!</h3>
                <p className="text-sm text-[#2B2B2B]/80 max-w-md mx-auto font-medium">
                  We have received your message. Our pet nutrition specialist will reach out to you at <strong>{formData.email}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', petType: 'dog', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#D62828] text-white font-bold text-xs hover:bg-[#F4C430] hover:text-[#2B2B2B] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-black text-[#2B2B2B] mb-2">Send Us an Inquiry</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-extrabold uppercase text-[#2B2B2B]/70 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 rounded-xl border border-[#FFE8A3] bg-white text-sm font-semibold text-[#2B2B2B] focus:outline-none focus:border-[#D62828]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-extrabold uppercase text-[#2B2B2B]/70 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="eleanor@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 rounded-xl border border-[#FFE8A3] bg-white text-sm font-semibold text-[#2B2B2B] focus:outline-none focus:border-[#D62828]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-extrabold uppercase text-[#2B2B2B]/70 block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 rounded-xl border border-[#FFE8A3] bg-white text-sm font-semibold text-[#2B2B2B] focus:outline-none focus:border-[#D62828]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-extrabold uppercase text-[#2B2B2B]/70 block mb-1">
                      Inquiry About
                    </label>
                    <select
                      value={formData.petType}
                      onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                      className="w-full p-3 rounded-xl border border-[#FFE8A3] bg-white text-sm font-semibold text-[#2B2B2B] focus:outline-none focus:border-[#D62828]"
                    >
                      <option value="dog">Dog Food Recipes</option>
                      <option value="cat">Cat Food Recipes</option>
                      <option value="dietary">Custom Dietary Advice</option>
                      <option value="distributor">Retailer & Partnership Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-extrabold uppercase text-[#2B2B2B]/70 block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your pet, dietary questions, or partnership inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#FFE8A3] bg-white text-sm font-semibold text-[#2B2B2B] focus:outline-none focus:border-[#D62828]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-[#D62828] text-white font-bold text-sm uppercase tracking-wider hover:bg-[#F4C430] hover:text-[#2B2B2B] transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
