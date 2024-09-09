import { ChatModuleType } from '../../../../../../../../../src/chat/ChatStaticContext';
export default function useClearHistory(type: ChatModuleType, id: string, deleteSpecifiedMessageId?: (msgId?: string) => void): {
    clearing: boolean;
    clearHistory: () => Promise<void>;
};
