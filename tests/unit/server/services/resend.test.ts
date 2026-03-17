import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/resend', () => ({
  resend: {
    emails: {
      send: vi.fn().mockResolvedValue({ id: 'email_123' }),
    },
  },
}));

describe('Resend Service', () => {
  it('should send purchase notification to buyer', async () => {
    const { resend } = await import('@/lib/resend');

    const result = await resend.emails.send({
      from: 'test@test.com',
      to: 'buyer@test.com',
      subject: 'Order Confirmation',
      html: '<h1>Thank you!</h1>',
    });

    expect(result.id).toBe('email_123');
    expect(resend.emails.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'buyer@test.com',
        subject: 'Order Confirmation',
      })
    );
  });

  it('should send welcome email', async () => {
    const { resend } = await import('@/lib/resend');

    await resend.emails.send({
      from: 'test@test.com',
      to: 'new@test.com',
      subject: 'Welcome to SecondHand!',
      html: '<h1>Welcome!</h1>',
    });

    expect(resend.emails.send).toHaveBeenCalled();
  });
});
