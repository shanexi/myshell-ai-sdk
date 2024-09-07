"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CardItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const CheckBadgeIcon_1 = __importDefault(require("@heroicons/react/24/solid/CheckBadgeIcon"));
const StarIcon_1 = __importDefault(require("@heroicons/react/24/solid/StarIcon"));
const clsx_1 = __importDefault(require("clsx"));
const dayjs_1 = __importDefault(require("dayjs"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const useMessageParams_1 = __importDefault(require("../../../../chat-new/hooks/useMessageParams.js"));
const useNewChatStore_1 = require("../../../../chat-new/services/useNewChatStore.js");
const RunningInfo_1 = require("../../../../chat/views/chat-body/reply-message/RunningInfo.js");
const avatar_1 = require("../../../../common/components/ui/avatar.js");
const badge_1 = __importDefault(require("../../../../common/components/ui/badge.js"));
const link_1 = __importDefault(require("../../../../common/components/ui/link.js"));
const tooltip_1 = require("../../../../common/components/ui/tooltip.js");
const store_1 = require("../../../../services/store/index.js");
const ListRoomAvatar_1 = __importDefault(require("./ListRoomAvatar.js"));
function CardItem({ type, active, id, name, logoUrl, logoUrls, isOfficial, desc, lastMsg, unreadCount = 0, pinned, isChannelEntry }) {
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const commonT = (0, next_intl_1.useTranslations)('common');
    const errorT = (0, next_intl_1.useTranslations)('request.error');
    const botLastMessageMap = (0, store_1.useBotStore)(state => state.botLastMessageMap);
    const textInputMap = (0, store_1.useChatStore)(state => state.textInputMap);
    const localDraftMessageMap = (0, useNewChatStore_1.useNewChatStore)(state => state.localDraftMessageMap);
    const uploadedFilesLength = (0, store_1.useChatStore)(state => (state.fileUpload.filesMap[id] || []).length);
    const { lastMessageInfo } = (0, useMessageParams_1.default)('room', id);
    const lastMessage = (0, react_1.useMemo)(() => {
        if (type === 'bot' && botLastMessageMap.get(id)) {
            const botLastMessage = botLastMessageMap.get(id);
            return {
                text: botLastMessage.text,
                createdDateUnix: botLastMessage.createdDateUnix
            };
        }
        if (type === 'room' && lastMessageInfo) {
            return {
                text: lastMessageInfo.text,
                createdDateUnix: lastMessageInfo.createdDateUnix
            };
        }
        if (lastMsg) {
            return lastMsg;
        }
        return null;
    }, [botLastMessageMap, id, lastMessageInfo, lastMsg, type]);
    const lastMessageDisplayTime = (0, react_1.useMemo)(() => {
        if (!lastMessage)
            return '';
        const dateUnix = Number(lastMessage.createdDateUnix);
        let displayTime;
        if ((0, dayjs_1.default)().isSame((0, dayjs_1.default)(dateUnix), 'day')) {
            displayTime = (0, dayjs_1.default)(dateUnix).format('HH:mm');
        }
        else if ((0, dayjs_1.default)().isSame((0, dayjs_1.default)(dateUnix), 'year')) {
            displayTime = (0, dayjs_1.default)(dateUnix).format('MM-DD');
        }
        else {
            displayTime = (0, dayjs_1.default)(dateUnix).format('YYYY-MM-DD');
        }
        return displayTime;
    }, [lastMessage]);
    const draftMessage = (0, react_1.useMemo)(() => {
        if (type === 'bot') {
            if (id === '188') {
                return localDraftMessageMap[`bot-${id}`]?.text;
            }
            if (!textInputMap[id] && uploadedFilesLength > 0) {
                return new Array(uploadedFilesLength)
                    .fill(0)
                    .map(() => `[${commonT('file')}]`)
                    .join('');
            }
            return textInputMap[id];
        }
        return undefined;
    }, [type, id, textInputMap, uploadedFilesLength, localDraftMessageMap, commonT]);
    const errorMessage = (0, react_1.useMemo)(() => (0, RunningInfo_1.getErrorMsgByType)(errorT, botLastMessageMap.get(id)?.runningError?.errorType), [botLastMessageMap, errorT, id]);
    return ((0, jsx_runtime_1.jsx)("li", { className: (0, clsx_1.default)('text-default rounded-xl h-[72px] flex items-center px-2 md:px-3 cursor-pointer', active ? 'bg-surface-accent-blue-subtler' : 'bg-transparent hover:bg-surface-container-hovered'), id: `${type}-${id}`, children: (0, jsx_runtime_1.jsx)(link_1.default, { className: "w-full", href: `/${type === 'bot' ? 'chat' : 'room'}/${id}`, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 w-full", children: [(0, jsx_runtime_1.jsx)("div", { className: "relative flex-shrink-0", children: type === 'room' ? ((0, jsx_runtime_1.jsx)(ListRoomAvatar_1.default, { avatarList: logoUrls })) : ((0, jsx_runtime_1.jsx)(avatar_1.Avatar, { variant: "bot", className: "size-14 md:size-12 rounded-xl", src: logoUrl })) }), (0, jsx_runtime_1.jsxs)("div", { className: "relative h-12 flex flex-col justify-center grow overflow-hidden gap-1.5 md:gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center gap-2", children: [(0, jsx_runtime_1.jsxs)("span", { className: (0, clsx_1.default)('flex items-center gap-1 text-base overflow-hidden text-default'), children: [(0, jsx_runtime_1.jsx)("p", { className: "line-clamp-1 break-all", children: name }), isOfficial && ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: chatT('official_bot'), showArrow: false, children: (0, jsx_runtime_1.jsx)(CheckBadgeIcon_1.default, { className: "size-4 fill-icon-brand" }) }))] }), !isChannelEntry && ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-subtlest leading-[14px] inline-flex gap-4 flex-shrink-0", children: lastMessageDisplayTime }))] }), isChannelEntry ? ((0, jsx_runtime_1.jsx)("div", { className: "truncate text-sm text-subtler", children: chatT('room.bot_desc') })) : ((0, jsx_runtime_1.jsxs)("div", { className: "relative w-full overflow-hidden flex gap-1 items-center", children: [!!draftMessage && ((0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-surface-critical-default mr-1 shrink-0", children: [chatT('draft'), " "] })), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-subtler grow", children: errorMessage || draftMessage || lastMessage?.text }), unreadCount ? ((0, jsx_runtime_1.jsx)(badge_1.default, { status: "cardUnRead", count: unreadCount, className: "flex justify-center items-center" })) : (pinned && (0, jsx_runtime_1.jsx)(StarIcon_1.default, { className: "size-4 shrink-0 text-[#FDA500]" }))] }))] })] }) }) }));
}
