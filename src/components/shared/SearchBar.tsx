'use client';

import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useTranslations } from 'next-intl';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  const t = useTranslations('common');

  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || t('searchPlaceholder')}
      size="small"
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
