import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

import { ListingFilters } from '@/components/listing/ListingFilters';

describe('ListingFilters', () => {
  const defaultFilters = {
    search: '',
    category: '',
    condition: '',
    minPrice: 0,
    maxPrice: 100000,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  };

  it('renders search input', () => {
    render(
      <ListingFilters
        filters={defaultFilters}
        onFilterChange={() => {}}
        onReset={() => {}}
      />
    );
    expect(screen.getByLabelText('search')).toBeInTheDocument();
  });

  it('calls onReset when reset button is clicked', () => {
    const handleReset = vi.fn();
    render(
      <ListingFilters
        filters={defaultFilters}
        onFilterChange={() => {}}
        onReset={handleReset}
      />
    );

    fireEvent.click(screen.getByText('resetFilters'));
    expect(handleReset).toHaveBeenCalled();
  });

  it('calls onFilterChange when search changes', () => {
    const handleChange = vi.fn();
    render(
      <ListingFilters
        filters={defaultFilters}
        onFilterChange={handleChange}
        onReset={() => {}}
      />
    );

    const searchInput = screen.getByLabelText('search');
    fireEvent.change(searchInput, { target: { value: 'phone' } });
    expect(handleChange).toHaveBeenCalledWith({ search: 'phone' });
  });
});
