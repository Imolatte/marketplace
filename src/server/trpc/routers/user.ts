import { z } from 'zod/v4';

import { router, publicProcedure, protectedProcedure } from '../trpc';

export const userRouter = router({
  getProfile: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          name: true,
          image: true,
          createdAt: true,
          _count: {
            select: { listings: true, reviews: true },
          },
        },
      });
    }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(50).optional(),
        image: z.string().url().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { id: ctx.user.id! },
        data: input,
      });
    }),

  getFavorites: protectedProcedure.query(async ({ ctx }) => {
    const favorites = await ctx.prisma.favorite.findMany({
      where: { userId: ctx.user.id! },
      include: {
        listing: {
          include: {
            user: { select: { id: true, name: true, image: true } },
            _count: { select: { favorites: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return favorites.map((f) => f.listing);
  }),

  toggleFavorite: protectedProcedure
    .input(z.object({ listingId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.prisma.favorite.findUnique({
        where: {
          userId_listingId: {
            userId: ctx.user.id!,
            listingId: input.listingId,
          },
        },
      });

      if (existing) {
        await ctx.prisma.favorite.delete({ where: { id: existing.id } });
        return { favorited: false };
      }

      await ctx.prisma.favorite.create({
        data: { userId: ctx.user.id!, listingId: input.listingId },
      });
      return { favorited: true };
    }),

  isFavorited: protectedProcedure
    .input(z.object({ listingId: z.string() }))
    .query(async ({ ctx, input }) => {
      const fav = await ctx.prisma.favorite.findUnique({
        where: {
          userId_listingId: {
            userId: ctx.user.id!,
            listingId: input.listingId,
          },
        },
      });
      return !!fav;
    }),

  register: publicProcedure
    .input(
      z.object({
        email: z.email(),
        password: z.string().min(6),
        name: z.string().min(1).max(50),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const bcrypt = await import('bcryptjs');
      const existing = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });
      if (existing) {
        throw new Error('User already exists');
      }

      const passwordHash = await bcrypt.hash(input.password, 12);
      const user = await ctx.prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
          passwordHash,
        },
      });
      return { id: user.id, email: user.email, name: user.name };
    }),
});
