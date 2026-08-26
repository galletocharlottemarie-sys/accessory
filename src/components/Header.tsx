import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  User as UserIcon, 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  PlusCircle, 
  BookOpen, 
  MapPin,
  Flame
} from 'lucide-react';
import { NavigationTab, User, CartItem, Product } from '../types';

interface HeaderProps {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onOpenCart: () => void;
  cartItems: CartItem[];
  onOpenAI: () => void;
  onOpenDocs: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectProduct?: (product: Product) => void;
  products: Product[];
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  currentUser,
  onOpenAuth,
  onOpenCart,
  cartItems,
  onOpenAI,
  onOpenDocs,
  searchQuery,
  setSearchQuery,
  onSelectProduct,
  products
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const searchResults = searchQuery.trim()
    ? products.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const navLinks: { id: NavigationTab; label: string; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'store', label: 'Store Page', badge: 'New Drops' },
    { id: 'seller_dashboard', label: 'Seller Dashboard', badge: 'GCash Ready' },
    { id: 'about', label: 'About Us' },
    { id: 'contacts', label: 'Contacts' },
  ];

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-[#090D16]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      {/* Top Banner with High-Contrast GCash & PayMongo Trust Badge */}
      <div id="top-announcement-bar" className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-slate-950 text-xs font-semibold py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-slate-950 animate-pulse" />
            <span className="hidden sm:inline">OFFICIAL ACCESSORIES MARKETPLACE:</span>
            <span>Pay securely via PayMongo (GCash, Maya, Cards). Sellers receive instant GCash payouts!</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button 
              onClick={onOpenDocs} 
              className="hover:underline flex items-center gap-1 font-bold text-slate-950 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Dev & SQL Docs
            </button>
            <span className="hidden md:inline text-slate-950/60">•</span>
            <span className="hidden md:inline font-mono">Currency: PHP (₱)</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button 
              id="brand-logo-btn"
              onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
              className="text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-widest text-amber-400 font-serif-luxury group-hover:text-amber-300 transition-colors">
                  AURA
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Haute
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase hidden sm:block">
                Luxury Accessories & Marketplace
              </p>
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4 relative">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="header-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                placeholder="Search 18k gold, emeralds, timepieces, leather bags..."
                className="w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-400 rounded-full pl-10 pr-4 py-2 border border-slate-700/70 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Live Search Dropdown */}
            {searchFocused && searchResults.length > 0 && (
              <div id="search-dropdown-results" className="absolute top-full mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="p-2 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex justify-between">
                  <span>Matching Accessories</span>
                  <span>{searchResults.length} Results</span>
                </div>
                <div className="divide-y divide-slate-800/60 max-h-72 overflow-y-auto">
                  {searchResults.map(prod => (
                    <button
                      key={prod.id}
                      onClick={() => {
                        if (onSelectProduct) onSelectProduct(prod);
                        setSearchFocused(false);
                      }}
                      className="w-full text-left p-3 hover:bg-slate-800/70 flex items-center gap-3 transition-colors cursor-pointer"
                    >
                      <img src={prod.image} alt={prod.title} className="w-10 h-10 object-cover rounded-lg border border-slate-700" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-slate-100 truncate">{prod.title}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2">
                          <span className="text-amber-400 font-mono">₱{prod.price.toLocaleString()}</span>
                          <span>•</span>
                          <span>{prod.category}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Nav Links */}
          <nav id="desktop-navigation" className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => setCurrentTab(link.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'text-amber-300 bg-amber-500/10 border border-amber-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {link.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-4/5 h-[2px] bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: AI Stylist, Cart, Account */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Stylist Button */}
            <button
              id="header-ai-stylist-btn"
              onClick={onOpenAI}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 hover:border-amber-400 hover:bg-amber-500/30 text-xs font-semibold transition-all cursor-pointer shadow-sm"
              title="Open Aura AI Accessory Stylist"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              <span className="hidden sm:inline">AI Stylist</span>
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-slate-900 border border-slate-700/80 text-slate-200 hover:text-amber-300 hover:border-amber-500/50 transition-all cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg border-2 border-slate-950 animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account / Login Button with GCash indicator */}
            <button
              id="header-user-auth-btn"
              onClick={onOpenAuth}
              className="flex items-center gap-2 p-1.5 sm:px-3.5 sm:py-2 rounded-full bg-slate-900 border border-slate-700 text-xs font-medium text-slate-200 hover:border-amber-500/60 hover:text-white transition-all cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/30">
                {currentUser ? currentUser.name.charAt(0).toUpperCase() : <UserIcon className="w-3.5 h-3.5" />}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-[11px] font-semibold truncate max-w-[100px]">
                  {currentUser ? currentUser.name : 'Sign In / Join'}
                </div>
                {currentUser?.gcashNumber && (
                  <div className="text-[9px] text-amber-400/90 font-mono">
                    GCash: {currentUser.gcashNumber.slice(0, 4)}***
                  </div>
                )}
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search accessories..."
              className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-500 rounded-lg pl-9 pr-4 py-2 border border-slate-700"
            />
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold flex items-center justify-between ${
                  currentTab === link.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <button 
              onClick={() => { setCurrentTab('sitemap'); setMobileMenuOpen(false); }}
              className="text-amber-400 hover:underline"
            >
              View Sitemap
            </button>
            <button 
              onClick={() => { onOpenDocs(); setMobileMenuOpen(false); }}
              className="text-amber-400 hover:underline"
            >
              Vercel & Supabase SQL
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
