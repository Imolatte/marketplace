import { z } from 'zod/v4';

import { router, publicProcedure, protectedProcedure } from '../trpc';

export const reviewRouter = router({
  getByListing: publicProcedure
    .input(z.object({ listingId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.review.findMany({
        where: { listingId: input.listingId },
        include: {
          user: { select: { id: true, name: true, image: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        listingId: z.string(),
        rating: z.number().int().min(1).max(5),
        comment: z.string().max(500).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.review.create({
        data: {
          ...input,
          userId: ctx.user.id!,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const review = await ctx.prisma.review.findUnique({ where: { id: input.id } });
      if (!review || review.userId !== ctx.user.id) {
        throw new Error('Not authorized');
      }
      return ctx.prisma.review.delete({ where: { id: input.id } });
    }),
});
