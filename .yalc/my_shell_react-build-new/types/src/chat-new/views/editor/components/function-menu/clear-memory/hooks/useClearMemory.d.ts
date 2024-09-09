import { DraftMessage, LocalErrorMessage, Message } from '../../../../../../../../../src/chat-new/model/definitions';
import { ChatModuleType } from '../../../../../../../../../src/chat/ChatStaticContext';
export default function useClearMemory(type: ChatModuleType, id: string, addMessage: (messages: (Message | DraftMessage | LocalErrorMessage) | Array<Message | DraftMessage | LocalErrorMessage>) => void, name?: string): () => Promise<void>;
