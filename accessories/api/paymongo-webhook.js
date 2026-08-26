import { createClient } from '@supabase/supabase-js';

const db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const event = req.body.data;

  // Process checkout session success events
  if (event.attributes.type === 'checkout_session.payment.paid') {
    const session = event.attributes.data.attributes;
    const metadata = session.metadata;

    // Record order in Supabase database
    await db.from('orders').insert([{
      buyer_id: metadata.buyer_id,
      total_amount: session.line_items[0].amount / 100,
      status: 'paid',
      paymongo_checkout_id: event.id
    }]);
  }

  return res.status(200).json({ received: true });
}
