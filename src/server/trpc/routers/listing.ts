import { z } from 'zod/v4';

import { router, publicProcedure, protectedProcedure } from '../trpc';

export const listingRouter = router({
  list: publicProcedure
    .input(
      z.object({
        cursor: z.string().optional(),
        limit: z.number().min(1).max(50).default(20),
        category: z.string().optional(),
        condition: z.string().optional(),
        minPrice: z.number().optional(),
        maxPrice: z.number().optional(),
        search: z.string().optional(),
        sortBy: z.enum(['createdAt', 'price']).default('createdAt'),
        sortOrder: z.enum(['asc', 'desc']).default('desc'),
      })
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit, category, condition, minPrice, maxPrice, search, sortBy, sortOrder } = input;

      const where = {
        status: 'ACTIVE' as const,
        ...(category && { category }),
        ...(condition && { condition }),
        ...(minPrice !== undefined || maxPrice !== undefined
          ? {
              price: {
                ...(minPrice !== undefined && { gte: minPrice }),
                ...(maxPrice !== undefined && { lte: maxPrice }),
              },
            }
          : {}),
        ...(search && {
          OR: [
            { title: { contains: search, mode: 'insensitive' as const } },
            { description: { contains: search, mode: 'insensitive' as const } },
          ],
        }),
      };

      const items = await ctx.prisma.listing.findMany({
        where,
        take: limit + 1,
        ...(cursor && { cursor: { id: cursor }, skip: 1 }),
        orderBy: { [sortBy]: sortOrder },
        include: {
          user: { select: { id: true, name: true, image: true } },
          _count: { select: { favorites: true, reviews: true } },
        },
      });

      let nextCursor: string | undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }

      return { items, nextCursor };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const listing = await ctx.prisma.listing.findUnique({
        where: { id: input.id },
        include: {
          user: { select: { id: true, name: true, image: true } },
          reviews: {
            include: { user: { select: { id: true, name: true, image: true } } },
            orderBy: { createdAt: 'desc' },
          },
          _count: { select: { favorites: true, reviews: true } },
        },
      });
      return listing;
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(3).max(100),
        description: z.string().min(10).max(2000),
        price: z.number().int().min(1),
        currency: z.string().default('USD'),
        category: z.string(),
        condition: z.enum(['NEW', 'LIKE_NEW', 'GOOD', 'FAIR']),
        images: z.array(z.string().url()).min(1).max(10),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.listing.create({
        data: {
          ...input,
          userId: ctx.user.id!,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(3).max(100).optional(),
        description: z.string().min(10).max(2000).optional(),
        price: z.number().int().min(1).optional(),
        category: z.string().optional(),
        condition: z.enum(['NEW', 'LIKE_NEW', 'GOOD', 'FAIR']).optional(),
        images: z.array(z.string().url()).min(1).max(10).optional(),
        status: z.enum(['ACTIVE', 'PAUSED']).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      const listing = await ctx.prisma.listing.findUnique({ where: { id } });
      if (!listing || listing.userId !== ctx.user.id) {
        throw new Error('Not authorized');
      }

      return ctx.prisma.listing.update({ where: { id }, data });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const listing = await ctx.prisma.listing.findUnique({ where: { id: input.id } });
      if (!listing || listing.userId !== ctx.user.id) {
        throw new Error('Not authorized');
      }

      return ctx.prisma.listing.delete({ where: { id: input.id } });
    }),

  getFeatured: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.listing.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { createdAt: 'desc' },
      take: 8,
      include: {
        user: { select: { id: true, name: true, image: true } },
        _count: { select: { favorites: true } },
      },
    });
  }),
});
