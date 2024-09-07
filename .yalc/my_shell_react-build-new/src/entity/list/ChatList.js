"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatList;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const Header_1 = __importDefault(require("../../chat/views/list/Header.js"));
const MenuLink_1 = __importDefault(require("../../common/components/MenuLink.js"));
const NoBotPlaceholder_1 = __importDefault(require("../../common/components/NoBotPlaceholder.js"));
const search_bar_1 = require("../../common/components/ui/search-bar.js");
const separator_1 = require("../../common/components/ui/separator.js");
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
const identityService_1 = require("../../common/services/identityService.js");
const MenuListSkeleton_1 = __importDefault(require("../../components/skeleton/common/MenuListSkeleton.js"));
const sensors_1 = require("../../lib/sensors/index.js");
const entity_1 = require("../../services/store/entity.js");
const CardItem_1 = __importDefault(require("../../components/room/views/list/CardItem.js"));
const useCalcGetChatListFn_1 = __importDefault(require("../hooks/useCalcGetChatListFn.js"));
function ChatList() {
    const scrollRef = (0, react_1.useRef)(null);
    const t = (0, next_intl_1.useTranslations)();
    const sensors = (0, sensors_1.useSensors)();
    const [filterSearchValue, setFilterSearchValue] = (0, react_1.useState)('');
    const params = (0, navigation_1.useParams)();
    const { roomId, botId } = params;
    const { pathname } = (0, usePathLocale_1.usePathLocale)();
    const isExplorePage = (0, react_1.useMemo)(() => {
        return pathname.includes('/explore');
    }, [pathname]);
    const botChat = (0, react_1.useMemo)(() => {
        return pathname.startsWith('/chat') || pathname.startsWith('/gallery');
    }, [pathname]);
    const roomChat = (0, react_1.useMemo)(() => {
        return pathname.startsWith('/room');
    }, [pathname]);
    const exploreSearch = (0, react_1.useRef)('');
    exploreSearch.current =
        (typeof window !== 'undefined' &&
            typeof identityService_1.identityService === 'object' &&
            identityService_1.identityService?.getPageSearch('explore-page')) ||
            '';
    const chatListStatus = (0, entity_1.useEntityStore)(state => state.chatListStatus);
    const chatList = (0, entity_1.useEntityStore)(state => state.chatList);
    const getChatList = (0, useCalcGetChatListFn_1.default)('bot');
    const onSearchChange = (value) => {
        setFilterSearchValue(value);
        sensors?.track('Search', {
            search_scene: 'chatlist',
            search_content: value
        });
    };
    const filteredChatList = (0, react_1.useMemo)(() => {
        const lowerCasedFilterSearchValue = filterSearchValue.toLowerCase();
        return chatList.filter(item => item.name.toLowerCase().includes(lowerCasedFilterSearchValue));
    }, [chatList, filterSearchValue]);
    const skeletonNum = (0, react_1.useMemo)(() => {
        let num;
        switch (chatListStatus) {
            case entity_1.ListStatus.APPENDING:
                num = chatList.length + 1;
                break;
            case entity_1.ListStatus.REMOVING:
                num = chatList.length - 1;
                break;
            default:
                num = Math.max(chatList.length, 6);
        }
        return num;
    }, [chatList.length, chatListStatus]);
    const scrollToTargetItem = (0, react_1.useCallback)(() => {
        const isBotChat = pathname.startsWith('/chat');
        const isRoomChat = pathname.startsWith('/room');
        if (!isBotChat && !isRoomChat)
            return;
        const targetElement = document.getElementById(`${isRoomChat ? `room-${roomId}` : `bot-${botId}`}`);
        const listElement = document.getElementById('chat_list');
        if (targetElement && listElement) {
            targetElement.scrollIntoView({ block: 'center', behavior: 'auto' });
        }
    }, [botId, pathname, roomId]);
    (0, react_1.useEffect)(() => {
        setTimeout(() => {
            scrollToTargetItem();
        });
    }, [chatList.length, scrollToTargetItem]);
    const fetchList = async () => {
        try {
            await getChatList('initialize');
        }
        catch (e) {
            console.error(e);
        }
    };
    (0, react_1.useEffect)(() => {
        if (!chatList.length && chatListStatus === entity_1.ListStatus.UNINITIALIZED) {
            fetchList();
        }
    }, [chatList.length, chatListStatus]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full flex flex-col overflow-hidden", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-3 shrink-0 px-4 md:px-6", children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(search_bar_1.SearchBar, { placeholder: t('workshop.search_tips'), maxLength: 32, searchValue: filterSearchValue, onSearchChange: onSearchChange })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col px-4 md:px-3 mt-3", children: (0, jsx_runtime_1.jsx)(MenuLink_1.default, { title: t('explore'), description: t('explore_bots'), isSelected: isExplorePage, linkUrl: `/explore${exploreSearch.current}` }) }), (0, jsx_runtime_1.jsx)(separator_1.Separator, { className: "w-auto my-3 mx-4 md:mx-3" }), (0, jsx_runtime_1.jsxs)("div", { id: "chat_list", ref: scrollRef, className: "overflow-y-auto px-2 md:px-3", children: [chatListStatus === entity_1.ListStatus.READY &&
                        (filteredChatList.length ? ((0, jsx_runtime_1.jsx)("ul", { children: filteredChatList.map(item => {
                                const itemKey = `${item.type}-${item.id}`;
                                const isActive = botChat ? itemKey === `bot-${botId}` : roomChat ? itemKey === `room-${roomId}` : false;
                                return ((0, jsx_runtime_1.jsx)(CardItem_1.default, { type: item.type, active: isActive, id: item.id, name: item.name, isOfficial: item.isOfficial, logoUrl: item.logoUrl, logoUrls: item.logoUrls, lastMsg: item.lastMessage, unreadCount: item.unreadMessageCount, pinned: item.pinned, isChannelEntry: item.isChannelEntry }, itemKey));
                            }) })) : ((0, jsx_runtime_1.jsx)(NoBotPlaceholder_1.default, {}))), chatListStatus !== entity_1.ListStatus.READY && (0, jsx_runtime_1.jsx)(MenuListSkeleton_1.default, { number: skeletonNum })] })] }));
}
