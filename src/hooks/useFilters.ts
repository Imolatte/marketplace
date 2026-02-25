'use client';

import { useState, useCallback } from 'react';

interface FiltersState {
  search: string;
  category: string;
  condition: string;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
  sortOrder: string;
}

const DEFAULT_FILTERS: FiltersState = {
  search: '',
  category: '',
  condition: '',
  minPrice: 0,
  maxPrice: 100000,
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

export function useFilters(initial?: Partial<FiltersState>) {
  const [filters, setFilters] = useState<FiltersState>({ ...DEFAULT_FILTERS, ...initial });

  const updateFilter = useCallback((updates: Partial<FiltersState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  return { filters, updateFilter, resetFilters };
}
