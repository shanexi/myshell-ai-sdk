import { InversifyProvider } from '@myshell-run/ui-primitives';
import { container } from './container';
import { Bot } from '@myshell-run/simple-prisma';
import { BotList } from '@myshell-run/ui-biz';

export const BotListIsland = (props: {
  className?: string;
  licenseKey?: string;
  initialBots: Bot[];
}) => {
  const { className, licenseKey, initialBots } = props;
  return (
    <InversifyProvider container={container}>
      <BotList
        className={className}
        licenseKey={licenseKey}
        initialBots={initialBots}
      />
    </InversifyProvider>
  );
};
