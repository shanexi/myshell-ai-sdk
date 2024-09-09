import { ChatModuleType } from '../../../../../../../../../src/chat/ChatStaticContext';
import { GetListFn } from '../../../../../../../../../src/chat-new/context/StaticContext';
export default function useRemoveFromList(type: ChatModuleType, id: string, getList: GetListFn<unknown>): {
    removing: boolean;
    remove: () => Promise<void>;
};
