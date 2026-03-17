import { Grid } from '@mui/material';
import { ListingCard } from './ListingCard';

interface ListingData {
  id: string;
  title: string;
  price: number;
  currency: string;
  condition: string;
  images: string[];
  category: string;
  user: { name: string | null };
  _count: { favorites: number };
}

interface ListingGridProps {
  listings: ListingData[];
}

export function ListingGrid({ listings }: ListingGridProps) {
  return (
    <Grid container spacing={3}>
      {listings.map((listing) => (
        <Grid key={listing.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <ListingCard
            id={listing.id}
            title={listing.title}
            price={listing.price}
            currency={listing.currency}
            condition={listing.condition}
            images={listing.images}
            category={listing.category}
            user={listing.user}
            favoritesCount={listing._count.favorites}
          />
        </Grid>
      ))}
    </Grid>
  );
}
