import { ChatModuleType } from '../../../../../../../../../src/chat/ChatStaticContext.js';
import { GetListFn } from '../../../../../../../../../src/chat-new/context/StaticContext.js';
export default function useRemoveFromList(type: ChatModuleType, id: string, getList: GetListFn<unknown>): {
    removing: boolean;
    remove: () => Promise<void>;
};
