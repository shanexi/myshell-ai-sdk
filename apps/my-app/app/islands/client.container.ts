import { messageItemPluginsModule } from '@myshell-run/message-item-plugins';
import { uiBizModule } from '@myshell-run/ui-biz';
import { Container } from 'inversify';
import { httpBatchLink, createTRPCClient, type TRPCClient } from '@trpc/client';
import { AppRouter } from '@myshell-run/simple-services';
import { MyAppTrpcClient } from '@myshell-run/def';

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:5173/trpc',
    }),
  ],
});

export const clientContainer = new Container();
clientContainer.load(messageItemPluginsModule);
clientContainer.load(uiBizModule);

clientContainer
  .bind<TRPCClient<AppRouter>>(MyAppTrpcClient)
  .toConstantValue(trpc);
