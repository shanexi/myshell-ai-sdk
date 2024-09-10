import { DraftMessage, LocalErrorMessage, Message } from '../../../../../../../chat-new/model/definitions';
import { ChatModuleType } from '../../../../../../../chat/ChatStaticContext';
export default function useClearMemory(type: ChatModuleType, id: string, addMessage: (messages: (Message | DraftMessage | LocalErrorMessage) | Array<Message | DraftMessage | LocalErrorMessage>) => void, name?: string): () => Promise<void>;
ng): () => Promise<void>;
