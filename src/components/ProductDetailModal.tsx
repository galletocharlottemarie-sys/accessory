import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  Heart,
  MessageSquarePlus,
  Smartphone,
  Share2
} from 'lucide-react';
import { Product, Review, User } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  reviews: Review[];
  currentUser: User | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onInstantBuy: (product: Product) => void;
  onOpenReviewModal: (product: Product) => void;
  onOpenAIStylist: (product: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  reviews,
  currentUser,
  isOpen,
  onClose,
  onAddToCart,
  onInstantBuy,
  onOpenReviewModal,
  onOpenAIStylist,
  isFavorite,
  onToggleFavorite
}) => {
  if (!isOpen || !product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const averageRating = productReviews.length > 0
    ? (productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length).toFixed(1)
    : product.rating.toFixed(1);

  const galleryList = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image];

  return (
    <div id="product-detail-modal" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0f0f11] border border-zinc-800 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative text-left my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#18181b]/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          
          {/* Left Column (5 cols): High-Contrast Image Showcase */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#0A0A0A] border border-zinc-800">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-cover object-center"
              />
              <button
                onClick={() => onToggleFavorite(product.id)}
                className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-md cursor-pointer transition-all ${
                  isFavorite ? 'bg-rose-500 text-white' : 'bg-[#18181b]/80 text-zinc-400 hover:text-rose-400'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Gallery Thumbnails */}
            {galleryList.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {galleryList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                      selectedImage === img ? 'border-[#D4AF37] scale-105' : 'border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Seller & GCash Trust Box */}
            <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Sold & Curated by:</span>
                <span className="text-emerald-400 font-mono flex items-center gap-1 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" /> GCash Verified
                </span>
              </div>
              <div className="font-bold text-sm text-zinc-100">{product.seller.name}</div>
              <div className="text-[11px] text-zinc-400 flex items-center justify-between font-mono">
                <span>Location: {product.seller.location}</span>
                <span className="text-[#D4AF37]">★ {product.seller.rating} rating</span>
              </div>
              <div className="pt-1 text-[10px] text-zinc-500 font-mono">
                Payout GCash: {product.seller.gcashNumber}
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Information, Pricing, Specs, and Reviews */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-5">
            
            {/* Header Context */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
                  {product.category}
                </span>
                <span className="text-xs font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {product.stockCount > 0 ? `${product.stockCount} Ready to Ship` : 'Sold Out'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif-luxury leading-snug">
                {product.title}
              </h1>

              {/* Star Rating Overview with Review Count */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center text-[#D4AF37]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= Math.round(Number(averageRating))
                          ? 'fill-[#D4AF37] text-[#D4AF37]'
                          : 'text-zinc-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold font-mono text-[#D4AF37]">
                  {averageRating} / 5.0
                </span>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="text-xs text-zinc-400 hover:text-[#D4AF37] underline cursor-pointer"
                >
                  ({productReviews.length} Verified Reviews)
                </button>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-zinc-800 flex items-baseline justify-between">
              <div>
                <div className="text-xs text-zinc-400">PayMongo Direct Price</div>
                <div className="text-2xl sm:text-3xl font-black text-[#D4AF37] font-mono">
                  ₱{product.price.toLocaleString()}
                </div>
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="text-right">
                  <div className="text-[11px] text-zinc-500 line-through font-mono">
                    ₱{product.originalPrice.toLocaleString()}
                  </div>
                  <div className="text-xs font-bold text-emerald-400">
                    Save ₱{(product.originalPrice - product.price).toLocaleString()}
                  </div>
                </div>
              )}
            </div>

            {/* Tabs for Details, Specs, Reviews */}
            <div className="space-y-3">
              <div className="flex border-b border-zinc-800 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 px-3 transition-colors cursor-pointer ${
                    activeTab === 'details'
                      ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] font-bold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Overview & Craft
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 px-3 transition-colors cursor-pointer ${
                    activeTab === 'specs'
                      ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] font-bold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 px-3 transition-colors cursor-pointer ${
                    activeTab === 'reviews'
                      ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] font-bold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Reviews ({productReviews.length})
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'details' && (
                <div className="space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed max-h-40 overflow-y-auto pr-1">
                  <p>{product.description}</p>
                  <div className="p-3 bg-[#0A0A0A] rounded-xl border border-zinc-800 space-y-1">
                    <span className="font-bold text-[#D4AF37]">Primary Material:</span>{' '}
                    <span>{product.material}</span>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-2 text-xs max-h-40 overflow-y-auto pr-1">
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(product.specs || {}).map(([k, v]) => (
                      <div key={k} className="p-2.5 rounded-lg bg-[#0A0A0A] border border-zinc-800 flex justify-between">
                        <span className="text-zinc-400 font-medium">{k}:</span>
                        <span className="text-zinc-200 font-semibold">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Customer Feedback</span>
                    <button
                      onClick={() => onOpenReviewModal(product)}
                      className="text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <MessageSquarePlus className="w-3.5 h-3.5" />
                      Write a Star Review
                    </button>
                  </div>

                  {productReviews.length > 0 ? (
                    <div className="space-y-2.5">
                      {productReviews.map((rev) => (
                        <div key={rev.id} className="p-3 rounded-xl bg-[#0A0A0A] border border-zinc-800 text-xs space-y-1.5">
                          <div className="flex items-center justify-between">
                            <div className="font-semibold text-zinc-200 flex items-center gap-1.5">
                              <span>{rev.userName}</span>
                              {rev.gcashVerified && (
                                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-0.5">
                                  <ShieldCheck className="w-3 h-3" /> GCash Buyer
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-zinc-500 font-mono">{rev.date}</span>
                          </div>
                          <div className="flex items-center text-[#D4AF37]">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3 h-3 ${
                                  s <= rev.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-zinc-700'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-zinc-300">{rev.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-xs text-zinc-400">
                      No reviews yet. Be the first to review this piece!
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quantity Selector & Action CTAs */}
            <div className="pt-4 border-t border-zinc-800/80 space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-[#0A0A0A] rounded-xl border border-zinc-800 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg hover:bg-zinc-800 text-zinc-300 font-bold flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-sm text-zinc-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="w-8 h-8 rounded-lg hover:bg-zinc-800 text-zinc-300 font-bold flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => onOpenAIStylist(product)}
                  className="text-xs text-[#D4AF37] hover:text-amber-300 flex items-center gap-1.5 cursor-pointer ml-auto"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Ask AI How to Style This
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onAddToCart(product, quantity);
                    onClose();
                  }}
                  className="px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Shopping Bag</span>
                </button>

                <button
                  onClick={() => {
                    onInstantBuy(product);
                    onClose();
                  }}
                  className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] hover:from-[#e5c158] hover:to-[#D4AF37] text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 cursor-pointer transition-all"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Pay Now via PayMongo (GCash)</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
