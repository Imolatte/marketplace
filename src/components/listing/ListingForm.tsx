'use client';

import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { useTranslations } from 'next-intl';

const CATEGORIES = ['Electronics', 'Clothing', 'Home', 'Sports', 'Books', 'Toys', 'Other'];

const listingSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(2000),
  price: z.number().min(0.01),
  category: z.string().min(1),
  condition: z.enum(['NEW', 'LIKE_NEW', 'GOOD', 'FAIR']),
  images: z.array(z.string().url()).min(1).max(10),
});

type ListingFormData = z.infer<typeof listingSchema>;

interface ListingFormProps {
  defaultValues?: Partial<ListingFormData>;
  onSubmit: (data: ListingFormData) => void;
  isLoading?: boolean;
}

export function ListingForm({ defaultValues, onSubmit, isLoading }: ListingFormProps) {
  const t = useTranslations('listing');
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      category: '',
      condition: 'GOOD',
      images: [],
      ...defaultValues,
    },
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <TextField
        label={t('title')}
        {...register('title')}
        error={!!errors.title}
        helperText={errors.title?.message}
        fullWidth
      />

      <TextField
        label={t('description')}
        {...register('description')}
        error={!!errors.description}
        helperText={errors.description?.message}
        multiline
        rows={4}
        fullWidth
      />

      <TextField
        label={t('price')}
        type="number"
        {...register('price', { valueAsNumber: true })}
        error={!!errors.price}
        helperText={errors.price?.message}
        fullWidth
      />

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.category}>
            <InputLabel>{t('category')}</InputLabel>
            <Select {...field} label={t('category')}>
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="condition"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.condition}>
            <InputLabel>{t('conditionLabel')}</InputLabel>
            <Select {...field} label={t('conditionLabel')}>
              <MenuItem value="NEW">{t('conditionValue.NEW')}</MenuItem>
              <MenuItem value="LIKE_NEW">{t('conditionValue.LIKE_NEW')}</MenuItem>
              <MenuItem value="GOOD">{t('conditionValue.GOOD')}</MenuItem>
              <MenuItem value="FAIR">{t('conditionValue.FAIR')}</MenuItem>
            </Select>
          </FormControl>
        )}
      />

      <Typography variant="body2" color="text.secondary">
        {t('imagesPlaceholder')}
      </Typography>

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isLoading}
      >
        {isLoading ? t('submitting') : t('submit')}
      </Button>
    </Box>
  );
}
