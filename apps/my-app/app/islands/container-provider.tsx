import { AuthModel } from '@myshell-run/biz-ui';
import { clientContainer } from './client.container';
import { InversifyProvider, useInjection } from '@myshell-run/ui-primitives';
import { useEffect } from 'react';

export const ContainerProvider = (props: {
  userId: string;
  children: React.ReactNode;
}) => {
  const { userId, children } = props;
  return (
    <InversifyProvider container={clientContainer}>
      <Wrapper2 userId={userId}>{children}</Wrapper2>
    </InversifyProvider>
  );
};

const Wrapper2 = (props: { userId: string; children: React.ReactNode }) => {
  const { userId, children } = props;
  const model = useInjection(AuthModel);
  useEffect(() => {
    model.setUserId(userId);
  }, []);
  return children;
};
