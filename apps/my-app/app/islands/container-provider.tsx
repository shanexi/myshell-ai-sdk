// import { InversifyProvider } from '@myshell-run/common-ui';
import { Provider as InversifyProvider } from 'inversify-react';
import { clientContainer } from './client.container';

export const ContainerProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <InversifyProvider container={clientContainer}>
      {children}
    </InversifyProvider>
  );
};
