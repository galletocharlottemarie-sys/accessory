import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User as UserIcon, 
  Smartphone, 
  HelpCircle, 
  Compass, 
  Settings2,
  ExternalLink,
  Check
} from 'lucide-react';
import { ChatMessage, Product } from '../types';

interface AIChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
  products: Product[];
  initialContextProduct?: Product | null;
}

export const AIChatbotModal: React.FC<AIChatbotModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  products,
  initialContextProduct
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: "Hello! I am Aura, your bespoke luxury accessory stylist & marketplace concierge. I can recommend jewelry pairings, advise on timepieces and leathercraft, explain PayMongo GCash checkout, or assist sellers with publishing pieces. What can I curate for you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        'Match necklace with black dress',
        'How do GCash seller payouts work?',
        'Best automatic luxury watch?',
        'Verify PayMongo escrow safety'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voiceflowMode, setVoiceflowMode] = useState(false);
  const [voiceflowId, setVoiceflowId] = useState(import.meta.env.VITE_VOICEFLOW_PROJECT_ID || '');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialContextProduct) {
      const prompt = `Can you recommend styling combinations and occasions for the "${initialContextProduct.title}"?`;
      sendMessage(prompt);
    }
  }, [initialContextProduct]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();
      const reply = data.reply || "I am here to assist with styling and marketplace questions.";

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: "For accessories styling: 18k Baroque Pearls pair elegantly with silk slip dresses, while our Chronos Obsidian watch adds refined contrast to tailored linen or wool blazers. PayMongo protects every checkout via GCash and Maya escrow!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  if (!isOpen) return null;

  return (
    <div id="ai-chatbot-widget" className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] max-h-[620px] h-[85vh] bg-slate-900 border border-amber-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left animate-fade-in">
      
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/50 p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm text-slate-100 font-serif-luxury">Aura AI Stylist</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[10px] text-slate-400 font-mono">Gemini & Voiceflow Concierge</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setVoiceflowMode(!voiceflowMode)}
            className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
              voiceflowMode ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Configure Voiceflow Chatbot ID"
          >
            <Settings2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Voiceflow Configuration Drawer */}
      {voiceflowMode && (
        <div className="p-4 bg-slate-950 border-b border-slate-800 text-xs space-y-2 text-slate-300">
          <div className="font-bold text-amber-400 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Voiceflow AI Integration</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Enter your Voiceflow Project ID to connect your custom dialog agent.
          </p>
          <input
            type="text"
            value={voiceflowId}
            onChange={(e) => setVoiceflowId(e.target.value)}
            placeholder="e.g. 6492... or VF.DM.xxxxx"
            className="w-full bg-slate-900 text-xs text-slate-100 px-3 py-1.5 rounded-lg border border-slate-700 font-mono"
          />
          <div className="flex justify-between items-center text-[10px] text-slate-500">
            <span>Status: Gemini Hybrid Active</span>
            <button
              onClick={() => setVoiceflowMode(false)}
              className="text-amber-400 hover:underline font-bold"
            >
              Save & Close
            </button>
          </div>
        </div>
      )}

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#090D16]/50">
        {messages.map((msg) => {
          const isBot = msg.sender === 'assistant';
          return (
            <div key={msg.id} className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
              <div className="flex items-start gap-2 max-w-[88%]">
                {isBot && (
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 text-[10px] border border-amber-500/30 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isBot
                      ? 'bg-slate-900 border border-slate-800 text-slate-200 shadow-md'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-medium'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>

              {/* Timestamp */}
              <span className="text-[9px] text-slate-500 font-mono mt-1 px-1">
                {msg.timestamp}
              </span>

              {/* Suggested Action Chips */}
              {msg.suggestedActions && (
                <div className="flex flex-wrap gap-1.5 mt-2 pl-8">
                  {msg.suggestedActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(action)}
                      className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-white text-[10px] border border-amber-500/30 transition-colors cursor-pointer"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Aura is composing styling advice...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleFormSubmit} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask Aura about styling, pearls, GCash..."
          className="flex-1 bg-slate-900 text-xs text-slate-100 placeholder-slate-500 rounded-xl px-3.5 py-2.5 border border-slate-700/80 focus:border-amber-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 cursor-pointer transition-colors shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
