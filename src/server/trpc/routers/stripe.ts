import { z } from 'zod/v4';

import { router, protectedProcedure } from '../trpc';
import { stripe } from '@/lib/stripe';

export const stripeRouter = router({
  createCheckoutSession: protectedProcedure
    .input(z.object({ listingId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const listing = await ctx.prisma.listing.findUnique({
        where: { id: input.listingId },
        include: { user: true },
      });

      if (!listing || listing.status !== 'ACTIVE') {
        throw new Error('Listing not available');
      }

      if (listing.userId === ctx.user.id) {
        throw new Error('Cannot buy your own listing');
      }

      const order = await ctx.prisma.order.create({
        data: {
          totalAmount: listing.price,
          currency: listing.currency,
          listingId: listing.id,
          buyerId: ctx.user.id!,
          sellerId: listing.userId,
        },
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: listing.currency.toLowerCase(),
              product_data: {
                name: listing.title,
                images: listing.images.slice(0, 1),
              },
              unit_amount: listing.price,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/${order.id}?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/listings/${listing.id}`,
        metadata: {
          orderId: order.id,
          listingId: listing.id,
        },
      });

      await ctx.prisma.order.update({
        where: { id: order.id },
        data: { stripeSessionId: session.id },
      });

      return { url: session.url };
    }),
});
