"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useSSE;
const react_1 = require("react");
const bot_1 = require("../../apis/bot.js");
const enums_1 = require("../../chat/model/enums.js");
const store_1 = require("../../services/store/index.js");
const useSSEReq_1 = __importDefault(require("./useSSEReq.js"));
function useSSE(params) {
    const userId = (0, store_1.useUserStore)(state => state.userId);
    const { type, id, lastMessageInfo, onSendText, onSendAudio, setEnergyInfo, addMessage, updateMessage, addTextStream, addAudioStream, replaceDraftMessage, audioAutoplay, enQueue, partialUpdateMessage } = params;
    const { onSendSSEReq, terminate } = (0, useSSEReq_1.default)({
        type,
        id,
        userId,
        setEnergyInfo,
        addMessage,
        updateMessage,
        addTextStream,
        addAudioStream,
        replaceDraftMessage,
        audioAutoplay,
        enQueue,
        partialUpdateMessage
    });
    const sendTextMessage = (text) => {
        const body = {
            message: text,
            messageType: enums_1.MessageTypeEnum.TEXT
        };
        onSendSSEReq(body);
        onSendText(text);
    };
    const sendAudioMessage = (0, react_1.useCallback)(async (audioBlob, mimeType) => {
        const audio = Buffer.from(await audioBlob.arrayBuffer()).toString('base64');
        const blobDataURI = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => resolve('');
        });
    }, []);
    const terminateApi = () => {
        let api;
        switch (type) {
            case 'bot':
            default:
                api = bot_1.terminateGeneration;
                break;
        }
        return api;
    };
    const termination = async () => {
        if (lastMessageInfo) {
            const currentLen = lastMessageInfo.text?.length;
            if (lastMessageInfo.type === 'PENDING_FOR_RESPONSE') {
                terminate();
                updateMessage({ ...lastMessageInfo, status: 'CANCELED' });
            }
            else if (lastMessageInfo.status === 'PENDING' || lastMessageInfo.status === 'PROCESSING') {
                try {
                    terminate();
                    updateMessage({ ...lastMessageInfo, status: 'CANCELING' });
                    const { success } = await terminateApi()(id, lastMessageInfo.id, currentLen?.toString());
                    if (success) {
                        updateMessage({ ...lastMessageInfo, status: 'CANCELED' });
                    }
                }
                catch (e) {
                }
            }
            else if (lastMessageInfo.status === 'DONE' && lastMessageInfo.asyncJobInfo) {
                try {
                    updateMessage({ ...lastMessageInfo, status: 'CANCELING' });
                    const { success } = await terminateApi()(id, lastMessageInfo.id);
                    if (success) {
                        terminate?.();
                        updateMessage({ ...lastMessageInfo, status: 'CANCELED' });
                    }
                }
                catch (e) {
                }
            }
        }
    };
    return { sendTextMessage, sendAudioMessage, terminate: termination };
}
