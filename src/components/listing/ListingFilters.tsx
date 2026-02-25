'use client';

import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Slider,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';

const CATEGORIES = ['Electronics', 'Clothing', 'Home', 'Sports', 'Books', 'Toys', 'Other'];
const CONDITIONS = ['NEW', 'LIKE_NEW', 'GOOD', 'FAIR'];

interface FiltersState {
  search: string;
  category: string;
  condition: string;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
  sortOrder: string;
}

interface ListingFiltersProps {
  filters: FiltersState;
  onFilterChange: (filters: Partial<FiltersState>) => void;
  onReset: () => void;
}

export function ListingFilters({ filters, onFilterChange, onReset }: ListingFiltersProps) {
  const t = useTranslations('listing');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <TextField
        label={t('search')}
        value={filters.search}
        onChange={(e) => onFilterChange({ search: e.target.value })}
        size="small"
        fullWidth
      />

      <FormControl size="small" fullWidth>
        <InputLabel>{t('category')}</InputLabel>
        <Select
          value={filters.category}
          label={t('category')}
          onChange={(e) => onFilterChange({ category: e.target.value })}
        >
          <MenuItem value="">{t('allCategories')}</MenuItem>
          {CATEGORIES.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" fullWidth>
        <InputLabel>{t('condition')}</InputLabel>
        <Select
          value={filters.condition}
          label={t('condition')}
          onChange={(e) => onFilterChange({ condition: e.target.value })}
        >
          <MenuItem value="">{t('allConditions')}</MenuItem>
          {CONDITIONS.map((cond) => (
            <MenuItem key={cond} value={cond}>
              {t(`conditionValue.${cond}`)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box>
        <Typography variant="body2" gutterBottom>
          {t('priceRange')}
        </Typography>
        <Slider
          value={[filters.minPrice, filters.maxPrice]}
          onChange={(_, value) => {
            const [min, max] = value as number[];
            onFilterChange({ minPrice: min, maxPrice: max });
          }}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `$${v / 100}`}
          min={0}
          max={100000}
          step={500}
        />
      </Box>

      <FormControl size="small" fullWidth>
        <InputLabel>{t('sortBy')}</InputLabel>
        <Select
          value={`${filters.sortBy}-${filters.sortOrder}`}
          label={t('sortBy')}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split('-');
            onFilterChange({ sortBy, sortOrder });
          }}
        >
          <MenuItem value="createdAt-desc">{t('newest')}</MenuItem>
          <MenuItem value="createdAt-asc">{t('oldest')}</MenuItem>
          <MenuItem value="price-asc">{t('priceLowToHigh')}</MenuItem>
          <MenuItem value="price-desc">{t('priceHighToLow')}</MenuItem>
        </Select>
      </FormControl>

      <Button variant="outlined" onClick={onReset} size="small">
        {t('resetFilters')}
      </Button>
    </Box>
  );
}
