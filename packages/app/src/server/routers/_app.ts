import { router } from '@telegram/server/trpc';
import { auth } from './auth/auth.router';
import { app } from './app/app.router';

export const appRouter = router({ auth, app });

// export type definition of API
export type AppRouter = typeof appRouter;
