'use client';

import { Box, Pagination as MuiPagination } from '@mui/material';

interface PaginationProps {
  page: number;
  count: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, count, onChange }: PaginationProps) {
  if (count <= 1) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <MuiPagination
        count={count}
        page={page}
        onChange={(_, value) => onChange(value)}
        color="primary"
      />
    </Box>
  );
}
