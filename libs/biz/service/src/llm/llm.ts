import { type ChatCompletionChunk } from 'openai/resources/chat';

export const LLM = Symbol('LLM');

export interface LLM {
  model: string;
  chat: (
    model: string,
    prompt: string,
  ) => AsyncGenerator<ChatCompletionChunk, void, unknown>;
}
