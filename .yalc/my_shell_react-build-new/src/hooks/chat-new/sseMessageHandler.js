"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSEEvents = void 0;
exports.default = useSSEMessageHandler;
const react_1 = require("react");
const definitions_1 = require("../../chat-new/model/definitions.js");
const util_1 = require("../../chat-new/util.js");
const common_helper_1 = require("../../common/utils/common-helper.js");
var SSEEvents;
(function (SSEEvents) {
    SSEEvents["CONSUME_ENERGY"] = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_USER_CONSUMED_ENERGY";
    SSEEvents["MESSAGE_CONSUME_ENERGY"] = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_CHAT_CONSUMED_ENERGY";
    SSEEvents["SENT"] = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_USER_SENT_MESSAGE_CREATED";
    SSEEvents["REPLYING"] = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_USER_SENT_MESSAGE_REPLYING";
    SSEEvents["REPLIED"] = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_USER_SENT_MESSAGE_REPLIED";
    SSEEvents["TEXT_STREAM"] = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_TEXT";
    SSEEvents["TEXT_STREAM_FINISHED"] = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_TEXT_STREAM_PUSH_FINISHED";
    SSEEvents["AUDIO_STREAM"] = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_VOICE_BYTES";
    SSEEvents["DURATION_CALCULATED"] = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_AUDIO_FILE_DURATION_CALCULATED";
    SSEEvents["VOICE_RECEIVED"] = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_VOICE_FILE_UPLOADED";
    SSEEvents["JOB_CREATED"] = "MESSAGE_REPLY_GENERATION_JOB_CREATED";
    SSEEvents["EMBED_OBJ_PUSHED"] = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_EMBED_OBJ_PUSHED";
    SSEEvents["UPDATE_HISTORY_MESSAGE"] = "MESSAGE_REPLY_UPDATE_HISTORY_MESSAGE";
    SSEEvents["CREATE_WHOLD_MESSAGE"] = "MESSAGE_REPLY_CREATE_WHOLD_MESSAGE";
    SSEEvents["INTERNAL_ERROR"] = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_ERROR";
    SSEEvents["IMAGE_GEN_PROCESSING"] = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_IMAGE_GEN_PROCESSING";
    SSEEvents["IMAGE_GEN_DONE"] = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_IMAGE_GEN_DONE";
    SSEEvents["IMAGE_GEN_ERROR"] = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_IMAGE_GEN_ERROR";
    SSEEvents["LLM_MODERATION_REQUEST"] = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_LLM_MODERATION_REQUEST";
    SSEEvents["MESSAGE_REPLY_REFERENCE_SOURCE"] = "MESSAGE_REPLY_GENERATION_JOB_CREATED";
    SSEEvents["MESSAGE_REPLY_RECOMMND_QUESTION"] = "MESSAGE_REPLY_RECOMMND_QUESTION";
    SSEEvents["MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_RECOMMEND_BOT_SUCCESS"] = "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_RECOMMEND_BOT_SUCCESS";
})(SSEEvents || (exports.SSEEvents = SSEEvents = {}));
function useSSEMessageHandler(params) {
    const replyingMsgId = (0, react_1.useRef)();
    const { type, userId, setEnergyInfo, addMessage, updateMessage, addTextStream, addAudioStream, replaceDraftMessage, audioAutoplay, enQueue, partialUpdateMessage } = params;
    function handler(msg) {
        const { event, data } = msg;
        const sseMsg = (0, common_helper_1.tryJsonParse)(data);
        const { message, voiceBytes, voiceBytesIndex, imageGenMessageResponse, audioFileDurationSeconds, voiceFilePath } = sseMsg;
        switch (event) {
            case SSEEvents.CONSUME_ENERGY:
                {
                    const { userEnergyInfo } = sseMsg;
                    setEnergyInfo(userEnergyInfo);
                }
                break;
            case SSEEvents.SENT:
                if (message.userId === userId) {
                    replaceDraftMessage((0, util_1.serverMessageParser)(message, type));
                }
                else {
                    addMessage((0, util_1.serverMessageParser)(message, type));
                }
                break;
            case SSEEvents.REPLYING:
                replyingMsgId.current = message.id;
                addMessage((0, util_1.serverMessageParser)(message, type));
                break;
            case SSEEvents.TEXT_STREAM:
            case SSEEvents.TEXT_STREAM_FINISHED:
                {
                    const { content } = sseMsg;
                    if (replyingMsgId.current) {
                        addTextStream(replyingMsgId.current, content);
                    }
                }
                break;
            case SSEEvents.JOB_CREATED:
            case SSEEvents.UPDATE_HISTORY_MESSAGE:
            case SSEEvents.EMBED_OBJ_PUSHED:
                updateMessage((0, util_1.serverMessageParser)(message, type));
                break;
            case SSEEvents.CREATE_WHOLD_MESSAGE:
                addMessage((0, util_1.serverMessageParser)(message, type));
                break;
            case SSEEvents.IMAGE_GEN_PROCESSING:
                if (replyingMsgId.current) {
                    partialUpdateMessage?.(replyingMsgId.current, {
                        imageGenMessageResponse: {
                            ...imageGenMessageResponse,
                            genStatus: definitions_1.ImageGenStatus.PROCESSING
                        }
                    });
                }
                break;
            case SSEEvents.IMAGE_GEN_DONE:
                if (replyingMsgId.current) {
                    partialUpdateMessage?.(replyingMsgId.current, {
                        imageGenMessageResponse: {
                            ...imageGenMessageResponse,
                            genStatus: definitions_1.ImageGenStatus.DONE
                        }
                    });
                }
                break;
            case SSEEvents.IMAGE_GEN_ERROR:
                if (replyingMsgId.current) {
                    partialUpdateMessage?.(replyingMsgId.current, {
                        imageGenMessageResponse: {
                            ...imageGenMessageResponse,
                            genStatus: definitions_1.ImageGenStatus.ERROR
                        }
                    });
                }
                break;
            case SSEEvents.DURATION_CALCULATED:
                if (replyingMsgId.current) {
                    partialUpdateMessage?.(replyingMsgId.current, {
                        duration: audioFileDurationSeconds
                    });
                }
                break;
            case SSEEvents.VOICE_RECEIVED:
                if (replyingMsgId.current) {
                    partialUpdateMessage?.(replyingMsgId.current, {
                        audioUrl: voiceFilePath
                    });
                }
                break;
            case SSEEvents.REPLIED:
                if (audioAutoplay) {
                    enQueue?.(message.id);
                }
                addMessage((0, util_1.serverMessageParser)(message, type));
                break;
            case SSEEvents.INTERNAL_ERROR:
                if (replyingMsgId.current) {
                    partialUpdateMessage?.(replyingMsgId.current, {
                        status: 'ERROR'
                    });
                }
                break;
            default:
                break;
        }
    }
    return handler;
}
