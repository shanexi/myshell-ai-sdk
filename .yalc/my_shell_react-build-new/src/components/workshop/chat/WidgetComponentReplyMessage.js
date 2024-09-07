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
const driver_js_1 = require("driver.js");
const dynamic_1 = __importDefault(require("next/dynamic"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const enums_1 = require("../../../chat/model/enums.js");
const AudioPlayer_1 = __importDefault(require("../../../chat/views/chat-body/audio-player/AudioPlayer.js"));
const file_display_1 = __importDefault(require("../../../chat/views/chat-body/file-display/index.js"));
const AudioStreamPlayer_1 = __importDefault(require("../../../chat/views/chat-body/reply-message/stream/AudioStreamPlayer.js"));
const Container_1 = __importDefault(require("../../../common/components/lui/Container.js"));
const icon_button_1 = require("../../../common/components/ui/icon-button.js");
const spinner_1 = __importDefault(require("../../../common/components/ui/spinner.js"));
const workshop_1 = require("../../../common/constants/enums/workshop.js");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const identityService_1 = require("../../../common/services/identityService.js");
const useWidgetReplyMessage_1 = require("../../../hooks/workshop/chat/useWidgetReplyMessage.js");
const store_1 = require("../../../services/store/index.js");
require("driver.js/dist/driver.css");
const MdViewer = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../common/components/MdViewer.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)("div", { children: "loading..." }),
    ssr: false
});
function WidgetComponentReplyMessage({ chat, onChangeCopyText, latest, toggleImagePanelOpen, widgetInfo }) {
    const { textMessage, showProgressBar, showAudio, urlAudio, streamAudio, iosAudio, textMessageStatus, toggleTranslate, chatlocale, translateMessage, translateStatus } = (0, useWidgetReplyMessage_1.useWidgetReplyMessage)({ chat, onChangeCopyText, widgetInfo, latest });
    const t = (0, next_intl_1.useTranslations)('chat');
    const driverChatId = (0, store_1.useChatStore)(state => state.driverChatId);
    const setIsChatDriving = (0, store_1.useChatStore)(state => state.setIsChatDriving);
    const isChatDriving = (0, store_1.useChatStore)(state => state.isChatDriving);
    const sending = (0, store_1.useChatStore)(state => state.sending);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const startDisabled = sending;
    const jobInfo = chat.asyncJobInfo || {};
    const loadingText = textMessage;
    const isPanelImageBot = widgetInfo?.chatPanelType === workshop_1.ChatPanelTypeEnum.BOT_CHAT_PANEL_TYPE_COMPONENT;
    const guideRef = (0, react_2.useRef)(null);
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const startDriver = () => {
        if (guideRef.current) {
            clearTimeout(guideRef.current);
        }
        if (identityService_1.identityService.getChatDrivered() !== 'true') {
            setIsChatDriving(true);
            const driverObj = (0, driver_js_1.driver)({
                allowClose: true,
                onDestroyed: () => {
                    setIsChatDriving(false);
                }
            });
            guideRef.current = setTimeout(() => {
                driverObj.highlight({
                    element: `#component_bot_replay_${chat.id}`,
                    popover: {
                        side: 'top',
                        align: 'end',
                        title: t('replicate_guide_title'),
                        description: isMobile ? t('replicate_guide_mob_content') : t('replicate_guide_content')
                    }
                });
            }, 3000);
            identityService_1.identityService.setChatDrivered('true');
        }
    };
    (0, react_2.useEffect)(() => {
        if (driverChatId === `${chat.id}` && isPanelImageBot) {
            jobInfo.status === enums_1.ModelStatusEnum.EMBED_OBJ_STATUS_DONE && startDriver();
        }
    }, [driverChatId, chat.id]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: ((chat.voiceUrl || chat.text) && chat.type === enums_1.MessageTypeEnum.GREETING) ||
            (jobInfo.status === enums_1.ModelStatusEnum.EMBED_OBJ_STATUS_DONE &&
                ((chat.text && !!chat.text.length) || (chat.embedObjs || [])?.length > 0)) ? ((0, jsx_runtime_1.jsxs)("div", { id: `component_bot_replay_${chat.id}`, className: "widget-compomponent-reply-message w-full flex flex-col space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('w-full relative rounded-tl-sm rounded-2xl bg-surface-special', (chat?.embedObjs || [])?.length > 0 ? 'p-3' : ''), children: [chat.text && !!chat.text.length && ((0, jsx_runtime_1.jsx)("div", { className: "py-3 px-4 leading-6 max-w-fit", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center space-x-1 w-full overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-black w-full", children: (0, jsx_runtime_1.jsx)(MdViewer, { content: textMessage, status: chat.status }) }), textMessageStatus === useWidgetReplyMessage_1.TextMessage.translation &&
                                        !chat.translation &&
                                        translateStatus === useWidgetReplyMessage_1.TranslateStatus.translating && ((0, jsx_runtime_1.jsx)(react_1.Icon, { as: ArrowPathIcon_1.default, className: "animate-spin" })), textMessageStatus === useWidgetReplyMessage_1.TextMessage.translation &&
                                        !chat.translation &&
                                        translateStatus === useWidgetReplyMessage_1.TranslateStatus.error && ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { "aria-label": "translate", variant: "ghost", size: "sm", icon: ArrowPathIcon_1.default, onClick: translateMessage }))] }) })), (0, jsx_runtime_1.jsx)("div", { children: (chat?.embedObjs || [])?.length > 0 ? ((0, jsx_runtime_1.jsx)(file_display_1.default, { embedObjs: chat.embedObjs, driving: isChatDriving })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: showAudio && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [streamAudio && ((0, jsx_runtime_1.jsx)(AudioStreamPlayer_1.default, { replyUid: chat.replyUid, id: chat.id, audioList: chat.audioStream, borderColor: "#e9e9e9", messageStatus: chat.status, autoPlay: true, showProgressBar: showProgressBar })), iosAudio && ((0, jsx_runtime_1.jsx)(AudioPlayer_1.default, { replyUid: chat.replyUid, id: chat.id, direction: "left", showBottomBorder: true, isFromHistory: chat.isFromHistory, borderColor: "#e9e9e9", autoPlay: true, showProgressBar: showProgressBar })), urlAudio && ((0, jsx_runtime_1.jsx)(AudioPlayer_1.default, { replyUid: chat.replyUid, id: chat.id, src: chat.voiceUrl, direction: "left", blobDuration: chat.voiceFileDurationSeconds, showBottomBorder: true, isFromHistory: chat.isFromHistory, borderColor: "#e9e9e9", showProgressBar: showProgressBar }))] })) })) })] }), !!chat.componentContainer && (0, jsx_runtime_1.jsx)(Container_1.default, { latest: latest, component: chat.componentContainer })] })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (jobInfo.status === enums_1.ModelStatusEnum.EMBED_OBJ_STATUS_DONE &&
                chat.text == '' &&
                (chat.embedObjs || [])?.length === 0) ||
                jobInfo.status === enums_1.ModelStatusEnum.EMBED_OBJ_STATUS_ERROR ? ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('reply-error-message flex flex-col space-y-3 min-w-[60%]', chat.componentContainer ? 'w-full' : 'w-fit'), children: [(0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('relative rounded-tl-[2px] md:rounded-tl-2xl rounded-2xl w-full bg-surface-special', chat.componentContainer ? 'w-full' : 'md:w-fit'), children: (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('py-3 px-4 leading-6', chat.componentContainer ? 'w-full' : 'max-w-fit'), children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-row items-center space-x-1 w-full overflow-hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "text-[#EC2F0D] w-full", children: (0, jsx_runtime_1.jsx)(MdViewer, { className: "text-[#EC2F0D] text-[14px]", content: textMessage, status: chat.status }) }) }) }) }), (0, jsx_runtime_1.jsx)(react_1.Button, { className: "mt-3 h-[38px] py-2 w-full border border-default rounded-full bg-surface text-on-surface text-14 font-medium cursor-pointer", boxShadow: "0px 1px 0px 0px rgba(0, 0, 0, 0.05);", _hover: { bg: 'var(--surface)' }, _active: { bg: 'var(--surface)' }, _disabled: { opacity: 0.3 }, onClick: toggleImagePanelOpen, isDisabled: startDisabled, children: t('re_edit.btn_text') }), !!chat.componentContainer && (0, jsx_runtime_1.jsx)(Container_1.default, { component: chat.componentContainer })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "w-auto p-4 rounded-xl bg-surface-special flex items-center", children: [(0, jsx_runtime_1.jsx)(spinner_1.default, { className: "flex-shrink-0 text-brand", size: "sm" }), (0, jsx_runtime_1.jsx)("p", { className: "text-[16px] text-primary ml-2", children: loadingText })] })) })) }));
}
exports.default = (0, react_2.memo)(WidgetComponentReplyMessage);
