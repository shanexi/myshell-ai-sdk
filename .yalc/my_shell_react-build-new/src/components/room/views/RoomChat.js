"use strict";
'use client';
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
exports.default = RoomChat;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const dynamic_1 = __importDefault(require("next/dynamic"));
const react_1 = require("react");
const react_use_1 = require("react-use");
const new_chat_1 = require("../../../apis/new-chat.js");
const MessageContext_1 = require("../../../chat-new/context/MessageContext.js");
const StaticContext_1 = require("../../../chat-new/context/StaticContext.js");
const useGetHistoryMessage_1 = __importDefault(require("../../../chat-new/hooks/useGetHistoryMessage.js"));
const useMessageParams_1 = __importDefault(require("../../../chat-new/hooks/useMessageParams.js"));
const definitions_1 = require("../../../chat-new/model/definitions.js");
const util_1 = require("../../../chat-new/util.js");
const ChatModule_1 = __importDefault(require("../../../chat-new/views/ChatModule.js"));
const user_1 = require("../../../common/constants/enums/user.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const BotDetail_1 = __importDefault(require("../../../components/chat/entity-detail/views/bot/views/BotDetail.js"));
const ShareBtn_1 = __importDefault(require("../../../components/chat/entity-detail/views/common/share/views/ShareBtn.js"));
const ShowDetailBtn_1 = __importDefault(require("../../../components/detail/views/common/ShowDetailBtn.js"));
const definitions_2 = require("../../../components/room/models/definitions.js");
const useSocket_1 = __importDefault(require("../../../components/room/services/socket/useSocket.js"));
const LeaveRoom_1 = __importDefault(require("../../../components/room/views/function-menu/LeaveRoom.js"));
const useCalcGetChatListFn_1 = __importDefault(require("../../../entity/hooks/useCalcGetChatListFn.js"));
const sensors_1 = require("../../../lib/sensors/index.js");
const store_1 = require("../../../services/store/index.js");
const entity_1 = require("../../../services/store/entity.js");
const useMarkMessageAsRead_1 = __importDefault(require("../hooks/useMarkMessageAsRead.js"));
const useReceivedReward_1 = __importDefault(require("../hooks/useReceivedReward.js"));
const useRoomLayout_1 = __importDefault(require("../hooks/useRoomLayout.js"));
const util_2 = require("../models/util.js");
const CopyInvitationLink_1 = __importDefault(require("./CopyInvitationLink.js"));
const TopActions_1 = __importDefault(require("./top-actions/TopActions.js"));
const ReceivedReward = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./received-award/ReceivedReward.js'))), {
    loading: () => null,
    ssr: false
});
function RoomChat({ roomInfo, roomBotInfo }) {
    const { channelId: id } = roomInfo;
    const setDetail = (0, entity_1.useEntityStore)(state => state.setDetail);
    const userId = (0, store_1.useUserStore)(state => state.userId);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const energy = (0, store_1.useUserStore)(state => state.energy);
    const sensors = (0, sensors_1.useSensors)();
    const t = (0, next_intl_1.useTranslations)('chat');
    const getChatList = (0, useCalcGetChatListFn_1.default)('room');
    const roomInputDisabledLocale = (0, next_intl_1.useTranslations)('chat.room');
    const { receivedReward, onReceivedReward, onCloseReceivedRewardModal } = (0, useReceivedReward_1.default)();
    const { markMessageAsRead } = (0, useMarkMessageAsRead_1.default)(id);
    const visitorNameParser = (0, react_1.useCallback)((nameTag) => {
        return `${t('visitor')}${nameTag}`;
    }, [t]);
    const handleMarkAsRead = async () => {
        try {
            const res = await markMessageAsRead();
            if (res) {
                getChatList();
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    (0, react_use_1.useEffectOnce)(() => {
        handleMarkAsRead();
    });
    const { scrollContainerRef, editorAnchorRef, editorContainerRef, textareaRef, detailContainerRef, scrollLayoutToTop, manuallyScrollDetailToTop, isEditorSticky } = (0, useRoomLayout_1.default)();
    const memberInfoMap = (0, react_1.useMemo)(() => {
        const map = new Map();
        roomInfo?.memberList.forEach(item => {
            map.set(`${item.isBot ? 'entity' : 'user'}-${item.memberId}`, {
                id: item.memberId,
                avatar: item.isBot ? (0, common_helper_1.getAssetsUrlV2)(item.avatar) : (0, common_helper_1.getAssetsUrl)(item.avatar),
                name: item.memberName,
                isEntity: item.isBot,
                nameTag: item.nameTag,
                isVisitor: item.isVisitor
            });
        });
        return map;
    }, [roomInfo?.memberList]);
    const { messageIdList, messageMap, lastUserInteractionMsgId, draftMessage, sending, interacting, scrollToBottom, setDraftMessage, sendTextMessage, sendAudioMessage, replaceDraftMessage, addMessage } = (0, useMessageParams_1.default)('room', id, roomBotInfo.id);
    const { hasMore, gettingHistory, getHistoryMessage } = (0, useGetHistoryMessage_1.default)('room', id, addMessage);
    const displayMessageMap = (0, react_1.useMemo)(() => new Map([...messageMap].map(([key, value]) => [
        key,
        (() => {
            const newMessage = (0, util_1.MessageToDisplayParser)(value, userId ?? '0', memberInfoMap, true, visitorNameParser);
            if (newMessage.type === 'GREETING' &&
                roomInfo.creatorId === newMessage.userId &&
                roomInfo.creatorId === userId) {
                newMessage.buttons = ((0, jsx_runtime_1.jsx)(CopyInvitationLink_1.default, { invitationUrl: roomInfo.invitationUrl, disabled: roomInfo.channelStatus === definitions_2.RoomStatus.CLOSED }, "copy-invitation-url"));
            }
            return newMessage;
        })()
    ])), [
        memberInfoMap,
        messageMap,
        roomInfo.channelStatus,
        roomInfo.creatorId,
        roomInfo.invitationUrl,
        userId,
        visitorNameParser
    ]);
    const extraMessage = (0, react_1.useMemo)(() => {
        const extraMessageIdList = [];
        const extraMessageDetailMap = new Map();
        if (roomInfo.channelStatus === definitions_2.LocalRoomStatus.OTHER_SIDE_NO_ENERGY && roomInfo.creatorId !== userId) {
            const roomClosedMessage = (0, util_2.createRoomOtherSideNoEnergyMessage)();
            extraMessageIdList.push(roomClosedMessage.id);
            extraMessageDetailMap.set(roomClosedMessage.id, roomClosedMessage);
        }
        if (roomInfo.channelStatus === definitions_2.RoomStatus.CLOSED) {
            const roomClosedMessage = (0, util_2.createRoomClosedMessage)(roomInfo.creatorId === userId, roomInfo.memberList.find(member => !member.isBot && member.memberId !== userId)?.memberName);
            extraMessageIdList.push(roomClosedMessage.id);
            extraMessageDetailMap.set(roomClosedMessage.id, roomClosedMessage);
        }
        return {
            extraMessageIdList,
            extraMessageDetailMap
        };
    }, [roomInfo.channelStatus, roomInfo.creatorId, roomInfo.memberList, userId]);
    const computedMessageIdList = (0, react_1.useMemo)(() => {
        return [...messageIdList, ...extraMessage.extraMessageIdList];
    }, [extraMessage.extraMessageIdList, messageIdList]);
    const computedMessageDisplayMessageMap = (0, react_1.useMemo)(() => {
        return new Map([...displayMessageMap, ...extraMessage.extraMessageDetailMap]);
    }, [displayMessageMap, extraMessage.extraMessageDetailMap]);
    const updateRoomStatus = (0, react_1.useCallback)((roomStatus) => {
        const newRoomInfo = {
            ...roomInfo,
            channelStatus: roomStatus
        };
        setDetail('room', id, newRoomInfo);
    }, [id, roomInfo, setDetail]);
    const getRoomDetail = (0, react_1.useCallback)(async () => {
        try {
            const { success, data, msg } = await (0, new_chat_1.getRoomInfo)(id);
            if (success) {
                setDetail('room', id, data);
            }
            else {
                throw new Error(msg);
            }
        }
        catch (e) {
            console.error(e);
        }
    }, [id, setDetail]);
    const { sendTextMessage: onSendText, sendAudioMessage: onSendAudio, leaveRoom } = (0, useSocket_1.default)(id, sendTextMessage, sendAudioMessage, replaceDraftMessage, addMessage, updateRoomStatus, getChatList, onReceivedReward, getRoomDetail);
    const messageContextParams = (0, react_1.useMemo)(() => ({
        messageIdList: computedMessageIdList,
        messageMap: computedMessageDisplayMessageMap,
        lastUserInteractionMsgId,
        draftMessage,
        sending,
        interacting,
        scrollToBottom,
        setDraftMessage,
        sendTextMessage: onSendText,
        sendAudioMessage: onSendAudio,
        hasMore,
        gettingHistory,
        getHistoryMessage,
        addMessage
    }), [
        computedMessageIdList,
        computedMessageDisplayMessageMap,
        lastUserInteractionMsgId,
        draftMessage,
        sending,
        interacting,
        scrollToBottom,
        setDraftMessage,
        onSendText,
        onSendAudio,
        hasMore,
        gettingHistory,
        getHistoryMessage,
        addMessage
    ]);
    const staticContextProps = (0, react_1.useMemo)(() => {
        const entityInfo = {
            id: roomInfo?.channelId ?? '',
            name: roomInfo?.channelName ?? '',
            energyPerChat: roomBotInfo?.energyPerChat
        };
        return {
            type: 'room',
            entityInfo,
            chatSettingDisabled: true,
            interactionDisabled: roomInfo.channelStatus === definitions_2.RoomStatus.CLOSED ||
                roomInfo.channelStatus === definitions_2.LocalRoomStatus.OTHER_SIDE_NO_ENERGY ||
                (isVisitor === user_1.VisitorEnum.NO && energy < roomBotInfo.energyPerChat),
            disabledReason: roomInfo.channelStatus === definitions_2.LocalRoomStatus.OTHER_SIDE_NO_ENERGY
                ? roomInputDisabledLocale('input_disabled_host_ran_out')
                : roomInfo.channelStatus === definitions_2.RoomStatus.CLOSED
                    ? roomInputDisabledLocale('input_disabled_closed')
                    : undefined,
            showInteractionCostEnergy: isVisitor === user_1.VisitorEnum.NO,
            menuDisabled: isVisitor === user_1.VisitorEnum.YES,
            menuFunctions: [{ menuFunction: definitions_1.MenuFunctionEnum.REMOVE_FROM_LIST }],
            customMenuFunction: [
                ...(roomInfo.creatorId === userId
                    ? [(0, jsx_runtime_1.jsx)(LeaveRoom_1.default, { onLeave: leaveRoom, disabled: roomInfo.channelStatus === definitions_2.RoomStatus.CLOSED }, "leave-room")]
                    : [])
            ],
            getList: getChatList
        };
    }, [
        getChatList,
        energy,
        isVisitor,
        leaveRoom,
        roomBotInfo.energyPerChat,
        roomInfo?.channelId,
        roomInfo?.channelName,
        roomInfo.channelStatus,
        roomInfo.creatorId,
        roomInputDisabledLocale,
        userId
    ]);
    const shareTracker = () => {
        sensors?.track('ShareItem', {
            item_type: 'bot',
            item_id: roomBotInfo.id,
            item_name: roomBotInfo.name
        });
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(StaticContext_1.StaticContext.Provider, { value: staticContextProps, children: (0, jsx_runtime_1.jsx)("div", { className: "w-full h-full overflow-hidden relative", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full overflow-auto bg-surface-container-default no-scrollbar scroll-smooth", ref: scrollContainerRef, children: [(0, jsx_runtime_1.jsx)("div", { className: "chat-module-container h-[calc(100%-108px)] md:rounded-3xl overflow-hidden", children: (0, jsx_runtime_1.jsx)(MessageContext_1.MessageContext.Provider, { value: messageContextParams, children: (0, jsx_runtime_1.jsx)(ChatModule_1.default, { editorContainerRef: editorContainerRef, editorAnchorRef: editorAnchorRef, textareaRef: textareaRef, topActionsSlot: (0, jsx_runtime_1.jsx)(TopActions_1.default, {}), scrollLayoutToTop: scrollLayoutToTop }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2 min-h-full bg-surface-default rounded-3xl p-6", ref: detailContainerRef, children: (0, jsx_runtime_1.jsx)(BotDetail_1.default, { type: "bot", id: roomBotInfo.id, author: roomBotInfo.author, logoUrl: roomBotInfo.logoUrl, name: roomBotInfo.name, tags: roomBotInfo.tagList, isOfficial: roomBotInfo.isOfficial, description: roomBotInfo.description, photos: roomBotInfo.photos, widgets: roomBotInfo.widgets, tgName: roomBotInfo.tgName, model: roomBotInfo.llmModel?.model, githubUrl: roomBotInfo.imComponent?.githubUrl, buttonSlot: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ShowDetailBtn_1.default, { isEditorSticky: isEditorSticky, scrollDetailIntoView: manuallyScrollDetailToTop, scrollLayoutToTop: scrollLayoutToTop }), (0, jsx_runtime_1.jsx)(ShareBtn_1.default, { type: "bot", id: roomBotInfo.id, trackerFn: shareTracker })] }) }) })] }) }) }), receivedReward && (0, jsx_runtime_1.jsx)(ReceivedReward, { onClose: onCloseReceivedRewardModal })] }));
}
