import { router } from './trpc';
import { listingRouter } from './routers/listing';
import { userRouter } from './routers/user';
import { orderRouter } from './routers/order';
import { reviewRouter } from './routers/review';
import { stripeRouter } from './routers/stripe';

export const appRouter = router({
  listing: listingRouter,
  user: userRouter,
  order: orderRouter,
  review: reviewRouter,
  stripe: stripeRouter,
});

export type AppRouter = typeof appRouter;
