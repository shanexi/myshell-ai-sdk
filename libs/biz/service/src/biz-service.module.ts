import { ContainerModule } from 'inversify';
import { ChatService } from './lib/chat.service';
import { HonoCtx } from './lib/hono-ctx';
import { TrpcRouter } from './lib/trpc-router';

export const bizServiceModule = new ContainerModule((bind) => {
  bind(HonoCtx).toSelf().inSingletonScope();
  bind(ChatService).toSelf().inSingletonScope();
  bind(TrpcRouter).toSelf().inSingletonScope();
});
