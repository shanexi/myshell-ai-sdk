import { DraftMessage, LocalErrorMessage, Message } from '../../../../../../../../../src/chat-new/model/definitions.js';
import { ChatModuleType } from '../../../../../../../../../src/chat/ChatStaticContext.js';
export default function useClearMemory(type: ChatModuleType, id: string, addMessage: (messages: (Message | DraftMessage | LocalErrorMessage) | Array<Message | DraftMessage | LocalErrorMessage>) => void, name?: string): () => Promise<void>;
