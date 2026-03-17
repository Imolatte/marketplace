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
      sx={{
        '& .MuiOutlinedInput-root': {
          background: '#fff',
          borderRadius: 3,
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          },
          '&.Mui-focused': {
            boxShadow: '0 4px 16px rgba(79, 70, 229, 0.1)',
          },
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: 'text.secondary', fontSize: 20 }} />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
