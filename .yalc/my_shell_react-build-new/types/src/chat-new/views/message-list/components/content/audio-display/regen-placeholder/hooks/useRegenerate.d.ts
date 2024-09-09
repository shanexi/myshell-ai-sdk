import { PartialMessageDetail } from '../../../../../../../../../../src/chat-new/services/useNewChatStore.js';
import { ChatModuleType } from '../../../../../../../../../../src/chat/ChatStaticContext.js';
import { EnergyInfo } from '../../../../../../../../../../src/common/constants/interfaces/user.js';
export default function useRegenerate(type: ChatModuleType, id: string, partialUpdateMessage?: (messageId: string, partialDetail: PartialMessageDetail) => void, enQueue?: (messageId: string) => void, setEnergyInfo?: (energyInfo: EnergyInfo) => void): {
    generating: boolean;
    handleRegenerate: (messageId: string) => Promise<void>;
};
