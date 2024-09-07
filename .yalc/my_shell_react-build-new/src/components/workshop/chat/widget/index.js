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
exports.default = WidgetChat;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const clsx_1 = __importDefault(require("clsx"));
const framer_motion_1 = require("framer-motion");
const next_intl_1 = require("next-intl");
const dynamic_1 = __importDefault(require("next/dynamic"));
const navigation_1 = require("next/navigation");
const react_2 = __importStar(require("react"));
const react_use_1 = require("react-use");
const workshop_1 = require("../../../../apis/workshop.js");
const energy_pack_1 = __importDefault(require("../../../../chat-new/views/message-list/components/energy-pack/index.js"));
const passcard_1 = __importDefault(require("../../../../chat-new/views/message-list/components/passcard/index.js"));
const context_1 = __importDefault(require("../../../../chat/layouts/context.js"));
const enums_1 = require("../../../../chat/model/enums.js");
const interfaces_1 = require("../../../../chat/model/interfaces.js");
const Questions_1 = __importDefault(require("../../../../chat/views/chat-body/recommandation-question/Questions.js"));
const QuestionsMobile_1 = __importDefault(require("../../../../chat/views/chat-body/recommandation-question/QuestionsMobile.js"));
const useDropFiles_1 = require("../../../../chat/views/editor/useDropFiles.js");
const useAudioQueue_1 = __importDefault(require("../../../../chat/views/hooks/useAudioQueue.js"));
const useScrollToBottom_1 = require("../../../../chat/views/hooks/useScrollToBottom.js");
const luiContext_1 = require("../../../../common/components/lui/luiContext.js");
const button_1 = require("../../../../common/components/ui/button.js");
const spinner_1 = __importDefault(require("../../../../common/components/ui/spinner.js"));
const eventTypes_1 = require("../../../../common/constants/enums/eventTypes.js");
const useDetectKeyboardOpen_1 = require("../../../../common/hooks/useDetectKeyboardOpen.js");
const useDownload_1 = __importDefault(require("../../../../common/hooks/useDownload.js"));
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
const EventEmitter_1 = __importDefault(require("../../../../common/utils/EventEmitter.js"));
const useScrollToBottomWidget_1 = require("../../../../hooks/workshop/chat/useScrollToBottomWidget.js");
const useWidgetChatError_1 = require("../../../../hooks/workshop/chat/useWidgetChatError.js");
const useWidgetTextMessageSender_1 = __importDefault(require("../../../../hooks/workshop/chat/useWidgetTextMessageSender.js"));
const store_1 = require("../../../../services/store/index.js");
const widgetChatIdbService_1 = __importDefault(require("../../../../services/widgetChatIdbService.js"));
const WidgetChatListRenderRow_1 = __importDefault(require("../WidgetChatListRenderRow.js"));
const WidgetErrorChatListRow_1 = __importDefault(require("../WidgetErrorChatListRow.js"));
const editor_1 = __importDefault(require("../editor/index.js"));
const WidgetTopActions_1 = __importDefault(require("./WidgetTopActions.js"));
const WidgetFormModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./WidgetFormModal.js'))), {
    loading: () => null,
    ssr: false
});
const LoginDialog = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../LoginDialog.js'))), {
    loading: () => null,
    ssr: false
});
const setHistoryFlag = (history) => history.map(his => ({ ...his, isFromHistory: true }));
const useIsBasicUser = (user, isVisitor) => {
    const [isBasicUser, setIsBasicUser] = (0, react_2.useState)(false);
    (0, react_2.useEffect)(() => {
        setIsBasicUser(isVisitor === 2 && user?.level === 1);
    }, [user, isVisitor]);
    return {
        isBasicUser
    };
};
function WidgetChat({ widgetInfo }) {
    const { editorContainerRef, editorAnchorRef, textareaRef, scrollLayoutToTop } = (0, react_2.useContext)(context_1.default);
    const isKeyboardOpen = (0, useDetectKeyboardOpen_1.useDetectKeyboardOpen)({});
    const widgetId = (0, react_2.useMemo)(() => {
        return widgetInfo?.id ?? '';
    }, [widgetInfo]);
    const token = (0, store_1.useUserStore)(state => state.token);
    const userId = (0, store_1.useUserStore)(state => state.userId);
    const energy = (0, store_1.useUserStore)(state => state.energy);
    const retriveEnergySuccess = (0, store_1.useUserStore)(state => state.retriveEnergySuccess);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const user = (0, store_1.useUserStore)(state => state.user);
    const clearAudioQueue = (0, store_1.useChatStore)(state => state.clearAudioQueue);
    const closeContextmenu = (0, store_1.useChatStore)(state => state.closeContextmenu);
    const openContextmenu = (0, store_1.useChatStore)(state => state.openContextmenu);
    const widgetStartJobIds = (0, store_1.useWorkshopStore)(state => state.widgetStartJobIds);
    const setWidgetStartJobIds = (0, store_1.useWorkshopStore)(state => state.setWidgetStartJobIds);
    const toggleImagePanelOpen = (0, store_1.useChatStore)(state => state.toggleImagePanelOpen);
    const imagePanelParams = (0, store_1.useChatStore)(state => state.imagePanelParams);
    const setCopyText = (0, store_1.useChatStore)(state => state.setCopyText);
    const errorMsgList = (0, store_1.useChatStore)(state => state.errorMsgList);
    const loginPopVisible = (0, store_1.useChatStore)(state => state.loginPopVisible);
    const setLoginPopVisible = (0, store_1.useChatStore)(state => state.setLoginPopVisible);
    const widgetClearAndAddHistoryRecords = (0, store_1.useWorkshopStore)(state => state.widgetClearAndAddHistoryRecords);
    const removeWidgetHistoryRecord = (0, store_1.useWorkshopStore)(state => state.removeWidgetHistoryRecord);
    const removeWidgetDeleteChat = (0, store_1.useWorkshopStore)(state => state.removeWidgetDeleteChat);
    const selectedWidgetDeleteChatList = (0, store_1.useWorkshopStore)(state => state.selectedWidgetDeleteChatList);
    const updateWidgetMessage = (0, store_1.useWorkshopStore)(state => state.updateWidgetMessage);
    const widgetAddHistoryRecord = (0, store_1.useWorkshopStore)(state => state.widgetAddHistoryRecord);
    const widgetInputType = (0, store_1.useWorkshopStore)(state => state.widgetInputType);
    const pollingWidgetChatMsg = (0, store_1.useWorkshopStore)(state => state.pollingWidgetChatMsg);
    const widgetStateMap = (0, store_1.useWorkshopStore)(state => state.widgetStateMap);
    const addWidgetDeleteChat = (0, store_1.useWorkshopStore)(state => state.addWidgetDeleteChat);
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const { isMobile, locale } = (0, usePathLocale_1.usePathLocale)();
    const router = (0, navigation_1.useRouter)();
    const widgetUploadFiles = (0, store_1.useWorkshopStore)(state => state.widgetUploadFiles);
    const [showInput, setShowInput] = (0, react_2.useState)(false);
    const [isFullScreen, setFullScreen] = (0, react_2.useState)(false);
    const widgetChatList = (0, react_2.useMemo)(() => {
        return widgetStateMap[widgetInfo.id]?.chatList ?? [];
    }, [widgetStateMap, widgetInfo.id]);
    const widgetLastMessage = (0, react_2.useMemo)(() => {
        return widgetChatList.at(-1);
    }, [widgetChatList]);
    const widgetLastValidReplyMessage = (0, react_2.useMemo)(() => {
        return widgetChatList.reduceRight((lastDone, message) => {
            return (lastDone ||
                (message.type === enums_1.MessageTypeEnum.REPLY && message.status === enums_1.MessageStatusEnum.DONE ? message : null));
        }, null);
    }, []);
    const allowTextInput = widgetLastValidReplyMessage?.inputSetting?.canInputText ?? true;
    const allowAudioInput = widgetLastValidReplyMessage?.inputSetting?.canInputAudio ?? true;
    const onFileChange = async (files) => {
        scrollLayoutToTop?.();
        const res = await (0, useDropFiles_1.processWidgetUploadFiles)(widgetId, files);
        widgetUploadFiles(widgetId, res);
    };
    const { getRootProps } = (0, useDropFiles_1.useWidgetDropFiles)({
        noDrag: false,
        noClick: true,
        onFileChange,
        imPanelChatConfig: widgetInfo?.imPanelChatConfig || {},
        from: 'chat-container',
        widgetId
    });
    const t = (0, next_intl_1.useTranslations)('chat');
    const { downloading, onDownload } = (0, useDownload_1.default)();
    const [gettingHistory, setGettingHistory] = (0, react_2.useState)(false);
    const [retriving, setRetriving] = (0, react_2.useState)(false);
    const chatListRef = (0, react_2.useRef)({ len: 0, firstId: '0', loading: false, scrollPosition: 0 });
    const setWidgetSending = (0, store_1.useWorkshopStore)(state => state.setWidgetSending);
    (0, react_2.useMemo)(() => {
        chatListRef.current.len = widgetChatList.length;
        chatListRef.current.firstId = widgetChatList.length > 0 ? widgetChatList[0].id : '0';
        chatListRef.current.loading = gettingHistory;
    }, [widgetChatList.length, gettingHistory]);
    const isEnoughEnergy = (0, react_2.useMemo)(() => {
        if (retriveEnergySuccess) {
            return energy >= (widgetInfo?.energyPerChat ?? 1);
        }
        return !retriveEnergySuccess;
    }, [retriveEnergySuccess, energy, widgetInfo?.energyPerChat]);
    (0, useAudioQueue_1.default)();
    const polling = (0, react_2.useCallback)((data) => {
        const polling = async (chat, intervalId, jobId) => {
            const res = await pollingWidgetChatMsg(chat);
            if (res) {
                clearInterval(intervalId);
                setWidgetStartJobIds(jobId);
            }
        };
        if (Array.isArray(data) && data.length > 0) {
            for (const chat of data) {
                const { imageGenMessageResponse, status, asyncJobInfo } = chat;
                const { genStatus, jobId } = imageGenMessageResponse || {};
                const delay = status === enums_1.MessageStatusEnum.DONE && genStatus === interfaces_1.ImageStatus.PROCESSING && !!jobId ? 2 : null;
                const componentDelay = asyncJobInfo?.jobId &&
                    asyncJobInfo?.status !== enums_1.ModelStatusEnum.EMBED_OBJ_STATUS_DONE &&
                    asyncJobInfo?.status !== enums_1.ModelStatusEnum.EMBED_OBJ_STATUS_ERROR
                    ? 2
                    : null;
                if (componentDelay && widgetStartJobIds.includes(asyncJobInfo?.jobId) === false) {
                    setWidgetSending(true);
                    const intervalId = setInterval(() => {
                        setWidgetStartJobIds(asyncJobInfo?.jobId, true);
                        polling(chat, intervalId, asyncJobInfo?.jobId);
                    }, componentDelay * 1000);
                }
                else if (delay && widgetStartJobIds.includes(jobId) === false) {
                    const intervalId = setInterval(() => {
                        setWidgetStartJobIds(jobId, true);
                        polling(chat, intervalId, jobId);
                    }, delay * 1000);
                }
            }
        }
    }, []);
    const retriveData = async (pageSize) => {
        return (0, workshop_1.listWidgetChatHistory)(widgetId, '0', pageSize);
    };
    const getStoredHistory = async () => {
        if (userId) {
            return widgetChatIdbService_1.default.getChat(userId, widgetId);
        }
        return null;
    };
    const getHistoryMesagesWhenFirstLoad = async (tryAgainCount, pageSize) => {
        try {
            setRetriving(true);
            let localChatHistory = await getStoredHistory();
            localChatHistory = localChatHistory && setHistoryFlag(localChatHistory);
            if (!localChatHistory ||
                localChatHistory.length === 0 ||
                localChatHistory.some(chat => chat.status !== enums_1.MessageStatusEnum.DONE && chat.status !== enums_1.MessageStatusEnum.ERROR)) {
                await getChatHistoryFromRemote(pageSize, true);
            }
            else {
                widgetAddHistoryRecord(localChatHistory);
                const remoteData = await retriveData(pageSize);
                scrollContext.hasMoreRef.current = remoteData.data.data.length >= pageSize;
                polling(remoteData.data.data);
                const compData = setHistoryFlag(remoteData.data.data);
                widgetClearAndAddHistoryRecords(widgetId, compData || []);
            }
        }
        catch (e) {
            if (tryAgainCount >= 1) {
                await getHistoryMesagesWhenFirstLoad(tryAgainCount - 1, pageSize);
            }
        }
        finally {
            setRetriving(false);
        }
    };
    const getChatHistoryFromRemote = (0, react_2.useCallback)(async (pageSize = useScrollToBottom_1.CHAT_PAGE_SIZE, firstLoad = false) => {
        if (!firstLoad) {
            setGettingHistory(true);
        }
        const res = await (0, workshop_1.listWidgetChatHistory)(widgetId, !firstLoad && chatListRef.current.len > 0 ? chatListRef.current.firstId : '0', pageSize);
        if (!firstLoad) {
            setGettingHistory(false);
        }
        if (res.success) {
            scrollContext.hasMoreRef.current = res.data.data.length >= pageSize;
            polling(res.data.data);
            const chatHistory = setHistoryFlag(res.data.data);
            widgetAddHistoryRecord(chatHistory);
        }
    }, []);
    const scrollContext = (0, useScrollToBottomWidget_1.useScrollToBottomWidget)({
        getHistory: getChatHistoryFromRemote,
        chatList: widgetChatList,
        chatListRef
    });
    const { isBasicUser } = useIsBasicUser(user, isVisitor);
    const { firstWidgetErrorList, widgetErrorChatRecord } = (0, useWidgetChatError_1.useWidgetChatError)({ widgetId, userId });
    (0, react_2.useEffect)(() => {
        if (!!token && !isEnoughEnergy) {
            scrollContext.scrollToBottom();
        }
    }, [!!token && isEnoughEnergy, scrollContext.scrollToBottom]);
    (0, react_2.useEffect)(() => {
        if (isVisitor === 0)
            return;
        if (!(widgetStateMap[widgetId]?.chatList ?? []).length) {
            const pageSize = scrollContext.getFirstRenderMessagesSize();
            getHistoryMesagesWhenFirstLoad(1, pageSize);
        }
        else {
            const compData = setHistoryFlag(widgetStateMap[widgetId]?.chatList ?? []);
            widgetAddHistoryRecord(compData);
        }
    }, [isVisitor, userId]);
    (0, react_use_1.useEffectOnce)(() => {
        clearAudioQueue();
    });
    (0, react_2.useEffect)(() => {
        const cb = () => {
            scrollContext.autoScrollRef.current = true;
            scrollContext.setAutoScroll(true);
        };
        EventEmitter_1.default.subscribe(eventTypes_1.EventTypes.DELETE_WIDGET_MEMORY, cb);
        return () => {
            EventEmitter_1.default.unSubscribe(eventTypes_1.EventTypes.DELETE_WIDGET_MEMORY);
        };
    }, [scrollContext.setAutoScroll]);
    const onSend = (0, react_2.useCallback)((flag) => {
        if (flag) {
            scrollContext.prevScrollFlagRef.current = scrollContext.scrollFlagRef.current;
            scrollContext.scrollFlagRef.current = 2;
        }
        scrollContext.autoScrollRef.current = true;
        scrollContext.setAutoScroll(true);
    }, [scrollContext.setAutoScroll]);
    const scrollToBottom = (0, react_2.useCallback)(async () => {
        scrollContext.autoScrollRef.current = true;
        scrollContext.setAutoScroll(true);
        scrollContext.scrollToBottom();
    }, [scrollContext.setAutoScroll, scrollContext.scrollToBottom]);
    const len = widgetChatList.length;
    const clickPositionYRef = (0, react_2.useRef)(0);
    const isShareOrDelete = widgetInputType === 'delete';
    const loginUserNoEnoughEnergy = !!token && !isEnoughEnergy;
    const [showBottomRecommendation, setShowBottomRecommendation] = (0, react_2.useState)(false);
    (0, react_2.useEffect)(() => {
        if (scrollContext.disToBottom <= 0 && !showBottomRecommendation) {
            setShowBottomRecommendation(true);
            scrollContext.setAutoScroll(true);
        }
        else if (scrollContext.disToBottom > 76 * 2 + 10 && showBottomRecommendation) {
            setShowBottomRecommendation(false);
        }
    }, [scrollContext.disToBottom, showBottomRecommendation]);
    const hasEnoughEnergy = (0, react_2.useMemo)(() => {
        if (retriveEnergySuccess) {
            return energy >= (widgetInfo?.energyPerChat ?? 1);
        }
        return !retriveEnergySuccess;
    }, [retriveEnergySuccess, energy, widgetInfo?.energyPerChat]);
    const { sendTextMessage } = (0, useWidgetTextMessageSender_1.default)(widgetInfo);
    const handlePick = (question) => {
        sendTextMessage({
            retryText: question
        });
    };
    const handleLUIButtonInteraction = async (actionType, buttonId, msgId, text, componentInputMessage, imSlashCommandInput, callback, errorCb, closeCb) => {
        sendTextMessage({
            retryText: text,
            requestData: {
                isButtonInteraction: true,
                text,
                imSlashCommandInput,
                messageType: 'BUTTON_INTEACTION',
                buttonId,
                interactionMsgId: msgId,
                componentInputMessage: actionType === enums_1.MessageComponentsButtonActionTypeEnum.POP_UP_FORM ? componentInputMessage : undefined
            },
            callback,
            errorCb,
            closeCb
        });
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { ...getRootProps(), className: "chat-container flex flex-col md:rounded-b-3xl overflow-hidden bg-surface-default w-full", style: {
                    height: isMobile ? '100%' : 'calc(100% - 108px)'
                }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full grow relative pr-1 md:pr-2", children: [!isMobile && (0, jsx_runtime_1.jsx)(WidgetTopActions_1.default, { widgetInfo: widgetInfo }), (0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full overflow-hidden flex flex-col flex-nowrap bg-transparent relative", children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('flex flex-col items-center grow overflow-y-auto overscroll-contain relative select-none md:select-auto z-10', {
                                            'chat-mask': scrollContext.canScrollRef.current
                                        }), ref: scrollContext.scrollRef, id: "containerRef", onScroll: e => scrollContext.onChatBodyScroll(e.currentTarget), onWheel: e => {
                                            scrollContext.setAutoScroll(false);
                                            scrollContext.autoScrollRef.current = false;
                                            if (scrollContext.scrollFlagRef.current === 2) {
                                                scrollContext.prevScrollFlagRef.current = scrollContext.scrollFlagRef.current;
                                            }
                                            scrollContext.scrollFlagRef.current = 1;
                                        }, onTouchStart: () => {
                                            if (scrollContext.scrollFlagRef.current === 2) {
                                                scrollContext.prevScrollFlagRef.current = scrollContext.scrollFlagRef.current;
                                            }
                                            scrollContext.scrollFlagRef.current = 1;
                                            scrollContext.autoScrollRef.current = false;
                                            scrollContext.setAutoScroll(false);
                                        }, children: [gettingHistory && (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand absolute", size: "md" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative w-full py-3 md:mt-4 px-2 text-xs md:text-base", children: [(0, jsx_runtime_1.jsx)("div", { ref: scrollContext.topSentryRef, className: "h-[10px] w-full" }), (0, jsx_runtime_1.jsxs)("ul", { id: "message_box", ref: scrollContext.messageBoxRef, className: "absolute top-0 left-0 right-0 px-4 md:px-6 overflow-x-hidden min-h-[400px]", children: [firstWidgetErrorList.length > 0 &&
                                                                firstWidgetErrorList.map((eItem) => ((0, jsx_runtime_1.jsx)(WidgetErrorChatListRow_1.default, { chat: eItem, widgetInfo: widgetInfo, msg: errorMsgList?.[eItem.id] }, `firstErrorChat${eItem.id}`))), len > 0 &&
                                                                widgetChatList.map((item, i) => {
                                                                    const errList = widgetErrorChatRecord.filter((eItem) => eItem.prevId === item.id);
                                                                    return ((0, jsx_runtime_1.jsxs)(react_2.default.Fragment, { children: [(0, jsx_runtime_1.jsx)("li", { className: (0, clsx_1.default)('flex items-baseline space-x-4 relative last:animate-slideIn', isShareOrDelete && 'pr-10', i === 0 && 'md:pt-12', `chatId-${item.id}`), children: (0, jsx_runtime_1.jsx)(luiContext_1.LUIButtonInteractionContext.Provider, { value: {
                                                                                        clickFn: handleLUIButtonInteraction,
                                                                                        msgId: item.id
                                                                                    }, children: (0, jsx_runtime_1.jsx)(WidgetChatListRenderRow_1.default, { chat: item, downloading: downloading, onDownload: onDownload, widgetInfo: widgetInfo, latest: i === len - 1, user: user, inputType: widgetInputType, removeHistoryRecord: removeWidgetHistoryRecord, openContextmenu: openContextmenu, closeContextmenu: closeContextmenu, clickPositionYRef: clickPositionYRef, setCopyText: setCopyText, addDeleteChat: addWidgetDeleteChat, removeDeleteChat: removeWidgetDeleteChat, selectedDeleteChatList: selectedWidgetDeleteChatList, isMobile: isMobile, scrollToBottom: scrollToBottom, updateMessage: updateWidgetMessage, toggleImagePanelOpen: toggleImagePanelOpen }) }) }), errList.length > 0 &&
                                                                                errList.map((eItem) => ((0, jsx_runtime_1.jsx)(WidgetErrorChatListRow_1.default, { chat: eItem, widgetInfo: widgetInfo, msg: errorMsgList?.[eItem.id] }, `errorChat${eItem.id}`)))] }, item.id || item.localId));
                                                                }), loginUserNoEnoughEnergy && isBasicUser && ((0, jsx_runtime_1.jsx)("li", { className: "last:animate-slideIn", children: (0, jsx_runtime_1.jsx)(passcard_1.default, {}) })), loginUserNoEnoughEnergy && !isBasicUser && ((0, jsx_runtime_1.jsx)("li", { className: "last:animate-slideIn", children: (0, jsx_runtime_1.jsx)(energy_pack_1.default, {}) })), isVisitor === 1 && !widgetInfo.visitorCanChat && ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("div", { className: "last:animate-slideIn", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3 items-center justify-between px-4 py-3 bg-surface-accent-yellow-subtlest rounded-2xl text-warning-bolder border border-icon-warning mt-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: t('forbidden_gpt4_open') }), (0, jsx_runtime_1.jsx)("div", {}), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", color: "warning", size: isMobile ? 'md' : 'sm', onClick: () => {
                                                                                    toggleLoginModal(true);
                                                                                }, children: t('login_register') })] }) }) })), (0, jsx_runtime_1.jsx)("li", { ref: scrollContext.bottomSentryRef, className: "h-[22px] w-full" }), (0, jsx_runtime_1.jsx)("li", { className: "flex justify-center", children: retriving && scrollContext.canScrollRef.current && ((0, jsx_runtime_1.jsx)(react_1.Center, { py: "20px", className: "absolute bottom-0", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand", size: "md" }) })) })] })] }), retriving && !scrollContext.canScrollRef.current && ((0, jsx_runtime_1.jsx)(react_1.Center, { py: "20px", className: "absolute bottom-0", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand", size: "md" }) }))] }), (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { children: showBottomRecommendation &&
                                            !!widgetLastMessage &&
                                            !!widgetLastMessage.recommendationQuestion &&
                                            !!widgetLastMessage.recommendationQuestion.question.length &&
                                            !(widgetErrorChatRecord ?? []).some((e) => Number(e.prevId) >= Number(widgetLastMessage.id)) &&
                                            !showInput && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: isMobile ? ((0, jsx_runtime_1.jsx)(QuestionsMobile_1.default, { questions: widgetLastMessage.recommendationQuestion.question, hasEnoughEnergy: hasEnoughEnergy, handlePick: handlePick, disableClick: !allowTextInput })) : ((0, jsx_runtime_1.jsx)(Questions_1.default, { questions: widgetLastMessage.recommendationQuestion.question, hasEnoughEnergy: hasEnoughEnergy, handlePick: handlePick, disableClick: !allowTextInput })) })) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "shrink-0", ref: editorAnchorRef, children: (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('z-20 bg-surface-default md:rounded-b-3xl overflow-hidden w-full h-fit shrink-0 top-0 left-0'), ref: editorContainerRef, children: (0, jsx_runtime_1.jsx)(editor_1.default, { onSend: onSend, toggleImagePanelOpen: toggleImagePanelOpen, isMobile: isMobile, widgetInfo: widgetInfo, showInput: showInput, setShowInput: setShowInput, allowTextInput: allowTextInput, allowAudioInput: allowAudioInput, textInputRef: textareaRef, isFullScreen: isFullScreen, setFullScreen: setFullScreen }) }) })] }), loginPopVisible && (0, jsx_runtime_1.jsx)(LoginDialog, { open: loginPopVisible, onGo2Login: () => setLoginPopVisible(false) }), imagePanelParams?.visible && ((0, jsx_runtime_1.jsx)(WidgetFormModal, { imagePanelParams: imagePanelParams, setOpen: toggleImagePanelOpen, scrollToBottom: scrollToBottom, isMobile: isMobile, widgetInfo: widgetInfo }))] }));
}
