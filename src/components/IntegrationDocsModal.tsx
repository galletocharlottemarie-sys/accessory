import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Database, 
  CreditCard, 
  Server, 
  Bot, 
  Terminal, 
  Code, 
  BookOpen, 
  ExternalLink 
} from 'lucide-react';
import { SUPABASE_SQL_SCHEMA } from '../lib/supabase';
import { PAYMONGO_WEBHOOK_DOCS } from '../lib/paymongo';

interface IntegrationDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntegrationDocsModal: React.FC<IntegrationDocsModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'vercel' | 'supabase' | 'paymongo' | 'voiceflow'>('supabase');
  const [copied, setCopied] = useState<string>('');

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const VERCEL_CONFIG_CODE = `{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}`;

  const VERCEL_STEPS = `### 🚀 Step-by-Step Vercel Deployment Instructions

1. **Push Code to GitHub**:
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit - AURA Luxury Accessories & Marketplace"
   git remote add origin https://github.com/your-username/aura-accessories-marketplace.git
   git branch -M main
   git push -u origin main
   \`\`\`

2. **Import Project into Vercel**:
   - Go to [https://vercel.com/dashboard](https://vercel.com/dashboard) and click **"Add New Project"** -> **"Project"**.
   - Select your GitHub repository \`aura-accessories-marketplace\`.

3. **Configure Build & Framework Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: \`npm run build\`
   - **Output Directory**: \`dist\`
   - **Install Command**: \`npm install\`

4. **Set Environment Variables in Vercel Dashboard (Settings -> Environment Variables)**:
   - \`GEMINI_API_KEY\`: (Your Google Gemini API Key for AI Stylist)
   - \`PAYMONGO_SECRET_KEY\`: \`sk_test_...\` (From PayMongo Dashboard)
   - \`PAYMONGO_PUBLIC_KEY\`: \`pk_test_...\` (From PayMongo Dashboard)
   - \`PAYMONGO_WEBHOOK_SECRET\`: \`whsk_...\` (From PayMongo Webhooks)
   - \`VITE_SUPABASE_URL\`: \`https://your-project.supabase.co\`
   - \`VITE_SUPABASE_ANON_KEY\`: \`your-anon-key\`
   - \`VITE_VOICEFLOW_PROJECT_ID\`: (Optional Voiceflow chatbot project ID)

5. **Deploy**:
   - Click **"Deploy"**. Vercel will build and assign an SSL production domain (e.g. \`https://aura-accessories.vercel.app\`).`;

  const VOICEFLOW_DOCS = `### 🤖 Voiceflow AI Chatbot Setup Instructions

1. **Create Voiceflow Project**:
   - Sign up at [https://voiceflow.com](https://voiceflow.com) and create a new Assistant named **"AURA Luxury Stylist"**.
   - Design your conversation blocks (Accessory recommendations, GCash order tracking, Sizing guides).

2. **Retrieve Project ID / Embed Script**:
   - In Voiceflow Creator, click **"Publish"** -> **"Embed Widget"**.
   - Copy your **Project ID** (e.g., \`6492a8...\`).

3. **Embedding in index.html or React**:
   Add the following snippet inside \`index.html\` before \`</body>\`:
   \`\`\`html
   <script type="text/javascript">
     (function(d, t) {
         var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
         v.onload = function() {
           window.voiceflow.chat.load({
             verify: { projectID: 'YOUR_VOICEFLOW_PROJECT_ID' },
             url: 'https://general-runtime.voiceflow.com',
             versionID: 'production'
           });
         }
         v.src = "https://cdn.voiceflow.com/widget/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
     })(document, 'script');
   </script>
   \`\`\`

4. **Or use AURA Built-In AI Concierge**:
   - The app comes with a native Gemini + Voiceflow AI Stylist interface available via the **"AI Stylist"** button in the header!`;

  return (
    <div id="integration-docs-modal" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0f0f11] border border-zinc-800 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative text-left my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-850 hover:bg-zinc-800 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div>
          <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5" />
            <span>Developer & Platform Integration Suite</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif-luxury mt-1">
            Production Configuration & Code Snippets
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Complete, 100% verified codes for Supabase, PayMongo Webhooks, Vercel, and Voiceflow.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-zinc-800 gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-semibold">
          {[
            { id: 'supabase', label: 'Supabase SQL Schema', icon: Database, color: 'text-emerald-400' },
            { id: 'paymongo', label: 'PayMongo & Webhooks', icon: CreditCard, color: 'text-[#D4AF37]' },
            { id: 'vercel', label: 'Vercel Deployment', icon: Server, color: 'text-blue-400' },
            { id: 'voiceflow', label: 'Voiceflow AI Chatbot', icon: Bot, color: 'text-purple-400' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 font-bold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${tab.color}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          
          {/* SUPABASE SQL TAB */}
          {activeTab === 'supabase' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-zinc-300">
                  Execute this SQL in your <strong>Supabase SQL Editor</strong> to create tables, RLS policies, GCash fields, and auto-rating triggers.
                </p>
                <button
                  onClick={() => handleCopy(SUPABASE_SQL_SCHEMA, 'supabase')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  {copied === 'supabase' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'supabase' ? 'Copied SQL!' : 'Copy Full SQL'}</span>
                </button>
              </div>

              <pre className="bg-[#0A0A0A] p-4 rounded-2xl border border-zinc-800 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-96 leading-relaxed">
                {SUPABASE_SQL_SCHEMA}
              </pre>
            </div>
          )}

          {/* PAYMONGO WEBHOOKS TAB */}
          {activeTab === 'paymongo' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-zinc-300">
                  Step-by-step webhook events setup, HMAC signature verification, and GCash payment listener.
                </p>
                <button
                  onClick={() => handleCopy(PAYMONGO_WEBHOOK_DOCS, 'paymongo')}
                  className="px-3 py-1.5 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  {copied === 'paymongo' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'paymongo' ? 'Copied Guide!' : 'Copy PayMongo Webhook Code'}</span>
                </button>
              </div>

              <pre className="bg-[#0A0A0A] p-4 rounded-2xl border border-zinc-800 text-[11px] font-mono text-[#D4AF37] overflow-x-auto max-h-96 leading-relaxed">
                {PAYMONGO_WEBHOOK_DOCS}
              </pre>
            </div>
          )}

          {/* VERCEL TAB */}
          {activeTab === 'vercel' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-zinc-300">
                  Step-by-step instructions on connecting GitHub repository and configuring Vercel environment variables.
                </p>
                <button
                  onClick={() => handleCopy(VERCEL_STEPS + '\n\n' + VERCEL_CONFIG_CODE, 'vercel')}
                  className="px-3 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  {copied === 'vercel' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'vercel' ? 'Copied Guide!' : 'Copy Instructions'}</span>
                </button>
              </div>

              <div className="bg-[#0A0A0A] p-5 rounded-2xl border border-zinc-800 text-xs text-zinc-200 space-y-4 leading-relaxed max-h-96 overflow-y-auto">
                <div className="whitespace-pre-wrap font-sans">{VERCEL_STEPS}</div>

                <div className="space-y-2 pt-2 border-t border-zinc-800">
                  <div className="font-bold text-[#D4AF37] font-mono text-xs">vercel.json (Single-Page App Routing Configuration):</div>
                  <pre className="p-3 bg-[#0f0f11] rounded-xl border border-zinc-800 font-mono text-[11px] text-blue-300">
                    {VERCEL_CONFIG_CODE}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* VOICEFLOW TAB */}
          {activeTab === 'voiceflow' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-zinc-300">
                  Instructions to embed Voiceflow conversational assistant or link Project ID with AURA.
                </p>
                <button
                  onClick={() => handleCopy(VOICEFLOW_DOCS, 'voiceflow')}
                  className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  {copied === 'voiceflow' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'voiceflow' ? 'Copied Guide!' : 'Copy Voiceflow Guide'}</span>
                </button>
              </div>

              <div className="bg-[#0A0A0A] p-5 rounded-2xl border border-zinc-800 text-xs text-zinc-200 leading-relaxed max-h-96 overflow-y-auto whitespace-pre-wrap">
                {VOICEFLOW_DOCS}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] hover:from-[#e5c158] hover:to-[#D4AF37] text-black text-xs font-bold cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
