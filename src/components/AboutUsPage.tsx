import React from 'react';
import { ShieldCheck, Gem, Compass, Sparkles, Award, Users, CheckCircle2, HeartHandshake } from 'lucide-react';
import { NavigationTab } from '../types';

interface AboutUsPageProps {
  setCurrentTab: (tab: NavigationTab) => void;
  onOpenSellerDashboard: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  setCurrentTab,
  onOpenSellerDashboard
}) => {
  return (
    <div id="about-us-page-root" className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 text-left">
      
      {/* Editorial Hero Banner */}
      <div className="bg-gradient-to-r from-[#0f0f11] via-[#141417] to-[#241e12] rounded-3xl border border-zinc-800 p-8 sm:p-12 relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold">
            <Gem className="w-3.5 h-3.5" />
            <span>ESTABLISHED 2026 • MANILA & FLORENCE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-serif-luxury tracking-tight leading-tight">
            The Philosophy of Pure Accessories Curation
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            AURA was founded on a singular conviction: luxury accessories should celebrate human craftsmanship, raw natural elegance, and frictionless democratic commerce through modern digital finance.
          </p>
        </div>
      </div>

      {/* Rule of Thirds Asymmetric Editorial Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif-luxury">
            Bridging Heritage Artisans with Direct Digital Escrow
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            From the master silversmiths in Meycauayan, Bulacan and pearl divers of Palawan to the leather tanneries in Tuscany, AURA curates pieces that withstand trends. We eliminate middlemen by allowing accredited independent artisans to sell directly to discerning collectors.
          </p>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Through our partnership with <strong>PayMongo</strong>, every transaction is backed by bank-grade escrow. Sellers receive instantaneous disbursements directly to their registered <strong>GCash numbers</strong> upon order verification.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#0f0f11] border border-zinc-800 space-y-1">
              <div className="text-xl font-bold font-mono text-[#D4AF37]">100% Solid</div>
              <div className="text-xs text-zinc-400">Conflict-free gold & gemstones</div>
            </div>
            <div className="p-4 rounded-xl bg-[#0f0f11] border border-zinc-800 space-y-1">
              <div className="text-xl font-bold font-mono text-emerald-400">0% Friction</div>
              <div className="text-xs text-zinc-400">Instant GCash seller payouts</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-[#0A0A0A]">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80"
              alt="Jewelry artisan at work"
              className="w-full h-80 object-cover object-center"
            />
            <div className="p-5 space-y-2 bg-[#0f0f11]">
              <div className="text-xs font-mono text-[#D4AF37] uppercase">Artisan Spotlight</div>
              <div className="text-sm font-bold text-white">Handcrafted in Cebu & Manila</div>
              <p className="text-xs text-zinc-400">Every piece is verified for purity and serial-hallmarked before dispatch.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values & Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#0f0f11] border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white font-serif-luxury">Uncompromising Quality</h3>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Grade AAA South Sea pearls, 316L surgical-grade steel, scratch-proof sapphire crystals, and certified full-grain leathers.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0f0f11] border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white font-serif-luxury">PayMongo Security</h3>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Bank-grade encryption, PCI-DSS compliance, and zero-liability buyer protection with automatic GCash refund safeguards.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0f0f11] border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white font-serif-luxury">AI-Powered Styling</h3>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Integrated Gemini and Voiceflow conversational concierges to assist clients with bespoke accessory coordination.
          </p>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="p-8 rounded-3xl bg-[#0f0f11] border border-[#D4AF37]/30 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-white font-serif-luxury">
          Are you an accessory creator or goldsmith?
        </h3>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
          Join hundreds of accredited Filipino and international designers on AURA.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={onOpenSellerDashboard}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] hover:from-[#e5c158] hover:to-[#D4AF37] text-black font-bold text-xs cursor-pointer shadow-md transition-all"
          >
            Open Seller Portal
          </button>
          <button
            onClick={() => setCurrentTab('store')}
            className="px-6 py-3 rounded-xl bg-[#0A0A0A] border border-zinc-700 text-zinc-200 text-xs font-semibold hover:border-[#D4AF37] cursor-pointer"
          >
            Explore Catalog
          </button>
        </div>
      </div>

    </div>
  );
};
