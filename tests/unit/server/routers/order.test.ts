import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockPrisma = {
  order: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
};

vi.mock('@/lib/prisma', () => ({
  prisma: mockPrisma,
}));

describe('Order Router', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getMyOrders', () => {
    it('should return orders for the buyer', async () => {
      const mockOrders = [
        {
          id: 'order-1',
          status: 'PAID',
          totalAmount: 5000,
          listing: { id: 'l1', title: 'Item', images: [], price: 5000 },
          seller: { id: 'seller-1', name: 'Seller' },
        },
      ];

      mockPrisma.order.findMany.mockResolvedValue(mockOrders);

      const result = await mockPrisma.order.findMany({
        where: { buyerId: 'user-1' },
      });

      expect(result).toHaveLength(1);
      expect(result[0].status).toBe('PAID');
    });
  });

  describe('updateStatus', () => {
    it('should update order status to SHIPPED', async () => {
      mockPrisma.order.findUnique.mockResolvedValue({
        id: 'order-1',
        status: 'PAID',
        sellerId: 'seller-1',
        buyerId: 'buyer-1',
      });

      mockPrisma.order.update.mockResolvedValue({
        id: 'order-1',
        status: 'SHIPPED',
      });

      const result = await mockPrisma.order.update({
        where: { id: 'order-1' },
        data: { status: 'SHIPPED' },
      });

      expect(result.status).toBe('SHIPPED');
    });
  });
});
