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
const AdjustmentsHorizontalIcon_1 = __importDefault(require("@heroicons/react/24/outline/AdjustmentsHorizontalIcon"));
const clsx_1 = __importDefault(require("clsx"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const react_error_boundary_1 = require("react-error-boundary");
const react_use_1 = require("react-use");
const bot_1 = require("../../../apis/bot.js");
const common_1 = require("../../../apis/common.js");
const enums_1 = require("../../../chat/model/enums.js");
const useActionSensors_1 = __importStar(require("../../../chat/views/hooks/useActionSensors.js"));
const Trans_1 = __importDefault(require("../../../common/components/icons/Trans.js"));
const avatar_1 = require("../../../common/components/ui/avatar.js");
const button_1 = require("../../../common/components/ui/button.js");
const eventTypes_1 = require("../../../common/constants/enums/eventTypes.js");
const useMoreMenuEvent_1 = require("../../../common/hooks/useMoreMenuEvent.js");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const EventEmitter_1 = __importDefault(require("../../../common/utils/EventEmitter.js"));
const useClearMemory_1 = __importDefault(require("../../../hooks/bot/useClearMemory.js"));
const store_1 = require("../../../services/store/index.js");
const VoiceCallEndTip_1 = __importDefault(require("./VoiceCallEndTip.js"));
const ImgVideoPreview_1 = __importDefault(require("./file-display/img-video/preview/ImgVideoPreview.js"));
const ComponentReplyMessage_1 = __importDefault(require("./reply-message/ComponentReplyMessage.js"));
const ImageReplyMessage_1 = __importDefault(require("./reply-message/ImageReplyMessage.js"));
const ReplyMessage_1 = __importDefault(require("./reply-message/ReplyMessage.js"));
const TextMessage_1 = __importDefault(require("./text-message/TextMessage.js"));
const VoiceMessage_1 = __importDefault(require("./voice-message/VoiceMessage.js"));
const LoginTip = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./LoginTip.js'))), {
    ssr: false
});
const PopupMenu = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./popup-menu/PopupMenu.js'))), {
    loading: () => null,
    ssr: false
});
const ImagePopupMenu = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./popup-menu/ImagePopupMenu.js'))), {
    loading: () => null,
    ssr: false
});
const MsgReport = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./msg-report/MsgReport.js'))), {
    loading: () => null,
    ssr: false
});
const hStyle = {
    base: 'full',
    md: 'calc(100% - 80px)'
};
function Fallback() {
    return null;
}
function ChatListRenderRow(props) {
    const { downloading, onDownload, chat, botId, selectedBot, user, inputType, removeHistoryRecord, openContextmenu, closeContextmenu, clickPositionYRef, setCopyText, addChatID, removeChatID, sharedChatIDList, addDeleteChat, removeDeleteChat, selectedDeleteChatList, isMobile, botChatSetting, scrollToBottom, updateMessage, toggleImagePanelOpen } = props;
    const isMiddle = (0, react_use_1.useMedia)('(max-width: 768px)');
    const t = (0, next_intl_1.useTranslations)('chat');
    const [viewModalVisible, setViewModalVisible] = (0, react_2.useState)(false);
    const [xImage, setXImage] = (0, react_2.useState)('');
    const [previewImage, setPreviewImage] = (0, react_2.useState)();
    const [isOpenImagePopMen, setIsOpenImagePopMen] = (0, react_2.useState)(false);
    const clearMemory = (0, useClearMemory_1.default)(selectedBot);
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
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const startDisabled = (isVisitor == 1 && selectedBot?.visitorCanChat == false) || sending;
    const { pathname } = (0, usePathLocale_1.usePathLocale)();
    const { onSendActionSensors } = (0, useActionSensors_1.default)();
    const [showUserMessageActions, setShowUserMessageActions] = (0, react_2.useState)(false);
    const handleChatUIDChecked = (e) => {
        if (e.target.checked) {
            addChatID(`${chat.id}`);
        }
        else {
            removeChatID(`${chat.id}`);
        }
    };
    const handleDeleteChatUidChecked = (e) => {
        if (e.target.checked) {
            addDeleteChat(chat);
        }
        else {
            removeDeleteChat(chat);
        }
    };
    const markMessageAsHandled = async (message) => {
        try {
            const { success } = await (0, bot_1.setMessageHandled)(message.id);
            if (success) {
                removeHistoryRecord(message);
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    const removeAndClearMemory = async (message) => {
        try {
            const { success } = await (0, bot_1.setMessageHandled)(message.id);
            if (success) {
                removeHistoryRecord(message);
                clearMemory();
            }
        }
        catch (e) {
            console.error(e);
        }
    };
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
    const handleContextMenu = (0, react_2.useCallback)((event) => {
        event.preventDefault();
        showContextMenu.current = false;
        setIsOpenImagePopMen(false);
        const isImage = event?.target?.tagName?.toUpperCase() === 'IMG';
        if (isMobile && (event.type === 'contextmenu' || isImage) && !selectedBot?.isImageGenerator) {
            return;
        }
        if (isImage) {
            const xImageData = JSON.stringify({
                url: event?.target?.getAttribute('src'),
                ...JSON.parse(event?.target?.getAttribute('x-image-data') || '{}'),
                naturalHeight: event.target.naturalHeight,
                naturalWidth: event.target.naturalWidth
            });
            const eventImageData = JSON.stringify({
                url: event?.target?.getAttribute('src'),
                naturalHeight: event.target.naturalHeight,
                naturalWidth: event.target.naturalWidth
            });
            const imageData = xImageData || eventImageData;
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
        console.log('message render error ---------');
        console.error(error, info);
        console.log(JSON.stringify(error));
        console.log(JSON.stringify(info));
        console.log('message render error end ---------');
    }, []);
    const handleOpenSetting = () => {
        toggleImagePanelOpen({ visible: true, msgId: chat.id, componentInput: chat?.asyncJobInfo?.componentInput });
    };
    const showProfile = () => {
        const type = isMobile ? eventTypes_1.EventTypes.SHOW_BOT_MODAL : eventTypes_1.EventTypes.SHOW_BOT_POPUP;
        EventEmitter_1.default.dispatch(type, {});
    };
    const isPanelImageBot = selectedBot?.isPanelImageBot;
    const handleReEdit = () => {
        const needToBeRemovedMsg = [chat];
        if (chat.userSentMsg) {
            needToBeRemovedMsg.push(chat.userSentMsg);
        }
        removeHistoryRecord(needToBeRemovedMsg);
        setInputType('text');
        setTextInput(botId, chat.text);
        setReEditTriggerred(true);
    };
    const toggleTranslate = () => {
        setIsTranslated(prev => !prev);
        const type = `translate-${chat.id}`;
        EventEmitter_1.default.dispatch(type, { id: chat.id });
        onSendActionSensors(useActionSensors_1.ActionType.Translate);
    };
    const onCloseImagePopMenu = () => {
        setIsOpenImagePopMen(false);
        setXImage('');
    };
    (0, react_2.useEffect)(() => {
        return () => {
            setInputType('text');
        };
    }, []);
    return ((0, jsx_runtime_1.jsxs)(react_error_boundary_1.ErrorBoundary, { FallbackComponent: Fallback, onError: logErrorToService, children: [showMsg && not_reply_greeting && !isPanelImageBot && ((0, jsx_runtime_1.jsx)("div", { className: "w-full flex justify-end md:space-x-2 my-2 group/menu", children: (0, jsx_runtime_1.jsxs)("div", { ref: targetBox, id: chat.id, className: "relative flex justify-end mt-8 w-fit max-w-full md:max-w-[87%] 2xl:max-w-[80%]", ...moreMenuEvents, onMouseEnter: () => setShowUserMessageActions(true), onMouseLeave: () => setShowUserMessageActions(false), children: [showHoverMenu && ((0, jsx_runtime_1.jsx)("div", { className: "absolute hidden z-[9] h-10 justify-end items-center group-hover/menu:flex mr-2 left-0 -translate-x-[125%]", children: (0, jsx_runtime_1.jsx)(PopupMenu, { chat: chat, isOpen: !showContextMenu.current && isOpen, onClose: handleClose, onToggle: onToggle, left: 0, top: 0, downloading: downloading, onDownload: onDownload, isNeedButton: true, latest: props.latest, botChatSetting: botChatSetting, isMobile: isMobile, showContextMenu: showContextMenu, botInfo: selectedBot }, `${chat.id}1`) })), showContextMenu.current && ((0, jsx_runtime_1.jsx)(PopupMenu, { chat: chat, isOpen: showContextMenu.current && isOpen, onClose: handleClose, onToggle: onToggle, left: showContextMenu.current ? menuPosition[0] : 0, top: showContextMenu.current ? menuPosition[1] : 0, downloading: downloading, onDownload: onDownload, isNeedButton: false, latest: props.latest, botChatSetting: botChatSetting, isMobile: isMobile, showContextMenu: showContextMenu, botInfo: selectedBot }, `${chat.id}2`)), (chat.type === enums_1.MessageTypeEnum.TEXT ||
                            chat.type === enums_1.MessageTypeEnum.VOICE_CALL_TEXT ||
                            chat.type === enums_1.MessageTypeEnum.BUTTON_INTERACTION) && ((0, jsx_runtime_1.jsx)(TextMessage_1.default, { chat: chat, isMobile: isMobile, showUserMessageActions: showUserMessageActions })), (chat.type === enums_1.MessageTypeEnum.VOICE || chat.type === enums_1.MessageTypeEnum.VOICE_CALL_VOICE) && ((0, jsx_runtime_1.jsx)(VoiceMessage_1.default, { chat: chat, blobDuration: chat.duration, botInfo: selectedBot })), (0, jsx_runtime_1.jsx)(ImagePopupMenu, { xImage: xImage, isOpen: isOpenImagePopMen, onClose: onCloseImagePopMenu, menuPosition: menuPosition, isProconfigMd: !selectedBot?.isImageBot && !!botChatSetting?.isTranscriptionOn && !!chat?.text?.length, children: (0, jsx_runtime_1.jsx)("div", {}) })] }) })), showMsg && !not_reply_greeting && ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex justify-start md:space-x-2 pr-0 group/menu", children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { src: selectedBot?.logoUrl, onClick: showProfile, className: "w-8 h-8 mt-8 hidden md:block rounded-lg" }, selectedBot?.logoUrl), (0, jsx_runtime_1.jsxs)("div", { ref: targetBox, id: chat.id, className: (0, clsx_1.default)('relative flex mt-8 w-fit max-w-full md:max-w-[87%] xl:max-w-[69%] 2xl:max-w-[75%]', inputType === 'share' || inputType === 'delete' ? '' : 'md:mr-10', selectedBot?.isImageBot ? 'max-w-10/12' : 'max-w-4/5', chat.componentContainer ? 'w-full' : 'w-fit'), ...moreMenuEvents, children: [chat.asyncJobInfo?.jobId ? ((0, jsx_runtime_1.jsx)(ComponentReplyMessage_1.default, { chat: chat, onChangeCopyText: setCopyText, selectedBot: selectedBot, latest: props.latest, botChatSetting: botChatSetting, toggleImagePanelOpen: handleOpenSetting })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!selectedBot?.isImageBot && ((0, jsx_runtime_1.jsx)(ReplyMessage_1.default, { chat: chat, onChangeCopyText: setCopyText, selectedBot: selectedBot, latest: props.latest, botChatSetting: botChatSetting })), selectedBot?.isImageBot && ((0, jsx_runtime_1.jsx)(ImageReplyMessage_1.default, { chat: chat, onChangeCopyText: setCopyText, selectedBot: selectedBot, latest: props.latest, botChatSetting: botChatSetting, isMobile: isMobile, scrollToBottom: scrollToBottom }))] })), !isMobile && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute z-[1] h-10 -right-2 hidden group-hover/menu:flex gap-x-2 translate-x-[100%]", children: [(0, jsx_runtime_1.jsx)(MsgReport, { chat: chat, updateMessage: updateMessage }), botChatSetting?.isTranslationOn && !isPanelImageBot && ((0, jsx_runtime_1.jsx)("button", { className: "justify-center items-center p-1.5  w-8 h-8 rounded-lg border border-default bg-surface hover:bg-surface-container-low hidden 2xl:flex", onClick: toggleTranslate, children: (0, jsx_runtime_1.jsx)(Trans_1.default, { fillColor: isTranslated ? 'var(--primary)' : 'var(--on-surface)', className: "text-on-surface w-5 h-5" }) })), isPanelImageBot && !startDisabled && chat.type !== enums_1.MessageTypeEnum.GREETING && ((0, jsx_runtime_1.jsx)("button", { className: "justify-center items-center p-1.5  w-8 h-8 rounded-lg border border-default bg-surface hover:bg-surface-container-low hidden 2xl:flex", onClick: handleOpenSetting, children: (0, jsx_runtime_1.jsx)(AdjustmentsHorizontalIcon_1.default, { className: "text-on-surface w-5 h-5" }) })), !isChatDriving && ((0, jsx_runtime_1.jsx)(PopupMenu, { chat: chat, isOpen: !showContextMenu.current && isOpen, onClose: handleClose, onToggle: onToggle, downloading: downloading, onDownload: onDownload, isNeedButton: true, latest: props.latest, botChatSetting: botChatSetting, isMobile: isMobile, isReply: true, showAll: true, toggleImagePanelOpen: isPanelImageBot ? handleOpenSetting : undefined, left: "100%", top: 0, showContextMenu: showContextMenu, botInfo: selectedBot }, `${chat.id}4`))] })), showContextMenu.current && !isChatDriving && ((0, jsx_runtime_1.jsx)(PopupMenu, { chat: chat, isOpen: isOpen, onClose: handleClose, onToggle: onToggle, downloading: downloading, onDownload: onDownload, isNeedButton: false, latest: props.latest, botChatSetting: botChatSetting, isMobile: isMobile, showTranslate: isMobile, isReply: true, showAll: true, toggleImagePanelOpen: isPanelImageBot ? handleOpenSetting : undefined, left: showContextMenu.current ? menuPosition[0] : '100%', top: showContextMenu.current ? menuPosition[1] : 0, showContextMenu: showContextMenu, botInfo: selectedBot }, `${chat.id}5`)), (0, jsx_runtime_1.jsx)(ImagePopupMenu, { xImage: xImage, isOpen: isOpenImagePopMen, onClose: onCloseImagePopMenu, menuPosition: menuPosition, isProconfigMd: !selectedBot?.isImageBot && !!botChatSetting?.isTranscriptionOn && !!chat?.text?.length, children: (0, jsx_runtime_1.jsx)("span", {}) })] })] })), showMsg &&
                inputType === 'share' &&
                (chat.type === enums_1.MessageTypeEnum.TEXT ||
                    chat.type === enums_1.MessageTypeEnum.VOICE ||
                    chat.type === enums_1.MessageTypeEnum.REPLY ||
                    chat.type === enums_1.MessageTypeEnum.GREETING ||
                    chat.type === enums_1.MessageTypeEnum.VOICE_CALL_TEXT ||
                    chat.type === enums_1.MessageTypeEnum.VOICE_CALL_VOICE ||
                    chat.type === enums_1.MessageTypeEnum.VOICE_CALL_REPLY) &&
                chat.status !== enums_1.MessageStatusEnum.CANCELING &&
                chat.status !== enums_1.MessageStatusEnum.CANCELED && ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('w-8 h-8 ml-0 flex justify-center items-center absolute right-0', chat.type !== enums_1.MessageTypeEnum.REPLY ? 'mt-[28px]' : 'mt-[42px]', not_reply_greeting && isPanelImageBot ? 'hidden' : ''), children: (0, jsx_runtime_1.jsx)(react_1.Checkbox, { className: "chat-checkbox", size: "lg", variant: "circular", value: "1", defaultChecked: sharedChatIDList.some(e => e === `${chat.id}`), onChange: handleChatUIDChecked }) })), inputType === 'delete' &&
                (chat.status === enums_1.MessageStatusEnum.DONE || chat.status === enums_1.MessageStatusEnum.ERROR) && ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)(`w-8 h-8 ml-0 flex justify-center items-center absolute right-0 `, chat.type !== enums_1.MessageTypeEnum.REPLY ? 'mt-[28px] ' : 'mt-42px] ', not_reply_greeting && isPanelImageBot ? 'hidden' : ''), children: (0, jsx_runtime_1.jsx)(react_1.Checkbox, { className: "chat-checkbox", size: "lg", variant: "circular", isChecked: selectedDeleteChatList.some(c => c.id === chat.id), onChange: handleDeleteChatUidChecked }) })), !showMsg && ((0, jsx_runtime_1.jsx)(react_1.Center, { flexGrow: 1, className: "my-4", children: (0, jsx_runtime_1.jsxs)(react_1.Box, { w: hStyle, children: [chat.type === enums_1.MessageTypeEnum.RESET && ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('w-full text-[14px] leading-[20px] font-[400] text-on-surfaces dark:text-secondary text-center'), children: t('memory_cleared_tip') })), chat.type === enums_1.MessageTypeEnum.LLM_MODERATION_REQUEST && ((0, jsx_runtime_1.jsxs)("div", { className: "w-full px-4 py-3 bg-surface-accent-yellow-subtlest border border-icon-warning rounded-2xl text-warning-bolder flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3 md:items-center", children: [(0, jsx_runtime_1.jsx)("p", { children: t('re_edit.desc') }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", color: "warning", size: isMiddle ? 'md' : 'sm', onClick: handleReEdit, children: t('re_edit.btn_text') })] })), chat.type === enums_1.MessageTypeEnum.PROMPT_UPDATED && !chat.handled && ((0, jsx_runtime_1.jsxs)("div", { className: "w-full px-4 py-3 bg-surface-accent-yellow-subtlest border border-icon-warning rounded-2xl text-warning-bolder flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3 md:items-center", children: [(0, jsx_runtime_1.jsx)("p", { className: "grow", children: t('prompt_updated_tip') }), (0, jsx_runtime_1.jsxs)("div", { className: "shrink-0 flex space-x-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", color: "warning", size: "md", onClick: handleRemove, children: t('clear') }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", color: "warning", size: "md", onClick: handleMarked, children: t('ignore') })] })] })), chat.type === enums_1.MessageTypeEnum.NEED_TO_REGISTER && (0, jsx_runtime_1.jsx)(LoginTip, {}), chat.type === enums_1.MessageTypeEnum.VOICE_CALL_END && (0, jsx_runtime_1.jsx)(VoiceCallEndTip_1.default, { duration: chat.text })] }) })), (0, jsx_runtime_1.jsx)(ImgVideoPreview_1.default, { open: viewModalVisible && !!previewImage, onClose: () => {
                    setViewModalVisible(false);
                }, imgVideoList: previewImage ? [previewImage] : [], activeIndex: 0 })] }));
}
exports.default = (0, react_2.memo)(ChatListRenderRow, (prevProps, nextProps) => {
    const objKeys = Object.keys(prevProps);
    return objKeys.every(k => prevProps[k] == nextProps[k]);
});
