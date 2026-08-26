import React, { useState } from 'react';
import { 
  UploadCloud, 
  DollarSign, 
  Package, 
  TrendingUp, 
  Smartphone, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  Info
} from 'lucide-react';
import { Product, User } from '../types';

interface SellerDashboardProps {
  products: Product[];
  currentUser: User | null;
  onAddNewProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onOpenAuth: () => void;
}

export const SellerDashboard: React.FC<SellerDashboardProps> = ({
  products,
  currentUser,
  onAddNewProduct,
  onDeleteProduct,
  onOpenAuth
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<Product['category']>('Jewelry');
  const [price, setPrice] = useState<string>('8500');
  const [stockCount, setStockCount] = useState<string>('5');
  const [material, setMaterial] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80');
  const [sellerGcash, setSellerGcash] = useState(currentUser?.gcashNumber || '0917-882-9411');
  const [sellerName, setSellerName] = useState(currentUser?.name || 'My Luxury Atelier');
  const [tagsInput, setTagsInput] = useState('Handcrafted, Fine Jewelry, Gold');
  const [successMessage, setSuccessMessage] = useState('');

  // Sample preset images for quick selection
  const imagePresets = [
    { label: 'Gold Pearl Necklace', url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Obsidian Watch', url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Leather Crossbody Bag', url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Titanium Sunglasses', url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Emerald Signet Ring', url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Bridle Leather Belt', url: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=80' },
  ];

  const handlePostProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price || !description.trim()) {
      return;
    }

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || `${material} by ${sellerName}`,
      price: Number(price),
      originalPrice: Number(price) * 1.2,
      category,
      rating: 5.0,
      reviewsCount: 0,
      image: imageUrl.trim(),
      gallery: [imageUrl.trim()],
      description: description.trim(),
      material: material.trim() || 'Solid 18K Yellow Gold / Genuine Leather',
      specs: {
        'Crafting Location': 'Artisan Studio, Philippines',
        'Material Grade': material || 'Fine Grade Luxury Accessory',
        'Authentication': 'Certificate of Handcrafted Authenticity'
      },
      inStock: true,
      stockCount: Number(stockCount) || 1,
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
      featured: true,
      seller: {
        id: currentUser?.id || `sel-${Date.now()}`,
        name: sellerName.trim(),
        gcashNumber: sellerGcash.trim(),
        rating: 5.0,
        verified: true,
        location: 'Metro Manila, Philippines'
      },
      createdAt: new Date().toISOString().split('T')[0]
    };

    onAddNewProduct(newProd);
    setSuccessMessage(`Listing "${newProd.title}" successfully published! Earnings will disburse to GCash ${sellerGcash}.`);
    setShowAddForm(false);

    // Reset form
    setTitle('');
    setDescription('');
    setMaterial('');
  };

  // Seller metrics calculations
  const sellerProducts = products.filter(p => p.seller.id === currentUser?.id || p.seller.gcashNumber === sellerGcash);
  const displayProducts = sellerProducts.length > 0 ? sellerProducts : products.slice(0, 4);
  const totalInventoryValue = displayProducts.reduce((acc, p) => acc + (p.price * p.stockCount), 0);

  return (
    <div id="seller-dashboard-root" className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 text-left">
      
      {/* Dashboard Header with GCash Payout Matrix */}
      <div className="bg-gradient-to-r from-[#0f0f11] via-[#141417] to-[#241e12] rounded-3xl border border-zinc-800 p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Direct GCash Merchant Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif-luxury tracking-tight">
              Seller Dashboard & Product Publishing
            </h1>
            <p className="text-zinc-300 text-sm max-w-xl">
              Post and manage your bespoke accessories. When buyers complete PayMongo checkout, funds are deposited directly to your registered GCash number.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] hover:from-[#e5c158] hover:to-[#D4AF37] text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{showAddForm ? 'Close Form' : 'Post New Accessory'}</span>
            </button>
            {!currentUser && (
              <button
                onClick={onOpenAuth}
                className="px-4 py-3 rounded-xl bg-[#0A0A0A] border border-zinc-700 hover:border-[#D4AF37] text-zinc-200 text-xs font-semibold cursor-pointer"
              >
                Register GCash Account
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-zinc-800">
          <div className="p-4 rounded-xl bg-[#0A0A0A]/80 border border-zinc-800/80">
            <div className="text-xs text-zinc-400">Total Active Pieces</div>
            <div className="text-2xl font-bold font-mono text-[#D4AF37] mt-1">
              {displayProducts.length} Listings
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#0A0A0A]/80 border border-zinc-800/80">
            <div className="text-xs text-zinc-400">Inventory Valuation</div>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
              ₱{totalInventoryValue.toLocaleString()}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#0A0A0A]/80 border border-zinc-800/80">
            <div className="text-xs text-zinc-400">Active Payout GCash</div>
            <div className="text-sm font-bold font-mono text-amber-200 mt-2 truncate">
              {sellerGcash || '0917-882-9411'}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#0A0A0A]/80 border border-zinc-800/80">
            <div className="text-xs text-zinc-400">PayMongo Escrow Status</div>
            <div className="text-sm font-bold text-emerald-400 mt-2 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Connected & Active
            </div>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage('')} className="text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Post Product Form Modal/Accordion */}
      {showAddForm && (
        <div id="post-product-form-container" className="bg-[#0f0f11] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
          <div className="border-b border-zinc-800 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white font-serif-luxury">
                Post an Accessory for Sale
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Fill in the item specs, price in PHP ₱, and confirm your payout GCash phone number.
              </p>
            </div>
            <span className="text-xs font-mono text-[#D4AF37] px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
              Instant Listing
            </span>
          </div>

          <form onSubmit={handlePostProduct} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Product Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  Accessory Title <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 18K Solid Gold Baroque Pearl Choker"
                  className="w-full bg-[#0A0A0A] text-sm text-zinc-100 placeholder-zinc-500 rounded-xl px-4 py-2.5 border border-zinc-800 focus:border-[#D4AF37] focus:outline-none"
                  required
                />
              </div>

              {/* Subtitle */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Subtitle / Tagline</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Handcrafted with Grade AAA Palawan Pearls"
                  className="w-full bg-[#0A0A0A] text-sm text-zinc-100 placeholder-zinc-500 rounded-xl px-4 py-2.5 border border-zinc-800 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#0A0A0A] text-sm text-zinc-100 rounded-xl px-4 py-2.5 border border-zinc-800 focus:border-[#D4AF37] focus:outline-none cursor-pointer"
                >
                  <option value="Jewelry">Jewelry</option>
                  <option value="Watches">Watches</option>
                  <option value="Bags">Bags</option>
                  <option value="Eyewear">Eyewear</option>
                  <option value="Belts & Leather">Belts & Leather</option>
                  <option value="Scarves & Hats">Scarves & Hats</option>
                </select>
              </div>

              {/* Price (PHP ₱) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  Price in Philippine Peso (PHP ₱) <span className="text-[#D4AF37]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-mono font-bold text-[#D4AF37]">₱</span>
                  <input
                    type="number"
                    min="100"
                    step="50"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="8500"
                    className="w-full bg-[#0A0A0A] text-sm text-zinc-100 pl-8 pr-4 py-2.5 rounded-xl border border-zinc-800 focus:border-[#D4AF37] focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              {/* Stock Available */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Available Stock Quantity</label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={stockCount}
                  onChange={(e) => setStockCount(e.target.value)}
                  className="w-full bg-[#0A0A0A] text-sm text-zinc-100 px-4 py-2.5 rounded-xl border border-zinc-800 focus:border-[#D4AF37] focus:outline-none font-mono"
                  required
                />
              </div>

              {/* Primary Material */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Materials Used</label>
                <input
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  placeholder="e.g. 18K Solid Gold, Colombian Emerald, Beta-Titanium"
                  className="w-full bg-[#0A0A0A] text-sm text-zinc-100 placeholder-zinc-500 rounded-xl px-4 py-2.5 border border-zinc-800 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              {/* Seller Payout GCash Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Your Payout GCash Mobile Number (Required) *</span>
                </label>
                <input
                  type="text"
                  value={sellerGcash}
                  onChange={(e) => setSellerGcash(e.target.value)}
                  placeholder="0917-XXX-XXXX"
                  className="w-full bg-[#0A0A0A] text-sm text-emerald-300 font-mono font-bold rounded-xl px-4 py-2.5 border border-emerald-500/40 focus:border-emerald-400 focus:outline-none"
                  required
                />
              </div>

              {/* Seller Atelier Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Atelier / Brand Name</label>
                <input
                  type="text"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  placeholder="e.g. Lumina Gemworks Manila"
                  className="w-full bg-[#0A0A0A] text-sm text-zinc-100 rounded-xl px-4 py-2.5 border border-zinc-800 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                Detailed Product Description & Craft Story <span className="text-[#D4AF37]">*</span>
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the artistry, dimensions, clasp mechanism, weight, and styling pairings..."
                className="w-full bg-[#0A0A0A] text-sm text-zinc-100 placeholder-zinc-500 rounded-xl p-4 border border-zinc-800 focus:border-[#D4AF37] focus:outline-none"
                required
              />
            </div>

            {/* Image URL & Presets */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300">Product Image URL</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-[#0A0A0A] text-xs text-zinc-100 font-mono rounded-xl px-4 py-2.5 border border-zinc-800 focus:border-[#D4AF37] focus:outline-none"
              />
              
              {/* Image Presets */}
              <div className="flex items-center gap-2 overflow-x-auto pt-1">
                <span className="text-[11px] text-zinc-400 whitespace-nowrap">Presets:</span>
                {imagePresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setImageUrl(preset.url)}
                    className="px-2.5 py-1 rounded-lg bg-[#0A0A0A] border border-zinc-800 hover:border-[#D4AF37] text-[10px] text-zinc-300 whitespace-nowrap cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] hover:from-[#e5c158] hover:to-[#D4AF37] text-black font-bold text-xs shadow-lg shadow-[#D4AF37]/20 cursor-pointer transition-all"
              >
                Publish Accessory Listing
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Current Listings Table */}
      <div className="bg-[#0f0f11] border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white font-serif-luxury">
              Your Active Inventory
            </h2>
            <p className="text-xs text-zinc-400">
              Live accessories published on the AURA marketplace storefront.
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            {displayProducts.length} Total Pieces
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300 divide-y divide-zinc-800">
            <thead>
              <tr className="text-zinc-400 font-semibold uppercase tracking-wider text-[10px] bg-[#0A0A0A]/60">
                <th className="py-3 px-4 rounded-l-xl">Piece</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price (PHP)</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Payout GCash</th>
                <th className="py-3 px-4 rounded-r-xl text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {displayProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img src={prod.image} alt={prod.title} className="w-10 h-10 object-cover rounded-lg border border-zinc-700" />
                    <div>
                      <div className="font-bold text-white truncate max-w-[200px]">{prod.title}</div>
                      <div className="text-[10px] text-zinc-500 font-mono">ID: {prod.id}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono">{prod.category}</td>
                  <td className="py-3 px-4 font-mono font-bold text-[#D4AF37]">
                    ₱{prod.price.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {prod.stockCount} in stock
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[#D4AF37]">
                    ★ {prod.rating} ({prod.reviewsCount})
                  </td>
                  <td className="py-3 px-4 font-mono text-zinc-300">
                    {prod.seller.gcashNumber}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onDeleteProduct(prod.id)}
                      className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 rounded-lg cursor-pointer"
                      title="Delete Listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
