import { ChatModuleType } from '../../../../src/chat/ChatStaticContext.js';
import { ListActionMode } from '../../../../src/services/store/entity.js';
export default function useCalcGetChatListFn(type: ChatModuleType): (actionType?: ListActionMode) => Promise<import("../../common/constants/interfaces/entity").ListItem[]>;
