import { ContainerModule } from 'inversify';
import { ChatService } from './lib/chat.service';
import { HonoCtx } from './lib/hono-ctx';
import { TrpcRouter } from './lib/trpc-router';
import { OpenAI } from './llm/openai';
import { LLM } from './llm/llm';
import { Hunyuan } from './llm/hunyuan';

export const bizServiceModule = new ContainerModule((bind) => {
  bind(HonoCtx).toSelf().inSingletonScope();
  bind(ChatService).toSelf().inSingletonScope();
  bind(TrpcRouter).toSelf().inSingletonScope();
  bind(LLM).to(OpenAI).inSingletonScope();
  bind(LLM).to(Hunyuan).inSingletonScope();
});
