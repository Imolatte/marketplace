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
  Paper,
} from '@mui/material';
import { FilterList, RestartAlt } from '@mui/icons-material';
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
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
        p: 3,
        borderRadius: 3,
        border: '1px solid rgba(0, 0, 0, 0.06)',
        position: 'sticky',
        top: 80,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
        <FilterList sx={{ fontSize: 20, color: 'primary.main' }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
          Filters
        </Typography>
      </Box>

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
        <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.8rem' }}>
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
          sx={{
            color: 'primary.main',
            '& .MuiSlider-thumb': {
              width: 16,
              height: 16,
              '&:hover': {
                boxShadow: '0 0 0 6px rgba(79, 70, 229, 0.15)',
              },
            },
            '& .MuiSlider-track': {
              height: 4,
            },
            '& .MuiSlider-rail': {
              height: 4,
              opacity: 0.2,
            },
          }}
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

      <Button
        variant="outlined"
        onClick={onReset}
        size="small"
        startIcon={<RestartAlt sx={{ fontSize: 18 }} />}
        sx={{
          borderColor: 'rgba(0,0,0,0.1)',
          color: 'text.secondary',
          '&:hover': {
            borderColor: 'primary.main',
            color: 'primary.main',
            background: 'rgba(79, 70, 229, 0.04)',
          },
        }}
      >
        {t('resetFilters')}
      </Button>
    </Paper>
  );
}
