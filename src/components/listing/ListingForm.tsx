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
  Chip,
  IconButton,
} from '@mui/material';
import { Close, AddPhotoAlternate } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

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
  const [imageUrl, setImageUrl] = useState('');
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
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

  const images = watch('images');

  const addImage = () => {
    const trimmed = imageUrl.trim();
    if (!trimmed) return;
    try {
      new URL(trimmed);
      if (!images.includes(trimmed)) {
        setValue('images', [...images, trimmed], { shouldValidate: true });
      }
      setImageUrl('');
    } catch {
      // invalid URL — ignore
    }
  };

  const removeImage = (index: number) => {
    setValue('images', images.filter((_, i) => i !== index), { shouldValidate: true });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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

      <Box>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 700, mb: 1.5 }}>
          {t('images')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            size="small"
            label={t('imageUrl')}
            placeholder={t('imageUrlPlaceholder')}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addImage();
              }
            }}
            fullWidth
          />
          <Button
            variant="outlined"
            onClick={addImage}
            startIcon={<AddPhotoAlternate sx={{ fontSize: 18 }} />}
            sx={{
              whiteSpace: 'nowrap',
              borderColor: 'rgba(0, 0, 0, 0.1)',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'primary.main',
                color: 'primary.main',
                background: 'rgba(79, 70, 229, 0.04)',
              },
            }}
          >
            {t('addImage')}
          </Button>
        </Box>
        {errors.images && (
          <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
            {errors.images.message}
          </Typography>
        )}
        {images.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.5 }}>
            {images.map((url, index) => (
              <Chip
                key={index}
                label={url.length > 40 ? url.slice(0, 37) + '...' : url}
                onDelete={() => removeImage(index)}
                deleteIcon={<IconButton size="small"><Close fontSize="small" /></IconButton>}
                variant="outlined"
                sx={{
                  maxWidth: 300,
                  borderColor: 'rgba(0, 0, 0, 0.08)',
                  '& .MuiChip-deleteIcon': {
                    color: 'text.secondary',
                    '&:hover': { color: 'error.main' },
                  },
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isLoading}
        sx={{
          py: 1.5,
          fontSize: '1rem',
          fontWeight: 700,
          borderRadius: 2.5,
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          boxShadow: '0 4px 16px -4px rgba(79, 70, 229, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
            boxShadow: '0 8px 24px -4px rgba(79, 70, 229, 0.5)',
          },
        }}
      >
        {isLoading ? t('submitting') : t('submit')}
      </Button>
    </Box>
  );
}
