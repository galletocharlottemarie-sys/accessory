import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Lock, 
  ArrowRight, 
  Download, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Product, User, Order } from '../types';

interface PayMongoCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  directProduct?: Product | null;
  currentUser: User | null;
  onPaymentSuccess: (order: Order) => void;
}

export const PayMongoCheckoutModal: React.FC<PayMongoCheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  directProduct,
  currentUser,
  onPaymentSuccess
}) => {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState<'gcash' | 'card' | 'maya' | 'grab_pay'>('gcash');
  const [buyerName, setBuyerName] = useState(currentUser?.name || '');
  const [buyerEmail, setBuyerEmail] = useState(currentUser?.email || '');
  const [buyerGcash, setBuyerGcash] = useState(currentUser?.gcashNumber || '0917-884-2190');
  const [shippingAddress, setShippingAddress] = useState(currentUser?.address || 'One Bonifacio High Street, BGC, Taguig City, Metro Manila');
  
  // Simulated GCash OTP Step
  const [isProcessing, setIsProcessing] = useState(false);
  const [showGcashOtpScreen, setShowGcashOtpScreen] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Compute Total
  const activeItems: CartItem[] = directProduct
    ? [{ product: directProduct, quantity: 1 }]
    : cartItems;

  const subtotal = activeItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shippingFee = subtotal > 15000 ? 0 : 350;
  const grandTotal = subtotal + shippingFee;

  const handleStartPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail || (paymentMethod === 'gcash' && !buyerGcash)) {
      return;
    }

    setIsProcessing(true);

    if (paymentMethod === 'gcash') {
      // Simulate GCash 6-digit OTP verification screen (standard PayMongo e-wallet flow)
      setTimeout(() => {
        setIsProcessing(false);
        setShowGcashOtpScreen(true);
      }, 700);
    } else {
      // Direct Card/Maya processing
      setTimeout(() => {
        finalizeOrder();
      }, 1200);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      finalizeOrder();
    }, 800);
  };

  const finalizeOrder = () => {
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      items: activeItems,
      totalAmount: grandTotal,
      buyerName,
      buyerEmail,
      buyerGcash,
      shippingAddress,
      paymentMethod,
      status: 'paid',
      paymongoPaymentIntentId: `pi_pm_${Date.now()}_live`,
      createdAt: new Date().toISOString(),
      receiptNumber: `AURA-PM-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setIsProcessing(false);
    setShowGcashOtpScreen(false);
    setCompletedOrder(newOrder);
    onPaymentSuccess(newOrder);

    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  return (
    <div id="paymongo-checkout-modal" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative text-left my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {completedOrder ? (
          /* Order Success / PayMongo Receipt View */
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/40 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                Payment Authorized by PayMongo
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 font-serif-luxury">
                Payment Successful!
              </h2>
              <p className="text-xs text-slate-400">
                Receipt Number: <span className="font-mono text-amber-400 font-bold">{completedOrder.receiptNumber}</span>
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs space-y-3">
              <div className="flex justify-between border-b border-slate-800 pb-2 font-semibold text-slate-300">
                <span>Items Purchased</span>
                <span>Amount</span>
              </div>
              {completedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-slate-400">
                  <span>{item.quantity}x {item.product.title}</span>
                  <span className="font-mono text-slate-200">₱{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-slate-100 text-sm">
                <span>Total Paid ({completedOrder.paymentMethod.toUpperCase()})</span>
                <span className="font-mono text-amber-400">₱{completedOrder.totalAmount.toLocaleString()}</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-mono pt-1">
                Seller Notification Sent: Payout scheduled to Artisan's GCash account.
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer transition-all"
              >
                Back to Storefront
              </button>
            </div>
          </div>
        ) : showGcashOtpScreen ? (
          /* GCash PayMongo OTP Simulation View */
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                GCash
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-100 font-serif-luxury">
                  GCash Authentication
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  PayMongo Secure E-Wallet Gateway
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-blue-500/30 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Merchant:</span>
                <span className="font-bold text-slate-200">AURA Luxury Marketplace</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">GCash Mobile:</span>
                <span className="font-mono text-amber-400 font-bold">{buyerGcash}</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-2 font-bold">
                <span className="text-slate-200">Amount Due:</span>
                <span className="font-mono text-emerald-400 text-sm">₱{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Enter 6-Digit GCash MPIN / OTP Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="123456"
                  className="w-full bg-slate-950 text-center font-mono text-xl tracking-widest text-emerald-300 rounded-xl py-3 border border-slate-800 focus:border-emerald-400 focus:outline-none"
                  required
                />
                <p className="text-[11px] text-slate-500 text-center">
                  (Simulated Sandbox: You may enter any 6 numbers to test instantaneous approval)
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGcashOtpScreen(false)}
                  className="w-1/3 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-xs shadow-lg shadow-blue-500/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>Authorizing GCash...</span>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-current" />
                      <span>Confirm & Pay ₱{grandTotal.toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Main PayMongo Checkout View */
          <div className="space-y-5">
            <div>
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>PayMongo Bank-Grade Escrow Checkout</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-100 font-serif-luxury mt-1">
                Complete Your Acquisition
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Choose your preferred Philippine payment channel.
              </p>
            </div>

            {/* Order Items Preview */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="font-semibold text-slate-300 pb-1 border-b border-slate-800">
                Order Summary ({activeItems.length} {activeItems.length === 1 ? 'Piece' : 'Pieces'})
              </div>
              {activeItems.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-slate-400">
                  <span className="truncate max-w-[280px]">{item.quantity}x {item.product.title}</span>
                  <span className="font-mono text-slate-200">₱{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-slate-100">
                <span>Grand Total:</span>
                <span className="text-amber-400 font-mono text-base">₱{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Select PayMongo Payment Method</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'gcash', label: 'GCash', icon: Smartphone, color: 'border-blue-500/40 bg-blue-500/10 text-blue-300' },
                  { id: 'card', label: 'Card / Visa', icon: CreditCard, color: 'border-amber-500/40 bg-amber-500/10 text-amber-300' },
                  { id: 'maya', label: 'Maya', icon: Smartphone, color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' },
                  { id: 'grab_pay', label: 'GrabPay', icon: Smartphone, color: 'border-green-500/40 bg-green-500/10 text-green-300' }
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        isSelected
                          ? `border-amber-400 bg-amber-500/20 text-amber-300 ring-1 ring-amber-400`
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <Icon className="w-5 h-5 mb-2" />
                      <div className="font-bold text-xs">{m.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleStartPayment} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Buyer Full Name</label>
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="e.g. Juan Dela Cruz"
                    className="w-full bg-slate-950 text-xs text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Email for Receipt</label>
                  <input
                    type="email"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="juan@email.com"
                    className="w-full bg-slate-950 text-xs text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {paymentMethod === 'gcash' && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>GCash Number to Charge (09XX-XXX-XXXX) *</span>
                  </label>
                  <input
                    type="text"
                    value={buyerGcash}
                    onChange={(e) => setBuyerGcash(e.target.value)}
                    placeholder="09171234567"
                    className="w-full bg-slate-950 text-xs text-emerald-300 font-mono font-bold rounded-xl px-3.5 py-2.5 border border-emerald-500/40 focus:border-emerald-400 focus:outline-none"
                    required
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Delivery Address</label>
                <input
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Unit, Building, Street, City, Metro Manila"
                  className="w-full bg-slate-950 text-xs text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2 transition-all mt-3"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Pay ₱{grandTotal.toLocaleString()} with PayMongo ({paymentMethod.toUpperCase()})</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
