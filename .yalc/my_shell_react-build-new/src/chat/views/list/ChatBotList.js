"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatBotList;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const MenuLink_1 = __importDefault(require("../../../common/components/MenuLink.js"));
const NoBotPlaceholder_1 = __importDefault(require("../../../common/components/NoBotPlaceholder.js"));
const search_bar_1 = require("../../../common/components/ui/search-bar.js");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const identityService_1 = require("../../../common/services/identityService.js");
const useGetBotList_1 = __importDefault(require("../../../hooks/bot/useGetBotList.js"));
const store_1 = require("../../../services/store/index.js");
const BotList_1 = __importDefault(require("../BotList.js"));
const Header_1 = __importDefault(require("./Header.js"));
function ChatBotList() {
    const t = (0, next_intl_1.useTranslations)();
    const setBotList = (0, store_1.useBotStore)(state => state.setBotList);
    const [filterSearchValue, setFilterSearchValue] = (0, react_1.useState)('');
    const { loading } = (0, useGetBotList_1.default)('', filterSearchValue);
    const scrollRef = (0, react_1.useRef)(null);
    const { pathname } = (0, usePathLocale_1.usePathLocale)();
    const params = (0, navigation_1.useParams)();
    const isExplorePage = (0, react_1.useMemo)(() => {
        return pathname.includes('/explore');
    }, [pathname]);
    const exploreSearch = (0, react_1.useRef)('');
    exploreSearch.current =
        (typeof window !== 'undefined' &&
            typeof identityService_1.identityService === 'object' &&
            identityService_1.identityService?.getPageSearch('explore-page')) ||
            '';
    const botList = (0, store_1.useBotStore)(state => state.botList);
    const scrollToTargetItem = (0, react_1.useCallback)(() => {
        const isBotChat = pathname.startsWith('/chat');
        const isRoomChat = pathname.startsWith('/room');
        const { botId } = params;
        const { roomId } = params;
        if (!isBotChat && !isRoomChat)
            return;
        const targetElement = document.getElementById(`${isRoomChat ? `room-${roomId}` : `bot-${botId}`}`);
        const listElement = document.getElementById('chat_list');
        if (targetElement && listElement) {
            targetElement.scrollIntoView({ block: 'center', behavior: 'auto' });
        }
    }, [params, pathname]);
    (0, react_1.useEffect)(() => {
        setTimeout(() => {
            scrollToTargetItem();
        });
    }, [botList.length, scrollToTargetItem]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full flex flex-col overflow-hidden", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-3 shrink-0 px-4 md:px-6", children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(search_bar_1.SearchBar, { placeholder: t('workshop.search_tips'), maxLength: 32, searchValue: filterSearchValue, onSearchChange: value => {
                            setBotList([]);
                            setFilterSearchValue(value);
                        } })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col px-4 md:px-3 mt-3", children: (0, jsx_runtime_1.jsx)(MenuLink_1.default, { title: t('explore'), description: t('explore_bots'), isSelected: isExplorePage, linkUrl: `/explore${exploreSearch.current}` }) }), (0, jsx_runtime_1.jsx)("div", { id: "chat_list", ref: scrollRef, className: "overflow-y-auto px-2 md:px-3", children: (0, jsx_runtime_1.jsx)("div", { children: !loading && botList && botList.length === 0 ? ((0, jsx_runtime_1.jsx)(NoBotPlaceholder_1.default, {})) : ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: null, children: (0, jsx_runtime_1.jsx)(BotList_1.default, { loading: loading }) })) }) })] }));
}
