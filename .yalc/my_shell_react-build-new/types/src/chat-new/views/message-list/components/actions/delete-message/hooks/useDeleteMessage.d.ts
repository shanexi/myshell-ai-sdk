import { ChatModuleType } from '../../../../../../../chat/ChatStaticContext';
export default function useDeleteMessage(type: ChatModuleType, id: string, deleteSpecifiedMessageId?: (msgId?: string) => void): {
    deleting: boolean;
    deleteMessage: (msgId: string) => Promise<void>;
};
se<void>;
};
