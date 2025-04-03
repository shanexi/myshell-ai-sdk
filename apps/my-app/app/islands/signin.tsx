import { ClerkProvider, SignIn } from '@clerk/clerk-react';

export const SignInIsland = (props: { CLERK_PUBLISHABLE_KEY: string }) => {
  const { CLERK_PUBLISHABLE_KEY } = props;
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl="/bots"
    >
      <SignIn />
    </ClerkProvider>
  );
};
