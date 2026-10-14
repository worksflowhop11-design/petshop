import React, { useState, useEffect } from 'react';
import {
  Globe,
  Save,
  CheckCircle,
  Phone,
  Mail,
  Sparkles,
  Info,
  Share2,
} from 'lucide-react';
import {
  fetchWebsiteContent,
  saveWebsiteContent,
} from '../../services/firestoreService';
import { WebsiteContentSettings } from '../../types/admin';

export const WebsiteContentManagement: React.FC = () => {
  const [settings, setSettings] = useState<WebsiteContentSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await fetchWebsiteContent();
      setSettings(data);
    } catch (e) {
      console.error('Error fetching website settings:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);
    try {
      await saveWebsiteContent(settings);
      setSuccessMsg('Website content & contact information updated successfully in Firestore!');
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (e) {
      console.error('Error saving content:', e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400">
        <div className="w-8 h-8 border-3 border-[#EE1630] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-bold text-[#061B3A]">Loading storefront content settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#EE1630]">
            Storefront Customization
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#061B3A] tracking-tight">
            Website Content &amp; Contact
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Update headline copy, contact phone/email, about text, and social links in real-time.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#EE1630] hover:bg-[#D61429] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#EE1630]/25 transition-all cursor-pointer hover:scale-102 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-3 animate-fadeIn">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Hero Section Content */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <Sparkles className="w-5 h-5 text-[#EE1630]" />
            <h2 className="text-base font-black text-[#061B3A]">
              1. Hero Banner Content
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                Top Badge Text
              </label>
              <input
                type="text"
                value={settings.heroBadge || ''}
                onChange={(e) => setSettings({ ...settings, heroBadge: e.target.value })}
                placeholder="PREMIUM PET FOOD"
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-[#061B3A] outline-hidden focus:border-[#EE1630]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                Hero Heading Line 1
              </label>
              <input
                type="text"
                value={settings.heroHeadingLine1 || ''}
                onChange={(e) => setSettings({ ...settings, heroHeadingLine1: e.target.value })}
                placeholder="Premium Nutrition"
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-[#061B3A] outline-hidden focus:border-[#EE1630]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                Hero Description Paragraph
              </label>
              <textarea
                rows={3}
                value={settings.heroDescription || ''}
                onChange={(e) => setSettings({ ...settings, heroDescription: e.target.value })}
                placeholder="Give your furry friends the healthiest and most delicious meals..."
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Information */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <Phone className="w-5 h-5 text-[#0755B8]" />
            <h2 className="text-base font-black text-[#061B3A]">
              2. Official Contact Information (Top Bar &amp; Footer)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                Customer Support Phone
              </label>
              <input
                type="text"
                value={settings.phone || ''}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                placeholder="1800-270-3585"
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                Customer Support Email
              </label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="petshop@gmail.com"
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                WhatsApp Hotline
              </label>
              <input
                type="text"
                value={settings.whatsappNumber || ''}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                placeholder="+1 (800) 270-3585"
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: About Story & Mission */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <Info className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-black text-[#061B3A]">
              3. About PETSHOP Story
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                About Heading Title
              </label>
              <input
                type="text"
                value={settings.aboutTitle || ''}
                onChange={(e) => setSettings({ ...settings, aboutTitle: e.target.value })}
                placeholder="Crafted with Love, Backed by Science"
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-[#061B3A] outline-hidden focus:border-[#EE1630]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                About Main Story Paragraph
              </label>
              <textarea
                rows={3}
                value={settings.aboutParagraph1 || ''}
                onChange={(e) => setSettings({ ...settings, aboutParagraph1: e.target.value })}
                placeholder="At PETSHOP, we believe every bowl should be filled with nourishing goodness..."
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Social Media Links */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <Share2 className="w-5 h-5 text-purple-600" />
            <h2 className="text-base font-black text-[#061B3A]">
              4. Social Media Links
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                Instagram URL
              </label>
              <input
                type="url"
                value={settings.instagramUrl || ''}
                onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                placeholder="https://instagram.com/petshop"
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                Facebook URL
              </label>
              <input
                type="url"
                value={settings.facebookUrl || ''}
                onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                placeholder="https://facebook.com/petshop"
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-2xl bg-[#EE1630] hover:bg-[#D61429] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#EE1630]/25 transition-all cursor-pointer hover:scale-102 disabled:opacity-50 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
