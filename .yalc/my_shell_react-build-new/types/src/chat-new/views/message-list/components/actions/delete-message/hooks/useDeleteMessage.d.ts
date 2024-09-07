import { ChatModuleType } from '../../../../../../../../../src/chat/ChatStaticContext.js';
export default function useDeleteMessage(type: ChatModuleType, id: string, deleteSpecifiedMessageId?: (msgId?: string) => void): {
    deleting: boolean;
    deleteMessage: (msgId: string) => Promise<void>;
};
