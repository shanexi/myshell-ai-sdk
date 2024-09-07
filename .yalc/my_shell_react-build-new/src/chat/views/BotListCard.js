"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const CheckBadgeIcon_1 = __importDefault(require("@heroicons/react/24/solid/CheckBadgeIcon"));
const StarIcon_1 = __importDefault(require("@heroicons/react/24/solid/StarIcon"));
const clsx_1 = __importDefault(require("clsx"));
const dayjs_1 = __importDefault(require("dayjs"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const avatar_1 = require("../../common/components/ui/avatar.js");
const badge_1 = __importDefault(require("../../common/components/ui/badge.js"));
const link_1 = __importDefault(require("../../common/components/ui/link.js"));
const tooltip_1 = require("../../common/components/ui/tooltip.js");
const bot_1 = require("../../common/constants/enums/bot.js");
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
const utils_1 = require("../../lib/utils.js");
const store_1 = require("../../services/store/index.js");
const RunningInfo_1 = require("./chat-body/reply-message/RunningInfo.js");
function BotListCard(props) {
    const { bot, selectedBotId } = props;
    const { isMobile, pathname } = (0, usePathLocale_1.usePathLocale)();
    const user = (0, store_1.useUserStore)(state => state.user);
    const setInputType = (0, store_1.useChatStore)(state => state.setInputType);
    const textInputMap = (0, store_1.useChatStore)(state => state.textInputMap);
    const uploadedFilesLength = (0, store_1.useChatStore)(state => (state.fileUpload.filesMap[bot.id] || []).length);
    const botLastMessageMap = (0, store_1.useBotStore)(state => state.botLastMessageMap);
    const t = (0, next_intl_1.useTranslations)('workshop');
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const commonT = (0, next_intl_1.useTranslations)('common');
    const errorT = (0, next_intl_1.useTranslations)('request.error');
    const botLastMessage = (0, react_1.useMemo)(() => {
        return botLastMessageMap.get(bot.id);
    }, [bot.id, botLastMessageMap]);
    const onSelectedBotIdChanged = (e, bot) => {
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);
        if ((searchParams && searchParams.get('bot') === '1') || searchParams.get('invite') === '1') {
            window.history.pushState(null, '', window.location.pathname);
        }
        setInputType('text');
    };
    const url = isMobile ? `/m/chat/${bot.id}?name=${bot.name}` : `/chat/${bot.id}`;
    const showDraft = (isMobile || selectedBotId !== bot.id) && (textInputMap[bot.id] || uploadedFilesLength > 0);
    const isChatPage = pathname.startsWith('/chat');
    const errorMessage = (0, react_1.useMemo)(() => (0, RunningInfo_1.getErrorMsgByType)(errorT, botLastMessage?.runningError?.errorType), [botLastMessage?.runningError?.errorType]);
    const draft = (0, react_1.useMemo)(() => {
        const isDraft = isMobile || selectedBotId !== bot.id;
        const text = botLastMessage?.text || '';
        if (isDraft) {
            if (!textInputMap[bot.id] && uploadedFilesLength > 0) {
                return new Array(uploadedFilesLength)
                    .fill(0)
                    .map(() => `[${commonT('file')}]`)
                    .join('');
            }
            return textInputMap[bot.id] || text;
        }
        return text;
    }, [commonT, selectedBotId, bot.id, uploadedFilesLength, botLastMessage?.text]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: bot && ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('text-default rounded-xl h-[72px] cursor-pointer', isChatPage && selectedBotId === bot.id && !isMobile
                ? 'bg-surface-accent-blue-subtler'
                : 'bg-transparent hover:bg-surface-container-hovered'), id: `bot-${bot.id}`, children: (0, jsx_runtime_1.jsx)(link_1.default, { href: url, prefetch: true, className: "flex justify-between w-full px-2 md:px-3 h-full items-center relative", onClick: e => onSelectedBotIdChanged(e, bot), children: (0, jsx_runtime_1.jsxs)("div", { ...(props.listIndex && props.listIndex == 1 && { 'data-agent-need-driver': true }), className: "flex items-center space-x-2 w-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex-shrink-0", children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { size: isMobile ? '2xl' : 'xl', src: bot.logoUrl }), user?.id == bot.userId && !bot.isOfficalAssistantBot ? ((0, jsx_runtime_1.jsx)("div", { className: "absolute right-0 bottom-0", children: (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { showArrow: false, description: bot.status === bot_1.BotStatusEnum.Public ? t('mainnet') : t('testnet'), children: (0, jsx_runtime_1.jsx)(badge_1.default, { status: bot.status === bot_1.BotStatusEnum.Public ? 'public' : 'private' }) }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "shrink-0 w-[10px]" }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative h-12 flex flex-col justify-center grow overflow-hidden space-y-1.5 md:space-y-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center space-x-2", children: [(0, jsx_runtime_1.jsxs)("span", { className: (0, clsx_1.default)('flex items-center space-x-[4px] text-base overflow-hidden text-default'), children: [(0, jsx_runtime_1.jsx)("p", { className: "line-clamp-1 break-all", children: bot.name }), bot?.official && ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { showArrow: false, description: chatT('official_bot'), children: (0, jsx_runtime_1.jsx)(CheckBadgeIcon_1.default, { className: "w-4 h-4 fill-icon-brand" }) }))] }), !bot.isChannelEntry && ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-subtlest leading-[14px] inline-flex space-x-[16px] flex-shrink-0", children: botLastMessage
                                                ? (0, dayjs_1.default)().isSame((0, dayjs_1.default)(botLastMessage.createdDate), 'day')
                                                    ? (0, dayjs_1.default)(botLastMessage.createdDate).format('HH:mm')
                                                    : (0, dayjs_1.default)().isSame((0, dayjs_1.default)(botLastMessage.createdDate), 'year')
                                                        ? (0, dayjs_1.default)(botLastMessage.createdDate).format('MM-DD')
                                                        : (0, dayjs_1.default)(botLastMessage.createdDate).format('YYYY-MM-DD')
                                                : '' }))] }), bot.isChannelEntry ? ((0, jsx_runtime_1.jsx)("div", { className: "truncate text-sm text-subtler", children: chatT('room.bot_desc') })) : ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('relative w-full overflow-hidden flex space-x-1 items-center', !showDraft && !(bot.unreadMessageCount > 0) && 'h-4'), children: [showDraft && ((0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-surface-critical-default mr-1 shrink-0", children: [chatT('draft'), " "] })), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('truncate text-sm text-subtler', bot?.pinned && 'pr-4', bot.unreadMessageCount > 0 && 'pr-6'), children: errorMessage || draft }), bot.unreadMessageCount > 0 ? ((0, jsx_runtime_1.jsx)(badge_1.default, { status: "cardUnRead", count: bot.unreadMessageCount, className: "absolute right-0 top-0 flex justify-center items-center" })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: bot?.pinned && (0, jsx_runtime_1.jsx)(StarIcon_1.default, { className: "absolute right-0 top-0 w-4 h-4 text-[#FDA500]" }) }))] }))] })] }) }) })) }));
}
exports.default = BotListCard;
