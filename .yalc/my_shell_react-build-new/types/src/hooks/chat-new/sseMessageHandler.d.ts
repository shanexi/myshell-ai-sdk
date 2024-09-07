import { DraftMessage, LocalErrorMessage, Message } from '../../../../src/chat-new/model/definitions.js';
import { PartialMessageDetail } from '../../../../src/chat-new/services/useNewChatStore.js';
import { ChatModuleType } from '../../../../src/chat/ChatStaticContext.js';
import { EnergyInfo } from '../../../../src/common/constants/interfaces/user.js';
import { EventSourceMessage } from '../../../../src/core/request/fetch-event-source/index.js';
export declare enum SSEEvents {
    CONSUME_ENERGY = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_USER_CONSUMED_ENERGY",
    MESSAGE_CONSUME_ENERGY = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_CHAT_CONSUMED_ENERGY",
    SENT = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_USER_SENT_MESSAGE_CREATED",
    REPLYING = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_USER_SENT_MESSAGE_REPLYING",
    REPLIED = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_USER_SENT_MESSAGE_REPLIED",
    TEXT_STREAM = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_TEXT",
    TEXT_STREAM_FINISHED = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_TEXT_STREAM_PUSH_FINISHED",
    AUDIO_STREAM = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_VOICE_BYTES",
    DURATION_CALCULATED = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_AUDIO_FILE_DURATION_CALCULATED",
    VOICE_RECEIVED = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_VOICE_FILE_UPLOADED",
    JOB_CREATED = "MESSAGE_REPLY_GENERATION_JOB_CREATED",
    EMBED_OBJ_PUSHED = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_EMBED_OBJ_PUSHED",
    UPDATE_HISTORY_MESSAGE = "MESSAGE_REPLY_UPDATE_HISTORY_MESSAGE",
    CREATE_WHOLD_MESSAGE = "MESSAGE_REPLY_CREATE_WHOLD_MESSAGE",
    INTERNAL_ERROR = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_ERROR",
    IMAGE_GEN_PROCESSING = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_IMAGE_GEN_PROCESSING",
    IMAGE_GEN_DONE = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_IMAGE_GEN_DONE",
    IMAGE_GEN_ERROR = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_IMAGE_GEN_ERROR",
    LLM_MODERATION_REQUEST = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_LLM_MODERATION_REQUEST",
    MESSAGE_REPLY_REFERENCE_SOURCE = "MESSAGE_REPLY_GENERATION_JOB_CREATED",
    MESSAGE_REPLY_RECOMMND_QUESTION = "MESSAGE_REPLY_RECOMMND_QUESTION",
    MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_RECOMMEND_BOT_SUCCESS = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_RECOMMEND_BOT_SUCCESS"
}
type P = {
    type: ChatModuleType;
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
export default function useSSEMessageHandler(params: P): (msg: EventSourceMessage) => void;
export {};
