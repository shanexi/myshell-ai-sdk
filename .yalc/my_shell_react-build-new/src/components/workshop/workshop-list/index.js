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
const jsx_runtime_1 = require("react/jsx-runtime");
const dynamic_1 = __importDefault(require("next/dynamic"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const EnergyProgress_1 = __importDefault(require("../../../common/components/EnergyProgress.js"));
const MenuLink_1 = __importDefault(require("../../../common/components/MenuLink.js"));
const accordion_1 = require("../../../common/components/ui/accordion.js");
const search_bar_1 = require("../../../common/components/ui/search-bar.js");
const typography_1 = require("../../../common/components/ui/typography.js");
const user_1 = require("../../../common/constants/enums/user.js");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const identityService_1 = require("../../../common/services/identityService.js");
const WorkShopChatListSkeleton_1 = __importDefault(require("../../../components/skeleton/workshop/WorkShopChatListSkeleton.js"));
const sensors_1 = require("../../../lib/sensors/index.js");
const store_1 = require("../../../services/store/index.js");
const MyBotList = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./my-bots/MyBotList.js'))), {
    ssr: false,
    loading: () => (0, jsx_runtime_1.jsx)(WorkShopChatListSkeleton_1.default, {})
});
const ChatWidgetList = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./chat-widget/ChatWidgetList.js'))), {
    ssr: false,
    loading: () => (0, jsx_runtime_1.jsx)(WorkShopChatListSkeleton_1.default, {})
});
const ToolboxList = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./toolbox/ToolboxList.js'))), {
    ssr: false,
    loading: () => (0, jsx_runtime_1.jsx)(WorkShopChatListSkeleton_1.default, {})
});
function WorkshopList() {
    const { pathname } = (0, usePathLocale_1.usePathLocale)();
    const t = (0, next_intl_1.useTranslations)();
    const selectedType = (() => {
        switch (true) {
            case pathname === '/robot-workshop':
                return 'explore';
            case pathname.includes('widget'):
                return 'widget';
            case pathname.includes('toolbox'):
                return 'toolbox';
            default:
                return 'bot';
        }
    })();
    const params = (0, navigation_1.useParams)();
    const botId = params?.botId;
    const toolboxId = params?.toolboxId;
    const widgetId = params?.widgetId;
    const selectedId = botId || widgetId || toolboxId;
    const visitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const isVisitor = visitor === user_1.VisitorEnum.YES;
    const energy = (0, store_1.useUserStore)(state => state.energy);
    const dailyEnergy = (0, store_1.useUserStore)(state => state.dailyEnergy);
    const token = (0, store_1.useUserStore)(state => state.token);
    const sensors = (0, sensors_1.useSensors)();
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const workshopT = (0, next_intl_1.useTranslations)('workshop');
    const workshopListInitialized = (0, store_1.useWorkshopStore)(state => state.workshopListInitialized);
    const initializeScrolled = (0, store_1.useWorkshopStore)(state => state.initializeScrolled);
    const setInitializeScrolled = (0, store_1.useWorkshopStore)(state => state.setInitializeScrolled);
    const poped = (0, store_1.useWorkshopStore)(state => state.poped);
    const setPoped = (0, store_1.useWorkshopStore)(state => state.setPoped);
    const newlyAdded = (0, store_1.useWorkshopStore)(state => state.newlyAdded);
    const setNewlyAdded = (0, store_1.useWorkshopStore)(state => state.setNewlyAdded);
    const scrollRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (selectedId && workshopListInitialized) {
            const scrollId = `${selectedType}-${selectedId}`;
            const ele = document.getElementById(scrollId);
            if (ele) {
                if (!initializeScrolled) {
                    setTimeout(() => {
                        ele.scrollIntoView({ block: 'nearest' });
                        setInitializeScrolled(true);
                    });
                }
                else {
                    if (poped) {
                        setTimeout(() => {
                            ele.scrollIntoView({ block: 'nearest' });
                            setPoped(false);
                        });
                    }
                    if (newlyAdded) {
                        setTimeout(() => {
                            ele.scrollIntoView({ block: 'nearest' });
                            setNewlyAdded(false);
                        }, 300);
                    }
                }
            }
        }
    }, [selectedId, workshopListInitialized, initializeScrolled, poped, selectedType, newlyAdded]);
    const widgetSearch = (0, react_1.useRef)('');
    widgetSearch.current =
        (typeof window !== 'undefined' &&
            typeof identityService_1.identityService === 'object' &&
            identityService_1.identityService?.getPageSearch('widgets-page')) ||
            '';
    const [filterSearchValue, setFilterSearchValue] = (0, react_1.useState)('');
    const onSearchChange = (value) => {
        setFilterSearchValue(value);
        sensors?.track('Search', {
            search_scene: 'widgetlist',
            search_content: value
        });
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-col items-center mb-3 flex flex-shrink-0", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center py-5 md:py-6 px-4 md:px-6 pb-3 w-full", children: [(0, jsx_runtime_1.jsx)(typography_1.Display, { size: "md", className: "flex-1 flex items-center text-default", children: workshopT('tab_title') }), !!token && !!dailyEnergy && ((0, jsx_runtime_1.jsx)(EnergyProgress_1.default, { dailyEnergy: dailyEnergy, energy: energy, className: "flex relative items-center" }))] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full px-4 md:px-6", children: (0, jsx_runtime_1.jsx)(search_bar_1.SearchBar, { placeholder: t('workshop.search_tips'), maxLength: 32, searchValue: filterSearchValue, onSearchChange: onSearchChange }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "px-1 md:px-3", children: (0, jsx_runtime_1.jsx)(MenuLink_1.default, { title: workshopT('widgets_title'), description: workshopT('widgets_description'), linkUrl: isMobile ? `/robot-workshop/widgets${widgetSearch.current}` : `/robot-workshop${widgetSearch.current}`, isSelected: selectedType === 'explore', onClick: () => {
                        sensors?.track('EnterWidgetCenter');
                    } }) }), (0, jsx_runtime_1.jsx)("div", { className: "px-1 md:px-3 flex-grow overflow-y-auto scroll-smooth", ref: scrollRef, children: (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: null, children: (0, jsx_runtime_1.jsxs)(accordion_1.Accordion, { type: "multiple", defaultValue: ['my_bots', 'toolbox', 'widget'], className: "w-full", children: [(0, jsx_runtime_1.jsx)(MyBotList, { scrollRef: scrollRef, filterValue: filterSearchValue, selectedType: selectedType, selectedId: selectedId }), isVisitor ? null : ((0, jsx_runtime_1.jsx)(ToolboxList, { scrollRef: scrollRef, filterValue: filterSearchValue, selectedType: selectedType, selectedId: selectedId })), (0, jsx_runtime_1.jsx)(ChatWidgetList, { scrollRef: scrollRef, filterValue: filterSearchValue, selectedType: selectedType, selectedId: selectedId })] }) }) })] }));
}
exports.default = (0, react_1.memo)(WorkshopList);
