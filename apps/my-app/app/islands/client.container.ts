import { messageItemPluginsModule } from '@myshell-run/message-item-plugins';
import { uiBizModule } from '@myshell-run/biz-ui';
import { Container } from 'inversify';
import { httpBatchLink, createTRPCClient, type TRPCClient } from '@trpc/client';
import { AppRouter } from '@myshell-run/biz-service';
import { MyAppTrpcClient } from '@myshell-run/biz-def';

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url:
        typeof window !== 'undefined'
          ? `${window.location.origin}/trpc`
          : 'http://localhost:5173/trpc',
    }),
  ],
});

export const clientContainer = new Container();
clientContainer.load(messageItemPluginsModule);
clientContainer.load(uiBizModule);

clientContainer
  .bind<TRPCClient<AppRouter>>(MyAppTrpcClient)
  .toConstantValue(trpc);
