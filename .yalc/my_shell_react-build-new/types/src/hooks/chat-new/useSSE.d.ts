import { DraftMessage, LocalErrorMessage, Message } from '../../../../src/chat-new/model/definitions.js';
import { PartialMessageDetail } from '../../../../src/chat-new/services/useNewChatStore.js';
import { ChatModuleType } from '../../../../src/chat/ChatStaticContext.js';
import { EnergyInfo } from '../../../../src/common/constants/interfaces/user.js';
type P = {
    type: ChatModuleType;
    id: string;
    lastMessageInfo?: Message;
    onSendText: (text: string) => void;
    onSendAudio: (audio: string) => void;
    setEnergyInfo: (energyInfo: EnergyInfo) => void;
    addMessage: (message: (Message | DraftMessage | LocalErrorMessage) | Array<Message | DraftMessage | LocalErrorMessage>) => void;
    addAudioStream?: (messageId: string, audioChunk: ArrayBuffer) => void;
    updateMessage: (message: Message | LocalErrorMessage) => void;
    addTextStream: (messageId: string, content: string) => void;
    replaceDraftMessage: (message: Message | LocalErrorMessage) => void;
    audioAutoplay?: boolean;
    enQueue?: (messageId: string) => void;
    partialUpdateMessage?: (messageId: string, partialDetail: PartialMessageDetail) => void;
};
export default function useSSE(params: P): {
    sendTextMessage: (text: string) => void;
    sendAudioMessage: (audioBlob: Blob, mimeType?: string) => Promise<void>;
    terminate: () => Promise<void>;
};
export {};
