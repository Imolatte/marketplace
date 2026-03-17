'use client';

import {
  Card,
  CardContent,
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

  const conditionColors: Record<string, { bg: string; text: string }> = {
    NEW: { bg: 'rgba(16, 185, 129, 0.1)', text: '#059669' },
    LIKE_NEW: { bg: 'rgba(59, 130, 246, 0.1)', text: '#2563eb' },
    GOOD: { bg: 'rgba(245, 158, 11, 0.1)', text: '#d97706' },
    FAIR: { bg: 'rgba(107, 114, 128, 0.1)', text: '#6b7280' },
  };

  const condStyle = conditionColors[condition] || conditionColors.GOOD;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        borderRadius: 3,
      }}
    >
      {/* Favorite button overlay */}
      {onToggleFavorite && (
        <IconButton
          size="small"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite();
          }}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 2,
            width: 34,
            height: 34,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease',
            '&:hover': {
              background: '#fff',
              transform: 'scale(1.1)',
            },
          }}
        >
          {isFavorited ? (
            <Favorite sx={{ fontSize: 18, color: '#ef4444' }} />
          ) : (
            <FavoriteBorder sx={{ fontSize: 18, color: '#64748b' }} />
          )}
        </IconButton>
      )}

      {/* Image */}
      <Link href={`/listings/${id}`} style={{ textDecoration: 'none' }}>
        <Box
          sx={{
            position: 'relative',
            paddingTop: '100%',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
          }}
        >
          <Box
            component="img"
            src={images[0] || '/placeholder.jpg'}
            alt={title}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              '.MuiCard-root:hover &': {
                transform: 'scale(1.06)',
              },
            }}
          />
          {/* Price badge overlay */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              background: 'rgba(0, 0, 0, 0.78)',
              backdropFilter: 'blur(8px)',
              color: '#fff',
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              fontWeight: 700,
              fontSize: '0.95rem',
              letterSpacing: '-0.01em',
            }}
          >
            {formatPrice(price, currency)}
          </Box>
        </Box>
      </Link>

      {/* Content */}
      <CardContent sx={{ flexGrow: 1, p: 2, '&:last-child': { pb: 2 } }}>
        <Typography
          variant="subtitle2"
          component={Link}
          href={`/listings/${id}`}
          sx={{
            textDecoration: 'none',
            color: 'text.primary',
            fontWeight: 600,
            fontSize: '0.9rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.4,
            mb: 1,
            transition: 'color 0.2s ease',
            '&:hover': { color: 'primary.main' },
          }}
        >
          {title}
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 1 }}>
          <Chip
            label={t(`conditionValue.${condition}`)}
            size="small"
            sx={{
              height: 22,
              fontSize: '0.7rem',
              fontWeight: 600,
              background: condStyle.bg,
              color: condStyle.text,
              border: 'none',
            }}
          />
          <Chip
            label={category}
            size="small"
            sx={{
              height: 22,
              fontSize: '0.7rem',
              fontWeight: 500,
              background: 'rgba(0,0,0,0.04)',
              color: 'text.secondary',
            }}
          />
        </Box>

        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontSize: '0.75rem',
            fontWeight: 500,
          }}
        >
          {user.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
