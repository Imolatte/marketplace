import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Pagination } from '@/components/shared/Pagination';

describe('Pagination', () => {
  it('renders pagination buttons', () => {
    render(<Pagination page={1} count={5} onChange={() => {}} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('does not render when count is 1', () => {
    const { container } = render(<Pagination page={1} count={1} onChange={() => {}} />);
    expect(container.innerHTML).toBe('');
  });

  it('highlights current page', () => {
    render(<Pagination page={2} count={5} onChange={() => {}} />);
    const currentPageButton = screen.getByText('2');
    expect(currentPageButton).toBeInTheDocument();
  });
});
