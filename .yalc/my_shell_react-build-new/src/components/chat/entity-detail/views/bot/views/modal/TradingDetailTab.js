"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TradingDetailTab;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_tabs_1 = require("@radix-ui/react-tabs");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const typography_1 = require("../../../../../../../common/components/ui/typography.js");
const CommentList_1 = __importDefault(require("../../../../../../../components/chat/entity-detail/views/bot/views/modal/CommentList.js"));
const utils_1 = require("../../../../../../../lib/utils.js");
const ActivityTable_1 = __importDefault(require("./ActivityTable.js"));
const HoldersList_1 = __importDefault(require("./HoldersList.js"));
function TradingDetailTab(props) {
    const { curve, topTradeOrders, topHolers, holdersCount = 0, isSticky } = props;
    const [selectedTab, setSelectedTab] = (0, react_1.useState)('comments');
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp');
    const onTabChange = (value) => {
        setSelectedTab(value);
    };
    const tabs = (0, react_1.useMemo)(() => [
        {
            label: ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", color: selectedTab === 'comments' ? 'brand' : 'subtler', weight: "medium", children: t('curve_comments.tab_name') }) })),
            value: 'comments',
            children: (0, jsx_runtime_1.jsx)(CommentList_1.default, { curve: curve })
        },
        {
            label: ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", color: selectedTab === 'activity' ? 'brand' : 'subtler', weight: "medium", children: t('activity') }) })),
            value: 'activity',
            children: (0, jsx_runtime_1.jsx)(ActivityTable_1.default, { orders: topTradeOrders })
        },
        {
            label: ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", color: selectedTab === 'holders' ? 'brand' : 'subtler', weight: "medium", children: t('holders') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: selectedTab === 'holders' ? 'brand' : 'subtler', children: holdersCount })] })),
            value: 'holders',
            children: (0, jsx_runtime_1.jsx)(HoldersList_1.default, { holders: topHolers })
        }
    ], [holdersCount, selectedTab, topHolers, topTradeOrders]);
    return ((0, jsx_runtime_1.jsxs)(react_tabs_1.Tabs, { defaultValue: "balances", value: selectedTab, onValueChange: onTabChange, className: "w-full relative", children: [(0, jsx_runtime_1.jsx)(react_tabs_1.TabsList, { className: (0, utils_1.cn)('flex items-center gap-6 md:gap-5 border-b border-default', isSticky && 'sticky top-0 bg-surface-default z-50'), children: tabs.map(tab => ((0, jsx_runtime_1.jsx)(react_tabs_1.TabsTrigger, { value: tab.value, className: (0, utils_1.cn)('py-1.5 border-b-2', selectedTab === tab.value ? 'border-brand' : 'border-transparent'), children: tab.label }, tab.value))) }), tabs.map(tab => ((0, jsx_runtime_1.jsx)(react_tabs_1.TabsContent, { value: tab.value, className: "pb-2 md:pb-0 outline-0", children: tab.children }, tab.value)))] }));
}
