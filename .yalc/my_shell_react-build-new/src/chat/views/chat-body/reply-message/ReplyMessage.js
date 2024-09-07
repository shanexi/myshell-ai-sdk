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
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const ArrowPathIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowPathIcon"));
const NoSymbolIcon_1 = __importDefault(require("@heroicons/react/24/outline/NoSymbolIcon"));
const clsx_1 = __importDefault(require("clsx"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const react_2 = require("react");
const reference_1 = __importDefault(require("../../../../chat-new/views/message-list/components/reference/index.js"));
const enums_1 = require("../../../../chat/model/enums.js");
const AudioStreamPlayer_1 = __importDefault(require("../../../../chat/views/chat-body/reply-message/stream/AudioStreamPlayer.js"));
const LoadingIcon_1 = __importDefault(require("../../../../common/components/icons/LoadingIcon.js"));
const Container_1 = __importDefault(require("../../../../common/components/lui/Container.js"));
const icon_button_1 = require("../../../../common/components/ui/icon-button.js");
const store_1 = require("../../../../services/store/index.js");
const AudioPlayer_1 = __importDefault(require("../audio-player/AudioPlayer.js"));
const file_display_1 = __importDefault(require("../file-display/index.js"));
const AudioPlaceholder_1 = __importDefault(require("./AudioPlaceholder.js"));
const useReplyMessage_1 = require("./useReplyMessage.js");
const MdViewer = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../../common/components/MdViewer.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)("div", { children: "loading..." }),
    ssr: false
});
function ReplyMessage({ chat, onChangeCopyText, selectedBot, latest, botChatSetting }) {
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const { textMessage, showProgressBar, showAudio, urlAudio, streamAudio, iosAudio, pendingForRegenerate, generating, textMessageStatus, toggleTranslate, handleRegenerate, voiceNeedRegenerate, chatlocale, singleTranscriptionDisplayOpen, translateMessage, translateStatus } = (0, useReplyMessage_1.useReplyMessage)({ chat, onChangeCopyText, selectedBot, latest, botChatSetting });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: chat.isLocalReply &&
            (chat.status === enums_1.MessageStatusEnum.CANCELING || chat.status === enums_1.MessageStatusEnum.CANCELED) ? ((0, jsx_runtime_1.jsx)("div", { className: "reply-message w-full flex flex-col", children: (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('relative p-3 rounded-tl-[2px] md:rounded-tl-2xl rounded-2xl w-full bg-surface-special'), children: (0, jsx_runtime_1.jsx)(NoSymbolIcon_1.default, { className: "w-6 h-6 text-icon" }) }) })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: !!chat.text?.length ||
                chat.status === enums_1.MessageStatusEnum.DONE ||
                (chat.voiceUrl && chat.type === enums_1.MessageTypeEnum.GREETING) ? ((0, jsx_runtime_1.jsxs)("div", { className: "reply-message w-full flex flex-col space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('relative rounded-tl-sm rounded-2xl bg-surface-special', showProgressBar ? 'w-full' : botChatSetting?.isTranslationOn ? 'w-full' : 'w-fit'), children: [(botChatSetting?.isTranscriptionOn || singleTranscriptionDisplayOpen) && ((0, jsx_runtime_1.jsx)("div", { className: "py-3 px-4 leading-6 max-w-fit", children: chat.text && !!chat.text.length && ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center space-x-1 w-full overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-black w-full", children: (0, jsx_runtime_1.jsx)(MdViewer, { content: textMessage, status: chat.status }) }), textMessageStatus === useReplyMessage_1.TextMessage.translation &&
                                            !chat.translation &&
                                            translateStatus === useReplyMessage_1.TranslateStatus.translating && ((0, jsx_runtime_1.jsx)(react_1.Icon, { as: ArrowPathIcon_1.default, className: "animate-spin" })), textMessageStatus === useReplyMessage_1.TextMessage.translation &&
                                            !chat.translation &&
                                            translateStatus === useReplyMessage_1.TranslateStatus.error && ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { "aria-label": "translate", variant: "ghost", size: "sm", icon: ArrowPathIcon_1.default, onClick: translateMessage }))] })) })), (0, jsx_runtime_1.jsx)("div", { children: showAudio &&
                                    (voiceNeedRegenerate ? ((0, jsx_runtime_1.jsx)(AudioPlaceholder_1.default, { blobDuration: chat.voiceFileDurationSeconds, loading: pendingForRegenerate || generating, onRegenerate: handleRegenerate, showProgressBar: showProgressBar, energyCost: selectedBot?.generateVoiceCostEnergy ?? 1, showEnergyCost: !isVisitor })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [streamAudio && ((0, jsx_runtime_1.jsx)(AudioStreamPlayer_1.default, { replyUid: chat.replyUid, id: chat.id, audioList: chat.audioStream, borderColor: "#e9e9e9", messageStatus: chat.status, autoPlay: botChatSetting?.isAudioPlayOn, showProgressBar: showProgressBar })), iosAudio && ((0, jsx_runtime_1.jsx)(AudioPlayer_1.default, { replyUid: chat.replyUid, id: chat.id, direction: "left", showBottomBorder: true, isFromHistory: chat.isFromHistory, borderColor: "#e9e9e9", autoPlay: botChatSetting?.isAudioPlayOn, showProgressBar: showProgressBar })), urlAudio && ((0, jsx_runtime_1.jsx)(AudioPlayer_1.default, { replyUid: chat.replyUid, id: chat.id, src: chat.voiceUrl, direction: "left", blobDuration: chat.voiceFileDurationSeconds, showBottomBorder: true, isFromHistory: chat.isFromHistory, borderColor: "#e9e9e9", showProgressBar: showProgressBar }))] }))) }), !!chat.referenceSource && !!chat.referenceSource.length && chat.status === enums_1.MessageStatusEnum.DONE && ((0, jsx_runtime_1.jsx)(reference_1.default, { references: chat.referenceSource, showBottomBorder: showAudio, className: "px-4" })), (chat?.embedObjs || [])?.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "p-3", children: (0, jsx_runtime_1.jsx)(file_display_1.default, { embedObjs: chat.embedObjs }) })) : null] }), !!chat.componentContainer && (0, jsx_runtime_1.jsx)(Container_1.default, { latest: latest, component: chat.componentContainer })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex w-[60px] p-4 rounded-xl bg-surface-special", children: (0, jsx_runtime_1.jsx)(LoadingIcon_1.default, {}) })) })) }));
}
exports.default = (0, react_2.memo)(ReplyMessage);
