import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.warn('Failed to initialize GoogleGenAI:', e);
    }
  }
  return aiClient;
}

// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'AURA Accessories & PayMongo Marketplace' });
});

// AI Chatbot endpoint (Gemini Stylist & Concierge)
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, context } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = getAIClient();
    if (ai) {
      const systemInstruction = `You are "Aura", the elite AI Stylist & Concierge for AURA Luxury Accessories & Marketplace.
You specialize in styling fine jewelry, luxury timepieces, artisanal Italian & Marikina leather bags, titanium eyewear, silk scarves, and handmade belts.
Context:
- The marketplace operates in the Philippines (PHP / ₱) with PayMongo GCash, Maya, and Card checkout.
- Sellers can register their accounts, post handcrafted accessories, and get instant payouts directly to their GCash number.
- Buyers can browse, review products with 1-5 star ratings, and pay safely via PayMongo.
Tone: Sophisticated, helpful, fashion-forward, warm, and knowledgeable.
Provide concise, actionable styling advice, accessory pairing tips, material care guidelines, or help navigating the marketplace. Mention specific materials (18k Gold, Baroque Pearl, Saffiano leather, Beta-titanium) where appropriate.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Question: ${message}` }] }
        ],
      });

      const replyText = response.text || 'I would be delighted to assist you with finding the perfect accessory.';
      return res.json({ reply: replyText });
    } else {
      // Fallback smart responses if GEMINI_API_KEY is not configured
      const lower = message.toLowerCase();
      let fallback = "Welcome to AURA. I am your concierge. How may I assist your style choices today?";
      
      if (lower.includes('gcash') || lower.includes('pay') || lower.includes('payment')) {
        fallback = "We accept secure GCash, Credit/Debit cards, Maya, and GrabPay powered by PayMongo. Sellers receive automatic GCash disbursements directly to their registered mobile number.";
      } else if (lower.includes('sell') || lower.includes('post') || lower.includes('dashboard')) {
        fallback = "You can sell your handcrafted accessories by clicking 'Seller Dashboard' in the header. Enter your product details, upload photos, and connect your GCash number for immediate payouts!";
      } else if (lower.includes('necklace') || lower.includes('pearl') || lower.includes('jewelry')) {
        fallback = "For evening events, our Aethelgard 18k Baroque Pearl Pendant pairs magnificently with silk slip dresses or sharp tailored blazers. For rings, our Verona Emerald Solitaire Signet adds deep royal elegance.";
      } else if (lower.includes('watch') || lower.includes('timepiece')) {
        fallback = "Our Chronos Obsidian Automatic features a scratch-resistant sapphire crystal and 18k rose gold bezel—ideal for both business meetings and weekend galas.";
      } else if (lower.includes('review') || lower.includes('star') || lower.includes('rating')) {
        fallback = "Buyers can rate any product from 1 to 5 stars and leave detailed feedback with photos on the product detail page.";
      }

      return res.json({ reply: fallback });
    }
  } catch (error: unknown) {
    console.error('Chat endpoint error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: 'Failed to process AI chat request', details: errorMessage });
  }
});

// PayMongo Checkout creation proxy
app.post('/api/paymongo/create-checkout', async (req, res) => {
  try {
    const { amount, description, customerName, customerEmail, customerPhone, items } = req.body;
    const secretKey = process.env.PAYMONGO_SECRET_KEY;

    if (!secretKey || secretKey.includes('your_secret_key')) {
      // Return simulated checkout response for seamless testing
      const mockCheckoutUrl = `/checkout/simulated?ref=pm_${Date.now()}`;
      return res.json({
        simulated: true,
        checkoutUrl: mockCheckoutUrl,
        checkoutId: `cs_${Date.now()}`,
        message: 'Simulated PayMongo checkout session initialized.'
      });
    }

    // Call live PayMongo API
    const response = await fetch('https://api.paymongo.com/v1/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(secretKey + ':').toString('base64')}`
      },
      body: JSON.stringify({
        data: {
          attributes: {
            send_email_receipt: true,
            show_description: true,
            show_line_items: true,
            description: description || 'AURA Luxury Accessories Purchase',
            line_items: items?.map((item: { name: string; amount: number; quantity: number; currency?: string }) => ({
              name: item.name,
              amount: Math.round(item.amount * 100), // in centavos
              currency: 'PHP',
              quantity: item.quantity || 1
            })) || [{
              name: 'AURA Order',
              amount: Math.round(amount * 100),
              currency: 'PHP',
              quantity: 1
            }],
            payment_method_types: ['gcash', 'card', 'paymaya', 'grab_pay'],
            customer_billing: {
              name: customerName,
              email: customerEmail,
              phone: customerPhone
            }
          }
        }
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    res.json({
      simulated: false,
      checkoutUrl: data.data.attributes.checkout_url,
      checkoutId: data.data.id
    });
  } catch (error: unknown) {
    console.error('PayMongo checkout error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to create PayMongo checkout session', details: errorMessage });
  }
});

// PayMongo Webhook receiver
app.post('/api/paymongo/webhook', (req, res) => {
  const event = req.body;
  console.log('Incoming PayMongo webhook event:', event?.data?.attributes?.type || 'unknown');
  res.status(200).json({ received: true });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AURA Server running on http://localhost:${PORT}`);
  });
}

startServer();
