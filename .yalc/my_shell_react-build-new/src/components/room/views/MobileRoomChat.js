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
exports.default = MobileRoomChat;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowUpIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowUpIcon"));
const clsx_1 = __importDefault(require("clsx"));
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
const button_1 = require("../../../common/components/ui/button.js");
const user_1 = require("../../../common/constants/enums/user.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const BotDetail_1 = __importDefault(require("../../../components/chat/entity-detail/views/bot/views/BotDetail.js"));
const ShareBtn_1 = __importDefault(require("../../../components/chat/entity-detail/views/common/share/views/ShareBtn.js"));
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
function MobileRoomChat({ roomInfo, roomBotInfo }) {
    const { channelId: id } = roomInfo;
    const setDetail = (0, entity_1.useEntityStore)(state => state.setDetail);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const userId = (0, store_1.useUserStore)(state => state.userId);
    const energy = (0, store_1.useUserStore)(state => state.energy);
    const chatLocale = (0, next_intl_1.useTranslations)('chat');
    const t = (0, next_intl_1.useTranslations)('bot');
    const roomInputDisabledLocale = (0, next_intl_1.useTranslations)('chat.room');
    const sensors = (0, sensors_1.useSensors)();
    const { receivedReward, onReceivedReward, onCloseReceivedRewardModal } = (0, useReceivedReward_1.default)();
    const getChatList = (0, useCalcGetChatListFn_1.default)('room');
    const visitorNameParser = (0, react_1.useCallback)((nameTag) => {
        return `${chatLocale('visitor')}${nameTag}`;
    }, [chatLocale]);
    const { markMessageAsRead } = (0, useMarkMessageAsRead_1.default)(id);
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
    const { editorContainerRef, editorAnchorRef, textareaRef, chatContainerRef, detailContainerRef, detailScrollRef, contentActive, setContentActive, detailScrollY, showMobileDetail } = (0, useRoomLayout_1.default)();
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
    }, [roomInfo, setDetail, id]);
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
            name: roomBotInfo.name,
            logoUrl: roomBotInfo.logoUrl,
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
        energy,
        getChatList,
        isVisitor,
        leaveRoom,
        roomBotInfo.energyPerChat,
        roomBotInfo.logoUrl,
        roomBotInfo.name,
        roomInfo?.channelId,
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
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(StaticContext_1.StaticContext.Provider, { value: staticContextProps, children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full bg-surface-container-default flex flex-col overflow-hidden", children: [(0, jsx_runtime_1.jsx)(TopActions_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: "grow overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { ref: chatContainerRef, className: (0, clsx_1.default)('chat-module-container h-full w-full transition-transform duration-500 ease-in-out', !contentActive && '-translate-y-full'), children: (0, jsx_runtime_1.jsx)(MessageContext_1.MessageContext.Provider, { value: messageContextParams, children: (0, jsx_runtime_1.jsx)(ChatModule_1.default, { editorContainerRef: editorContainerRef, editorAnchorRef: editorAnchorRef, textareaRef: textareaRef, showMobileDetail: showMobileDetail }) }) }), (0, jsx_runtime_1.jsxs)("div", { ref: detailContainerRef, className: (0, clsx_1.default)('h-full w-full overflow-hidden transition-transform duration-500 ease-in-out transform bg-surface-default relative', contentActive ? 'translate-y-0' : '-translate-y-full'), children: [(0, jsx_runtime_1.jsx)("div", { ref: detailScrollRef, className: "w-full h-full p-4 overflow-auto", children: (0, jsx_runtime_1.jsx)(BotDetail_1.default, { type: "bot", id: roomBotInfo.id, author: roomBotInfo.author, logoUrl: roomBotInfo.logoUrl, name: roomBotInfo.name, tags: roomBotInfo.tagList, isOfficial: roomBotInfo.isOfficial, description: roomBotInfo.description, photos: roomBotInfo.photos, widgets: roomBotInfo.widgets, tgName: roomBotInfo.tgName, model: roomBotInfo.llmModel?.model, githubUrl: roomBotInfo.imComponent?.githubUrl, buttonSlot: (0, jsx_runtime_1.jsx)(ShareBtn_1.default, { type: "bot", id: roomBotInfo.id, trackerFn: shareTracker }) }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", color: "brand", className: (0, clsx_1.default)('absolute left-1/2 -translate-x-1/2 bottom-8 px-6 bg-surface-search-field shadow-modal border-none transition-all duration-300', detailScrollY > 0 && 'w-11 h-11 px-0'), onClick: setContentActive, children: (0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center space-x-[6px]", children: [(0, jsx_runtime_1.jsx)(ArrowUpIcon_1.default, { className: "w-5 h-5" }), (0, jsx_runtime_1.jsx)("span", { className: (0, clsx_1.default)(detailScrollY > 0 && 'hidden'), children: t('back_to_chat') })] }) })] })] })] }) }), receivedReward && (0, jsx_runtime_1.jsx)(ReceivedReward, { onClose: onCloseReceivedRewardModal })] }));
}
