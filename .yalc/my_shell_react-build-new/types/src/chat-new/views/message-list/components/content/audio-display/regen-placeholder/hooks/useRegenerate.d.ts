import { PartialMessageDetail } from '../../../../../../../../chat-new/services/useNewChatStore';
import { ChatModuleType } from '../../../../../../../../chat/ChatStaticContext';
import { EnergyInfo } from '../../../../../../../../common/constants/interfaces/user';
export default function useRegenerate(type: ChatModuleType, id: string, partialUpdateMessage?: (messageId: string, partialDetail: PartialMessageDetail) => void, enQueue?: (messageId: string) => void, setEnergyInfo?: (energyInfo: EnergyInfo) => void): {
    generating: boolean;
    handleRegenerate: (messageId: string) => Promise<void>;
};
essageId: string) => Promise<void>;
};
