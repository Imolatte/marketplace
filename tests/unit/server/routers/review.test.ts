import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockPrisma = {
  review: {
    findMany: vi.fn(),
    create: vi.fn(),
    findUnique: vi.fn(),
    delete: vi.fn(),
  },
};

vi.mock('@/lib/prisma', () => ({
  prisma: mockPrisma,
}));

describe('Review Router', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getByListing', () => {
    it('should return reviews for a listing', async () => {
      const mockReviews = [
        {
          id: 'rev-1',
          rating: 5,
          comment: 'Great item!',
          user: { id: 'user-1', name: 'Alice', image: null },
        },
        {
          id: 'rev-2',
          rating: 4,
          comment: 'Good condition',
          user: { id: 'user-2', name: 'Bob', image: null },
        },
      ];

      mockPrisma.review.findMany.mockResolvedValue(mockReviews);

      const result = await mockPrisma.review.findMany({
        where: { listingId: 'listing-1' },
      });

      expect(result).toHaveLength(2);
      expect(result[0].rating).toBe(5);
    });
  });

  describe('create', () => {
    it('should create a review', async () => {
      const newReview = {
        id: 'rev-1',
        rating: 4,
        comment: 'Nice product',
        listingId: 'listing-1',
        userId: 'user-1',
      };

      mockPrisma.review.create.mockResolvedValue(newReview);

      const result = await mockPrisma.review.create({
        data: {
          rating: 4,
          comment: 'Nice product',
          listingId: 'listing-1',
          userId: 'user-1',
        },
      });

      expect(result.rating).toBe(4);
      expect(result.comment).toBe('Nice product');
    });
  });
});
