import { stripe } from '@/lib/stripe';

export async function createCheckoutSession(params: {
  listingTitle: string;
  listingImages: string[];
  priceInCents: number;
  currency: string;
  orderId: string;
  listingId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  return stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: params.currency.toLowerCase(),
          product_data: {
            name: params.listingTitle,
            images: params.listingImages.slice(0, 1),
          },
          unit_amount: params.priceInCents,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: {
      orderId: params.orderId,
      listingId: params.listingId,
    },
  });
}

export async function retrieveSession(sessionId: string) {
  return stripe.checkout.sessions.retrieve(sessionId);
}
