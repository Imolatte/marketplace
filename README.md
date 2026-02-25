# SecondHand Marketplace

A full-stack marketplace for buying and selling pre-owned items. Built as a portfolio project demonstrating modern web development practices.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Components)
- **API:** tRPC v11 + Zod (type-safe API layer)
- **ORM:** Prisma 6 + PostgreSQL
- **Auth:** NextAuth v5 (Auth.js) — Credentials + Google OAuth
- **UI:** MUI v7 + Tailwind CSS v4
- **Forms:** React Hook Form + Zod validation
- **Payments:** Stripe Checkout
- **Email:** Resend (transactional notifications)
- **i18n:** next-intl (English + Russian)
- **Testing:** Vitest + React Testing Library + Playwright (E2E)

## Features

- Browse, search, and filter listings by category, condition, and price
- User authentication (email/password + Google OAuth)
- Create, edit, and delete listings
- Add listings to favorites
- Stripe Checkout integration for payments
- Order management with status tracking (Pending > Paid > Shipped > Delivered)
- Leave reviews and ratings on listings
- Email notifications for purchases and registration
- Full internationalization (EN/RU)
- Responsive design

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [locale]/           # i18n routing (en, ru)
│   │   ├── auth/           # Login & Register
│   │   ├── listings/       # Browse, Detail, Create
│   │   ├── profile/        # Profile, Orders, My Listings
│   │   └── checkout/       # Payment success
│   └── api/                # API routes (tRPC, Auth, Stripe webhook)
├── server/                 # Backend logic
│   ├── trpc/               # tRPC routers (listing, user, order, review, stripe)
│   ├── auth/               # NextAuth configuration
│   └── services/           # Stripe, Resend, Upload services
├── components/             # React components
│   ├── layout/             # Header, Footer
│   ├── listing/            # ListingCard, Grid, Filters, Form
│   └── shared/             # SearchBar, Pagination
├── hooks/                  # Custom hooks (useDebounce, useFilters)
├── lib/                    # Client configs (Prisma, Stripe, tRPC, Resend)
├── messages/               # i18n translations (en.json, ru.json)
└── styles/                 # Global CSS
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (local or [Neon](https://neon.tech) free tier)
- Stripe account (for payments)
- Resend account (for emails)
- Google OAuth credentials (optional)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/marketplace.git
cd marketplace
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your actual values
```

4. Set up the database:
```bash
yarn db:push
yarn db:seed
```

5. Start the dev server:
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

### Demo Accounts

After seeding, you can log in with:
- **Email:** alice@example.com / **Password:** password123
- **Email:** bob@example.com / **Password:** password123

## Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Production build |
| `yarn test` | Run unit/integration tests |
| `yarn test:e2e` | Run Playwright E2E tests |
| `yarn lint` | Run ESLint |
| `yarn db:push` | Push schema to database |
| `yarn db:seed` | Seed demo data |
| `yarn db:studio` | Open Prisma Studio |

## Testing

- **Unit tests:** 27 tests covering tRPC routers, services, and UI components
- **E2E tests:** Playwright tests for auth, listings, and checkout flows

```bash
yarn test        # Unit tests (Vitest)
yarn test:e2e    # E2E tests (Playwright)
```

## Architecture

### API Layer (tRPC)

Type-safe API with automatic TypeScript inference from server to client:

- `listing` — CRUD, search with filters, cursor pagination
- `user` — Profile, registration, favorites
- `order` — Purchase tracking, status management
- `review` — Ratings and comments
- `stripe` — Checkout session creation

### Authentication

NextAuth v5 with JWT sessions:
- Credentials provider (email/password with bcrypt)
- Google OAuth provider
- Prisma adapter for user storage

### Payments

Stripe Checkout Sessions with webhook handling:
- Order created on checkout initiation
- Webhook confirms payment and updates order/listing status
- Email notifications sent to buyer and seller

## Deployment

Optimized for deployment on Vercel with Neon PostgreSQL:

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy

## License

MIT
