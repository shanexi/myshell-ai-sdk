import { messageItemPluginsModule } from '@myshell-run/message-item-plugins';
import { uiBizModule } from '@myshell-run/ui-biz';
import { Container } from 'inversify';
import { CounterModel } from './counter.model';
import {
  CreateTRPCProxyClient,
  createTRPCProxyClient,
  httpBatchLink,
} from '@trpc/client';
import { AppRouter } from '../trpc-router';
import { MyAppTrpcClient } from '@myshell-run/def';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:5173/trpc',
    }),
  ],
});

export const clientContainer = new Container();
clientContainer.load(messageItemPluginsModule);
clientContainer.load(uiBizModule);

clientContainer.bind(CounterModel).toSelf().inSingletonScope();
clientContainer
  .bind<CreateTRPCProxyClient<AppRouter>>(MyAppTrpcClient)
  .toConstantValue(trpc);
