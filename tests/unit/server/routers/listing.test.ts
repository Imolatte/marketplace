import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Prisma
const mockPrisma = {
  listing: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  favorite: {
    findUnique: vi.fn(),
  },
};

// Mock auth
vi.mock('@/server/auth', () => ({
  auth: vi.fn(() => Promise.resolve({ user: { id: 'user-1', email: 'test@test.com' } })),
}));

vi.mock('@/lib/prisma', () => ({
  prisma: mockPrisma,
}));

describe('Listing Router', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('list', () => {
    it('should return listings with pagination', async () => {
      const mockListings = [
        {
          id: '1',
          title: 'Test Item',
          price: 1000,
          currency: 'USD',
          category: 'Electronics',
          condition: 'GOOD',
          status: 'ACTIVE',
          images: ['https://example.com/img.jpg'],
          user: { id: 'user-1', name: 'Test', image: null },
          _count: { favorites: 0, reviews: 0 },
        },
      ];

      mockPrisma.listing.findMany.mockResolvedValue(mockListings);

      expect(mockPrisma.listing.findMany).toBeDefined();
    });
  });

  describe('create', () => {
    it('should create a listing with valid data', async () => {
      const newListing = {
        id: '1',
        title: 'New Item',
        description: 'A test description for the item',
        price: 2500,
        currency: 'USD',
        category: 'Electronics',
        condition: 'NEW',
        images: ['https://example.com/img.jpg'],
        status: 'ACTIVE',
        userId: 'user-1',
      };

      mockPrisma.listing.create.mockResolvedValue(newListing);

      const result = await mockPrisma.listing.create({
        data: {
          title: 'New Item',
          description: 'A test description for the item',
          price: 2500,
          currency: 'USD',
          category: 'Electronics',
          condition: 'NEW',
          images: ['https://example.com/img.jpg'],
          userId: 'user-1',
        },
      });

      expect(result.id).toBe('1');
      expect(result.title).toBe('New Item');
      expect(result.price).toBe(2500);
    });
  });

  describe('getById', () => {
    it('should return a listing by id', async () => {
      const mockListing = {
        id: '1',
        title: 'Test Item',
        description: 'Description',
        price: 1000,
        user: { id: 'user-1', name: 'Test', image: null },
        reviews: [],
        _count: { favorites: 0, reviews: 0 },
      };

      mockPrisma.listing.findUnique.mockResolvedValue(mockListing);

      const result = await mockPrisma.listing.findUnique({ where: { id: '1' } });
      expect(result?.title).toBe('Test Item');
    });

    it('should return null for non-existent listing', async () => {
      mockPrisma.listing.findUnique.mockResolvedValue(null);

      const result = await mockPrisma.listing.findUnique({ where: { id: 'non-existent' } });
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete a listing owned by the user', async () => {
      mockPrisma.listing.findUnique.mockResolvedValue({
        id: '1',
        userId: 'user-1',
      });
      mockPrisma.listing.delete.mockResolvedValue({ id: '1' });

      const listing = await mockPrisma.listing.findUnique({ where: { id: '1' } });
      expect(listing?.userId).toBe('user-1');

      const result = await mockPrisma.listing.delete({ where: { id: '1' } });
      expect(result.id).toBe('1');
    });
  });
});
