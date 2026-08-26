import React, { useState } from 'react';
import { Star, X, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { Product, Review, User } from '../types';

interface ReviewModalProps {
  product: Product;
  currentUser: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Review) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  product,
  currentUser,
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [userName, setUserName] = useState<string>(currentUser?.name || '');
  const [comment, setComment] = useState<string>('');
  const [verifiedGcash, setVerifiedGcash] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!comment.trim() || comment.trim().length < 10) {
      setError('Please write at least 10 characters describing the accessory');
      return;
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      userName: userName.trim(),
      rating,
      date: new Date().toISOString().split('T')[0],
      comment: comment.trim(),
      verifiedPurchase: true,
      gcashVerified: verifiedGcash
    };

    onSubmitReview(newReview);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title & Product context */}
        <div>
          <div className="text-xs font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>Product Star Review Submission</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-serif-luxury mt-1">
            Rate {product.title}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Share your experience on craftsmanship, fit, lustre, and delivery.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Interactive Star Rating Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">
              Your Rating (1 to 5 Stars) <span className="text-amber-400">*</span>
            </label>
            <div className="flex items-center gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = (hoverRating || rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 cursor-pointer transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          active
                            ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                            : 'text-slate-700 hover:text-slate-500'
                        } transition-all`}
                      />
                    </button>
                  );
                })}
              </div>
              <span className="text-sm font-mono font-bold text-amber-400 ml-3">
                {rating} of 5 Stars
              </span>
              <span className="text-xs text-slate-400 ml-auto">
                {rating === 5 ? 'Exceptional' : rating === 4 ? 'Very Good' : rating === 3 ? 'Average' : 'Needs Improvement'}
              </span>
            </div>
          </div>

          {/* Reviewer Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Your Full Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="e.g. Maria Clara Santos"
              className="w-full bg-slate-950 text-sm text-slate-100 placeholder-slate-400 rounded-xl px-4 py-2.5 border border-slate-800 focus:border-amber-500 focus:outline-none"
              required
            />
          </div>

          {/* Written Feedback */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Detailed Written Review & Experience
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe the material quality, gold lustre, leather texture, PayMongo GCash checkout experience, etc."
              className="w-full bg-slate-950 text-sm text-slate-100 placeholder-slate-400 rounded-xl p-4 border border-slate-800 focus:border-amber-500 focus:outline-none"
              required
            />
          </div>

          {/* GCash Verified Buyer Tag Switch */}
          <div className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Mark as Verified GCash / PayMongo Buyer</span>
            </div>
            <input
              type="checkbox"
              checked={verifiedGcash}
              onChange={(e) => setVerifiedGcash(e.target.checked)}
              className="w-4 h-4 accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold shadow-lg transition-all cursor-pointer"
            >
              Post Star Review
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
