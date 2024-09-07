import { ChatModuleType } from '../../../../../../../../../src/chat/ChatStaticContext.js';
export default function useClearHistory(type: ChatModuleType, id: string, deleteSpecifiedMessageId?: (msgId?: string) => void): {
    clearing: boolean;
    clearHistory: () => Promise<void>;
};
