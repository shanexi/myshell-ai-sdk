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
const ChevronUpIcon_1 = __importDefault(require("@heroicons/react/24/solid/ChevronUpIcon"));
const LockClosedIcon_1 = __importDefault(require("@heroicons/react/24/solid/LockClosedIcon"));
const clsx_1 = __importDefault(require("clsx"));
const framer_motion_1 = require("framer-motion");
const lodash_es_1 = require("lodash-es");
const dynamic_1 = __importDefault(require("next/dynamic"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const next_themes_1 = require("next-themes");
const react_2 = __importStar(require("react"));
const bot_1 = require("../../../apis/bot.js");
const context_1 = __importDefault(require("../../../chat/layouts/context.js"));
const api_1 = require("../../../chat/model/api.js");
const chatIdbService_1 = __importDefault(require("../../../chat/model/chatIdbService.js"));
const enums_1 = require("../../../chat/model/enums.js");
const interfaces_1 = require("../../../chat/model/interfaces.js");
const useDropFiles_1 = require("../../../chat/views/editor/useDropFiles.js");
const useAudioQueue_1 = __importDefault(require("../../../chat/views/hooks/useAudioQueue.js"));
const useChatError_1 = require("../../../chat/views/hooks/useChatError.js");
const useScrollToBottom_1 = require("../../../chat/views/hooks/useScrollToBottom.js");
const useTextMessageSender_1 = __importDefault(require("../../../chat/views/hooks/useTextMessageSender.js"));
const useUnReadMsg_1 = require("../../../chat/views/hooks/useUnReadMsg.js");
const EditorSkeleton_1 = __importDefault(require("../../../chat-new/views/editor/skeleton/EditorSkeleton.js"));
const luiContext_1 = require("../../../common/components/lui/luiContext.js");
const button_1 = require("../../../common/components/ui/button.js");
const spinner_1 = __importDefault(require("../../../common/components/ui/spinner.js"));
const eventTypes_1 = require("../../../common/constants/enums/eventTypes.js");
const user_1 = require("../../../common/constants/enums/user.js");
const useDownload_1 = __importDefault(require("../../../common/hooks/useDownload.js"));
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const EventEmitter_1 = __importDefault(require("../../../common/utils/EventEmitter.js"));
const TopActionsSkeleton_1 = __importDefault(require("../../../components/room-management/views/top-actions/skeleton/TopActionsSkeleton.js"));
const sensors_1 = require("../../../lib/sensors/index.js");
const store_1 = require("../../../services/store/index.js");
const ChatListRenderRow_1 = __importDefault(require("./ChatListRenderRow.js"));
const ErrorChatListRow_1 = __importDefault(require("./ErrorChatListRow.js"));
const RunningInfo_1 = require("./reply-message/RunningInfo.js");
const bot_2 = require("../../../services/store/bot.js");
const FormModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../chat/views/chat-body/replicate/FormModal.js'))), {
    loading: () => null,
    ssr: false
});
const LoginDialog = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./LoginDialog.js'))), {
    loading: () => null,
    ssr: false
});
const Editor = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../chat/views/editor/index.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)(EditorSkeleton_1.default, {}),
    ssr: false
});
const EnergyPack = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../chat-new/views/message-list/components/energy-pack/index.js'))), {
    ssr: false
});
const PassCard = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../chat-new/views/message-list/components/passcard/index.js'))), {
    ssr: false
});
const GenerationTermination = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../GenerationTermination.js'))), {
    ssr: false
});
const NsfwMask = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./NsfwMask.js'))), {
    ssr: false
});
const Questions = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./recommandation-question/Questions.js'))), {
    ssr: false
});
const QuestionsMobile = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./recommandation-question/QuestionsMobile.js'))), {
    ssr: false
});
const MobileTopActions = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./top-actions/MobileTopActions.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)(TopActionsSkeleton_1.default, {}),
    ssr: false
});
const TopActions = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./top-actions/TopActions.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)(TopActionsSkeleton_1.default, {}),
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
const bottomOpaqueBg = 'linear-gradient(179.98deg, rgba(255, 255, 255, 0) 0.81%, #FFFFFF 99.99%)';
const bottomOpaqueBgDark = 'linear-gradient(179.98deg, rgba(28, 30, 38, 0) 0.81%, #1C1E26 99.99%)';
function ChatBody({ id, botInfo, imgLoaded = false, bodyBgStyle, showInnerMobileActions = false }) {
    const { editorContainerRef, editorAnchorRef, textareaRef, scrollLayoutToTop } = (0, react_2.useContext)(context_1.default);
    const { isMobile, locale, pathname } = (0, usePathLocale_1.usePathLocale)();
    const token = (0, store_1.useUserStore)(state => state.token);
    const userId = (0, store_1.useUserStore)(state => state.userId);
    const energy = (0, store_1.useUserStore)(state => state.energy);
    const retriveEnergySuccess = (0, store_1.useUserStore)(state => state.retriveEnergySuccess);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const user = (0, store_1.useUserStore)(state => state.user);
    const errorMsgList = (0, store_1.useChatStore)(state => state.errorMsgList);
    const addHistoryRecord = (0, store_1.useChatStore)(state => state.addHistoryRecord);
    const multiBotMap = (0, store_1.useChatStore)(state => state.multiBotMap);
    const clearAudioQueue = (0, store_1.useChatStore)(state => state.clearAudioQueue);
    const clearChatID = (0, store_1.useChatStore)(state => state.clearChatID);
    const isOpenContextmenu = (0, store_1.useChatStore)(state => state.isOpenContextmenu);
    const closeContextmenu = (0, store_1.useChatStore)(state => state.closeContextmenu);
    const openContextmenu = (0, store_1.useChatStore)(state => state.openContextmenu);
    const inputType = (0, store_1.useChatStore)(state => state.inputType);
    const loginPopVisible = (0, store_1.useChatStore)(state => state.loginPopVisible);
    const setLoginPopVisible = (0, store_1.useChatStore)(state => state.setLoginPopVisible);
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
    const showNsfw = (0, store_1.useUserStore)(state => state.showNsfw);
    const botChatSettingMap = (0, store_1.useBotStore)(state => state.botChatSettingMap);
    const sseCtrl = (0, store_1.useBotStore)(state => state.sseCtrl);
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const chatList = (0, react_2.useMemo)(() => {
        return multiBotMap[id]?.chatList ?? [];
    }, [multiBotMap, id]);
    const botLastMessage = (0, react_2.useMemo)(() => {
        return chatList.at(-1);
    }, [chatList]);
    const networkError = (0, react_2.useMemo)(() => {
        return multiBotMap[id]?.networkError ?? false;
    }, [multiBotMap, id]);
    const botLastValidMessage = (0, react_2.useMemo)(() => {
        return chatList.reduceRight((lastDone, message) => {
            return (lastDone ||
                (message.type === enums_1.MessageTypeEnum.REPLY && message.status === enums_1.MessageStatusEnum.DONE ? message : null) ||
                (message.type === enums_1.MessageTypeEnum.GREETING && message.status === enums_1.MessageStatusEnum.DONE ? message : null));
        }, null);
    }, [chatList]);
    const botChatSetting = (0, react_2.useMemo)(() => {
        return botChatSettingMap.get(id) ?? bot_2.defaultChatSetting;
    }, [botChatSettingMap, id]);
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    const [isFullScreen, setFullScreen] = (0, react_2.useState)(false);
    const router = (0, navigation_1.useRouter)();
    const uploadFiles = (0, store_1.useChatStore)(state => state.uploadFiles);
    const allowTextInput = botLastValidMessage?.inputSetting?.canInputText ?? true;
    const allowAudioInput = botLastValidMessage?.inputSetting?.canInputAudio ?? true;
    const allowUploadFile = botLastValidMessage?.inputSetting?.canUploadFile ?? true;
    const uploadSettings = (0, lodash_es_1.pick)(botLastMessage?.inputSetting, [
        'supportedEmbedTypes',
        'embedNumberLimit',
        'embedNumberMinimum',
        'embedMaxFileBytesEach'
    ]);
    const onFileChange = (0, react_2.useCallback)(async (files) => {
        scrollLayoutToTop?.();
        const res = await (0, useDropFiles_1.processUploadFiles)(id, files);
        uploadFiles(id, res);
    }, [id]);
    const { getRootProps } = (0, useDropFiles_1.useDropFiles)({
        noDrag: false,
        noClick: true,
        onFileChange,
        imPanelChatConfig: botInfo?.imPanelChatConfig || {},
        from: 'chat-container',
        botId: id
    });
    const t = (0, next_intl_1.useTranslations)('chat');
    const tRequest = (0, next_intl_1.useTranslations)('request');
    const sensors = (0, sensors_1.useSensors)();
    const { downloading, onDownload } = (0, useDownload_1.default)();
    const [gettingHistory, setGettingHistory] = (0, react_2.useState)(false);
    const [retriving, setRetriving] = (0, react_2.useState)(false);
    const chatListRef = (0, react_2.useRef)({ len: 0, firstId: '0', loading: false, scrollPosition: 0 });
    const setSending = (0, store_1.useChatStore)(state => state.setSending);
    const [showInput, setShowInput] = (0, react_2.useState)(false);
    (0, react_2.useMemo)(() => {
        chatListRef.current.len = chatList.length;
        chatListRef.current.firstId = chatList.length > 0 ? chatList[0].id : '0';
        chatListRef.current.loading = gettingHistory;
    }, [chatList?.length, gettingHistory]);
    const isEnoughEnergy = (0, react_2.useMemo)(() => {
        if (retriveEnergySuccess) {
            return energy >= (botInfo?.energyPerChat ?? 1);
        }
        return !retriveEnergySuccess;
    }, [retriveEnergySuccess, energy, botInfo?.energyPerChat]);
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
    const retriveData = (0, react_2.useCallback)(async (pageSize) => {
        return (0, api_1.listChatHistory)({
            pageSize,
            botId: id
        });
    }, [id]);
    const getStoredHistory = async () => {
        if (userId) {
            return chatIdbService_1.default.getChat(Number(userId), `${id}`);
        }
        return null;
    };
    const getChatHistoryFromRemote = (0, react_2.useCallback)(async (pageSize = useScrollToBottom_1.CHAT_PAGE_SIZE, firstLoad = false) => {
        if (!firstLoad) {
            setGettingHistory(true);
        }
        const res = await (0, api_1.listChatHistory)({
            botId: id,
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
    }, [id]);
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
                clearAndAddHistoryRecords(id, compData || []);
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
    const scrollContext = (0, useScrollToBottom_1.useScrollToBottom)({
        getHistory: getChatHistoryFromRemote,
        chatList,
        chatSetting: botChatSetting,
        chatListRef
    });
    const { isBasicUser } = useIsBasicUser(user, isVisitor);
    const { firstErrorList, errorChatRecord } = (0, useChatError_1.useChatError)({ selectedBotId: id, userId });
    (0, useUnReadMsg_1.useUnReadMsg)(id);
    (0, react_2.useEffect)(() => {
        if (!!token && !isEnoughEnergy) {
            scrollContext.scrollToBottom();
        }
    }, [!!token && isEnoughEnergy, scrollContext.scrollToBottom]);
    (0, react_2.useEffect)(() => {
        if (isVisitor === user_1.VisitorEnum.INIT)
            return;
        if (!multiBotMap[id]?.chatList?.length || multiBotMap[id]?.networkError) {
            const pageSize = scrollContext.getFirstRenderMessagesSize();
            getHistoryMesagesWhenFirstLoad(1, pageSize);
        }
        else {
            const compData = setHistoryFlag(multiBotMap[id]?.chatList);
            addHistoryRecord(compData);
        }
    }, [id, isVisitor, navigator.onLine, userId]);
    (0, react_2.useEffect)(() => {
        clearAudioQueue();
        clearChatID();
        return () => clearChatID();
    }, [id]);
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
                bot_id: id,
                bot_name: botInfo?.name
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
    const handlePick = (0, react_2.useCallback)((question) => {
        sendTextMessage({
            retryText: question
        });
    }, []);
    const msgReplying = (0, react_2.useMemo)(() => {
        const lastMsg = chatList.at(-1);
        if (lastMsg?.asyncJobInfo?.jobId) {
            return (lastMsg?.status === enums_1.MessageStatusEnum.DONE &&
                (lastMsg?.asyncJobInfo?.status === enums_1.ModelStatusEnum.EMBED_OBJ_STATUS_QUEUEING ||
                    lastMsg.asyncJobInfo.status === enums_1.ModelStatusEnum.EMBED_OBJ_STATUS_PROCESSING));
        }
        return (!lastMsg?.isLocalReply &&
            (lastMsg?.status === enums_1.MessageStatusEnum.PENDING || lastMsg?.status === enums_1.MessageStatusEnum.PROCESSING));
    }, [chatList]);
    const handleTerminateGeneration = async () => {
        const lastMsg = chatList.at(-1);
        const textLen = lastMsg?.text.length;
        if (lastMsg) {
            if (lastMsg?.isLocalReply) {
                const localSendMsg = chatList.at(-2);
                if (localSendMsg && localSendMsg.isLocalSend) {
                    updateMessage({ ...localSendMsg, replaceLocalReply: true });
                }
                updateMessage({ ...lastMsg, status: enums_1.MessageStatusEnum.CANCELED, replaceLocalReply: true });
                sseCtrl?.abort();
            }
            else if (lastMsg.status === enums_1.MessageStatusEnum.PENDING || lastMsg.status === enums_1.MessageStatusEnum.PROCESSING) {
                try {
                    updateMessage({ ...lastMsg, status: enums_1.MessageStatusEnum.CANCELING });
                    const { success } = await (0, bot_1.terminateGeneration)(id, lastMsg.id, textLen?.toString());
                    if (success) {
                        sseCtrl?.abort();
                        updateMessage({ ...lastMsg, status: enums_1.MessageStatusEnum.CANCELED });
                    }
                }
                catch (e) {
                }
            }
            else if (lastMsg.status === enums_1.MessageStatusEnum.DONE && lastMsg.asyncJobInfo) {
                try {
                    updateMessage({ ...lastMsg, status: enums_1.MessageStatusEnum.CANCELING });
                    const { success } = await (0, bot_1.terminateGeneration)(id, lastMsg.id);
                    if (success) {
                        sseCtrl?.abort();
                        updateMessage({ ...lastMsg, status: enums_1.MessageStatusEnum.CANCELED });
                    }
                }
                catch (e) {
                }
            }
        }
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
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { ...getRootProps(), className: (0, clsx_1.default)('chat-container flex flex-col md:rounded-b-3xl overflow-hidden bg-cover bg-no-repeat bg-center bg-origin-border w-full', !bodyBgStyle && 'bg-surface-default'), style: {
                    ...(bodyBgStyle ?? {}),
                    height: isMobile ? '100%' : 'calc(100% - 108px)'
                }, children: [showInnerMobileActions && isMobile && ((0, jsx_runtime_1.jsx)("div", { className: "shrink-0 bg-surface-default", children: (0, jsx_runtime_1.jsx)(MobileTopActions, { botId: id, botInfo: botInfo }) })), (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('w-full grow overflow-hidden relative'), children: [!isMobile && (0, jsx_runtime_1.jsx)(TopActions, { botId: id, botInfo: botInfo, showPin: true }), (0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full overflow-hidden flex flex-col flex-nowrap bg-transparent relative pr-1 md:pr-2", children: [msgReplying && ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 z-20", children: (0, jsx_runtime_1.jsx)(GenerationTermination, { onTerminate: handleTerminateGeneration }) })), (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('flex flex-col items-center grow overflow-y-auto overscroll-contain relative select-none md:select-auto z-10', {
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
                                        }, children: [gettingHistory && (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand absolute", size: "md" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative w-full py-3 md:mt-4 px-2 text-xs md:text-base", children: [(0, jsx_runtime_1.jsx)("div", { ref: scrollContext.topSentryRef, className: "h-[10px] w-full" }), (0, jsx_runtime_1.jsxs)("ul", { id: "message_box", ref: scrollContext.messageBoxRef, className: "w-full absolute top-0 left-0 px-4 md:px-6 overflow-hidden min-h-[400px]", children: [firstErrorList.length > 0 &&
                                                                firstErrorList.map((eItem) => ((0, jsx_runtime_1.jsx)(ErrorChatListRow_1.default, { chat: eItem, botInfo: botInfo, msg: errorMsgList?.[eItem.id] }, `firstErrorChat${eItem.id}`))), len > 0 &&
                                                                chatList.map((item, i) => {
                                                                    const errList = errorChatRecord.filter((eItem) => eItem.prevId === item.id);
                                                                    const hiddenItem = item.runningError?.errorType === interfaces_1.MessageRunningErrorType.RUNNING_ERROR_TYPE_ENGINE_ERROR &&
                                                                        (0, lodash_es_1.isEmpty)(item.extraInfo?.runningWidgetInfo);
                                                                    return ((0, jsx_runtime_1.jsxs)(react_2.default.Fragment, { children: [(0, jsx_runtime_1.jsx)("li", { className: (0, clsx_1.default)('flex items-baseline space-x-4 relative last:animate-slideIn', isShareOrDelete && 'pr-10', hiddenItem && 'hidden', i === 0 && 'md:pt-12', `chatId-${item.id}`), children: (0, jsx_runtime_1.jsx)(luiContext_1.LUIButtonInteractionContext.Provider, { value: {
                                                                                        clickFn: handleLUIButtonInteraction,
                                                                                        msgId: item.id,
                                                                                        selectedBot: botInfo
                                                                                    }, children: (0, jsx_runtime_1.jsx)(ChatListRenderRow_1.default, { chat: item, downloading: downloading, onDownload: onDownload, botId: id, selectedBot: botInfo, latest: i === len - 1, user: user, inputType: inputType, removeHistoryRecord: removeHistoryRecord, openContextmenu: openContextmenu, closeContextmenu: closeContextmenu, clickPositionYRef: clickPositionYRef, setCopyText: setCopyText, addChatID: addChatID, removeChatID: removeChatID, sharedChatIDList: sharedChatIDList, addDeleteChat: addDeleteChat, removeDeleteChat: removeDeleteChat, selectedDeleteChatList: selectedDeleteChatList, isMobile: isMobile, botChatSetting: botChatSetting, scrollToBottom: scrollToBottom, updateMessage: updateMessage, toggleImagePanelOpen: toggleImagePanelOpen }, item.id || item.localId) }) }), !(0, lodash_es_1.isEmpty)(item.runningError) ? (0, jsx_runtime_1.jsx)(RunningInfo_1.RunningError, { chat: item }) : null, errList.length > 0 &&
                                                                                errList.map((eItem) => ((0, jsx_runtime_1.jsx)(ErrorChatListRow_1.default, { msg: errorMsgList?.[eItem.id], chat: eItem, botInfo: botInfo }, `errorChat${eItem.id}`)))] }, item.id || item.localId));
                                                                }), loginUserNoEnoughEnergy && isBasicUser && ((0, jsx_runtime_1.jsx)("li", { className: "last:animate-slideIn", children: (0, jsx_runtime_1.jsx)(PassCard, {}) })), loginUserNoEnoughEnergy && !isBasicUser && ((0, jsx_runtime_1.jsx)("li", { className: "last:animate-slideIn", children: (0, jsx_runtime_1.jsx)(EnergyPack, {}) })), networkError && !navigator.onLine ? (0, jsx_runtime_1.jsx)(RunningInfo_1.NetworkError, {}) : null, isVisitor == 1 && botInfo?.visitorCanChat == false && ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("div", { className: "pt-16 last:animate-slideIn", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3 items-center justify-between px-4 py-3 bg-surface-accent-yellow-subtlest rounded-2xl text-warning-bolder border border-icon-warning mt-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: botInfo?.isPanelImageBot
                                                                                    ? t('forbidden_open', {
                                                                                        botType: botInfo?.name
                                                                                    })
                                                                                    : t(botInfo?.isImageBot ? 'forbidden_image_open' : 'forbidden_gpt4_open') }), (0, jsx_runtime_1.jsx)("div", {}), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", color: "warning", size: isMobile ? 'md' : 'sm', onClick: () => {
                                                                                    toggleLoginModal(true);
                                                                                }, children: t('login_register') })] }) }) })), (0, jsx_runtime_1.jsx)("li", { ref: scrollContext.bottomSentryRef, className: (0, clsx_1.default)('h-[22px] w-full') }), (0, jsx_runtime_1.jsx)("li", { className: "flex justify-center", children: retriving && scrollContext.canScrollRef.current && ((0, jsx_runtime_1.jsx)(react_1.Center, { py: "20px", className: "absolute bottom-0", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand", size: "md" }) })) })] }), loginPopVisible && (0, jsx_runtime_1.jsx)(LoginDialog, { open: loginPopVisible, onGo2Login: () => setLoginPopVisible(false) })] }), retriving && !scrollContext.canScrollRef.current && ((0, jsx_runtime_1.jsx)(react_1.Center, { py: "20px", className: "absolute bottom-0", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand", size: "md" }) }))] }), (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { children: showBottomRecommendation &&
                                            !!botLastMessage &&
                                            !!botLastMessage.recommendationQuestion &&
                                            !!botLastMessage.recommendationQuestion.question.length &&
                                            !(errorChatRecord ?? []).some((e) => Number(e.prevId) >= Number(botLastMessage.id)) &&
                                            !showInput && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: isMobile ? ((0, jsx_runtime_1.jsx)(QuestionsMobile, { questions: botLastMessage.recommendationQuestion.question, hasEnoughEnergy: hasEnoughEnergy, handlePick: handlePick, disableClick: !allowTextInput })) : ((0, jsx_runtime_1.jsx)(Questions, { questions: botLastMessage.recommendationQuestion.question, hasEnoughEnergy: hasEnoughEnergy, handlePick: handlePick, disableClick: !allowTextInput })) })) }), botInfo?.membershipChatConfig?.isLockByMembershipType && ((0, jsx_runtime_1.jsxs)("div", { className: "flex-col py-5 px-4 md:py-0 md:px-0", children: [(0, jsx_runtime_1.jsxs)("div", { className: "py-5 px-3 flex-col w-full min-h-[120px] bg-[#F6F8FCCC] dark:bg-[#1c1e26cc] bg-opacity-80 flex items-center justify-center rounded-[12px] md:rounded-none", style: { backdropFilter: 'blur(16px)' }, children: [(0, jsx_runtime_1.jsx)(LockClosedIcon_1.default, { className: "w-6 h-6 fill-[#202223] dark:fill-[#FFE86B]" }), (0, jsx_runtime_1.jsx)("p", { className: "my-[8px] text-on-surface text-center", children: t('lock_text') }), (0, jsx_runtime_1.jsx)("button", { onClick: () => {
                                                            if (isVisitor == 1) {
                                                                toggleLoginModal(true);
                                                            }
                                                            else {
                                                                router.push(`/profile/passcard`);
                                                            }
                                                        }, className: "text-white bg-primary h-[36px] min-w-[108px] rounded-full text-[14px] font-semibold", children: t('lock_btn') })] }), isMobile && ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row justify-start items-center gap-2 mt-2", onClick: () => {
                                                    EventEmitter_1.default.dispatch(eventTypes_1.EventTypes.SHOW_BOT_MODAL, null);
                                                }, children: [(0, jsx_runtime_1.jsx)(react_1.Avatar, { className: "bg-[#a0aec0] rounded-3xl overflow-hidden", w: "48px", h: "48px", src: botInfo?.logoUrl }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center gap-1 font-semibold text-primary", children: [botInfo?.name, (0, jsx_runtime_1.jsx)(ChevronUpIcon_1.default, { className: "w-[18px] h-[18px] text-primary" })] })] }))] })), imagePanelParams?.visible && ((0, jsx_runtime_1.jsx)(FormModal, { imagePanelParams: imagePanelParams, setOpen: toggleImagePanelOpen, scrollToBottom: scrollToBottom, isMobile: isMobile, botInfo: botInfo }))] }), imgLoaded && ((0, jsx_runtime_1.jsx)("div", { style: {
                                    backgroundImage: resolvedTheme === 'dark' ? bottomOpaqueBgDark : bottomOpaqueBg
                                }, className: "absolute w-full bottom-0 z-0 h-[348px]" }))] }), (0, jsx_runtime_1.jsx)("div", { className: "shrink-0", ref: editorAnchorRef, children: (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('z-20 bg-surface-default md:rounded-b-3xl overflow-hidden w-full h-fit shrink-0 top-0 left-0'), ref: editorContainerRef, children: (0, jsx_runtime_1.jsx)(Editor, { selectedBot: botInfo, onSend: onSend, selectedBotId: id, toggleImagePanelOpen: toggleImagePanelOpen, isMobile: isMobile, showInput: showInput, setShowInput: setShowInput, allowTextInput: allowTextInput, allowAudioInput: allowAudioInput, allowUploadFile: allowUploadFile, uploadSettings: uploadSettings, textInputRef: textareaRef, isFullScreen: isFullScreen, setFullScreen: setFullScreen }) }) })] }), botInfo?.isNsfw && (isVisitor === 1 || !(showNsfw === 1)) && (0, jsx_runtime_1.jsx)(NsfwMask, {})] }));
}
exports.default = (0, react_2.memo)(ChatBody);
