import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0f0f11] border-l border-zinc-800 p-6 flex flex-col justify-between shadow-2xl text-left">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-lg font-bold text-white font-serif-luxury">Shopping Bag</h2>
              <span className="text-xs font-mono text-zinc-400">({cartItems.length})</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.product.id} className="p-3.5 rounded-2xl bg-[#0A0A0A] border border-zinc-800 flex gap-3 items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded-xl border border-zinc-700 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white truncate">{item.product.title}</div>
                    <div className="text-[11px] text-[#D4AF37] font-mono font-bold">
                      ₱{item.product.price.toLocaleString()}
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-[#141417] rounded-lg border border-zinc-700 px-1">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono text-zinc-200">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1 text-zinc-500 hover:text-rose-400 cursor-pointer ml-auto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto" />
                <div className="text-sm font-semibold text-zinc-300">Your bag is empty</div>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Explore our curated 18k gold pearls, horology, and Italian leather accessories.
                </p>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="border-t border-zinc-800 pt-4 space-y-3">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Subtotal</span>
                <span className="font-mono text-zinc-200">₱{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-400">
                <span>PayMongo Escrow Protection</span>
                <span className="text-emerald-400 font-mono">Free</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white border-t border-zinc-800/60 pt-2">
                <span>Estimated Total</span>
                <span className="font-mono text-[#D4AF37] text-base">₱{totalAmount.toLocaleString()}</span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] hover:from-[#e5c158] hover:to-[#D4AF37] text-black font-extrabold text-xs shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Proceed to PayMongo Checkout</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
