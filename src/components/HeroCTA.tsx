import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  CreditCard, 
  Smartphone, 
  Gem, 
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { NavigationTab, Product } from '../types';

interface HeroCTAProps {
  onExploreStore: () => void;
  onOpenSellerDashboard: () => void;
  onOpenAI: () => void;
  featuredProduct: Product;
  onSelectProduct: (p: Product) => void;
}

export const HeroCTA: React.FC<HeroCTAProps> = ({
  onExploreStore,
  onOpenSellerDashboard,
  onOpenAI,
  featuredProduct,
  onSelectProduct
}) => {
  return (
    <section id="hero-cta-section" className="relative overflow-hidden pt-6 pb-16 lg:pt-10 lg:pb-24 border-b border-slate-800">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Rule of Thirds Hero Grid Layout (1/3 Copy & Direct CTA + 2/3 Visual Asymmetric Showcase) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left 5-column Column (1/3 Weight): Typography & Immediate Call to Actions */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>THE 2026 HAUTE ACCESSORIES EDIT</span>
            </div>

            {/* Main Headline with High-Contrast Hierarchical Typography */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 font-serif-luxury leading-[1.1]">
              Artisanal Luxury. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
                Direct to GCash.
              </span>
            </h1>

            {/* Body Description */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Explore hand-selected South Sea pearls, Swiss-calibre timepieces, and Italian Saffiano leathercraft. Buy with secure PayMongo checkout or post your own collection with instant GCash payouts.
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                id="hero-explore-collection-btn"
                onClick={onExploreStore}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Store Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-sell-product-btn"
                onClick={onOpenSellerDashboard}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-slate-700/80 hover:border-amber-500/50 font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span>Sell Your Accessories</span>
              </button>
            </div>

            {/* Trust Matrix */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="text-xl font-bold font-mono text-amber-400">100%</div>
                <div className="text-xs text-slate-400">Verified Artisans</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl font-bold font-mono text-amber-400">PayMongo</div>
                <div className="text-xs text-slate-400">Bank-Grade Escrow</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl font-bold font-mono text-amber-400">Instant</div>
                <div className="text-xs text-slate-400">GCash Payouts</div>
              </div>
            </div>
          </div>

          {/* Right 7-column Column (2/3 Weight): Rule of Thirds Visual Storytelling Card */}
          <div className="lg:col-span-7 relative">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              
              {/* Primary Large Feature (8 cols in sm) */}
              <div 
                id="hero-featured-card"
                onClick={() => onSelectProduct(featuredProduct)}
                className="sm:col-span-8 group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-amber-500/50 shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <img 
                    src={featuredProduct.image} 
                    alt={featuredProduct.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-xs shadow-md">
                      Featured Piece
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 font-mono text-xs border border-amber-500/30">
                      ★ {featuredProduct.rating} ({featuredProduct.reviewsCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Card Content Footer */}
                <div className="p-5 space-y-2">
                  <div className="text-xs text-amber-400 font-mono uppercase tracking-wider">
                    {featuredProduct.category} • Handcrafted
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-100 font-serif-luxury group-hover:text-amber-300 transition-colors">
                    {featuredProduct.title}
                  </h3>
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <div className="text-xs text-slate-400">Direct Price</div>
                      <div className="text-xl font-extrabold text-amber-400 font-mono">
                        ₱{featuredProduct.price.toLocaleString()}
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-300 group-hover:text-white flex items-center gap-1">
                      View Specs & Reviews <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Secondary Stack (4 cols in sm): Asymmetric Rule of Thirds Support Cards */}
              <div className="sm:col-span-4 flex flex-col gap-4">
                
                {/* AI Concierge Teaser Card */}
                <div 
                  onClick={onOpenAI}
                  className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/30 hover:border-amber-400 p-5 space-y-3 cursor-pointer group shadow-lg transition-all"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                    <Sparkles className="w-4 h-4 animate-spin-slow" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-amber-400 uppercase">AI Accessory Concierge</div>
                    <h4 className="text-sm font-bold text-slate-100 mt-0.5">Need styling advice?</h4>
                  </div>
                  <p className="text-xs text-slate-400">
                    Ask our AI stylist to match necklaces, watches, and bags for any dress code.
                  </p>
                  <div className="text-xs font-semibold text-amber-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Chat with Aura</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>

                {/* Seller GCash Featurette */}
                <div 
                  onClick={onOpenSellerDashboard}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 space-y-3 cursor-pointer group transition-all"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-emerald-400 uppercase">Seller Direct Hub</div>
                    <h4 className="text-sm font-bold text-slate-100 mt-0.5">Sell & Get Paid Fast</h4>
                  </div>
                  <p className="text-xs text-slate-400">
                    Register with your GCash number. When a buyer pays, payouts disburse seamlessly.
                  </p>
                  <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Open Dashboard</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
