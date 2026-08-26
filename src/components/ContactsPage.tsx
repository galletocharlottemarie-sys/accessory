import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Smartphone 
} from 'lucide-react';

interface ContactsPageProps {
  onOpenAI: () => void;
}

export const ContactsPage: React.FC<ContactsPageProps> = ({ onOpenAI }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div id="contacts-page-root" className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 text-left">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f0f11] via-[#141417] to-[#241e12] rounded-3xl border border-zinc-800 p-8 sm:p-10 text-left">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>24/7 CLIENT & ARTISAN CONCIERGE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif-luxury">
            Contact AURA Concierge & Support
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base">
            Have questions about custom jewelry sizing, PayMongo checkout, or seller GCash disbursements? Our team and AI Stylist are here to assist.
          </p>
        </div>
      </div>

      {/* Grid: Left Contact Info (1/3) + Right Form (2/3) Rule of Thirds */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Info Panel */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#0f0f11] rounded-2xl border border-zinc-800 p-6 space-y-5">
            <h3 className="text-lg font-bold text-white font-serif-luxury border-b border-zinc-800 pb-3">
              Flagship Atelier & Offices
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 text-zinc-300">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-zinc-100">AURA Headquarters</div>
                  <div className="text-zinc-400">Level 28, High Street South Corporate Plaza, Bonifacio Global City, Taguig 1634, Philippines</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-zinc-300">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-zinc-100">GCash & Merchant Hotline</div>
                  <div className="text-zinc-400 font-mono">+63 (02) 8888-AURA / +63 917 884 2190</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-zinc-300">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-zinc-100">Direct Email Support</div>
                  <div className="text-zinc-400 font-mono">concierge@aura-accessories.ph</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-zinc-300">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-zinc-100">Concierge Operating Hours</div>
                  <div className="text-zinc-400">Monday - Sunday: 8:00 AM – 10:00 PM (PHT)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Instant AI Concierge Callout */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0f0f11] to-[#241e12] border border-[#D4AF37]/30 space-y-3">
            <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Need Immediate Style Advice?</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Our AI Stylist can answer sizing questions, recommend gift pairings, and track PayMongo orders in real time.
            </p>
            <button
              onClick={onOpenAI}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] hover:from-[#e5c158] hover:to-[#D4AF37] text-black font-bold text-xs cursor-pointer shadow transition-all"
            >
              Start Live AI Chat
            </button>
          </div>

        </div>

        {/* Right Message Form */}
        <div className="lg:col-span-7">
          <div className="bg-[#0f0f11] rounded-2xl border border-zinc-800 p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-serif-luxury">
                Send a Message to AURA
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Our client advisors respond within 2 hours during business hours.
              </p>
            </div>

            {sent ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white">Message Dispatched</h3>
                <p className="text-xs text-zinc-300">
                  Thank you! An AURA concierge specialist has received your inquiry and will reply via email shortly.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-200 text-xs font-semibold hover:bg-zinc-700 cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">Your Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Gabriel Tan"
                      className="w-full bg-[#0A0A0A] text-xs text-zinc-100 placeholder-zinc-500 rounded-xl px-3.5 py-2.5 border border-zinc-800 focus:border-[#D4AF37] focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="gabriel@domain.com"
                      className="w-full bg-[#0A0A0A] text-xs text-zinc-100 placeholder-zinc-500 rounded-xl px-3.5 py-2.5 border border-zinc-800 focus:border-[#D4AF37] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">Mobile / GCash Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0917-XXX-XXXX"
                      className="w-full bg-[#0A0A0A] text-xs text-zinc-100 font-mono rounded-xl px-3.5 py-2.5 border border-zinc-800 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">Topic of Inquiry</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#0A0A0A] text-xs text-zinc-100 rounded-xl px-3.5 py-2.5 border border-zinc-800 focus:border-[#D4AF37] focus:outline-none cursor-pointer"
                    >
                      <option value="Product Inquiry">Product Specs & Sizing</option>
                      <option value="PayMongo Checkout">PayMongo GCash Payment</option>
                      <option value="Seller Onboarding">Seller Onboarding & GCash Payouts</option>
                      <option value="Custom Bespoke Order">Custom Bespoke Commission</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Your Message *</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can our concierge assist your acquisition or listing today?"
                    className="w-full bg-[#0A0A0A] text-xs text-zinc-100 placeholder-zinc-500 rounded-xl p-3.5 border border-zinc-800 focus:border-[#D4AF37] focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] hover:from-[#e5c158] hover:to-[#D4AF37] text-black font-bold text-xs shadow-lg shadow-[#D4AF37]/20 cursor-pointer flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Concierge</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
