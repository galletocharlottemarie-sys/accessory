import React from 'react';
import { 
  CreditCard, 
  Smartphone, 
  Sparkles, 
  Star, 
  UploadCloud, 
  ShieldCheck, 
  Layers, 
  Palette, 
  Compass, 
  Type
} from 'lucide-react';
import { NavigationTab } from '../types';

interface RuleOfThirdsFeaturesProps {
  setCurrentTab: (tab: NavigationTab) => void;
  onOpenAI: () => void;
}

export const RuleOfThirdsFeatures: React.FC<RuleOfThirdsFeaturesProps> = ({
  setCurrentTab,
  onOpenAI
}) => {
  return (
    <section id="marketplace-features-section" className="py-16 sm:py-20 bg-[#090D16] border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Hierarchical Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2 max-w-2xl text-left">
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest flex items-center gap-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Engineered for Luxury & Precision</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-serif-luxury tracking-tight">
              Design Architecture & Core Abilities
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Built on mathematical Rule-of-Thirds proportions, high-contrast visual clarity, PayMongo escrow checkout, and instantaneous GCash merchant settlements.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">5 Core Abilities Active</span>
            <button
              onClick={() => setCurrentTab('store')}
              className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-500/50 text-xs font-semibold text-amber-300 transition-colors cursor-pointer"
            >
              Browse All Categories →
            </button>
          </div>
        </div>

        {/* Rule of Thirds Asymmetric 3-Column Core Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: PayMongo Payment Processing & GCash Integration */}
          <div id="feature-card-payments" className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 p-6 space-y-4 text-left transition-all duration-300 group hover:shadow-xl hover:shadow-amber-500/5">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
                <CreditCard className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                PayMongo E-Wallet
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-100 font-serif-luxury group-hover:text-amber-300 transition-colors">
              1. PayMongo & GCash Checkout
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Accept real-time payments across the Philippines via <strong>GCash, Maya, QR Ph</strong>, and major Credit/Debit cards. Integrated with automated webhook notifications and instant PDF invoice generation.
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-1.5">
                <span className="text-amber-400">✓</span> PayMongo Checkout API & Webhook listeners
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-amber-400">✓</span> Instant GCash OTP & SMS confirmation flow
              </li>
            </ul>
          </div>

          {/* Card 2: User Product Posting & Seller Dashboard */}
          <div id="feature-card-seller" className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 p-6 space-y-4 text-left transition-all duration-300 group hover:shadow-xl hover:shadow-emerald-500/5">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Direct Seller Hub
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-100 font-serif-luxury group-hover:text-emerald-300 transition-colors">
              2. Post & Sell Your Accessories
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Users and artisans can post their own jewelry, timepieces, bags, and leather goods. Specify pricing in PHP ₱, stock count, upload high-res imagery, and link their GCash number for direct earnings payouts.
            </p>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Live Inventory Manager</span>
              <button 
                onClick={() => setCurrentTab('seller_dashboard')}
                className="text-xs font-semibold text-emerald-400 hover:underline cursor-pointer"
              >
                Go to Dashboard →
              </button>
            </div>
          </div>

          {/* Card 3: AI Chatbot (Gemini + Voiceflow Hybrid) */}
          <div id="feature-card-ai" className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 p-6 space-y-4 text-left transition-all duration-300 group hover:shadow-xl hover:shadow-amber-500/5">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 animate-spin-slow" />
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Voiceflow + Gemini
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-100 font-serif-luxury group-hover:text-amber-300 transition-colors">
              3. AI Styling Concierge
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Always-on AI stylist providing expert advice on accessory matching, metal undertone pairing (yellow gold, rose gold, silver), gift recommendations, and live order status inquiries.
            </p>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Voiceflow Embed Ready</span>
              <button 
                onClick={onOpenAI}
                className="text-xs font-semibold text-amber-400 hover:underline cursor-pointer"
              >
                Launch Concierge →
              </button>
            </div>
          </div>

          {/* Card 4: Star Ratings & Verified Buyer Reviews */}
          <div id="feature-card-reviews" className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 p-6 space-y-4 text-left transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                1–5 Star Matrix
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-100 font-serif-luxury">
              4. Star Reviews & Feedback
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Buyers can rate every accessory from 1 to 5 stars, write feedback, and verify GCash purchases. Aggregates live score averages calculated with mathematical precision.
            </p>
            <div className="flex items-center gap-1 text-amber-400 text-xs font-mono pt-1">
              ★★★★★ <span className="text-slate-400 ml-1">(4.9/5.0 marketplace aggregate)</span>
            </div>
          </div>

          {/* Card 5: User Account Registration & GCash Number Input */}
          <div id="feature-card-registration" className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 p-6 space-y-4 text-left transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                GCash Registered
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-100 font-serif-luxury">
              5. Account & GCash Setup
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Users can register their accounts, input and validate their GCash mobile number (e.g. 0917-XXX-XXXX), manage shipping addresses, and track order histories.
            </p>
            <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
              Validated Philippine Telco prefixes (Globe, TM, Smart, TNT)
            </div>
          </div>

          {/* Card 6: Visual & Typographic Craftsmanship Matrix */}
          <div id="feature-card-design-principles" className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-amber-500/30 p-6 space-y-4 text-left">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/40">
                <Palette className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                Design Principles
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-100 font-serif-luxury">
              6. Aesthetic Compliance
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="text-amber-400 font-bold">1. Rule of Thirds:</span> Asymmetric 1:2 & 2:3 golden compositional balance.
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="text-amber-400 font-bold">2. Contrast:</span> Deep obsidian canvas with luminous champagne gold.
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="text-amber-400 font-bold">3. Color Scheme:</span> Slate, gold, alabaster & emerald accents.
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="text-amber-400 font-bold">4. Typography:</span> Cinzel & Playfair paired with Plus Jakarta.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
