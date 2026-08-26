import React from 'react';
import { 
  Compass, 
  Layers, 
  ExternalLink, 
  ShoppingBag, 
  User, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  BookOpen 
} from 'lucide-react';
import { NavigationTab } from '../types';

interface SitemapSectionProps {
  setCurrentTab: (tab: NavigationTab) => void;
  onOpenDocs: () => void;
  onOpenAuth: () => void;
  onOpenAI: () => void;
}

export const SitemapSection: React.FC<SitemapSectionProps> = ({
  setCurrentTab,
  onOpenDocs,
  onOpenAuth,
  onOpenAI
}) => {
  const sections = [
    {
      title: '1. Primary Navigation Routes',
      icon: Compass,
      links: [
        { label: 'Home (index.html)', action: () => setCurrentTab('home'), desc: 'Main landing page with Rule-of-Thirds features and hero CTA' },
        { label: 'Store Page (All Categories)', action: () => setCurrentTab('store'), desc: 'Complete catalog of fine jewelry, watches, bags, and eyewear' },
        { label: 'Seller Dashboard', action: () => setCurrentTab('seller_dashboard'), desc: 'Post new accessories, manage inventory, and configure GCash payouts' },
        { label: 'About Us', action: () => setCurrentTab('about'), desc: 'Brand heritage, artisanal manifesto, and PayMongo escrow security' },
        { label: 'Contacts', action: () => setCurrentTab('contacts'), desc: 'Headquarters, GCash merchant hotline, and concierge inquiry form' }
      ]
    },
    {
      title: '2. Accessory Product Categories',
      icon: ShoppingBag,
      links: [
        { label: 'Fine Jewelry (18K Gold, Pearls, Rings)', action: () => setCurrentTab('store'), desc: 'Handcrafted South Sea pearls, diamond pavé, and emerald signets' },
        { label: 'Luxury Timepieces (Swiss Calibre Horology)', action: () => setCurrentTab('store'), desc: 'Automatic movements, obsidian dials, and sapphire crystal' },
        { label: 'Artisanal Bags & Leathercraft', action: () => setCurrentTab('store'), desc: 'Italian Saffiano and Marikina full-grain cowhide leather crossbodies' },
        { label: 'Designer Eyewear (Titanium Polarized)', action: () => setCurrentTab('store'), desc: 'Beta-titanium hexagonal frames and UV400 polarized shades' },
        { label: 'Belts & Small Leather Goods', action: () => setCurrentTab('store'), desc: 'English bridle leather with hand-cast brass hardware' },
        { label: 'Scarves & Silk Textiles', action: () => setCurrentTab('store'), desc: 'Mulberry silk twill squares with hand-rolled roulotté edges' }
      ]
    },
    {
      title: '3. Buyer & Seller Accounts',
      icon: User,
      links: [
        { label: 'Register Account (GCash Number Input)', action: onOpenAuth, desc: 'Register account and configure mobile GCash for 1-click checkout and seller earnings' },
        { label: 'User Sign In & Profile Management', action: onOpenAuth, desc: 'View order histories, tracking receipts, and shipping addresses' },
        { label: 'Post New Product Listing', action: () => setCurrentTab('seller_dashboard'), desc: 'Publish an accessory for sale with custom pricing in PHP ₱' }
      ]
    },
    {
      title: '4. AI Concierge & Integrations',
      icon: Sparkles,
      links: [
        { label: 'Aura AI Stylist (Gemini & Voiceflow)', action: onOpenAI, desc: 'Interactive chat assistant for accessory matching and gift advice' },
        { label: 'Voiceflow Chatbot Configuration', action: onOpenAI, desc: 'Connect custom Voiceflow Project ID for conversational workflows' },
        { label: 'PayMongo Payment Gateway & Webhooks', action: onOpenDocs, desc: 'GCash, Maya, Card checkout APIs and webhook listener setup' },
        { label: 'Supabase PostgreSQL SQL Schema', action: onOpenDocs, desc: 'Full database script with RLS policies and rating triggers' },
        { label: 'Vercel Deployment Guide', action: onOpenDocs, desc: 'Step-by-step instructions for hosting on Vercel' }
      ]
    }
  ];

  return (
    <div id="sitemap-page-root" className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 text-left">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f0f11] via-[#141417] to-[#241e12] rounded-3xl border border-zinc-800 p-8 sm:p-10">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>ARCHITECTURE & SEO INDEX</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif-luxury">
            Complete Website Sitemap
          </h1>
          <p className="text-zinc-300 text-sm">
            Structured hierarchical directory of all pages, categories, seller utilities, API documentations, and platform integrations.
          </p>
        </div>
      </div>

      {/* 2x2 Grid of Sitemap Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <div key={idx} className="bg-[#0f0f11] rounded-2xl border border-zinc-800 p-6 space-y-4">
              <div className="flex items-center gap-2.5 text-base font-bold text-white font-serif-luxury border-b border-zinc-800 pb-3">
                <Icon className="w-5 h-5 text-[#D4AF37]" />
                <span>{sec.title}</span>
              </div>
              <div className="space-y-3">
                {sec.links.map((link, lIdx) => (
                  <button
                    key={lIdx}
                    onClick={link.action}
                    className="w-full text-left p-3 rounded-xl bg-[#0A0A0A] hover:bg-[#18181b] border border-zinc-800 hover:border-[#D4AF37]/40 group transition-all cursor-pointer block"
                  >
                    <div className="text-xs font-bold text-[#D4AF37] group-hover:text-amber-200 flex items-center justify-between">
                      <span>{link.label}</span>
                      <span className="text-zinc-500 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{link.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
