import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

import { ListingCard } from '@/components/listing/ListingCard';

describe('ListingCard', () => {
  const defaultProps = {
    id: '1',
    title: 'Test Item',
    price: 2500,
    currency: 'USD',
    condition: 'GOOD',
    images: ['https://example.com/img.jpg'],
    category: 'Electronics',
    user: { name: 'Alice' },
    favoritesCount: 3,
  };

  it('renders listing title', () => {
    render(<ListingCard {...defaultProps} />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  it('renders formatted price', () => {
    render(<ListingCard {...defaultProps} />);
    expect(screen.getByText('$25')).toBeInTheDocument();
  });

  it('renders seller name', () => {
    render(<ListingCard {...defaultProps} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('renders category chip', () => {
    render(<ListingCard {...defaultProps} />);
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('renders link to listing detail', () => {
    render(<ListingCard {...defaultProps} />);
    const links = screen.getAllByRole('link');
    expect(links.some(l => l.getAttribute('href') === '/listings/1')).toBe(true);
  });
});
