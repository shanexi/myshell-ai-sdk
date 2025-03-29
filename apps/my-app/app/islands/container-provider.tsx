import { InversifyProvider } from '@myshell-run/ui-primitives';
import { clientContainer } from './client.container';

export const ContainerProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <InversifyProvider container={clientContainer}>
      {children}
    </InversifyProvider>
  );
};
