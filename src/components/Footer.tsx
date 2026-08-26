import React from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Sparkles, 
  BookOpen, 
  MapPin, 
  Mail, 
  Phone, 
  ArrowRight,
  Heart
} from 'lucide-react';
import { NavigationTab } from '../types';

interface FooterProps {
  setCurrentTab: (tab: NavigationTab) => void;
  onOpenDocs: () => void;
  onOpenAuth: () => void;
  onOpenAI: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentTab,
  onOpenDocs,
  onOpenAuth,
  onOpenAI
}) => {
  return (
    <footer id="main-footer" className="bg-slate-950 border-t border-slate-800 text-slate-300 text-left pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Footer Grid (Rule of Thirds: 4-Column Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1 (4 cols): Brand Identity & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold tracking-widest text-amber-400 font-serif-luxury">
                AURA
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                Haute Accessories
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Curating authentic fine jewelry, luxury horology, Marikina Tuscan leather bags, and Japanese beta-titanium eyewear. Integrated with PayMongo escrow checkout and instant GCash merchant payouts.
            </p>

            {/* Payment Badges */}
            <div className="pt-2 space-y-2">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Authorized Payment Partners
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-blue-400 font-bold">
                  GCash
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-400 font-bold">
                  Maya
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-amber-400 font-bold">
                  PayMongo
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                  Visa / Mastercard
                </span>
              </div>
            </div>
          </div>

          {/* Column 2 (2 cols): Marketplace Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 font-mono">
              Marketplace
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setCurrentTab('home')} className="hover:text-amber-400 cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('store')} className="hover:text-amber-400 cursor-pointer">
                  Store Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('seller_dashboard')} className="hover:text-amber-400 cursor-pointer">
                  Seller Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('about')} className="hover:text-amber-400 cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('contacts')} className="hover:text-amber-400 cursor-pointer">
                  Contacts
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('sitemap')} className="hover:text-amber-400 text-amber-400/90 cursor-pointer">
                  Visual Sitemap
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 (3 cols): Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 font-mono">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setCurrentTab('store')} className="hover:text-amber-400 cursor-pointer">
                  18K Solid Gold & Pearls
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('store')} className="hover:text-amber-400 cursor-pointer">
                  Automatic Calibre Watches
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('store')} className="hover:text-amber-400 cursor-pointer">
                  Italian Saffiano Leather Bags
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('store')} className="hover:text-amber-400 cursor-pointer">
                  Titanium Polarized Eyewear
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('store')} className="hover:text-amber-400 cursor-pointer">
                  English Bridle Leather Belts
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('store')} className="hover:text-amber-400 cursor-pointer">
                  Florentine Mulberry Silk
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4 (3 cols): Platform & Developer Integration */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 font-mono">
              Integrations & Code
            </h4>
            <p className="text-[11px] text-slate-400">
              Complete production configurations ready for deployment.
            </p>
            <div className="space-y-2 pt-1">
              <button
                onClick={onOpenDocs}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-xs font-semibold text-amber-300 flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Supabase & Vercel Guide
                </span>
                <span>→</span>
              </button>
              <button
                onClick={onOpenAI}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/40 text-xs font-semibold text-purple-300 flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Stylist & Voiceflow
                </span>
                <span>→</span>
              </button>
              <button
                onClick={onOpenAuth}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-xs font-semibold text-emerald-300 flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5" />
                  Link GCash Account
                </span>
                <span>→</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© 2026 AURA Luxury Marketplace Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => setCurrentTab('sitemap')} className="hover:text-amber-400">
              Sitemap
            </button>
            <span>•</span>
            <button onClick={onOpenDocs} className="hover:text-amber-400">
              PayMongo Webhooks
            </button>
            <span>•</span>
            <button onClick={onOpenDocs} className="hover:text-amber-400">
              Supabase SQL
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
