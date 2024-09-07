"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ErrorChatListRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const ExclamationCircleIcon_1 = __importDefault(require("@heroicons/react/24/solid/ExclamationCircleIcon"));
const get_blob_duration_1 = __importDefault(require("get-blob-duration"));
const next_intl_1 = require("next-intl");
const dynamic_1 = __importDefault(require("next/dynamic"));
const react_2 = require("react");
const enums_1 = require("../../../chat/model/enums.js");
const useTextMessageSender_1 = __importDefault(require("../../../chat/views/hooks/useTextMessageSender.js"));
const useVoiceMessageSender_1 = __importDefault(require("../../../chat/views/hooks/useVoiceMessageSender.js"));
const alert_1 = require("../../../common/components/ui/alert.js");
const avatar_1 = require("../../../common/components/ui/avatar.js");
const button_1 = require("../../../common/components/ui/button.js");
const icon_button_1 = require("../../../common/components/ui/icon-button.js");
const useRecorder_1 = __importDefault(require("../../../common/hooks/useRecorder.js"));
const common_helper_1 = require("../../../common/utils/common-helper.js");
const store_1 = require("../../../services/store/index.js");
const TextMessage_1 = __importDefault(require("./text-message/TextMessage.js"));
const VoiceMessage_1 = __importDefault(require("./voice-message/VoiceMessage.js"));
const MdViewer = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../common/components/MdViewer.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)("div", { children: "loading..." }),
    ssr: false
});
function ErrorChatListRow(props) {
    const { chat, botInfo, msg } = props;
    const t = (0, next_intl_1.useTranslations)('chat');
    const errorT = (0, next_intl_1.useTranslations)('request.error');
    const botId = (0, react_2.useMemo)(() => {
        return botInfo?.id ?? '';
    }, [botInfo]);
    const user = (0, store_1.useUserStore)(state => state.user);
    const removeErrorChatRecord = (0, store_1.useChatStore)(state => state.removeErrorChatRecord);
    const sending = (0, store_1.useChatStore)(state => state.sending);
    const { setTextMessage, sendTextMessage } = (0, useTextMessageSender_1.default)(botInfo);
    const { clearRecord, state } = (0, useRecorder_1.default)(botInfo);
    const { sendVoiceMessage } = (0, useVoiceMessageSender_1.default)({ audioType: 'audio/webm', clearRecord, botInfo });
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const startDisabled = (isVisitor == 1 && botInfo?.visitorCanChat == false) || sending;
    const targetBox = (0, react_2.useRef)(null);
    const [blobDuration, setBlobDuration] = (0, react_2.useState)(0);
    const [voiceUrl, setVoiceUrl] = (0, react_2.useState)('');
    const { isPanelImageBot } = (botInfo || {});
    (0, react_2.useEffect)(() => {
        let isMounted = true;
        const audioContext = new AudioContext();
        const fetchData = async () => {
            if (chat.type === enums_1.MessageTypeEnum.VOICE) {
                const base64String = chat?.base64?.split(',')?.[1] || '';
                const byteCharacters = Buffer.from(base64String, 'base64').toString('binary');
                const byteNumbers = new Uint8Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = byteNumbers.buffer;
                const blob = new Blob([byteArray], { type: 'audio/webm' });
                const blobUrl = URL.createObjectURL(blob);
                setVoiceUrl(blobUrl);
                const duration = await (0, get_blob_duration_1.default)(blob);
                if (isMounted) {
                    setBlobDuration(duration);
                }
            }
        };
        fetchData();
        return () => {
            isMounted = false;
            audioContext.close();
        };
    }, []);
    const handleError = () => {
        if (botInfo?.isPanelImageBot) {
            sendTextMessage({
                requestData: {
                    params: chat.params,
                    isButtonInteraction: chat?.isButtonInteraction,
                    text: chat?.text,
                    imSlashCommandInput: chat?.imSlashCommandInput,
                    messageType: chat?.type,
                    buttonId: chat?.buttonId,
                    interactionMsgId: chat?.interactionMsgId
                },
                callback: () => {
                    removeErrorChatRecord(`${chat?.id}`, botId);
                }
            });
        }
        else if (chat.type === enums_1.MessageTypeEnum.VOICE) {
            sendVoiceMessage({
                recordState: state,
                retryText: chat.base64,
                callback: () => {
                    removeErrorChatRecord(`${chat?.id}`, botId);
                }
            });
        }
        else {
            sendTextMessage({
                retryText: chat?.text,
                requestData: {
                    embedObjs: chat.embedObjs,
                    isButtonInteraction: chat?.isButtonInteraction,
                    text: chat?.text,
                    imSlashCommandInput: chat?.imSlashCommandInput,
                    messageType: chat?.type,
                    buttonId: chat?.buttonId,
                    interactionMsgId: chat?.interactionMsgId
                },
                callback: () => {
                    setTextMessage('');
                    removeErrorChatRecord(`${chat?.id}`, botId);
                }
            });
        }
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!isPanelImageBot && ((0, jsx_runtime_1.jsx)("li", { className: "flex items-baseline space-x-4 relative", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex justify-end space-x-2 my-2", children: [(0, jsx_runtime_1.jsxs)(react_1.Box, { ref: targetBox, maxW: "80%", className: "w-full flex justify-end space-x-2 my-2 items-center", children: [(0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { asChild: true, disabled: true, variant: "ghost", children: (0, jsx_runtime_1.jsx)(ExclamationCircleIcon_1.default, { className: "w-6 h-6 fill-[#EC2F0D] mr-2 flex-shrink-0" }) }), (chat?.type === enums_1.MessageTypeEnum.TEXT || chat.type === enums_1.MessageTypeEnum.BUTTON_INTERACTION) && ((0, jsx_runtime_1.jsx)(TextMessage_1.default, { chat: chat })), chat?.type === enums_1.MessageTypeEnum.VOICE && ((0, jsx_runtime_1.jsx)(VoiceMessage_1.default, { chat: { ...chat, voiceUrl }, blobDuration: blobDuration, botInfo: botInfo }))] }), (0, jsx_runtime_1.jsx)(avatar_1.Avatar, { src: (0, common_helper_1.getAssetsUrl)(user?.avatar), className: "w-9 h-9 mt-[10px] hidden md:block rounded-lg" }, user?.avatar)] }) }, chat?.id)), (0, jsx_runtime_1.jsx)("li", { className: "flex items-baseline space-x-4 relative", children: (0, jsx_runtime_1.jsx)("div", { className: "my-4 md:mx-10 w-full md:w-[calc(100%-80px)]", ref: targetBox, children: (0, jsx_runtime_1.jsxs)(alert_1.Alert, { variant: "error", className: "overflow-scroll", children: [(0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: (0, jsx_runtime_1.jsx)(MdViewer, { className: "flex-1 overflow-auto leading-[1.3] text-[12px] md:text-[16px] w-full md:grow max-w-[100%] text-critical-bolder", content: msg || errorT('network'), status: chat.status }) }), (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: !chat?.hideRetryBtn && ((0, jsx_runtime_1.jsx)("div", { className: "shrink-0 w-full md:w-auto flex justify-start md:justify-center", children: (0, jsx_runtime_1.jsx)(button_1.Button, { size: "md", color: "error", onClick: handleError, disabled: startDisabled, children: (0, jsx_runtime_1.jsx)("div", { className: "text-xs md:text-[14px] font-semibold", children: t('retry') }) }) })) })] }) }) })] }));
}
