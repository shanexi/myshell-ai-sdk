import { createRoute } from '../create-route';
import { SignInIsland } from '../islands/signin';

export default createRoute(async (c) => {
  return c.render(
    <div className="mt-5 flex justify-center">
      <SignInIsland CLERK_PUBLISHABLE_KEY={c.env.CLERK_PUBLISHABLE_KEY} />
    </div>,
  );
});
