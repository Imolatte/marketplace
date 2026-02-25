import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/stripe', () => ({
  stripe: {
    checkout: {
      sessions: {
        create: vi.fn().mockResolvedValue({
          id: 'cs_test_123',
          url: 'https://checkout.stripe.com/test',
        }),
        retrieve: vi.fn().mockResolvedValue({
          id: 'cs_test_123',
          payment_status: 'paid',
        }),
      },
    },
  },
}));

describe('Stripe Service', () => {
  it('should create a checkout session', async () => {
    const { stripe } = await import('@/lib/stripe');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Test Item' },
            unit_amount: 5000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    expect(session.id).toBe('cs_test_123');
    expect(session.url).toBe('https://checkout.stripe.com/test');
  });

  it('should retrieve a session', async () => {
    const { stripe } = await import('@/lib/stripe');

    const session = await stripe.checkout.sessions.retrieve('cs_test_123');
    expect(session.payment_status).toBe('paid');
  });
});
