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
exports.default = PopupMenu;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const AdjustmentsHorizontalIcon_1 = __importDefault(require("@heroicons/react/24/outline/AdjustmentsHorizontalIcon"));
const DocumentDuplicateIcon_1 = __importDefault(require("@heroicons/react/24/outline/DocumentDuplicateIcon"));
const HandThumbDownIcon_1 = __importDefault(require("@heroicons/react/24/outline/HandThumbDownIcon"));
const HandThumbUpIcon_1 = __importDefault(require("@heroicons/react/24/outline/HandThumbUpIcon"));
const TrashIcon_1 = __importDefault(require("@heroicons/react/24/outline/TrashIcon"));
const EllipsisVerticalIcon_1 = __importDefault(require("@heroicons/react/24/solid/EllipsisVerticalIcon"));
const HandThumbUpIcon_2 = __importDefault(require("@heroicons/react/24/solid/HandThumbUpIcon"));
const clsx_1 = __importDefault(require("clsx"));
const dayjs_1 = __importDefault(require("dayjs"));
const lodash_es_1 = require("lodash-es");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const enums_1 = require("../../../../chat/model/enums.js");
const useActionSensors_1 = __importStar(require("../../../../chat/views/hooks/useActionSensors.js"));
const Trans_1 = __importDefault(require("../../../../common/components/icons/Trans.js"));
const TranscriptionIcon_1 = __importDefault(require("../../../../common/components/icons/chat/TranscriptionIcon.js"));
const Download_1 = __importDefault(require("../../../../common/components/icons/workshop/tts/Download.js"));
const Share_1 = __importDefault(require("../../../../common/components/icons/workshop/tts/Share.js"));
const useCopyClipboard_1 = __importDefault(require("../../../../common/hooks/useCopyClipboard.js"));
const EventEmitter_1 = __importDefault(require("../../../../common/utils/EventEmitter.js"));
const store_1 = require("../../../../services/store/index.js");
const MsgReportDialog_1 = require("../msg-report/MsgReportDialog.js");
const useFeedback_1 = require("../msg-report/useFeedback.js");
function PopupMenu({ chat, latest, isOpen, onClose, onToggle, downloading, onDownload, left, top, isNeedButton, botChatSetting, isMobile, toggleImagePanelOpen, showTranslate, isReply, showContextMenu, showAll, botInfo }) {
    const t = (0, next_intl_1.useTranslations)('chat');
    const commonT = (0, next_intl_1.useTranslations)('common');
    const setInputType = (0, store_1.useChatStore)(state => state.setInputType);
    const clearChatID = (0, store_1.useChatStore)(state => state.clearChatID);
    const addChatID = (0, store_1.useChatStore)(state => state.addChatID);
    const addDeleteChat = (0, store_1.useChatStore)(state => state.addDeleteChat);
    const clearDeleteChat = (0, store_1.useChatStore)(state => state.clearDeleteChat);
    const copyText = (0, store_1.useChatStore)(state => state.copyText);
    const updateMessage = (0, store_1.useChatStore)(state => state.updateMessage);
    const transactionDisplaySet = (0, store_1.useChatStore)(state => state.transactionDisplaySet);
    const setTransactionDisplayItem = (0, store_1.useChatStore)(state => state.setTransactionDisplayItem);
    const sending = (0, store_1.useChatStore)(state => state.sending);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const startDisabled = (isVisitor == 1 && botInfo?.visitorCanChat == false) || sending;
    const clickMoreRef = (0, react_2.useRef)(false);
    const { onCopy } = (0, useCopyClipboard_1.default)(chat.text);
    const canCopy = chat?.text && chat?.text.length > 0;
    const singleTranscripctionDisplayOpen = (0, react_2.useMemo)(() => {
        return transactionDisplaySet.has(chat.id);
    }, [chat.id, transactionDisplaySet]);
    const { onSendActionSensors } = (0, useActionSensors_1.default)();
    const { resetFeedbackState, handleReportMsg, reportT, sendFeedback, handleDislike, chatT, dialogRef, feedbackTxt, feedbackState, removeDislike } = (0, useFeedback_1.useFeedback)({
        chat,
        updateMessage,
        type: ''
    });
    const [blurClose, setBlurClose] = (0, react_2.useState)(true);
    const handleCopy = () => {
        if (chat.type === enums_1.MessageTypeEnum.REPLY || chat.type === enums_1.MessageTypeEnum.GREETING) {
            onCopy(copyText);
        }
        else {
            onCopy(chat.text);
        }
        onPopoverclose();
    };
    const handleShowTranscription = () => {
        setTransactionDisplayItem(chat.id);
        onPopoverclose();
    };
    const handleOpenPanel = () => {
        if (toggleImagePanelOpen) {
            toggleImagePanelOpen({ visible: true, msgId: chat.id });
        }
    };
    const onMoreClick = () => {
        clickMoreRef.current = true;
        showContextMenu.current = false;
        if (onToggle) {
            onToggle();
        }
    };
    const onPopoverclose = () => {
        onClose();
    };
    const toggleTranslate = () => {
        onSendActionSensors(useActionSensors_1.ActionType.Translate);
        const type = `translate-${chat.id}`;
        EventEmitter_1.default.dispatch(type, { id: chat.id });
        onPopoverclose();
    };
    const showMsg = (0, react_2.useMemo)(() => {
        return (chat.type !== enums_1.MessageTypeEnum.RESET &&
            chat.type !== enums_1.MessageTypeEnum.PROMPT_UPDATED &&
            chat.type !== enums_1.MessageTypeEnum.MORE_BOT_TO_EXPLORE &&
            chat.type !== enums_1.MessageTypeEnum.NEED_TO_REGISTER &&
            chat.type !== enums_1.MessageTypeEnum.VOICE_CALL_END);
    }, [chat.type]);
    const not_reply_greeting = (0, react_2.useMemo)(() => {
        return (chat.type !== enums_1.MessageTypeEnum.REPLY &&
            chat.type !== enums_1.MessageTypeEnum.VOICE_CALL_REPLY &&
            chat.type !== enums_1.MessageTypeEnum.GREETING);
    }, [chat.type]);
    const isLike = chat.feedbackState === 1;
    const isDisLike = chat.feedbackState === 2;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_1.Popover, { closeOnBlur: isNeedButton ? true : blurClose, isOpen: isOpen, onClose: onPopoverclose, isLazy: true, placement: "right-start", children: [!isNeedButton && ((0, jsx_runtime_1.jsx)(react_1.PopoverAnchor, { children: (0, jsx_runtime_1.jsx)("div", { className: "absolute z-10 w-4 h-4 opacity-0", id: "popoverAnchor", style: { left: `${left}${typeof left === 'number' ? 'px' : ''}`, top: `${top}px` }, children: ' ' }) })), isNeedButton && ((0, jsx_runtime_1.jsx)(react_1.PopoverAnchor, { children: (0, jsx_runtime_1.jsx)("button", { className: (0, clsx_1.default)('z-[1] flex justify-center items-center p-1.5 w-8 h-8 rounded-lg border border-default bg-surface hover:bg-surface-container-low'), onClick: onMoreClick, children: (0, jsx_runtime_1.jsx)(EllipsisVerticalIcon_1.default, { className: "text-on-surface w-5 h-5 inline" }) }) })), (0, jsx_runtime_1.jsx)(react_1.PopoverContent, { border: "none", borderRadius: "12px", w: "fit-content", className: "overflow-hidden bg-surface border-none dark:border dark:border-default dark:border-solid z-[999]", boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.10)", _focus: {
                            outline: 'none !important',
                            border: 'none',
                            boxShadow: '0px 0px 40px 0px rgba(0, 0, 0, 0.10)'
                        }, children: (0, jsx_runtime_1.jsx)(react_1.PopoverBody, { className: "bg-surface", p: "8px", children: (0, jsx_runtime_1.jsxs)(react_1.List, { children: [(chat.type === enums_1.MessageTypeEnum.REPLY || chat.type === enums_1.MessageTypeEnum.GREETING) && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [isReply && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [['Normal', 0, 1].includes(chat.feedbackState) && ((0, jsx_runtime_1.jsx)(react_1.ListItem, { borderRadius: "8px", className: (0, clsx_1.default)('hover:bg-surface-container flex', { 'xl:hidden': !showAll }), px: "8px", onClick: () => {
                                                            if (isLike) {
                                                                resetFeedbackState();
                                                                onSendActionSensors(useActionSensors_1.ActionType.Remove_Like);
                                                            }
                                                            else {
                                                                handleReportMsg(1);
                                                                onSendActionSensors(useActionSensors_1.ActionType.Like);
                                                            }
                                                            onPopoverclose();
                                                        }, children: (0, jsx_runtime_1.jsxs)(react_1.Button, { variant: "unstyled", display: "flex", alignItems: "center", children: [chat.feedbackState !== 1 && ((0, jsx_runtime_1.jsx)(HandThumbUpIcon_1.default, { className: (0, clsx_1.default)('h-5 w-5', 'text-on-surface') })), chat.feedbackState === 1 && (0, jsx_runtime_1.jsx)(HandThumbUpIcon_2.default, { className: "w-5 h-5 text-primary" }), (0, jsx_runtime_1.jsx)(react_1.Text, { ml: "8px", fontSize: "16px", lineHeight: "24px", fontWeight: "400", className: "text-on-surface", children: reportT('like') })] }) })), ['Normal', 0, 2].includes(chat.feedbackState) && ((0, jsx_runtime_1.jsx)(react_1.ListItem, { className: (0, clsx_1.default)('hover:bg-surface-container flex', { 'xl:hidden': !showAll }), borderRadius: "8px", px: "8px", onClick: () => {
                                                            if (isDisLike) {
                                                                setBlurClose(!!feedbackTxt);
                                                                handleDislike();
                                                                onSendActionSensors(useActionSensors_1.ActionType.Remove_Dislike);
                                                            }
                                                            else {
                                                                onSendActionSensors(useActionSensors_1.ActionType.Dislike);
                                                                handleReportMsg(2);
                                                            }
                                                        }, children: (0, jsx_runtime_1.jsxs)(react_1.Button, { variant: "unstyled", display: "flex", alignItems: "center", children: [(0, jsx_runtime_1.jsx)(HandThumbDownIcon_1.default, { className: (0, clsx_1.default)('h-5 w-5', isDisLike ? 'text-[#EC2F0D]' : 'text-on-surface') }), (0, jsx_runtime_1.jsx)(react_1.Text, { ml: "8px", fontSize: "16px", lineHeight: "24px", fontWeight: "400", className: (0, clsx_1.default)('line-clamp-1 break-all', isDisLike ? 'text-[#EC2F0D]' : 'text-on-surface'), children: !isDisLike
                                                                        ? reportT('dislike')
                                                                        : feedbackTxt
                                                                            ? feedbackTxt.slice(0, 8)
                                                                            : `${chatT('feedback')}` })] }) }))] })), [0, 1, 2].includes(chat.feedbackState) && ((0, jsx_runtime_1.jsx)("hr", { className: (0, clsx_1.default)('border-t-0 border-b border-default mb-1 flex', {
                                                    'xl:hidden': !showAll
                                                }) }))] })), canCopy && ((0, jsx_runtime_1.jsx)(react_1.ListItem, { className: "hover:bg-surface-container", borderRadius: "8px", px: "8px", onClick: () => {
                                            onSendActionSensors(useActionSensors_1.ActionType.Copy_Message);
                                            handleCopy();
                                        }, children: (0, jsx_runtime_1.jsxs)(react_1.Button, { variant: "unstyled", display: "flex", alignItems: "center", children: [(0, jsx_runtime_1.jsx)(DocumentDuplicateIcon_1.default, { className: "w-[20px] text-on-surface" }), (0, jsx_runtime_1.jsx)(react_1.Text, { ml: "8px", fontSize: "16px", lineHeight: "24px", fontWeight: "400", className: "text-on-surface", children: commonT('copy_message') })] }) })), toggleImagePanelOpen && !startDisabled && chat.type !== enums_1.MessageTypeEnum.GREETING && ((0, jsx_runtime_1.jsx)(react_1.ListItem, { className: (0, clsx_1.default)('hover:bg-surface-container', { '2xl:hidden': isReply && !showAll }), borderRadius: "8px", px: "8px", onClick: () => {
                                            handleOpenPanel();
                                        }, children: (0, jsx_runtime_1.jsxs)(react_1.Button, { variant: "unstyled", display: "flex", alignItems: "center", children: [(0, jsx_runtime_1.jsx)(AdjustmentsHorizontalIcon_1.default, { className: "w-[20px] text-on-surface" }), (0, jsx_runtime_1.jsx)(react_1.Text, { ml: "8px", fontSize: "16px", lineHeight: "24px", fontWeight: "400", className: "text-on-surface", children: t('panel.parameters') })] }) })), botChatSetting?.isTranslationOn && showMsg && !not_reply_greeting && chat.text != '' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("hr", { className: "border-t-0 border-b border-default mb-1" }), (0, jsx_runtime_1.jsx)(react_1.ListItem, { className: (0, clsx_1.default)('hover:bg-surface-container', { '2xl:hidden': isReply && !showAll }), borderRadius: "8px", px: "8px", onClick: toggleTranslate, children: (0, jsx_runtime_1.jsxs)(react_1.Button, { variant: "unstyled", display: "flex", alignItems: "center", children: [(0, jsx_runtime_1.jsx)(Trans_1.default, { fontSize: "20px", className: "text-on-surface", fillColor: "var(--on-surface)" }), (0, jsx_runtime_1.jsx)(react_1.Text, { ml: "8px", fontSize: "16px", lineHeight: "24px", fontWeight: "400", className: "text-on-surface", children: t('translate') })] }) })] })), !botChatSetting?.isTranscriptionOn && !singleTranscripctionDisplayOpen && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("hr", { className: "border-t-0 border-b border-default mb-1" }), (0, jsx_runtime_1.jsx)(react_1.ListItem, { className: "hover:bg-surface-container", borderRadius: "8px", px: "8px", onClick: handleShowTranscription, children: (0, jsx_runtime_1.jsxs)(react_1.Button, { variant: "unstyled", display: "flex", alignItems: "center", children: [(0, jsx_runtime_1.jsx)(TranscriptionIcon_1.default, { fontSize: "20px", className: "text-on-surface" }), (0, jsx_runtime_1.jsx)(react_1.Text, { ml: "8px", fontSize: "16px", lineHeight: "24px", fontWeight: "400", className: "text-on-surface-variant", children: t('chat_setting.transcription') })] }) })] })), botChatSetting?.isAudioOn && chat.voiceUrl && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("hr", { className: "border-t-0 border-b border-default mb-1" }), (0, jsx_runtime_1.jsx)(react_1.ListItem, { className: "hover:bg-surface-container", borderRadius: "8px", px: "8px", onClick: () => {
                                                    onSendActionSensors(useActionSensors_1.ActionType.Download_Voice);
                                                    onDownload(chat.voiceUrl, `MyShell_chat_${(0, dayjs_1.default)().format('YY-MM-DD_HH:mm:ss')}_${botInfo?.name}.mp3`);
                                                }, children: (0, jsx_runtime_1.jsxs)(react_1.Button, { variant: "unstyled", display: "flex", alignItems: "center", isLoading: downloading, w: downloading ? 'full' : 'fit-content', children: [(0, jsx_runtime_1.jsx)(Download_1.default, { fontSize: "20px", className: "text-on-surface" }), (0, jsx_runtime_1.jsx)(react_1.Text, { ml: "8px", fontSize: "16px", lineHeight: "24px", fontWeight: "400", className: "text-on-surface", children: commonT('download_voice') })] }) }), (0, jsx_runtime_1.jsx)("hr", { className: "border-t-0 border-b border-default mb-1" })] })), chat.status !== enums_1.MessageStatusEnum.CANCELING && chat.status !== enums_1.MessageStatusEnum.CANCELED && ((0, jsx_runtime_1.jsx)(react_1.ListItem, { className: "hover:bg-surface-container", borderRadius: "8px", px: "8px", onClick: () => {
                                            setInputType('share');
                                            clearChatID();
                                            addChatID(`${chat.id}`);
                                            onPopoverclose();
                                            onSendActionSensors(useActionSensors_1.ActionType.Share);
                                        }, children: (0, jsx_runtime_1.jsxs)(react_1.Button, { variant: "unstyled", display: "flex", alignItems: "center", children: [(0, jsx_runtime_1.jsx)(Share_1.default, { fontSize: "20px", className: "text-on-surface" }), (0, jsx_runtime_1.jsx)(react_1.Text, { ml: "8px", fontSize: "16px", lineHeight: "24px", fontWeight: "400", className: "text-on-surface", children: t('share_chat_records') })] }) })), isVisitor === 2 &&
                                        (chat.status === enums_1.MessageStatusEnum.DONE || chat.status === enums_1.MessageStatusEnum.ERROR) && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("hr", { className: "border-t-0 border-b border-default mb-1" }), (0, jsx_runtime_1.jsx)(react_1.ListItem, { className: "hover:bg-surface-container", borderRadius: "8px", px: "8px", onClick: () => {
                                                    setInputType('delete');
                                                    clearDeleteChat();
                                                    addDeleteChat(chat);
                                                    onPopoverclose();
                                                    onSendActionSensors(useActionSensors_1.ActionType.Delete);
                                                }, children: (0, jsx_runtime_1.jsxs)(react_1.Button, { variant: "unstyled", display: "flex", alignItems: "center", children: [(0, jsx_runtime_1.jsx)(TrashIcon_1.default, { className: "w-[20px] text-[#EC2F0D]" }), (0, jsx_runtime_1.jsx)(react_1.Text, { ml: "8px", fontSize: "16px", lineHeight: "24px", fontWeight: "400", className: "text-[#EC2F0D]", children: commonT('delete') })] }) })] }))] }) }) })] }), (0, jsx_runtime_1.jsx)(MsgReportDialog_1.MsgReportDialog, { ref: dialogRef, onConfirm: val => {
                    sendFeedback(val);
                    onSendActionSensors(useActionSensors_1.ActionType.Feedback, {
                        feedback_detail: Object.keys((0, lodash_es_1.pickBy)(val.issues, value => value === true))
                    });
                }, handleClose: onPopoverclose, removeDislike: () => {
                    removeDislike();
                    onSendActionSensors(useActionSensors_1.ActionType.Remove_Dislike);
                }, children: (0, jsx_runtime_1.jsx)("span", {}) })] }));
}
