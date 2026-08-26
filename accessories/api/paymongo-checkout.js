export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, title, userId, productId } = req.body;

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY + ':').toString('base64')}`
    },
    body: JSON.stringify({
      data: {
        attributes: {
          line_items: [
            {
              currency: 'PHP',
              amount: amount,
              description: 'AURA Atelier Checkout',
              name: title,
              quantity: 1
            }
          ],
          payment_method_types: ['gcash', 'card', 'paymaya'],
          success_url: `${req.headers.origin}/?payment=success`,
          cancel_url: `${req.headers.origin}/?payment=cancelled`,
          metadata: {
            buyer_id: userId,
            product_id: productId
          }
        }
      }
    })
  };

  try {
    const response = await fetch('https://api.paymongo.com/v1/checkout_sessions', options);
    const data = await response.json();
    return res.status(200).json({ checkout_url: data.data.attributes.checkout_url });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
