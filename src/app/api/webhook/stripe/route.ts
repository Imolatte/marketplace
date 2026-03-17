import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    const listingId = session.metadata?.listingId;

    if (orderId) {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'PAID',
          stripePaymentId: session.payment_intent as string,
        },
      });
    }

    if (listingId) {
      await prisma.listing.update({
        where: { id: listingId },
        data: { status: 'SOLD' },
      });
    }
  }

  return NextResponse.json({ received: true });
}
