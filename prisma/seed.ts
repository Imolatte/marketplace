import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const DEMO_LISTINGS = [
  {
    title: 'iPhone 14 Pro - Excellent Condition',
    description: 'Selling my iPhone 14 Pro 256GB in Deep Purple. Used for 6 months, always with case and screen protector. Battery health 97%. Comes with original box and charger.',
    price: 79900,
    category: 'Electronics',
    condition: 'LIKE_NEW',
    images: ['https://picsum.photos/seed/iphone14/800/600'],
  },
  {
    title: 'Vintage Leather Jacket',
    description: 'Genuine leather jacket from the 90s. Size M. Minor wear on cuffs but overall great condition. Perfect for fall/winter.',
    price: 12000,
    category: 'Clothing',
    condition: 'GOOD',
    images: ['https://picsum.photos/seed/jacket/800/600'],
  },
  {
    title: 'IKEA KALLAX Shelf Unit',
    description: '4x4 KALLAX shelf in white. Some minor scratches on top. Disassembled and ready for pickup. Originally $180.',
    price: 6500,
    category: 'Home',
    condition: 'GOOD',
    images: ['https://picsum.photos/seed/kallax/800/600'],
  },
  {
    title: 'Trek Mountain Bike - 29er',
    description: 'Trek Marlin 7 mountain bike, 2023 model. Size L frame. New tires and brakes. Includes bottle holder and rear light.',
    price: 45000,
    category: 'Sports',
    condition: 'LIKE_NEW',
    images: ['https://picsum.photos/seed/bike/800/600'],
  },
  {
    title: 'Complete Harry Potter Book Set',
    description: 'All 7 Harry Potter books, hardcover first editions. Minor shelf wear on spines. A great collection for any fan.',
    price: 8500,
    category: 'Books',
    condition: 'GOOD',
    images: ['https://picsum.photos/seed/hp-books/800/600'],
  },
  {
    title: 'Sony WH-1000XM5 Headphones',
    description: 'Premium noise-canceling headphones. Black color. Used for 3 months. Includes case, cable, and airplane adapter.',
    price: 22000,
    category: 'Electronics',
    condition: 'LIKE_NEW',
    images: ['https://picsum.photos/seed/headphones/800/600'],
  },
  {
    title: 'Nintendo Switch OLED + Games',
    description: 'Nintendo Switch OLED model (white). Comes with 3 games: Zelda TOTK, Mario Kart 8, and Animal Crossing. Includes Pro Controller.',
    price: 32000,
    category: 'Electronics',
    condition: 'GOOD',
    images: ['https://picsum.photos/seed/switch/800/600'],
  },
  {
    title: 'Yoga Mat & Block Set',
    description: 'Brand new Manduka yoga mat (5mm) with 2 cork blocks and a strap. Never used - received as a gift.',
    price: 4500,
    category: 'Sports',
    condition: 'NEW',
    images: ['https://picsum.photos/seed/yoga/800/600'],
  },
  {
    title: 'Mid-Century Coffee Table',
    description: 'Solid walnut coffee table with tapered legs. Some light ring marks on surface. 120x60cm. Very sturdy.',
    price: 15000,
    category: 'Home',
    condition: 'FAIR',
    images: ['https://picsum.photos/seed/table/800/600'],
  },
  {
    title: 'LEGO Star Wars Millennium Falcon',
    description: 'LEGO Star Wars UCS Millennium Falcon #75192. Complete set, assembled once then carefully disassembled. All pieces and manual included.',
    price: 65000,
    category: 'Toys',
    condition: 'LIKE_NEW',
    images: ['https://picsum.photos/seed/lego/800/600'],
  },
];

async function main() {
  console.log('Seeding database...');

  // Create demo users
  const passwordHash = await bcrypt.hash('password123', 12);

  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice Johnson',
      passwordHash,
      image: 'https://picsum.photos/seed/alice/200/200',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      name: 'Bob Smith',
      passwordHash,
      image: 'https://picsum.photos/seed/bob/200/200',
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'carol@example.com' },
    update: {},
    create: {
      email: 'carol@example.com',
      name: 'Carol Williams',
      passwordHash,
      image: 'https://picsum.photos/seed/carol/200/200',
    },
  });

  const users = [user1, user2, user3];

  // Create listings
  for (let i = 0; i < DEMO_LISTINGS.length; i++) {
    const listing = DEMO_LISTINGS[i];
    const user = users[i % users.length];

    await prisma.listing.create({
      data: {
        ...listing,
        userId: user.id,
      },
    });
  }

  // Create some favorites
  const allListings = await prisma.listing.findMany();
  for (const listing of allListings.slice(0, 5)) {
    const favUser = users.find((u) => u.id !== listing.userId);
    if (favUser) {
      await prisma.favorite.create({
        data: { userId: favUser.id, listingId: listing.id },
      });
    }
  }

  // Create a review
  const reviewListing = allListings[0];
  const reviewer = users.find((u) => u.id !== reviewListing.userId);
  if (reviewer) {
    await prisma.review.create({
      data: {
        rating: 5,
        comment: 'Great item! Exactly as described. Fast communication.',
        listingId: reviewListing.id,
        userId: reviewer.id,
      },
    });
  }

  console.log('Seed completed!');
  console.log(`Created ${users.length} users`);
  console.log(`Created ${DEMO_LISTINGS.length} listings`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
