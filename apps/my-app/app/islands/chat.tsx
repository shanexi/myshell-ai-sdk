import { Chat } from '@myshell-run/ui-biz';
import { container } from './container';
import { InversifyProvider } from '@myshell-run/ui-primitives';

export const ChatWrapper = () => {
  return (
    <InversifyProvider container={container}>
      <Chat />
    </InversifyProvider>
  );
};
