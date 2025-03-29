export const LLM = Symbol('LLM');

export type LLMMessage = {
  content: string;
};

export interface LLM {
  model: string;
  chat: (
    model: string,
    prompt: string,
  ) => AsyncGenerator<LLMMessage, void, unknown>;
}
