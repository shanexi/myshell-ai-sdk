import { BotList, BotListSearch } from '@myshell-run/biz-ui';
import { Bot } from '@myshell-run/simple-prisma';
import { ContainerProvider } from './container-provider';

export const BotListIsland = (props: {
  className?: string;
  licenseKey?: string;
  initialBots: Bot[];
  userId: string;
}) => {
  const { className, licenseKey, initialBots, userId } = props;
  return (
    <ContainerProvider userId={userId}>
      <BotList
        className={className}
        licenseKey={licenseKey}
        initialBots={initialBots}
      />
    </ContainerProvider>
  );
};

export const BotListSearchIsland = (props: { userId: string }) => {
  const { userId } = props;
  return (
    <ContainerProvider userId={userId}>
      <BotListSearch />
    </ContainerProvider>
  );
};
