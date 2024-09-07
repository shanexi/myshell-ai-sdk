import { GetListFn, PartialDetail } from '../../../../../../../src/chat-new/context/StaticContext.js';
import { ChatModuleType } from '../../../../../../../src/chat/ChatStaticContext.js';
export default function usePin(type: ChatModuleType, id: string, getList: GetListFn<unknown>, pinned?: boolean, partialUpdateDetail?: (partialDetail: PartialDetail) => void): {
    acting: boolean;
    togglePinStatus: () => Promise<void>;
};
