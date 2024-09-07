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
const lodash_es_1 = require("lodash-es");
const dynamic_1 = __importDefault(require("next/dynamic"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const enums_1 = require("../../../../chat/model/enums.js");
const Container_1 = __importDefault(require("../../../../common/components/lui/Container.js"));
const spinner_1 = __importDefault(require("../../../../common/components/ui/spinner.js"));
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
const identityService_1 = require("../../../../common/services/identityService.js");
const store_1 = require("../../../../services/store/index.js");
const AudioPlaceholder_1 = __importDefault(require("./AudioPlaceholder.js"));
const AudioStreamPlayer_1 = __importDefault(require("./stream/AudioStreamPlayer.js"));
const useReplyMessage_1 = require("./useReplyMessage.js");
const AudioPlayer_1 = __importDefault(require("../audio-player/AudioPlayer.js"));
const file_display_1 = __importDefault(require("../file-display/index.js"));
require("driver.js/dist/driver.css");
const RunningInfo_1 = __importDefault(require("./RunningInfo.js"));
require("driver.js/dist/driver.css");
const icon_button_1 = require("../../../../common/components/ui/icon-button.js");
const MdViewer = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../../common/components/MdViewer.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)("div", { children: "loading..." }),
    ssr: false
});
function ComponentReplyMessage({ chat, onChangeCopyText, selectedBot, latest, botChatSetting, toggleImagePanelOpen }) {
    const { textMessage, showProgressBar, showAudio, urlAudio, streamAudio, iosAudio, pendingForRegenerate, generating, textMessageStatus, toggleTranslate, handleRegenerate, voiceNeedRegenerate, chatlocale, singleTranscriptionDisplayOpen, translateMessage, translateStatus } = (0, useReplyMessage_1.useReplyMessage)({ chat, onChangeCopyText, selectedBot, latest, botChatSetting });
    const t = (0, next_intl_1.useTranslations)('chat');
    const driverChatId = (0, store_1.useChatStore)(state => state.driverChatId);
    const setIsChatDriving = (0, store_1.useChatStore)(state => state.setIsChatDriving);
    const isChatDriving = (0, store_1.useChatStore)(state => state.isChatDriving);
    const sending = (0, store_1.useChatStore)(state => state.sending);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const startDisabled = (isVisitor == 1 && selectedBot?.visitorCanChat == false) || sending;
    const jobInfo = chat.asyncJobInfo || {};
    const loadingText = textMessage;
    const runningWidgetInfo = chat?.extraInfo?.runningWidgetInfo || [];
    const guideRef = (0, react_2.useRef)(null);
    const isImageBot = selectedBot?.isImageGenerator;
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
        if (driverChatId === `${chat.id}` && selectedBot?.isPanelImageBot) {
            jobInfo.status === enums_1.ModelStatusEnum.EMBED_OBJ_STATUS_DONE && startDriver();
        }
    }, [driverChatId, chat.id]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: chat.status === enums_1.MessageStatusEnum.CANCELING || chat.status === enums_1.MessageStatusEnum.CANCELED ? ((0, jsx_runtime_1.jsx)("div", { className: "reply-message w-full flex flex-col", children: (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('relative p-3 rounded-tl-[2px] md:rounded-tl-2xl rounded-2xl w-full bg-surface-special'), children: "The task has been terminated." }) })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: ((chat.voiceUrl || chat.text) && chat.type === enums_1.MessageTypeEnum.GREETING) ||
                (jobInfo.status === enums_1.ModelStatusEnum.EMBED_OBJ_STATUS_DONE &&
                    ((chat.text && !!chat.text.length) || (chat.embedObjs || [])?.length > 0)) ? ((0, jsx_runtime_1.jsx)("div", { id: `component_bot_replay_${chat.id}`, className: "component-reply-message w-full flex flex-col space-y-3", children: (0, lodash_es_1.isEmpty)(chat?.runningError) ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('relative rounded-tl-sm rounded-2xl bg-surface-special', chat.componentContainer ? 'w-full' : 'w-fit', (chat?.embedObjs || [])?.length > 0 ? 'p-3' : ''), children: [(botChatSetting?.isTranscriptionOn || singleTranscriptionDisplayOpen) &&
                                    chat.text &&
                                    !!chat.text.length && ((0, jsx_runtime_1.jsx)("div", { className: "py-3 px-4 leading-6 max-w-fit", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center space-x-1 w-full overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-black w-full", children: (0, jsx_runtime_1.jsx)(MdViewer, { content: textMessage, status: chat.status }) }), textMessageStatus === useReplyMessage_1.TextMessage.translation &&
                                                !chat.translation &&
                                                translateStatus === useReplyMessage_1.TranslateStatus.translating && ((0, jsx_runtime_1.jsx)(react_1.Icon, { as: ArrowPathIcon_1.default, className: "animate-spin" })), textMessageStatus === useReplyMessage_1.TextMessage.translation &&
                                                !chat.translation &&
                                                translateStatus === useReplyMessage_1.TranslateStatus.error && ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { "aria-label": "translate", variant: "ghost", size: "sm", icon: ArrowPathIcon_1.default, onClick: translateMessage }))] }) })), (0, jsx_runtime_1.jsx)("div", { children: (chat?.embedObjs || [])?.length > 0 ? ((0, jsx_runtime_1.jsx)(file_display_1.default, { isImageGenerator: isImageBot, embedObjs: chat.embedObjs, driving: isChatDriving, messageId: chat.id })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: showAudio &&
                                            (voiceNeedRegenerate ? ((0, jsx_runtime_1.jsx)(AudioPlaceholder_1.default, { blobDuration: chat.voiceFileDurationSeconds, loading: pendingForRegenerate || generating, onRegenerate: handleRegenerate, showProgressBar: showProgressBar, showEnergyCost: !isVisitor, energyCost: selectedBot?.generateVoiceCostEnergy ?? 1 })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [streamAudio && ((0, jsx_runtime_1.jsx)(AudioStreamPlayer_1.default, { replyUid: chat.replyUid, id: chat.id, audioList: chat.audioStream, borderColor: "#e9e9e9", messageStatus: chat.status, autoPlay: botChatSetting?.isAudioPlayOn, showProgressBar: showProgressBar })), iosAudio && ((0, jsx_runtime_1.jsx)(AudioPlayer_1.default, { replyUid: chat.replyUid, id: chat.id, direction: "left", showBottomBorder: true, isFromHistory: chat.isFromHistory, borderColor: "#e9e9e9", autoPlay: botChatSetting?.isAudioPlayOn, showProgressBar: showProgressBar })), urlAudio && ((0, jsx_runtime_1.jsx)(AudioPlayer_1.default, { replyUid: chat.replyUid, id: chat.id, src: chat.voiceUrl, direction: "left", blobDuration: chat.voiceFileDurationSeconds, showBottomBorder: true, isFromHistory: chat.isFromHistory, borderColor: "#e9e9e9", showProgressBar: showProgressBar }))] }))) })) })] }), !!chat.componentContainer && (0, jsx_runtime_1.jsx)(Container_1.default, { latest: latest, component: chat.componentContainer })] })) : ((0, jsx_runtime_1.jsx)(RunningInfo_1.default, { list: runningWidgetInfo })) })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (jobInfo.status === enums_1.ModelStatusEnum.EMBED_OBJ_STATUS_DONE &&
                    chat.text == '' &&
                    (chat.embedObjs || [])?.length === 0) ||
                    jobInfo.status === enums_1.ModelStatusEnum.EMBED_OBJ_STATUS_ERROR ? ((0, jsx_runtime_1.jsx)("div", { className: "reply-error-message w-fit flex flex-col space-y-3 min-w-[60%]", children: (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('relative rounded-tl-[2px] md:rounded-tl-2xl rounded-2xl w-full md:w-fit bg-surface-special'), children: (0, jsx_runtime_1.jsx)("div", { className: "py-3 px-4 leading-6 max-w-fit", children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-row items-center space-x-1 w-full overflow-hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "text-[#EC2F0D] w-full", children: (0, jsx_runtime_1.jsx)(MdViewer, { className: "text-[#EC2F0D] text-[14px]", content: textMessage, status: chat.status }) }) }) }) }) })) : runningWidgetInfo.length ? ((0, jsx_runtime_1.jsx)(RunningInfo_1.default, { list: runningWidgetInfo })) : ((0, jsx_runtime_1.jsxs)("div", { className: "w-auto p-4 rounded-xl bg-on-primary flex items-center", children: [(0, jsx_runtime_1.jsx)(spinner_1.default, { size: "xs", className: "text-primary" }), (0, jsx_runtime_1.jsx)("p", { className: "text-subtle text-sm ml-2", children: loadingText })] })) })) })) }));
}
exports.default = (0, react_2.memo)(ComponentReplyMessage);
