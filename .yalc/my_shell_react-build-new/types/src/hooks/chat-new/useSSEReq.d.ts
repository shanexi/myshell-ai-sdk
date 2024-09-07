import { DraftMessage, LocalErrorMessage, Message } from '../../../../src/chat-new/model/definitions.js';
import { PartialMessageDetail } from '../../../../src/chat-new/services/useNewChatStore.js';
import { ChatModuleType } from '../../../../src/chat/ChatStaticContext.js';
import { EnergyInfo } from '../../../../src/common/constants/interfaces/user.js';
export declare const getHeaders: () => Promise<{
    Authorization: string;
    platform: string;
    version: string;
    'Accept-Language': string;
} | {
    'Visitor-Id': string;
    'sc-device-id'?: string;
    'sc-cookie-id'?: string;
    platform: string;
    version: string;
    'Accept-Language': string;
}>;
type P = {
    type: ChatModuleType;
    id: string;
    userId?: string;
    setEnergyInfo: (energyInfo: EnergyInfo) => void;
    addMessage: (message: (Message | DraftMessage | LocalErrorMessage) | Array<Message | DraftMessage | LocalErrorMessage>) => void;
    updateMessage: (message: Message | LocalErrorMessage) => void;
    addTextStream: (messageId: string, content: string) => void;
    addAudioStream?: (messageId: string, audioChunk: ArrayBuffer) => void;
    replaceDraftMessage: (message: Message | LocalErrorMessage) => void;
    audioAutoplay?: boolean;
    enQueue?: (messageId: string) => void;
    partialUpdateMessage?: (messageId: string, partialDetail: PartialMessageDetail) => void;
};
export default function useSSEReq(params: P): {
    onSendSSEReq: (body: any) => Promise<void>;
    terminate: () => void;
};
export {};
