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
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const dynamic_1 = __importDefault(require("next/dynamic"));
const react_2 = require("react");
const react_error_boundary_1 = require("react-error-boundary");
const common_1 = require("../../../apis/common.js");
const enums_1 = require("../../../chat/model/enums.js");
const VoiceCallEndTip_1 = __importDefault(require("../../../chat/views/chat-body/VoiceCallEndTip.js"));
const ImgVideoPreview_1 = __importDefault(require("../../../chat/views/chat-body/file-display/img-video/preview/ImgVideoPreview.js"));
const TextMessage_1 = __importDefault(require("../../../chat/views/chat-body/text-message/TextMessage.js"));
const VoiceMessage_1 = __importDefault(require("../../../chat/views/chat-body/voice-message/VoiceMessage.js"));
const avatar_1 = require("../../../common/components/ui/avatar.js");
const eventTypes_1 = require("../../../common/constants/enums/eventTypes.js");
const workshop_1 = require("../../../common/constants/enums/workshop.js");
const useMoreMenuEvent_1 = require("../../../common/hooks/useMoreMenuEvent.js");
const EventEmitter_1 = __importDefault(require("../../../common/utils/EventEmitter.js"));
const common_helper_1 = require("../../../common/utils/common-helper.js");
const usePromptWidgetAction_1 = __importDefault(require("../../../hooks/workshop/chat/usePromptWidgetAction.js"));
const store_1 = require("../../../services/store/index.js");
const WidgetComponentReplyMessage_1 = __importDefault(require("./WidgetComponentReplyMessage.js"));
const WidgetReplyMessage_1 = __importDefault(require("./WidgetReplyMessage.js"));
const ImagePopupMenu = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../chat/views/chat-body/popup-menu/ImagePopupMenu.js'))), {
    loading: () => null,
    ssr: false
});
const PopupMenu = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./WidgetPopupMenu.js'))), {
    loading: () => null,
    ssr: false
});
const MsgReport = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./WidgetMsgReport.js'))), {
    loading: () => null,
    ssr: false
});
const hStyle = {
    base: 'full',
    md: 'calc(100% - 80px)'
};
const buttonHStyle = {
    base: '28px',
    md: '36px'
};
function Fallback() {
    return null;
}
function WidgetChatListRenderRow(props) {
    const { downloading, onDownload, chat, widgetInfo, user, inputType, removeHistoryRecord, openContextmenu, closeContextmenu, clickPositionYRef, setCopyText, addDeleteChat, removeDeleteChat, selectedDeleteChatList, isMobile, scrollToBottom, updateMessage, toggleImagePanelOpen } = props;
    const widgetId = (0, react_2.useMemo)(() => {
        return widgetInfo?.id ?? '';
    }, [widgetInfo?.id]);
    const t = (0, next_intl_1.useTranslations)('chat');
    const workshopT = (0, next_intl_1.useTranslations)('workshop');
    const [viewModalVisible, setViewModalVisible] = (0, react_2.useState)(false);
    const [xImage, setXImage] = (0, react_2.useState)('');
    const [previewImage, setPreviewImage] = (0, react_2.useState)();
    const [isOpenImagePopMen, setIsOpenImagePopMen] = (0, react_2.useState)(false);
    const targetBox = (0, react_2.useRef)(null);
    const showContextMenu = (0, react_2.useRef)(false);
    const setTextInput = (0, store_1.useChatStore)(state => state.setTextInput);
    const setInputType = (0, store_1.useChatStore)(state => state.setInputType);
    const sending = (0, store_1.useChatStore)(state => state.sending);
    const setReEditTriggerred = (0, store_1.useChatStore)(state => state.setReEditTriggerred);
    const { isOpen, onToggle, onClose, onOpen } = (0, react_1.useDisclosure)();
    const [isTranslated, setIsTranslated] = (0, react_2.useState)(false);
    const [menuPosition, setMenuPosition] = (0, react_2.useState)([0, 0]);
    const isChatDriving = (0, store_1.useChatStore)(state => state.isChatDriving);
    const { acting, promptAction } = (0, usePromptWidgetAction_1.default)(widgetInfo);
    const handleView = () => {
        promptAction({
            type: 'view'
        });
    };
    const handleUnlock = () => {
        promptAction({
            type: 'unlock'
        });
    };
    const handleDeleteChatUidChecked = (e) => {
        if (e.target.checked) {
            addDeleteChat(chat);
        }
        else {
            removeDeleteChat(chat);
        }
    };
    const markMessageAsHandled = (message) => {
    };
    const removeAndClearMemory = (message) => {
    };
    const handleContextMenu = (0, react_2.useCallback)((event) => {
        event.preventDefault();
        showContextMenu.current = false;
        setIsOpenImagePopMen(false);
        const isImage = event?.target?.tagName?.toUpperCase() === 'IMG';
        if (isMobile && (event.type === 'contextmenu' || isImage)) {
            return;
        }
        if (isImage) {
            const imageData = event?.target?.getAttribute('x-image-data') ||
                JSON.stringify({
                    url: event?.target?.getAttribute('src')
                });
            if (targetBox.current) {
                const msgBox = targetBox.current.getBoundingClientRect();
                setMenuPosition([event.clientX + 16 - msgBox.left, Math.floor(event.clientY - msgBox.top)]);
            }
            setIsOpenImagePopMen(true);
            setXImage(imageData);
            return;
        }
        let e = event;
        if (isMobile) {
            e = e.touches[0];
        }
        const menuHeight = 300;
        clickPositionYRef.current = e.clientY - menuHeight / 2;
        if (targetBox.current) {
            const msgBox = targetBox.current.getBoundingClientRect();
            setMenuPosition([e.clientX + 16 - msgBox.left, Math.floor(e.clientY - msgBox.top)]);
            showContextMenu.current = true;
            openContextmenu();
            onToggle();
        }
    }, [chat, openContextmenu, onToggle, isMobile]);
    const onDomClick = (0, react_2.useCallback)((event) => {
        if (event?.target?.tagName?.toUpperCase() === 'IMG' && event?.target?.getAttribute('x-intercept-click') === '1') {
            setPreviewImage({
                url: event?.target?.getAttribute('src'),
                title: event?.target?.getAttribute('alt'),
                type: common_1.EmbedObjType.IMAGE,
                status: common_1.EmbedObjStatus.DONE,
                extensionName: '',
                iconUrl: ''
            });
            setViewModalVisible(true);
        }
    }, []);
    const handleClose = () => {
        showContextMenu.current = false;
        closeContextmenu();
        setMenuPosition([0, 0]);
        onClose();
    };
    const { moreMenuEvents, moreMenuVisible } = (0, useMoreMenuEvent_1.useMoreMenuEvent)(e => {
        handleContextMenu(e);
    }, () => {
        closeContextmenu();
    });
    (0, react_2.useEffect)(() => {
        if (!downloading) {
            onClose();
        }
    }, [downloading, onClose]);
    (0, react_2.useEffect)(() => {
        const targetBoxEl = targetBox.current;
        targetBoxEl?.addEventListener('contextmenu', handleContextMenu);
        targetBoxEl?.addEventListener('click', onDomClick);
        return () => {
            targetBoxEl?.removeEventListener('contextmenu', handleContextMenu);
            targetBoxEl?.removeEventListener('click', onDomClick);
        };
    }, [handleContextMenu, onDomClick]);
    const showMsg = (0, react_2.useMemo)(() => {
        return (chat.type !== enums_1.MessageTypeEnum.RESET &&
            chat.type !== enums_1.MessageTypeEnum.PROMPT_UPDATED &&
            chat.type !== enums_1.MessageTypeEnum.WIDGET_PROMPT_UPDATED &&
            chat.type !== enums_1.MessageTypeEnum.MORE_BOT_TO_EXPLORE &&
            chat.type !== enums_1.MessageTypeEnum.NEED_TO_REGISTER &&
            chat.type !== enums_1.MessageTypeEnum.VOICE_CALL_END);
    }, [chat.type]);
    const not_reply_greeting = (0, react_2.useMemo)(() => {
        return (chat.type !== enums_1.MessageTypeEnum.REPLY &&
            chat.type !== enums_1.MessageTypeEnum.VOICE_CALL_REPLY &&
            chat.type !== enums_1.MessageTypeEnum.GREETING);
    }, [chat.type]);
    const showHoverMenu = (0, react_2.useMemo)(() => {
        return (chat.type === enums_1.MessageTypeEnum.TEXT ||
            chat.type === enums_1.MessageTypeEnum.VOICE ||
            chat.type === enums_1.MessageTypeEnum.VOICE_CALL_TEXT ||
            chat.type === enums_1.MessageTypeEnum.VOICE_CALL_VOICE);
    }, [chat.type]);
    const showAvatar = (0, react_2.useMemo)(() => {
        return (chat.type === enums_1.MessageTypeEnum.TEXT ||
            chat.type === enums_1.MessageTypeEnum.VOICE ||
            chat.type === enums_1.MessageTypeEnum.VOICE_CALL_TEXT ||
            chat.type === enums_1.MessageTypeEnum.VOICE_CALL_VOICE);
    }, [chat.type]);
    const handleMarked = (0, react_2.useCallback)(() => {
        markMessageAsHandled(chat);
    }, [chat]);
    const handleRemove = (0, react_2.useCallback)(() => {
        removeAndClearMemory(chat);
    }, [chat]);
    const logErrorToService = (0, react_2.useCallback)((error, info) => {
        console.error(error, info);
    }, []);
    const handleOpenSetting = () => {
        toggleImagePanelOpen({ visible: true, msgId: chat.id, componentInput: chat?.asyncJobInfo?.componentInput });
    };
    const showProfile = () => {
        const type = isMobile ? eventTypes_1.EventTypes.SHOW_WIDGET_MODAL : eventTypes_1.EventTypes.SHOW_WIDGET_POPUP;
        EventEmitter_1.default.dispatch(type, {});
    };
    const msgWidth = chat.voiceUrl || chat.status === enums_1.MessageStatusEnum.PROCESSING;
    const isPanelImageBot = widgetInfo?.chatPanelType === workshop_1.ChatPanelTypeEnum.BOT_CHAT_PANEL_TYPE_COMPONENT;
    const handleReEdit = () => {
        const needToBeRemovedMsg = [chat];
        if (chat.userSentMsg) {
            needToBeRemovedMsg.push(chat.userSentMsg);
        }
        removeHistoryRecord(needToBeRemovedMsg);
        setInputType('text');
        setTextInput(widgetId, chat.text);
        setReEditTriggerred(true);
    };
    const onCloseImagePopMenu = () => {
        setIsOpenImagePopMen(false);
        setXImage('');
    };
    return ((0, jsx_runtime_1.jsxs)(react_error_boundary_1.ErrorBoundary, { FallbackComponent: Fallback, onError: logErrorToService, children: [showMsg && not_reply_greeting && !isPanelImageBot && ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex justify-end md:space-x-2 my-2 group/menu", children: [(0, jsx_runtime_1.jsxs)("div", { ref: targetBox, id: chat.id, className: "relative flex justify-end mt-8 w-fit max-w-full md:max-w-[87%] 2xl:max-w-[80%]", ...moreMenuEvents, children: [showHoverMenu && ((0, jsx_runtime_1.jsx)("div", { className: "absolute hidden z-[9] h-10 justify-end items-center group-hover/menu:flex mr-2 left-0 -translate-x-[125%]", children: (0, jsx_runtime_1.jsx)(PopupMenu, { widgetInfo: widgetInfo, chat: chat, isOpen: !showContextMenu.current && isOpen, onClose: handleClose, onToggle: onToggle, left: 0, top: 0, downloading: downloading, onDownload: onDownload, isNeedButton: true, latest: props.latest, isMobile: isMobile, showContextMenu: showContextMenu, showTranslate: false }, `${chat.id}1`) })), showContextMenu.current && ((0, jsx_runtime_1.jsx)(PopupMenu, { widgetInfo: widgetInfo, chat: chat, isOpen: showContextMenu.current && isOpen, onClose: handleClose, onToggle: onToggle, left: showContextMenu.current ? menuPosition[0] : 0, top: showContextMenu.current ? menuPosition[1] : 0, downloading: downloading, onDownload: onDownload, isNeedButton: false, latest: props.latest, isMobile: isMobile, showContextMenu: showContextMenu, showTranslate: false }, `${chat.id}2`)), (chat.type === enums_1.MessageTypeEnum.TEXT ||
                                chat.type === enums_1.MessageTypeEnum.VOICE_CALL_TEXT ||
                                chat.type === enums_1.MessageTypeEnum.BUTTON_INTERACTION) && (0, jsx_runtime_1.jsx)(TextMessage_1.default, { chat: chat, isMobile: isMobile }), (chat.type === enums_1.MessageTypeEnum.VOICE || chat.type === enums_1.MessageTypeEnum.VOICE_CALL_VOICE) && ((0, jsx_runtime_1.jsx)(VoiceMessage_1.default, { chat: chat, blobDuration: chat.duration })), xImage ? ((0, jsx_runtime_1.jsx)(ImagePopupMenu, { xImage: xImage, isOpen: isOpenImagePopMen, onClose: onCloseImagePopMenu, menuPosition: menuPosition, children: (0, jsx_runtime_1.jsx)("div", {}) })) : null] }), showAvatar && ((0, jsx_runtime_1.jsx)(avatar_1.Avatar, { src: (0, common_helper_1.getAssetsUrl)(user?.avatar), className: "w-9 h-9 mt-9 hidden md:block rounded-lg" }, user?.avatar))] })), showMsg && !not_reply_greeting && ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex justify-start md:space-x-2 pr-0 group/menu", children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { src: widgetInfo?.logoUrl, onClick: showProfile, className: "w-9 h-9 mt-9 hidden md:block rounded-lg" }, widgetInfo?.logoUrl), (0, jsx_runtime_1.jsxs)("div", { ref: targetBox, id: chat.id, className: (0, clsx_1.default)('relative flex mt-8 w-fit max-w-full md:max-w-[87%] xl:max-w-[69%] 2xl:max-w-[75%]', inputType === 'share' || inputType === 'delete' ? '' : 'md:mr-10', chat.componentContainer ? 'w-full' : 'w-fit'), ...moreMenuEvents, children: [chat.asyncJobInfo?.jobId ? ((0, jsx_runtime_1.jsx)(WidgetComponentReplyMessage_1.default, { chat: chat, onChangeCopyText: setCopyText, widgetInfo: widgetInfo, latest: props.latest, toggleImagePanelOpen: handleOpenSetting })) : ((0, jsx_runtime_1.jsx)(WidgetReplyMessage_1.default, { chat: chat, onChangeCopyText: setCopyText, latest: props.latest, widgetInfo: widgetInfo })), !isMobile && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute z-[1] h-10 -right-2 hidden group-hover/menu:flex gap-x-2 translate-x-[100%]", children: [(0, jsx_runtime_1.jsx)(MsgReport, { chat: chat, updateMessage: updateMessage }), !isChatDriving && ((0, jsx_runtime_1.jsx)(PopupMenu, { widgetInfo: widgetInfo, chat: chat, isOpen: !showContextMenu.current && isOpen, onClose: handleClose, onToggle: onToggle, downloading: downloading, onDownload: onDownload, isNeedButton: true, latest: props.latest, isMobile: isMobile, isReply: true, showAll: true, toggleImagePanelOpen: isPanelImageBot ? handleOpenSetting : undefined, left: "100%", top: 0, showContextMenu: showContextMenu, showTranslate: false }, `${chat.id}4`))] })), showContextMenu.current && !isChatDriving && ((0, jsx_runtime_1.jsx)(PopupMenu, { widgetInfo: widgetInfo, chat: chat, isOpen: isOpen, onClose: handleClose, onToggle: onToggle, downloading: downloading, onDownload: onDownload, isNeedButton: false, latest: props.latest, isMobile: isMobile, showTranslate: false, isReply: true, showAll: true, toggleImagePanelOpen: isPanelImageBot ? handleOpenSetting : undefined, left: showContextMenu.current ? menuPosition[0] : '100%', top: showContextMenu.current ? menuPosition[1] : 0, showContextMenu: showContextMenu }, `${chat.id}5`)), xImage ? ((0, jsx_runtime_1.jsx)(ImagePopupMenu, { xImage: xImage, isOpen: isOpenImagePopMen, onClose: onCloseImagePopMenu, menuPosition: menuPosition, children: (0, jsx_runtime_1.jsx)("span", {}) })) : null] })] })), inputType === 'delete' &&
                (chat.status === enums_1.MessageStatusEnum.DONE || chat.status === enums_1.MessageStatusEnum.ERROR) && ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)(`w-8 h-8 ml-0 flex justify-center items-center absolute right-0 `, chat.type !== enums_1.MessageTypeEnum.REPLY ? 'mt-[28px] ' : 'mt-42px] ', not_reply_greeting && isPanelImageBot ? 'hidden' : ''), children: (0, jsx_runtime_1.jsx)(react_1.Checkbox, { className: "chat-checkbox", size: "lg", variant: "circular", isChecked: selectedDeleteChatList.some(c => c.id === chat.id), onChange: handleDeleteChatUidChecked }) })), !showMsg && ((0, jsx_runtime_1.jsx)(react_1.Center, { flexGrow: 1, className: "my-4", children: (0, jsx_runtime_1.jsxs)(react_1.Box, { w: hStyle, children: [chat.type === enums_1.MessageTypeEnum.RESET && ((0, jsx_runtime_1.jsx)("div", { className: "w-full text-[14px] leading-[20px] font-[400] text-on-surfaces dark:text-secondary text-center", children: t('memory_cleared_tip') })), chat.type === enums_1.MessageTypeEnum.LLM_MODERATION_REQUEST && ((0, jsx_runtime_1.jsxs)("div", { className: "w-full p-[10px] bg-[#FFF5E2] dark:bg-[#332C25] border border-[#E1B878] rounded-2xl text-[#1F1F1F] dark:text-white flex flex-col md:flex-row md:justify-between space-y-[10px] md:space-y-0 md:items-center", children: [(0, jsx_runtime_1.jsx)(react_1.Text, { children: t('re_edit.desc') }), (0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", bgColor: "#E8A900", className: "bg-[#E8A900]", color: "#fff", h: buttonHStyle, minW: "69px", px: 4, display: "flex", justifyContent: "center", fontSize: "14px", lineHeight: "20px", rounded: "full", boxShadow: "0px -1px 0px 0px rgba(0, 0, 0, 0.2) inset;0px 1px 0px 0px rgba(0, 0, 0, 0.08);", onClick: handleReEdit, children: t('re_edit.btn_text') })] })), chat.type === enums_1.MessageTypeEnum.PROMPT_UPDATED && !chat.handled && ((0, jsx_runtime_1.jsxs)("div", { className: "w-full p-[10px] bg-[#FFF5E2] dark:bg-[#332C25] border border-[#E1B878] rounded-2xl text-[#1F1F1F] dark:text-white flex flex-col md:flex-row space-y-[10px] md:items-center", children: [(0, jsx_runtime_1.jsx)(react_1.Text, { children: t('prompt_updated_tip') }), (0, jsx_runtime_1.jsxs)(react_1.Flex, { gap: "10px", children: [(0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", bgColor: "#E8A900", className: "bg-[#E8A900]", color: "#fff", h: buttonHStyle, minW: "69px", display: "flex", justifyContent: "center", fontSize: "14px", lineHeight: "20px", rounded: "full", boxShadow: "0px -1px 0px 0px rgba(0, 0, 0, 0.2) inset;0px 1px 0px 0px rgba(0, 0, 0, 0.08);", onClick: handleRemove, children: t('clear') }), (0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", color: "#E8A900", h: buttonHStyle, minW: "69px", display: "flex", justifyContent: "center", fontSize: "14px", lineHeight: "20px", rounded: "full", border: "1px solid #E8A900", onClick: handleMarked, children: t('ignore') })] })] })), chat.type === enums_1.MessageTypeEnum.WIDGET_PROMPT_UPDATED && ((0, jsx_runtime_1.jsxs)("div", { className: "w-full p-[10px] bg-[#FFF5E2] dark:bg-[#332C25] border border-[#E1B878] rounded-2xl text-[#1F1F1F] dark:text-white flex flex-col md:flex-row md:justify-between space-y-[10px] md:space-y-0 md:items-center", children: [(0, jsx_runtime_1.jsx)(react_1.Text, { children: workshopT('widget_prompt_update_tip') }), (0, jsx_runtime_1.jsx)("div", { children: widgetInfo?.hasUnlocked ? ((0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", bgColor: "#E8A900", className: "bg-[#E8A900] data-[loading]:bg-[#E8A900] data-[loading]:hover:bg-[#E8A900]", color: "#fff", h: buttonHStyle, minW: "69px", display: "flex", justifyContent: "center", fontSize: "14px", lineHeight: "20px", rounded: "full", boxShadow: "0px -1px 0px 0px rgba(0, 0, 0, 0.2) inset;0px 1px 0px 0px rgba(0, 0, 0, 0.08);", onClick: handleView, isLoading: acting, children: workshopT('widget_prompt_update_btn_text') })) : ((0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", color: "#E8A900", h: buttonHStyle, minW: "69px", px: "12px", display: "flex", justifyContent: "center", fontSize: "14px", lineHeight: "20px", rounded: "full", border: "1px solid #E8A900", onClick: handleUnlock, isLoading: acting, children: workshopT('unlock_prompt') })) })] })), chat.type === enums_1.MessageTypeEnum.VOICE_CALL_END && (0, jsx_runtime_1.jsx)(VoiceCallEndTip_1.default, { duration: chat.text })] }) })), viewModalVisible && previewImage && ((0, jsx_runtime_1.jsx)(ImgVideoPreview_1.default, { open: viewModalVisible, onClose: () => {
                    setViewModalVisible(false);
                }, imgVideoList: [previewImage], activeIndex: 0 }))] }));
}
exports.default = (0, react_2.memo)(WidgetChatListRenderRow, (prevProps, nextProps) => {
    const objKeys = Object.keys(prevProps);
    return objKeys.every(k => prevProps[k] == nextProps[k]);
});
