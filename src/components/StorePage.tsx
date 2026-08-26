import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  Search, 
  Star, 
  Sparkles, 
  ArrowUpDown, 
  Check, 
  Grid, 
  ShoppingBag,
  Layers,
  Flame
} from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface StorePageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onInstantBuy: (product: Product, e: React.MouseEvent) => void;
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenSellerDashboard: () => void;
  onOpenAI: () => void;
}

export const StorePage: React.FC<StorePageProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onInstantBuy,
  favorites,
  onToggleFavorite,
  searchQuery,
  setSearchQuery,
  onOpenSellerDashboard,
  onOpenAI
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  const categories = [
    'All',
    'Jewelry',
    'Watches',
    'Bags',
    'Eyewear',
    'Belts & Leather',
    'Scarves & Hats'
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category match
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesMaterial = item.material.toLowerCase().includes(q);
        const matchesTag = item.tags.some(t => t.toLowerCase().includes(q));
        const matchesSeller = item.seller.name.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesMaterial && !matchesTag && !matchesSeller) {
          return false;
        }
      }
      // Price filter
      if (item.price > maxPrice) {
        return false;
      }
      // Rating filter
      if (item.rating < minRating) {
        return false;
      }
      // Stock filter
      if (inStockOnly && (!item.inStock || item.stockCount <= 0)) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, maxPrice, minRating, inStockOnly, sortBy]);

  return (
    <div id="store-page-root" className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Store Banner / Header with High-Contrast Typography */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 rounded-3xl border border-slate-800 p-8 sm:p-10 relative overflow-hidden text-left">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>CURATED ACCESSORIES MARKETPLACE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 font-serif-luxury tracking-tight">
            The Haute Accessories Collection
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            Discover artisanal pearls, Swiss horology, Marikina Tuscan leather bags, and titanium eyewear. All purchases backed by PayMongo bank-grade escrow.
          </p>
        </div>

        {/* Quick Action CTA inside banner */}
        <div className="mt-6 flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={onOpenSellerDashboard}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
          >
            <span>Post an Accessory Listing</span>
          </button>
          <button
            onClick={onOpenAI}
            className="px-4 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Consult AI Stylist</span>
          </button>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              id={`category-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Main Layout: Filters Sidebar (1/4 or 1/3) + Product Catalog Grid (3/4 or 2/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Filter Controls (lg:col-span-3) */}
        <aside className="lg:col-span-3 space-y-6 text-left">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 sticky top-28">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-100 uppercase tracking-wider">
                <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                <span>Filters & Refinements</span>
              </div>
              {(selectedCategory !== 'All' || minRating > 0 || maxPrice < 50000 || inStockOnly || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setMinRating(0);
                    setMaxPrice(50000);
                    setInStockOnly(false);
                    setSearchQuery('');
                  }}
                  className="text-[11px] text-amber-400 hover:underline cursor-pointer"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Keyword Search in store */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Filter by Keyword</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Gold, Emerald, Bag..."
                  className="w-full bg-slate-950 text-xs text-slate-100 placeholder-slate-400 rounded-lg pl-8 pr-3 py-2 border border-slate-800 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>Maximum Price</span>
                <span className="font-mono text-amber-400 font-bold">₱{maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="3000"
                max="50000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>₱3,000</span>
                <span>₱50,000+</span>
              </div>
            </div>

            {/* Minimum Star Rating */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Minimum Rating</label>
              <div className="space-y-1.5">
                {[0, 4, 4.5, 4.8].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setMinRating(rate)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between cursor-pointer transition-colors ${
                      minRating === rate
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'text-slate-400 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      {rate === 0 ? 'All Ratings' : (
                        <>
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{rate}+ Stars</span>
                        </>
                      )}
                    </span>
                    {minRating === rate && <Check className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* In Stock Only Switch */}
            <div className="pt-2 border-t border-slate-800">
              <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                <span>In-Stock Ready to Ship</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </label>
            </div>

            {/* PayMongo Trust Callout */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                PayMongo Protected
              </div>
              <p>All items in store support direct GCash, Maya, and Visa/Mastercard payments.</p>
            </div>
          </div>
        </aside>

        {/* Right Catalog Area (lg:col-span-9) */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Active Filter Bar & Sorting Dropdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
            <div className="text-xs text-slate-300">
              Showing <span className="font-bold text-amber-400 font-mono">{filteredProducts.length}</span> pieces in{' '}
              <span className="text-slate-100 font-semibold">{selectedCategory}</span>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <ArrowUpDown className="w-3 h-3" /> Sort:
              </span>
              <select
                id="store-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-950 text-xs text-slate-200 border border-slate-700 rounded-lg px-3 py-1.5 focus:border-amber-500 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Star Rating</option>
                <option value="newest">Latest Additions</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div id="store-product-grid" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                  onAddToCart={onAddToCart}
                  onInstantBuy={onInstantBuy}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 font-serif-luxury">No accessories match your filters</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try widening your price range, choosing "All" categories, or resetting the keyword search.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setMaxPrice(50000);
                  setMinRating(0);
                  setSearchQuery('');
                  setInStockOnly(false);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer hover:bg-amber-400"
              >
                Clear All Filters
              </button>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
