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
exports.default = BotChat;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const clsx_1 = __importDefault(require("clsx"));
const framer_motion_1 = require("framer-motion");
const lodash_es_1 = require("lodash-es");
const next_intl_1 = require("next-intl");
const dynamic_1 = __importDefault(require("next/dynamic"));
const navigation_1 = require("next/navigation");
const react_2 = __importStar(require("react"));
const react_use_1 = require("react-use");
const context_1 = __importDefault(require("../../../../chat/layouts/context.js"));
const api_1 = require("../../../../chat/model/api.js");
const chatIdbService_1 = __importDefault(require("../../../../chat/model/chatIdbService.js"));
const enums_1 = require("../../../../chat/model/enums.js");
const interfaces_1 = require("../../../../chat/model/interfaces.js");
const ChatListRenderRow_1 = __importDefault(require("../../../../chat/views/chat-body/ChatListRenderRow.js"));
const ErrorChatListRow_1 = __importDefault(require("../../../../chat/views/chat-body/ErrorChatListRow.js"));
const Questions_1 = __importDefault(require("../../../../chat/views/chat-body/recommandation-question/Questions.js"));
const QuestionsMobile_1 = __importDefault(require("../../../../chat/views/chat-body/recommandation-question/QuestionsMobile.js"));
const RunningInfo_1 = require("../../../../chat/views/chat-body/reply-message/RunningInfo.js");
const editor_1 = __importDefault(require("../../../../chat/views/editor/index.js"));
const useDropFiles_1 = require("../../../../chat/views/editor/useDropFiles.js");
const useAudioQueue_1 = __importDefault(require("../../../../chat/views/hooks/useAudioQueue.js"));
const useChatError_1 = require("../../../../chat/views/hooks/useChatError.js");
const energy_pack_1 = __importDefault(require("../../../../chat-new/views/message-list/components/energy-pack/index.js"));
const passcard_1 = __importDefault(require("../../../../chat-new/views/message-list/components/passcard/index.js"));
const useScrollToBottom_1 = require("../../../../chat/views/hooks/useScrollToBottom.js");
const useTextMessageSender_1 = __importDefault(require("../../../../chat/views/hooks/useTextMessageSender.js"));
const useUnReadMsg_1 = require("../../../../chat/views/hooks/useUnReadMsg.js");
const luiContext_1 = require("../../../../common/components/lui/luiContext.js");
const button_1 = require("../../../../common/components/ui/button.js");
const spinner_1 = __importDefault(require("../../../../common/components/ui/spinner.js"));
const eventTypes_1 = require("../../../../common/constants/enums/eventTypes.js");
const useCheckEnergyPack_1 = __importDefault(require("../../../../common/hooks/useCheckEnergyPack.js"));
const useDownload_1 = __importDefault(require("../../../../common/hooks/useDownload.js"));
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
const EventEmitter_1 = __importDefault(require("../../../../common/utils/EventEmitter.js"));
const sensors_1 = require("../../../../lib/sensors/index.js");
const store_1 = require("../../../../services/store/index.js");
const MyBotTopActions_1 = __importDefault(require("./MyBotTopActions.js"));
const FormModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../../chat/views/chat-body/replicate/FormModal.js'))), {
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
function BotChat({ botInfo }) {
    const { editorContainerRef, editorAnchorRef, textareaRef, scrollLayoutToTop } = (0, react_2.useContext)(context_1.default);
    const botId = botInfo.id;
    const token = (0, store_1.useUserStore)(state => state.token);
    const userId = (0, store_1.useUserStore)(state => state.userId);
    const energy = (0, store_1.useUserStore)(state => state.energy);
    const retriveEnergySuccess = (0, store_1.useUserStore)(state => state.retriveEnergySuccess);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const user = (0, store_1.useUserStore)(state => state.user);
    const addHistoryRecord = (0, store_1.useChatStore)(state => state.addHistoryRecord);
    const errorMsgList = (0, store_1.useChatStore)(state => state.errorMsgList);
    const multiBotMap = (0, store_1.useChatStore)(state => state.multiBotMap);
    const clearAudioQueue = (0, store_1.useChatStore)(state => state.clearAudioQueue);
    const clearChatID = (0, store_1.useChatStore)(state => state.clearChatID);
    const isOpenContextmenu = (0, store_1.useChatStore)(state => state.isOpenContextmenu);
    const closeContextmenu = (0, store_1.useChatStore)(state => state.closeContextmenu);
    const openContextmenu = (0, store_1.useChatStore)(state => state.openContextmenu);
    const loginPopVisible = (0, store_1.useChatStore)(state => state.loginPopVisible);
    const setLoginPopVisible = (0, store_1.useChatStore)(state => state.setLoginPopVisible);
    const inputType = (0, store_1.useChatStore)(state => state.inputType);
    const pollingChatMsg = (0, store_1.useChatStore)(state => state.pollingChatMsg);
    const startJobIds = (0, store_1.useChatStore)(state => state.startJobIds);
    const setStartJobIds = (0, store_1.useChatStore)(state => state.setStartJobIds);
    const toggleImagePanelOpen = (0, store_1.useChatStore)(state => state.toggleImagePanelOpen);
    const imagePanelParams = (0, store_1.useChatStore)(state => state.imagePanelParams);
    const updateMessage = (0, store_1.useChatStore)(state => state.updateMessage);
    const removeHistoryRecord = (0, store_1.useChatStore)(state => state.removeHistoryRecord);
    const setCopyText = (0, store_1.useChatStore)(state => state.setCopyText);
    const addChatID = (0, store_1.useChatStore)(state => state.addChatID);
    const removeChatID = (0, store_1.useChatStore)(state => state.removeChatID);
    const sharedChatIDList = (0, store_1.useChatStore)(state => state.sharedChatIDList);
    const addDeleteChat = (0, store_1.useChatStore)(state => state.addDeleteChat);
    const removeDeleteChat = (0, store_1.useChatStore)(state => state.removeDeleteChat);
    const selectedDeleteChatList = (0, store_1.useChatStore)(state => state.selectedDeleteChatList);
    const clearAndAddHistoryRecords = (0, store_1.useChatStore)(state => state.clearAndAddHistoryRecords);
    const botChatSettingMap = (0, store_1.useBotStore)(state => state.botChatSettingMap);
    const [showInput, setShowInput] = (0, react_2.useState)(false);
    const [isFullScreen, setFullScreen] = (0, react_2.useState)(false);
    const botChatSetting = (0, react_2.useMemo)(() => {
        return botChatSettingMap.get(botId) ?? store_1.defaultChatSetting;
    }, [botChatSettingMap, botId]);
    const chatList = (0, react_2.useMemo)(() => {
        return multiBotMap[botId]?.chatList ?? [];
    }, [multiBotMap, botId]);
    const botLastMessage = (0, react_2.useMemo)(() => {
        return chatList.length ? chatList[chatList.length - 1] : undefined;
    }, [chatList]);
    const networkError = (0, react_2.useMemo)(() => {
        return multiBotMap[botId]?.networkError ?? false;
    }, [multiBotMap, botId]);
    const lastValidReplyMessage = chatList.reduceRight((lastDone, message) => {
        return (lastDone ||
            ([enums_1.MessageTypeEnum.REPLY, enums_1.MessageTypeEnum.GREETING].includes(message.type) &&
                message.status === enums_1.MessageStatusEnum.DONE
                ? message
                : null));
    }, null);
    const allowTextInput = lastValidReplyMessage?.inputSetting?.canInputText ?? true;
    const allowAudioInput = lastValidReplyMessage?.inputSetting?.canInputAudio ?? true;
    const { isMobile, locale } = (0, usePathLocale_1.usePathLocale)();
    const router = (0, navigation_1.useRouter)();
    const uploadFiles = (0, store_1.useChatStore)(state => state.uploadFiles);
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const onFileChange = async (files) => {
        scrollLayoutToTop?.();
        const res = await (0, useDropFiles_1.processUploadFiles)(botId, files);
        uploadFiles(botId, res);
    };
    const { getRootProps } = (0, useDropFiles_1.useDropFiles)({
        noDrag: false,
        noClick: true,
        onFileChange,
        imPanelChatConfig: botInfo?.imPanelChatConfig || {},
        from: 'chat-container',
        botId
    });
    const t = (0, next_intl_1.useTranslations)('chat');
    const sensors = (0, sensors_1.useSensors)();
    const { downloading, onDownload } = (0, useDownload_1.default)();
    const [gettingHistory, setGettingHistory] = (0, react_2.useState)(false);
    const [retriving, setRetriving] = (0, react_2.useState)(false);
    const chatListRef = (0, react_2.useRef)({ len: 0, firstId: '0', loading: false, scrollPosition: 0 });
    const setSending = (0, store_1.useChatStore)(state => state.setSending);
    const { usableEnergyPack } = (0, useCheckEnergyPack_1.default)();
    (0, react_2.useMemo)(() => {
        chatListRef.current.len = chatList.length;
        chatListRef.current.firstId = chatList.length > 0 ? chatList[0].id : '0';
        chatListRef.current.loading = gettingHistory;
    }, [chatList.length, gettingHistory]);
    const isEnoughEnergy = (0, react_2.useMemo)(() => {
        if (retriveEnergySuccess) {
            return energy >= (botInfo.energyPerChat ?? 1);
        }
        return !retriveEnergySuccess;
    }, [retriveEnergySuccess, energy, botInfo.energyPerChat]);
    (0, useAudioQueue_1.default)();
    const polling = (0, react_2.useCallback)((data) => {
        const polling = async (chat, intervalId, jobId) => {
            const res = await pollingChatMsg(chat);
            if (res) {
                clearInterval(intervalId);
                setStartJobIds(jobId);
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
                if (componentDelay && startJobIds.includes(asyncJobInfo?.jobId) === false) {
                    setSending(true);
                    const intervalId = setInterval(() => {
                        setStartJobIds(asyncJobInfo?.jobId, true);
                        polling(chat, intervalId, asyncJobInfo?.jobId);
                    }, componentDelay * 1000);
                }
                else if (delay && startJobIds.includes(jobId) === false) {
                    const intervalId = setInterval(() => {
                        setStartJobIds(jobId, true);
                        polling(chat, intervalId, jobId);
                    }, delay * 1000);
                }
            }
        }
    }, []);
    const retriveData = async (pageSize) => {
        return (0, api_1.listChatHistory)({
            pageSize,
            botId
        });
    };
    const getStoredHistory = async () => {
        if (userId) {
            return chatIdbService_1.default.getChat(Number(userId), botId);
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
                addHistoryRecord(localChatHistory);
                const remoteData = await retriveData(pageSize);
                scrollContext.hasMoreRef.current = remoteData.data.data.length >= pageSize;
                polling(remoteData.data.data);
                const compData = setHistoryFlag(remoteData.data.data);
                clearAndAddHistoryRecords(botId, compData || []);
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
        const res = await (0, api_1.listChatHistory)({
            botId,
            pageSize,
            ...(!firstLoad && chatListRef.current.len > 0 && { pageToken: chatListRef.current.firstId })
        });
        if (!firstLoad) {
            setGettingHistory(false);
        }
        if (res.success) {
            scrollContext.hasMoreRef.current = res.data.data.length >= pageSize;
            polling(res.data.data);
            const chatHistory = setHistoryFlag(res.data.data);
            addHistoryRecord(chatHistory);
        }
    }, []);
    const scrollContext = (0, useScrollToBottom_1.useScrollToBottom)({
        getHistory: getChatHistoryFromRemote,
        chatList,
        chatSetting: botChatSetting,
        chatListRef
    });
    const { isBasicUser } = useIsBasicUser(user, isVisitor);
    const { firstErrorList, errorChatRecord } = (0, useChatError_1.useChatError)({ selectedBotId: botId, userId });
    (0, useUnReadMsg_1.useUnReadMsg)(botId);
    (0, react_2.useEffect)(() => {
        if (!!token && !isEnoughEnergy) {
            scrollContext.scrollToBottom();
        }
    }, [!!token && isEnoughEnergy, scrollContext.scrollToBottom]);
    (0, react_2.useEffect)(() => {
        if (isVisitor === 0)
            return;
        if (!multiBotMap[botId]?.chatList.length) {
            const pageSize = scrollContext.getFirstRenderMessagesSize();
            getHistoryMesagesWhenFirstLoad(1, pageSize);
        }
        else {
            const compData = setHistoryFlag(multiBotMap[botId]?.chatList);
            addHistoryRecord(compData);
        }
    }, [isVisitor]);
    (0, react_use_1.useEffectOnce)(() => {
        clearAudioQueue();
        clearChatID();
        return () => clearChatID();
    });
    (0, react_2.useEffect)(() => {
        const cb = () => {
            scrollContext.autoScrollRef.current = true;
            scrollContext.setAutoScroll(true);
        };
        EventEmitter_1.default.subscribe(eventTypes_1.EventTypes.DELETE_MEMORY, cb);
        return () => {
            EventEmitter_1.default.unSubscribe(eventTypes_1.EventTypes.DELETE_MEMORY);
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
    const len = chatList.length;
    const clickPositionYRef = (0, react_2.useRef)(0);
    const isShareOrDelete = inputType === 'share' || inputType === 'delete';
    const loginUserNoEnoughEnergy = !!token && !isEnoughEnergy;
    const timerRef = (0, react_2.useRef)(null);
    (0, react_2.useEffect)(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            sensors?.track('EnterBotChatPage', {
                bot_id: botId,
                bot_name: botInfo.name
            });
        }, 3000);
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);
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
            return energy >= (botInfo?.energyPerChat ?? 1);
        }
        return !retriveEnergySuccess;
    }, [retriveEnergySuccess, energy, botInfo?.energyPerChat]);
    const { sendTextMessage } = (0, useTextMessageSender_1.default)(botInfo);
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
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { ...getRootProps(), className: "chat-container flex flex-col md:rounded-b-3xl overflow-hidden w-full bg-surface-default", style: {
                    height: isMobile ? '100%' : 'calc(100% - 108px)'
                }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full grow relative pr-1 md:pr-2", children: [!isMobile && (0, jsx_runtime_1.jsx)(MyBotTopActions_1.default, { botInfo: botInfo }), (0, jsx_runtime_1.jsx)("div", { className: "w-full h-full overflow-hidden flex flex-col flex-nowrap bg-transparent relative", children: (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('flex flex-col items-center grow overflow-y-auto overscroll-contain relative select-none md:select-auto z-10', {
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
                                    }, children: [gettingHistory && (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand absolute", size: "md" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative w-full py-3 md:mt-4 px-2 text-xs md:text-base", children: [(0, jsx_runtime_1.jsx)("div", { ref: scrollContext.topSentryRef, className: "h-[10px] w-full" }), (0, jsx_runtime_1.jsxs)("ul", { id: "message_box", ref: scrollContext.messageBoxRef, className: "absolute top-0 left-0 right-0 px-4 md:6 overflow-x-hidden min-h-[400px]", children: [firstErrorList.length > 0 &&
                                                            firstErrorList.map((eItem) => ((0, jsx_runtime_1.jsx)(ErrorChatListRow_1.default, { chat: eItem, botInfo: botInfo, msg: errorMsgList?.[eItem.id] }, `firstErrorChat${eItem.id}`))), len > 0 &&
                                                            chatList.map((item, i) => {
                                                                const errList = errorChatRecord.filter((eItem) => eItem.prevId === item.id);
                                                                const hiddenItem = item.runningError?.errorType === interfaces_1.MessageRunningErrorType.RUNNING_ERROR_TYPE_ENGINE_ERROR &&
                                                                    (0, lodash_es_1.isEmpty)(item.extraInfo?.runningWidgetInfo);
                                                                return ((0, jsx_runtime_1.jsxs)(react_2.default.Fragment, { children: [(0, jsx_runtime_1.jsx)("li", { className: (0, clsx_1.default)('flex items-baseline space-x-4 relative last:animate-slideIn', isShareOrDelete && 'pr-10', hiddenItem && 'hidden', i === 0 && 'md:pt-12', `chatId-${item.id}`), children: (0, jsx_runtime_1.jsx)(luiContext_1.LUIButtonInteractionContext.Provider, { value: {
                                                                                    clickFn: handleLUIButtonInteraction,
                                                                                    msgId: item.id,
                                                                                    selectedBot: botInfo
                                                                                }, children: (0, jsx_runtime_1.jsx)(ChatListRenderRow_1.default, { chat: item, downloading: downloading, onDownload: onDownload, botId: botInfo.id, selectedBot: botInfo, latest: i === len - 1, user: user, inputType: inputType, removeHistoryRecord: removeHistoryRecord, openContextmenu: openContextmenu, closeContextmenu: closeContextmenu, clickPositionYRef: clickPositionYRef, setCopyText: setCopyText, addChatID: addChatID, removeChatID: removeChatID, sharedChatIDList: sharedChatIDList, addDeleteChat: addDeleteChat, removeDeleteChat: removeDeleteChat, selectedDeleteChatList: selectedDeleteChatList, isMobile: isMobile, botChatSetting: botChatSetting, scrollToBottom: scrollToBottom, updateMessage: updateMessage, toggleImagePanelOpen: toggleImagePanelOpen }, item.id || item.localId) }) }), !(0, lodash_es_1.isEmpty)(item.runningError) ? (0, jsx_runtime_1.jsx)(RunningInfo_1.RunningError, { chat: item }) : null, errList.length > 0 &&
                                                                            errList.map((eItem) => ((0, jsx_runtime_1.jsx)(ErrorChatListRow_1.default, { chat: eItem, botInfo: botInfo, msg: errorMsgList?.[eItem.id] }, `errorChat${eItem.id}`)))] }, item.id || item.localId));
                                                            }), loginUserNoEnoughEnergy && isBasicUser && ((0, jsx_runtime_1.jsx)("li", { className: "last:animate-slideIn", children: (0, jsx_runtime_1.jsx)(passcard_1.default, {}) })), loginUserNoEnoughEnergy && !isBasicUser && ((0, jsx_runtime_1.jsx)("li", { className: "last:animate-slideIn", children: (0, jsx_runtime_1.jsx)(energy_pack_1.default, {}) })), networkError && !navigator.onLine ? (0, jsx_runtime_1.jsx)(RunningInfo_1.NetworkError, {}) : null, isVisitor == 1 && botInfo.visitorCanChat == false && ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("div", { className: "last:animate-slideIn", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3 items-center justify-between px-4 py-3 bg-surface-accent-yellow-subtlest rounded-2xl text-warning-bolder border border-icon-warning mt-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: botInfo.isPanelImageBot
                                                                                ? t('forbidden_open', {
                                                                                    botType: botInfo.name
                                                                                })
                                                                                : t(botInfo.isImageBot ? 'forbidden_image_open' : 'forbidden_gpt4_open') }), (0, jsx_runtime_1.jsx)("div", {}), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", color: "warning", size: isMobile ? 'md' : 'sm', onClick: () => {
                                                                                toggleLoginModal(true);
                                                                            }, children: t('login_register') })] }) }) })), (0, jsx_runtime_1.jsx)("li", { ref: scrollContext.bottomSentryRef, className: "h-[22px] w-full" }), (0, jsx_runtime_1.jsx)("li", { className: "flex justify-center", children: retriving && scrollContext.canScrollRef.current && ((0, jsx_runtime_1.jsx)(react_1.Center, { py: "20px", className: "absolute bottom-0", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand", size: "md" }) })) })] })] }), retriving && !scrollContext.canScrollRef.current && ((0, jsx_runtime_1.jsx)(react_1.Center, { py: "20px", className: "absolute bottom-0", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand", size: "md" }) })), (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { children: showBottomRecommendation &&
                                                !!botLastMessage &&
                                                !!botLastMessage.recommendationQuestion &&
                                                !!botLastMessage.recommendationQuestion.question.length &&
                                                !(errorChatRecord ?? []).some((e) => Number(e.prevId) >= Number(botLastMessage.id)) &&
                                                !showInput && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: isMobile ? ((0, jsx_runtime_1.jsx)(QuestionsMobile_1.default, { questions: botLastMessage.recommendationQuestion.question, hasEnoughEnergy: hasEnoughEnergy, handlePick: handlePick, disableClick: !allowTextInput })) : ((0, jsx_runtime_1.jsx)(Questions_1.default, { questions: botLastMessage.recommendationQuestion.question, hasEnoughEnergy: hasEnoughEnergy, handlePick: handlePick, disableClick: !allowTextInput })) })) })] }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "shrink-0", ref: editorAnchorRef, children: (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('z-20 bg-surface-default md:rounded-b-3xl overflow-hidden w-full h-fit shrink-0 top-0 left-0'), ref: editorContainerRef, children: (0, jsx_runtime_1.jsx)(editor_1.default, { selectedBot: botInfo, onSend: onSend, selectedBotId: botId, toggleImagePanelOpen: toggleImagePanelOpen, isMobile: isMobile, isWorkshop: true, showInput: showInput, setShowInput: setShowInput, allowTextInput: allowTextInput, allowAudioInput: allowAudioInput, textInputRef: textareaRef, isFullScreen: isFullScreen, setFullScreen: setFullScreen }) }) })] }), loginPopVisible && (0, jsx_runtime_1.jsx)(LoginDialog, { open: loginPopVisible, onGo2Login: () => setLoginPopVisible(false) }), imagePanelParams?.visible && ((0, jsx_runtime_1.jsx)(FormModal, { imagePanelParams: imagePanelParams, setOpen: toggleImagePanelOpen, scrollToBottom: scrollToBottom, isMobile: isMobile, botInfo: botInfo }))] }));
}
