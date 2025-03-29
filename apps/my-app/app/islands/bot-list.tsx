import { BotList, BotListSearch } from '@myshell-run/biz-ui';
import { Bot } from '@myshell-run/simple-prisma';
import { ContainerProvider } from './container-provider';

export const BotListIsland = (props: {
  className?: string;
  licenseKey?: string;
  initialBots: Bot[];
}) => {
  const { className, licenseKey, initialBots } = props;
  return (
    <ContainerProvider>
      <BotList
        className={className}
        licenseKey={licenseKey}
        initialBots={initialBots}
      />
    </ContainerProvider>
  );
};

export const BotListSearchIsland = () => {
  return (
    <ContainerProvider>
      <BotListSearch />
    </ContainerProvider>
  );
};
