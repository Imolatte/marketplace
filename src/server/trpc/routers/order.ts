import { z } from 'zod/v4';

import { router, protectedProcedure } from '../trpc';

export const orderRouter = router({
  getMyOrders: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.order.findMany({
      where: { buyerId: ctx.user.id! },
      include: {
        listing: { select: { id: true, title: true, images: true, price: true } },
        seller: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }),

  getMySales: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.order.findMany({
      where: { sellerId: ctx.user.id! },
      include: {
        listing: { select: { id: true, title: true, images: true, price: true } },
        buyer: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.findUnique({
        where: { id: input.id },
        include: {
          listing: true,
          buyer: { select: { id: true, name: true, email: true } },
          seller: { select: { id: true, name: true, email: true } },
        },
      });

      if (!order || (order.buyerId !== ctx.user.id && order.sellerId !== ctx.user.id)) {
        throw new Error('Not authorized');
      }

      return order;
    }),

  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(['SHIPPED', 'DELIVERED', 'CANCELLED']),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.findUnique({ where: { id: input.id } });
      if (!order) throw new Error('Order not found');

      if (input.status === 'SHIPPED' && order.sellerId !== ctx.user.id) {
        throw new Error('Only seller can mark as shipped');
      }
      if (input.status === 'DELIVERED' && order.buyerId !== ctx.user.id) {
        throw new Error('Only buyer can confirm delivery');
      }

      return ctx.prisma.order.update({
        where: { id: input.id },
        data: { status: input.status },
      });
    }),
});
