import { BotList, BotListSearch } from '@myshell-run/biz-ui';
import { DbBot } from '@myshell-run/biz-def';
import { ContainerProvider } from './container-provider';

export const BotListIsland = (props: {
  className?: string;
  licenseKey?: string;
  initialBots: DbBot[];
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
