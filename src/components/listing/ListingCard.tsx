'use client';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

interface ListingCardProps {
  id: string;
  title: string;
  price: number;
  currency: string;
  condition: string;
  images: string[];
  category: string;
  user: { name: string | null };
  favoritesCount: number;
  isFavorited?: boolean;
  onToggleFavorite?: () => void;
}

export function ListingCard({
  id,
  title,
  price,
  currency,
  condition,
  images,
  category,
  user,
  favoritesCount: _favoritesCount,
  isFavorited = false,
  onToggleFavorite,
}: ListingCardProps) {
  const t = useTranslations('listing');

  const formatPrice = (amount: number, curr: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr,
      minimumFractionDigits: 0,
    }).format(amount / 100);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Link href={`/listings/${id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          height="200"
          image={images[0] || '/placeholder.jpg'}
          alt={title}
          sx={{ objectFit: 'cover', height: 200 }}
        />
      </Link>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography
            variant="subtitle1"
            component={Link}
            href={`/listings/${id}`}
            sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}
          >
            {title}
          </Typography>
          {onToggleFavorite && (
            <IconButton size="small" onClick={onToggleFavorite}>
              {isFavorited ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
          )}
        </Box>
        <Typography variant="h6" color="primary" sx={{ mt: 0.5 }}>
          {formatPrice(price, currency)}
        </Typography>
        <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          <Chip label={t(`conditionValue.${condition}`)} size="small" variant="outlined" />
          <Chip label={category} size="small" />
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {user.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
