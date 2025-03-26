import { InversifyProvider } from '@myshell-run/ui-primitives';
import { clientContainer } from './client.container';
import { Bot } from '@myshell-run/simple-prisma';
import { BotList, BotListSearch } from '@myshell-run/ui-biz';

export const BotListIsland = (props: {
  className?: string;
  licenseKey?: string;
  initialBots: Bot[];
}) => {
  const { className, licenseKey, initialBots } = props;
  return (
    <InversifyProvider container={clientContainer}>
      <BotList
        className={className}
        licenseKey={licenseKey}
        initialBots={initialBots}
      />
    </InversifyProvider>
  );
};

export const BotListSearchIsland = () => {
  return (
    <InversifyProvider container={clientContainer}>
      <BotListSearch />
    </InversifyProvider>
  );
};
