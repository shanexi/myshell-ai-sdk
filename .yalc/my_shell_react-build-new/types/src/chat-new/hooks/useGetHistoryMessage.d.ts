import { ChatModuleType } from '../../chat/ChatStaticContext';
import { DraftMessage, LocalErrorMessage, Message, ServerMessage } from '../model/definitions';
export default function useGetHistoryMessage(type: ChatModuleType, id: string, addMessage: (messages: Message | DraftMessage | LocalErrorMessage | Array<Message | DraftMessage | LocalErrorMessage>) => void): {
    gettingHistory: boolean;
    hasMore: boolean;
    getHistoryMessage: () => Promise<ServerMessage[]>;
};
ssage[]>;
};
