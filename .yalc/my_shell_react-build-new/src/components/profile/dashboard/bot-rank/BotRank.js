"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const QuestionMarkCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/QuestionMarkCircleIcon"));
const image_1 = __importDefault(require("next/image"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const rxjs_1 = require("rxjs");
const statistics_1 = require("../../../../apis/statistics.js");
const user_1 = require("../../../../apis/user.js");
const hidden_svg_1 = __importDefault(require("@/common/assets/icons/hidden.svg"));
const mainnet_svg_1 = __importDefault(require("@/common/assets/icons/mainnet.svg"));
const BotRankingFlag_1 = __importDefault(require("../../../../common/components/icons/rewards-center/BotRankingFlag.js"));
const spinner_1 = __importDefault(require("../../../../common/components/ui/spinner.js"));
const tooltip_1 = require("../../../../common/components/ui/tooltip.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const bot_1 = require("../../../../common/constants/enums/bot.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
function BotRank() {
    const router = (0, navigation_1.useRouter)();
    const [querying, setQuerying] = (0, react_2.useState)(false);
    const [data, setData] = (0, react_2.useState)([]);
    const [isOpen, setIsOpen] = (0, react_2.useState)(false);
    const tooltipRef = (0, react_2.useRef)(null);
    const [botUsageLoading, setBotUsageLoading] = (0, react_2.useState)(false);
    const [botUsage, setBotUsage] = (0, react_2.useState)();
    const wT = (0, next_intl_1.useTranslations)('workshop');
    const t = (0, next_intl_1.useTranslations)('profile');
    const rT = (0, next_intl_1.useTranslations)('reward_center');
    const getBotRanking = () => {
        setQuerying(true);
        (0, statistics_1.getBotsCurrentRanking)()
            .pipe((0, rxjs_1.finalize)(() => {
            setQuerying(false);
        }))
            .subscribe({
            next: res => {
                const sortedData = res.sort((a, b) => a.current?.ranking - b.current?.ranking);
                setData(sortedData);
            }
        });
    };
    const getBotUsage = async () => {
        setBotUsageLoading(true);
        const res = await (0, user_1.getUserBotUsageInfo)();
        if (res.success) {
            const data = res.data || {};
            setBotUsage({
                totalEngagedUsers: data.totalEngagedUsers,
                totalMessages: data.totalMessages
            });
        }
        setBotUsageLoading(false);
    };
    const judgeUpOrDown = (currentRanking, yesterdayRanking) => {
        const diff = yesterdayRanking - currentRanking;
        return diff > 0 ? 'up' : diff === 0 ? 'equal' : 'down';
    };
    const jumpToWorkshop = () => {
        router.replace('/robot-workshop?from=dashboard');
    };
    const handleToggle = () => {
        setIsOpen(true);
    };
    const handleMouseEnter = () => {
        setIsOpen(true);
    };
    const handleMouseLeave = () => {
        setIsOpen(false);
    };
    const handleClickOutside = (event) => {
        if (tooltipRef.current?.contains && !tooltipRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    (0, react_2.useEffect)(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    (0, react_2.useEffect)(() => {
        getBotRanking();
        getBotUsage();
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-3 w-full h-full", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-default text-sm", children: t('dashboard_items.bot_ranking') }), (0, jsx_runtime_1.jsxs)("div", { className: "h-[306px] relative flex flex-col overflow-hidden bg-surface-default p-3 gap-1.5 rounded-xl border border-default", style: {
                    boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.10)'
                }, children: [querying ||
                        (botUsageLoading && ((0, jsx_runtime_1.jsx)(react_1.Center, { position: "absolute", left: "0", top: "0", w: "full", h: "full", className: "bg-surface", zIndex: "10", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand" }) }))), !querying && !botUsageLoading && !data.length && ((0, jsx_runtime_1.jsx)(react_1.Center, { position: "absolute", left: "0", top: "0", w: "full", h: "full", padding: "16px", className: "bg-surface", zIndex: "10", children: (0, jsx_runtime_1.jsxs)(react_1.Flex, { flexDirection: "column", alignItems: "center", fontSize: "14px", lineHeight: "20px", gap: "8px", children: [(0, jsx_runtime_1.jsx)(react_1.Text, { textAlign: "center", w: "full", className: "text-secondary", children: t('dashboard_items.empty_bot_ranking_tip') }), (0, jsx_runtime_1.jsx)(react_1.Button, { onClick: jumpToWorkshop, boxShadow: "0px -1px 0px 0px #00000033 inset, 0px 1px 0px 0px #00000014", h: "36px", borderRadius: "100px", _hover: { bg: '#2B46D8' }, _active: { bg: '#1B33B6' }, className: "bg-primary w-full md:w-[150px] px-[20px] py-[8px] text-center text-white font-bold", children: t('dashboard_items.create_a_robot') })] }) })), (0, jsx_runtime_1.jsxs)(react_1.Flex, { padding: "8px", justifyContent: "space-between", fontSize: "14px", lineHeight: "20px", onClick: handleToggle, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: [(0, jsx_runtime_1.jsx)(react_1.Text, { className: "text-on-surface", children: t('dashboard_items.bot') }), (0, jsx_runtime_1.jsxs)(react_1.Flex, { gap: "4px", alignItems: "center", className: "text-on-surface", children: [t('dashboard_items.popularity_rank'), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: t('dashboard_items.bot_ranking_tip'), side: "top", children: (0, jsx_runtime_1.jsx)(QuestionMarkCircleIcon_1.default, { className: "w-4 h-4 stroke-icon-subtlest" }) })] })] }), (0, jsx_runtime_1.jsx)(react_1.List, { overflowY: "auto", display: "flex", flexGrow: "1", flexDirection: "column", gap: "8px", children: data.map(d => ((0, jsx_runtime_1.jsx)(react_1.ListItem, { children: (0, jsx_runtime_1.jsxs)(react_1.Flex, { p: "8px", justifyContent: "space-between", fontSize: "14px", lineHeight: "20px", children: [(0, jsx_runtime_1.jsxs)(react_1.Flex, { gap: "6px", flexGrow: 1, alignItems: "center", overflow: "hidden", children: [d.logo ? ((0, jsx_runtime_1.jsx)(react_1.Image, { display: "inline-block", w: "28px", h: "28px", borderRadius: "full", alt: "tts image", src: d.logo.includes('bot-logo') ? (0, common_helper_1.getAssetsUrl)(d.logo) : (0, common_helper_1.getAssetsUrlV2)(d.logo), objectFit: "cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "bg-[#F6F6F7] w-7 h-7 rounded-full" })), (0, jsx_runtime_1.jsx)(react_1.Text, { className: "truncate text-on-surface", children: d.name }), d.privateBotId != 0 &&
                                                (d.status === bot_1.BotStatusEnum.Public ? ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: wT('mainnet'), side: "top", children: (0, jsx_runtime_1.jsx)(image_1.default, { alt: "share", src: mainnet_svg_1.default, width: 10 }) })) : ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: wT('hidden'), side: "top", children: (0, jsx_runtime_1.jsx)(image_1.default, { alt: "share", src: hidden_svg_1.default, width: 10 }) })))] }), (0, jsx_runtime_1.jsxs)(react_1.Flex, { flexShrink: 0, pl: "20px", gap: "2px", justifyContent: "flex-end", alignItems: "center", children: [(0, jsx_runtime_1.jsx)(react_1.Text, { minW: "26px", textAlign: "center", className: "text-on-surface", children: d.current?.ranking }), (0, jsx_runtime_1.jsxs)(react_1.Flex, { gap: "2px", alignItems: "baseline", children: [d.yesterday ? (judgeUpOrDown(d.current?.ranking || 0, d.yesterday?.ranking || 0) !== 'equal' ? ((0, jsx_runtime_1.jsx)(BotRankingFlag_1.default, { className: `${judgeUpOrDown(d.current?.ranking || 0, d.yesterday?.ranking || 0) === 'down'
                                                            ? 'rotate-180'
                                                            : 'rotate-0'}`, color: judgeUpOrDown(d.current?.ranking || 0, d.yesterday?.ranking || 0) === 'down'
                                                            ? '#F1285B'
                                                            : '#0EE08B', fontSize: "12px" })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-[#737578] text-[8px]", children: "-" }))) : ((0, jsx_runtime_1.jsx)("span", { children: "-" })), (0, jsx_runtime_1.jsx)(react_1.Text, { w: "26px", textAlign: "center", className: "text-on-surface", children: d.yesterday &&
                                                            judgeUpOrDown(d.current?.ranking || 0, d.yesterday?.ranking || 0) !== 'equal' &&
                                                            Math.abs((d.current?.ranking || 0) - (d.yesterday?.ranking || 0)) })] })] })] }) }, d.botId))) }), (0, jsx_runtime_1.jsxs)("div", { className: "px-3 py-2 rounded-xl border border-default grid grid-cols-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center space-y-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(typography_1.Description, { size: "lg", weight: "medium", color: "subtler", children: rT('total_engaged_users') }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: rT('total_engaged_users_hover'), children: (0, jsx_runtime_1.jsx)(QuestionMarkCircleIcon_1.default, { className: "w-4 h-4 stroke-icon-subtlest ml-1" }) })] }), (0, jsx_runtime_1.jsx)(typography_1.Display, { size: "xs", color: "default", children: botUsage?.totalEngagedUsers || 0 })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center space-y-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(typography_1.Description, { size: "lg", weight: "medium", color: "subtler", children: rT('total_messages') }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: rT('total_messages_hover'), children: (0, jsx_runtime_1.jsx)(QuestionMarkCircleIcon_1.default, { className: "w-4 h-4 stroke-icon-subtlest ml-1" }) })] }), (0, jsx_runtime_1.jsx)(typography_1.Display, { size: "xs", className: "default", children: botUsage?.totalMessages || 0 })] })] })] })] }));
}
exports.default = BotRank;
