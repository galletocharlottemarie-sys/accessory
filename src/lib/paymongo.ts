// PayMongo Gateway Client Helper & Webhook Guide
export interface PayMongoCheckoutOptions {
  amount: number; // in PHP
  description: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethods: ('gcash' | 'card' | 'paymaya' | 'grab_pay')[];
  metadata?: Record<string, unknown>;
}

export interface PayMongoWebhookEvent {
  id: string;
  type: string;
  attributes: {
    type: 'payment.paid' | 'checkout_session.payment.paid' | 'source.chargeable' | 'payment.failed';
    livemode: boolean;
    data: {
      id: string;
      type: string;
      attributes: {
        amount: number;
        currency: string;
        status: string;
        payment_method_type: string;
        external_reference_number?: string;
        billing?: {
          name: string;
          email: string;
          phone: string;
        };
        metadata?: Record<string, unknown>;
      };
    };
  };
}

export const PAYMONGO_WEBHOOK_DOCS = `// ========================================================================
// PAYMONGO WEBHOOK IMPLEMENTATION GUIDE (Node.js / Express / Next.js)
// ========================================================================

// 1. PayMongo Dashboard Configuration:
//    - Log into https://dashboard.paymongo.com
//    - Go to Developers -> Webhooks -> Add Webhook
//    - Set Webhook URL: https://yourdomain.com/api/paymongo/webhook
//    - Select Events to Listen:
//        * checkout_session.payment.paid (Triggers when buyer completes GCash/Card checkout)
//        * payment.paid (Direct payment authorization success)
//        * payment.failed (Failed transaction)
//        * source.chargeable (For legacy e-wallets)
//    - Copy your Webhook Secret Key (whsk_...) and add it to your .env:
//        PAYMONGO_WEBHOOK_SECRET=whsk_...

// 2. Sample Express Webhook Endpoint with Signature Verification:
import express from 'express';
import crypto from 'crypto';

const app = express();

// Important: PayMongo webhooks require the RAW body to verify cryptographic signatures
app.post('/api/paymongo/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const signatureHeader = req.headers['paymongo-signature'] as string;
  const webhookSecret = process.env.PAYMONGO_WEBHOOK_SECRET;

  if (!signatureHeader || !webhookSecret) {
    return res.status(400).send('Missing signature or webhook secret');
  }

  // Parse signature header: 't=1620000000,te=...,li=...'
  const parts = signatureHeader.split(',');
  const timestamp = parts.find(p => p.startsWith('t='))?.split('=')[1];
  const liveSignature = parts.find(p => p.startsWith('li='))?.split('=')[1];
  const testSignature = parts.find(p => p.startsWith('te='))?.split('=')[1];

  const payload = \`\${timestamp}.\${req.body.toString('utf8')}\`;
  const computedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(payload)
    .digest('hex');

  const expectedSignature = process.env.NODE_ENV === 'production' ? liveSignature : (testSignature || liveSignature);

  if (computedSignature !== expectedSignature) {
    return res.status(401).send('Invalid webhook signature');
  }

  const event = JSON.parse(req.body.toString('utf8')).data;

  // Handle Event Types
  switch (event.attributes.type) {
    case 'checkout_session.payment.paid': {
      const paymentData = event.attributes.data.attributes;
      const orderId = paymentData.metadata?.orderId;
      console.log(\`✅ Order \${orderId} paid via \${paymentData.payment_method_type}! Amount: PHP \${paymentData.amount / 100}\`);
      // Update order status in Supabase/Database to 'paid'
      // Send receipt email to buyer and notification to Seller GCash
      break;
    }
    case 'payment.failed': {
      console.error('❌ Payment failed:', event.attributes.data.attributes);
      break;
    }
    default:
      console.log(\`Received event \${event.attributes.type}\`);
  }

  res.status(200).json({ received: true });
});
`;
