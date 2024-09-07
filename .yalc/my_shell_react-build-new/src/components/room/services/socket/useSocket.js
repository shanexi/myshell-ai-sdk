"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useSocket;
const react_1 = require("react");
const react_use_websocket_1 = __importDefault(require("react-use-websocket"));
const user_1 = require("../../../../common/constants/enums/user.js");
const useNotification_1 = require("../../../../common/hooks/useNotification.js");
const useUserSettings_1 = __importDefault(require("../../../../common/hooks/useUserSettings.js"));
const identityService_1 = require("../../../../common/services/identityService.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const runtime_config_1 = require("../../../../common/utils/runtime-config.js");
const store_1 = require("../../../../services/store/index.js");
const util_1 = __importDefault(require("./util.js"));
function useSocket(id, onSendText, onSendAudio, replaceDraftMessage, addMessage, updateRoomStatus, getList, onReceivedReward, updateDetail) {
    const token = (0, store_1.useUserStore)(state => state.token) ?? '';
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const visitorId = (0, common_helper_1.isClient)() ? identityService_1.identityService.getRandomVisitorId() : '';
    const userId = (0, store_1.useUserStore)(state => state.userId);
    const { currentLanguage } = (0, useUserSettings_1.default)();
    const setEnergyInfo = (0, store_1.useUserStore)(state => state.setEnergyInfo);
    const { error } = (0, useNotification_1.useNotification)();
    const onMessage = (0, react_1.useCallback)((event) => {
        try {
            if (event.data === 'pong')
                return;
            (0, util_1.default)(event.data, addMessage, replaceDraftMessage, setEnergyInfo, updateRoomStatus, getList, updateDetail, onReceivedReward, userId);
        }
        catch (e) {
            console.error(e);
        }
    }, [addMessage, getList, onReceivedReward, replaceDraftMessage, setEnergyInfo, updateDetail, updateRoomStatus, userId]);
    const onError = (0, react_1.useCallback)((event) => {
        console.error(event);
    }, []);
    const onClose = (0, react_1.useCallback)((event) => {
        console.log(event);
    }, []);
    const { sendJsonMessage, lastJsonMessage, readyState } = (0, react_use_websocket_1.default)(`${runtime_config_1.WS_API_URL}/v1/channel/chat/socket`, {
        queryParams: {
            channel_id: id,
            accept_language: currentLanguage,
            ...(isVisitor === user_1.VisitorEnum.YES ? { visitor_id: visitorId } : { authorization: token })
        },
        onMessage,
        onError,
        onClose,
        heartbeat: true,
        shouldReconnect: () => true
    });
    const checkSocketStatusBeforeSend = (0, react_1.useCallback)(() => {
        if (readyState === WebSocket.CLOSING || readyState === WebSocket.CLOSED) {
            error({
                content: 'The connection has been disconnected, please refresh and try again.'
            });
            return false;
        }
        return true;
    }, [error, readyState]);
    const sendTextMessage = (0, react_1.useCallback)((text) => {
        const ableToSend = checkSocketStatusBeforeSend();
        if (!ableToSend)
            return;
        const socketMsg = {
            type: 'TEXT',
            text
        };
        sendJsonMessage(socketMsg);
        onSendText(text);
    }, [checkSocketStatusBeforeSend, onSendText, sendJsonMessage]);
    const sendAudioMessage = (0, react_1.useCallback)(async (audioBlob, mimeType) => {
        const ableToSend = checkSocketStatusBeforeSend();
        if (!ableToSend)
            return;
        const audio = Buffer.from(await audioBlob.arrayBuffer()).toString('base64');
        const blobDataURI = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => resolve('');
        });
        const socketMsg = {
            type: 'VOICE',
            audioType: mimeType,
            voiceBytes: audio
        };
        sendJsonMessage(socketMsg);
        onSendAudio(blobDataURI);
    }, [checkSocketStatusBeforeSend, onSendAudio, sendJsonMessage]);
    const leaveRoom = (0, react_1.useCallback)(() => {
        const ableToSend = checkSocketStatusBeforeSend();
        if (!ableToSend)
            return;
        const socketMsg = {
            type: 'CLOSE_CHANNEL'
        };
        sendJsonMessage(socketMsg);
    }, [checkSocketStatusBeforeSend, sendJsonMessage]);
    return { socketStatus: readyState, sendTextMessage, sendAudioMessage, leaveRoom };
}
