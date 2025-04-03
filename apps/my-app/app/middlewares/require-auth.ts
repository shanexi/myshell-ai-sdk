import { factory } from '../create-route';
import { getAuth } from '@hono/clerk-auth';
export const requireAuth = factory.createMiddleware(async (c, next) => {
  const auth = getAuth(c);
  if (!auth?.userId) {
    const accept = c.req.header('accept');
    if (accept?.includes('text/html')) {
      return c.redirect(`/signin?redirect_url=${c.req.url}`);
    }
    return c.json(
      {
        error: 'Unauthorized',
      },
      401,
    );
  }
  await next();
});
