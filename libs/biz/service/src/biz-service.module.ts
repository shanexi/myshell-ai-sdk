import { ContainerModule } from 'inversify';
import { ChatService } from './lib/chat.service';
import { TrpcRouter } from './lib/trpc-router';
import { UploadSvc } from './lib/upload.svc';
import { Hunyuan } from './llm/hunyuan';
import { LLM } from './llm/llm';
import { OpenAI } from './llm/openai';

export const bizServiceModule = new ContainerModule((bind) => {
  bind(ChatService).toSelf().inSingletonScope();
  bind(TrpcRouter).toSelf().inSingletonScope();
  bind(LLM).to(OpenAI).inSingletonScope();
  bind(LLM).to(Hunyuan).inSingletonScope();
  bind(UploadSvc).toSelf().inSingletonScope();
});
