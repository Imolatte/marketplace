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
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <MuiPagination
        count={count}
        page={page}
        onChange={(_, value) => onChange(value)}
        color="primary"
        shape="rounded"
        sx={{
          '& .MuiPaginationItem-root': {
            fontWeight: 600,
            borderRadius: 2,
            transition: 'all 0.2s ease',
            '&:hover': {
              background: 'rgba(79, 70, 229, 0.08)',
            },
            '&.Mui-selected': {
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
              },
            },
          },
        }}
      />
    </Box>
  );
}
