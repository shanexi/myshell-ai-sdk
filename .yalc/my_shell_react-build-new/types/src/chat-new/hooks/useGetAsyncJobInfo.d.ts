import { ChatModuleType } from '../../../../src/chat/ChatStaticContext.js';
import { LocalErrorMessage, Message } from '../model/definitions';
import { PartialMessageDetail } from '../services/useNewChatStore';
export default function useGetAsyncJobInfo(type: ChatModuleType, id: string, updateMsg: (message: Message | LocalErrorMessage) => void, partialUpdateMessage?: (messageId: string, partialDetail: PartialMessageDetail) => void): (jobId: string, messageId: string) => Promise<boolean>;
