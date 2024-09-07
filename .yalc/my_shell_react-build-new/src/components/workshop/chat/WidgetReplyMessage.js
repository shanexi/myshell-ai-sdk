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
const clsx_1 = __importDefault(require("clsx"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const enums_1 = require("../../../chat/model/enums.js");
const AudioPlayer_1 = __importDefault(require("../../../chat/views/chat-body/audio-player/AudioPlayer.js"));
const file_display_1 = __importDefault(require("../../../chat/views/chat-body/file-display/index.js"));
const AudioStreamPlayer_1 = __importDefault(require("../../../chat/views/chat-body/reply-message/stream/AudioStreamPlayer.js"));
const reference_1 = __importDefault(require("../../../chat-new/views/message-list/components/reference/index.js"));
const LoadingIcon_1 = __importDefault(require("../../../common/components/icons/LoadingIcon.js"));
const Container_1 = __importDefault(require("../../../common/components/lui/Container.js"));
const icon_button_1 = require("../../../common/components/ui/icon-button.js");
const workshop_1 = require("../../../common/constants/enums/workshop.js");
const useWidgetReplyMessage_1 = require("../../../hooks/workshop/chat/useWidgetReplyMessage.js");
const PromptWidgetUnlockAction_1 = __importDefault(require("./PromptWidgetUnlockAction.js"));
const PromptWidgetViewAction_1 = __importDefault(require("./PromptWidgetViewAction.js"));
const MdViewer = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../common/components/MdViewer.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)("div", { children: "loading..." }),
    ssr: false
});
function WidgetReplyMessage({ chat, onChangeCopyText, latest, widgetInfo }) {
    const { textMessage, showProgressBar, showAudio, urlAudio, streamAudio, iosAudio, textMessageStatus, toggleTranslate, chatlocale, translateMessage, translateStatus } = (0, useWidgetReplyMessage_1.useWidgetReplyMessage)({ chat, onChangeCopyText, latest, widgetInfo });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: !!chat.text?.length || chat.status === enums_1.MessageStatusEnum.DONE || chat.voiceUrl ? ((0, jsx_runtime_1.jsxs)("div", { className: "widget-reply-message w-full flex flex-col space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('relative rounded-tl-sm rounded-2xl bg-surface-special', showProgressBar ? 'w-full' : 'w-fit'), children: [!!chat.text?.length && ((0, jsx_runtime_1.jsx)("div", { className: "py-3 px-4 leading-6 max-w-fit", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center space-x-1 w-full overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-black w-full", children: (0, jsx_runtime_1.jsx)(MdViewer, { content: textMessage, status: chat.status }) }), textMessageStatus === useWidgetReplyMessage_1.TextMessage.translation &&
                                        !chat.translation &&
                                        translateStatus === useWidgetReplyMessage_1.TranslateStatus.translating && ((0, jsx_runtime_1.jsx)(react_1.Icon, { as: ArrowPathIcon_1.default, className: "animate-spin" })), textMessageStatus === useWidgetReplyMessage_1.TextMessage.translation &&
                                        !chat.translation &&
                                        translateStatus === useWidgetReplyMessage_1.TranslateStatus.error && ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { "aria-label": "translate", variant: "ghost", size: "sm", icon: ArrowPathIcon_1.default, onClick: translateMessage }))] }) })), (0, jsx_runtime_1.jsx)("div", { children: showAudio && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [streamAudio && ((0, jsx_runtime_1.jsx)(AudioStreamPlayer_1.default, { replyUid: chat.replyUid, id: chat.id, audioList: chat.audioStream, borderColor: "#e9e9e9", messageStatus: chat.status, autoPlay: true, showProgressBar: showProgressBar })), iosAudio && ((0, jsx_runtime_1.jsx)(AudioPlayer_1.default, { replyUid: chat.replyUid, id: chat.id, direction: "left", showBottomBorder: true, isFromHistory: chat.isFromHistory, borderColor: "#e9e9e9", autoPlay: true, showProgressBar: showProgressBar })), urlAudio && ((0, jsx_runtime_1.jsx)(AudioPlayer_1.default, { replyUid: chat.replyUid, id: chat.id, src: chat.voiceUrl, direction: "left", blobDuration: chat.voiceFileDurationSeconds, showBottomBorder: true, isFromHistory: chat.isFromHistory, borderColor: "#e9e9e9", showProgressBar: showProgressBar }))] })) }), !!chat.referenceSource && !!chat.referenceSource.length && chat.status === enums_1.MessageStatusEnum.DONE && ((0, jsx_runtime_1.jsx)(reference_1.default, { references: chat.referenceSource, showBottomBorder: showAudio, className: "px-4" })), chat.embedObjs && !!chat.embedObjs.length && ((0, jsx_runtime_1.jsx)("div", { className: "p-3", children: (0, jsx_runtime_1.jsx)(file_display_1.default, { embedObjs: chat.embedObjs }) }))] }), widgetInfo?.chatCallerType === workshop_1.WidgetChatCallerTypeEnum.WIDGET_CHAT_CALLER_TYPE_PROMPT &&
                    latest &&
                    !widgetInfo.hasUnlocked &&
                    widgetInfo.needShowUnlock && (0, jsx_runtime_1.jsx)(PromptWidgetUnlockAction_1.default, { widgetInfo: widgetInfo }), widgetInfo?.chatCallerType === workshop_1.WidgetChatCallerTypeEnum.WIDGET_CHAT_CALLER_TYPE_PROMPT &&
                    chat.type === enums_1.MessageTypeEnum.GREETING &&
                    widgetInfo.hasUnlocked && (0, jsx_runtime_1.jsx)(PromptWidgetViewAction_1.default, { widgetInfo: widgetInfo }), !!chat.componentContainer && (0, jsx_runtime_1.jsx)(Container_1.default, { latest: latest, component: chat.componentContainer })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex w-[60px] p-4 rounded-xl bg-surface-special", children: (0, jsx_runtime_1.jsx)(LoadingIcon_1.default, {}) })) }));
}
exports.default = WidgetReplyMessage;
