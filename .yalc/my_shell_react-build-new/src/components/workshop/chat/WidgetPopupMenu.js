"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WidgetPopupMenu;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const AdjustmentsHorizontalIcon_1 = __importDefault(require("@heroicons/react/24/outline/AdjustmentsHorizontalIcon"));
const DocumentDuplicateIcon_1 = __importDefault(require("@heroicons/react/24/outline/DocumentDuplicateIcon"));
const TrashIcon_1 = __importDefault(require("@heroicons/react/24/outline/TrashIcon"));
const EllipsisVerticalIcon_1 = __importDefault(require("@heroicons/react/24/solid/EllipsisVerticalIcon"));
const clsx_1 = __importDefault(require("clsx"));
const dayjs_1 = __importDefault(require("dayjs"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const enums_1 = require("../../../chat/model/enums.js");
const MsgReportDialog_1 = require("../../../chat/views/chat-body/msg-report/MsgReportDialog.js");
const Download_1 = __importDefault(require("../../../common/components/icons/workshop/tts/Download.js"));
const useCopyClipboard_1 = __importDefault(require("../../../common/hooks/useCopyClipboard.js"));
const EventEmitter_1 = __importDefault(require("../../../common/utils/EventEmitter.js"));
const useWidgetFeedback_1 = require("../../../hooks/workshop/chat/useWidgetFeedback.js");
const store_1 = require("../../../services/store/index.js");
function WidgetPopupMenu({ widgetInfo, chat, latest, isOpen, onClose, onToggle, downloading, onDownload, left, top, isNeedButton, isMobile, toggleImagePanelOpen, showTranslate, isReply, showContextMenu, showAll }) {
    const t = (0, next_intl_1.useTranslations)('chat');
    const commonT = (0, next_intl_1.useTranslations)('common');
    const setWidgetInputType = (0, store_1.useWorkshopStore)(state => state.setWidgetInputType);
    const copyText = (0, store_1.useChatStore)(state => state.copyText);
    const updateWidgetMessage = (0, store_1.useWorkshopStore)(state => state.updateWidgetMessage);
    const addWidgetDeleteChat = (0, store_1.useWorkshopStore)(state => state.addWidgetDeleteChat);
    const clearWidgetDeleteChat = (0, store_1.useWorkshopStore)(state => state.clearWidgetDeleteChat);
    const widgetSending = (0, store_1.useWorkshopStore)(state => state.widgetSending);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const startDisabled = widgetSending;
    const clickMoreRef = (0, react_2.useRef)(false);
    const { onCopy } = (0, useCopyClipboard_1.default)(chat.text);
    const canCopy = chat?.text && chat?.text.length > 0;
    const { resetFeedbackState, handleReportMsg, reportT, sendFeedback, handleDislike, chatT, dialogRef, feedbackTxt, feedbackState, removeDislike } = (0, useWidgetFeedback_1.useWidgetFeedback)({
        chat,
        updateWidgetMessage,
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
                        }, children: (0, jsx_runtime_1.jsx)(react_1.PopoverBody, { className: "bg-surface", p: "8px", children: (0, jsx_runtime_1.jsxs)(react_1.List, { children: [canCopy && ((0, jsx_runtime_1.jsx)(react_1.ListItem, { className: "hover:bg-surface-container", borderRadius: "8px", px: "8px", onClick: () => {
                                            handleCopy();
                                        }, children: (0, jsx_runtime_1.jsxs)(react_1.Button, { variant: "unstyled", display: "flex", alignItems: "center", children: [(0, jsx_runtime_1.jsx)(DocumentDuplicateIcon_1.default, { className: "w-[20px] text-on-surface" }), (0, jsx_runtime_1.jsx)(react_1.Text, { ml: "8px", fontSize: "16px", lineHeight: "24px", fontWeight: "400", className: "text-on-surface", children: commonT('copy_message') })] }) })), toggleImagePanelOpen && !startDisabled && chat.type !== enums_1.MessageTypeEnum.GREETING && ((0, jsx_runtime_1.jsx)(react_1.ListItem, { className: (0, clsx_1.default)('hover:bg-surface-container', { '2xl:hidden': isReply && !showAll }), borderRadius: "8px", px: "8px", onClick: () => {
                                            handleOpenPanel();
                                        }, children: (0, jsx_runtime_1.jsxs)(react_1.Button, { variant: "unstyled", display: "flex", alignItems: "center", children: [(0, jsx_runtime_1.jsx)(AdjustmentsHorizontalIcon_1.default, { className: "w-[20px] text-on-surface" }), (0, jsx_runtime_1.jsx)(react_1.Text, { ml: "8px", fontSize: "16px", lineHeight: "24px", fontWeight: "400", className: "text-on-surface", children: t('panel.parameters') })] }) })), chat.voiceUrl && ((0, jsx_runtime_1.jsx)(react_1.ListItem, { className: "hover:bg-surface-container", borderRadius: "8px", px: "8px", onClick: () => {
                                            onDownload(chat.voiceUrl, `MyShell_chat_${(0, dayjs_1.default)().format('YY-MM-DD_HH:mm:ss')}_${widgetInfo?.name}.mp3`);
                                        }, children: (0, jsx_runtime_1.jsxs)(react_1.Button, { variant: "unstyled", display: "flex", alignItems: "center", isLoading: downloading, w: downloading ? 'full' : 'fit-content', children: [(0, jsx_runtime_1.jsx)(Download_1.default, { fontSize: "20px", className: "text-on-surface" }), (0, jsx_runtime_1.jsx)(react_1.Text, { ml: "8px", fontSize: "16px", lineHeight: "24px", fontWeight: "400", className: "text-on-surface", children: commonT('download_voice') })] }) })), isVisitor === 2 &&
                                        (chat.status === enums_1.MessageStatusEnum.DONE || chat.status === enums_1.MessageStatusEnum.ERROR) && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("hr", { className: "border-t-0 border-b border-default mb-1" }), (0, jsx_runtime_1.jsx)(react_1.ListItem, { className: "hover:bg-surface-container", borderRadius: "8px", px: "8px", onClick: () => {
                                                    setWidgetInputType('delete');
                                                    clearWidgetDeleteChat();
                                                    addWidgetDeleteChat(chat);
                                                    onPopoverclose();
                                                }, children: (0, jsx_runtime_1.jsxs)(react_1.Button, { variant: "unstyled", display: "flex", alignItems: "center", children: [(0, jsx_runtime_1.jsx)(TrashIcon_1.default, { className: "w-[20px] text-[#EC2F0D]" }), (0, jsx_runtime_1.jsx)(react_1.Text, { ml: "8px", fontSize: "16px", lineHeight: "24px", fontWeight: "400", className: "text-[#EC2F0D]", children: commonT('delete') })] }) })] }))] }) }) })] }), (0, jsx_runtime_1.jsx)(MsgReportDialog_1.MsgReportDialog, { ref: dialogRef, onConfirm: val => sendFeedback(val), handleClose: onPopoverclose, removeDislike: removeDislike, children: (0, jsx_runtime_1.jsx)("span", {}) })] }));
}
