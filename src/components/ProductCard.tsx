import React from 'react';
import { Star, ShoppingBag, Zap, ShieldCheck, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onInstantBuy: (product: Product, e: React.MouseEvent) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  onInstantBuy,
  isFavorite = false,
  onToggleFavorite
}) => {
  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onSelect(product)}
      className="group relative rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col cursor-pointer text-left"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.featured && (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider shadow">
              Featured
            </span>
          )}
          <span className="px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-sm text-slate-300 text-[10px] font-mono border border-slate-700">
            {product.category}
          </span>
        </div>

        {/* Favorite Button */}
        {onToggleFavorite && (
          <button
            onClick={(e) => onToggleFavorite(product.id, e)}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer z-10 ${
              isFavorite
                ? 'bg-rose-500 text-white'
                : 'bg-slate-950/70 text-slate-400 hover:text-rose-400 hover:bg-slate-900'
            }`}
            aria-label="Save to Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        )}

        {/* Stock status indicator */}
        <div className="absolute bottom-3 left-3 text-[11px] font-mono text-emerald-400 flex items-center gap-1 bg-slate-950/90 px-2 py-0.5 rounded-md border border-slate-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{product.stockCount} in stock</span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Seller micro-tag */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="truncate max-w-[150px]">{product.seller.name}</span>
            {product.seller.verified && (
              <span className="text-amber-400 flex items-center gap-0.5 font-mono text-[10px]">
                <ShieldCheck className="w-3 h-3" /> Verified
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-100 font-serif-luxury group-hover:text-amber-300 transition-colors line-clamp-1">
            {product.title}
          </h3>

          {/* Subtitle / Material */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1">
            {product.subtitle || product.material}
          </p>
        </div>

        {/* Star Rating Display */}
        <div className="flex items-center gap-2 pt-1">
          <div className="flex items-center text-amber-400">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-3.5 h-3.5 ${
                  s <= Math.round(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-700'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-mono text-slate-300 font-semibold">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-[11px] text-slate-400">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-amber-400 font-mono">
                ₱{product.price.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through font-mono">
                  ₱{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">
              PayMongo Ready
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={(e) => onAddToCart(product, e)}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add Cart</span>
            </button>

            <button
              onClick={(e) => onInstantBuy(product, e)}
              className="px-3 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
