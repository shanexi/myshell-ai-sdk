"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurveDetail = CurveDetail;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowLeftIcon"));
const ExclamationTriangleIcon_1 = __importDefault(require("@heroicons/react/24/outline/ExclamationTriangleIcon"));
const lodash_es_1 = require("lodash-es");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_use_1 = require("react-use");
const agentPump_1 = require("../../../apis/agentPump.js");
const bot_1 = require("../../../apis/bot.js");
const button_1 = require("../../../common/components/ui/button.js");
const icon_button_1 = require("../../../common/components/ui/icon-button.js");
const link_1 = __importDefault(require("../../../common/components/ui/link.js"));
const spinner_1 = __importDefault(require("../../../common/components/ui/spinner.js"));
const typography_1 = require("../../../common/components/ui/typography.js");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const BotDetail_1 = __importDefault(require("../../../components/chat/entity-detail/views/bot/views/BotDetail.js"));
const BotPin_1 = __importDefault(require("../../../components/chat/entity-detail/views/bot/views/modal/BotPin.js"));
const ShareBtn_1 = __importDefault(require("../../../components/chat/entity-detail/views/bot/views/modal/ShareBtn.js"));
const launch_trade_1 = __importDefault(require("./components/launch-trade/index.js"));
function CurveDetail(props) {
    const { symbol } = props;
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const [loading, setLoading] = (0, react_use_1.useToggle)(false);
    const [fetchError, setFetchError] = (0, react_1.useState)(false);
    const containerRef = (0, react_1.useRef)(null);
    const [elementHeight, setElementHeight] = (0, react_1.useState)(0);
    const [showTradeButton, setShowTradeButton] = (0, react_1.useState)(true);
    const t = (0, next_intl_1.useTranslations)('chat');
    const t_aipp = (0, next_intl_1.useTranslations)('reward_center.aipp');
    const [pinned, setPinned] = (0, react_1.useState)(false);
    const [curve, setCurve] = (0, react_1.useState)();
    const [photos, setPhotos] = (0, react_1.useState)([]);
    const [widgets, setWidgets] = (0, react_1.useState)([]);
    const botSummary = curve?.detail.boundingCurveSummary.botSummary;
    const fetchCurve = async (symbol) => {
        setLoading(true);
        setFetchError(false);
        try {
            const response = await (0, agentPump_1.getCurveBySymbol)(symbol);
            if (response.success) {
                const curve = response.data;
                setCurve(curve);
            }
        }
        catch (e) {
            console.log(e);
            setFetchError(true);
        }
        finally {
            setLoading(false);
        }
    };
    const fetchBotInfo = async (botId) => {
        const response = await (0, bot_1.getBotInfoV2)(botId);
        if (response.success) {
            if (response.data) {
                const botInfo = response.data.bots?.[botId];
                if (botInfo) {
                    setPinned(botInfo.pinned);
                    if (botInfo.photos) {
                        setPhotos(botInfo.photos);
                    }
                    if (botInfo.widgets) {
                        setWidgets(botInfo.widgets);
                    }
                }
            }
        }
    };
    const handleScroll = (0, react_1.useCallback)((0, lodash_es_1.throttle)(() => {
        if (!containerRef?.current) {
            return;
        }
        const containerRect = containerRef.current.getBoundingClientRect();
        setElementHeight(containerRect.top);
        const targetElement = document.getElementById('commentListContent');
        if (targetElement) {
            setShowTradeButton(window.innerHeight - targetElement.getBoundingClientRect().top < Math.min(280, window.innerHeight - 108));
        }
    }, 200), [showTradeButton, elementHeight, containerRef, setElementHeight, setShowTradeButton]);
    (0, react_1.useEffect)(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }
        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [elementHeight, handleScroll]);
    (0, react_1.useEffect)(() => {
        fetchCurve(symbol);
    }, []);
    (0, react_1.useEffect)(() => {
        if (curve?.detail?.boundingCurveSummary?.botSummary?.id) {
            fetchBotInfo(curve?.detail?.boundingCurveSummary?.botSummary?.id);
        }
    }, [curve]);
    const renderSomethingWrong = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full flex flex-col items-center justify-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 rounded-full flex items-center justify-center bg-surface-accent-yellow-subtler flex-shrink-0", children: (0, jsx_runtime_1.jsx)(ExclamationTriangleIcon_1.default, { className: "w-8.5 h-8.5 stroke-icon-warning" }) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-xl mt-3", color: "default", weight: "semibold", children: "Ooops!!!" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-sm mt-1", color: "subtle", children: t_aipp('something_wrong') }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: () => fetchCurve(symbol), className: "mt-6 w-[150px]", variant: "outline", children: t_aipp('refresh') })] }));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "h-full flex flex-col bg-surface-default overflow-hidden relative", children: [(0, jsx_runtime_1.jsxs)("div", { className: "shrink-0 flex flex-col", children: [(0, jsx_runtime_1.jsxs)("div", { className: "hidden md:flex items-center justify-between px-4 md:px-6 h-15", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3 items-center", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/rewards-center/rewards-aipp-store", className: "relative z-10", children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "ghost", color: "brand", icon: ArrowLeftIcon_1.default, size: "md" }) }), (0, jsx_runtime_1.jsx)(typography_1.Display, { size: "sm", children: t_aipp('detail_title') })] }), botSummary ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3", children: [(0, jsx_runtime_1.jsx)(BotPin_1.default, { id: botSummary?.id, pinned: pinned, setPinned: setPinned }), (0, jsx_runtime_1.jsx)(ShareBtn_1.default, { type: "curve", id: symbol, trackerFn: () => { } })] })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex md:hidden justify-between items-center shrink-0 px-4 py-2.5 relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex gap-3 items-center", children: (0, jsx_runtime_1.jsx)(link_1.default, { href: "/m/rewards-center/rewards-aipp-store", className: "relative z-10", children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "ghost", color: "brand", icon: ArrowLeftIcon_1.default, size: "md" }) }) }), botSummary ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3", children: [(0, jsx_runtime_1.jsx)(BotPin_1.default, { id: botSummary?.id, pinned: pinned, setPinned: setPinned }), (0, jsx_runtime_1.jsx)(ShareBtn_1.default, { type: "curve", id: symbol, trackerFn: () => { } })] })) : null] })] }), fetchError ? (renderSomethingWrong()) : ((0, jsx_runtime_1.jsxs)("div", { ref: containerRef, className: "grow overflow-x-hidden overflow-y-auto no-scrollbar relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "md:border-t md:border-default" }), loading && ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-full flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand" }) })), !loading && botSummary ? ((0, jsx_runtime_1.jsx)("div", { className: "py-4 md:py-6 px-4 md:px-6", children: (0, jsx_runtime_1.jsx)(BotDetail_1.default, { type: "bot", active: "shares", id: botSummary.id, author: botSummary.author, logoUrl: botSummary.logoUrl, name: botSummary.name, tags: botSummary.tagList, isOfficial: botSummary.isOfficial, description: botSummary.description, tgName: botSummary.tgName, photos: photos, widgets: widgets, curve: curve, model: botSummary.llmModel?.model, githubUrl: botSummary.imComponent?.githubUrl, buttonSlot: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!isMobile ? (0, jsx_runtime_1.jsx)(launch_trade_1.default, { curve: curve }) : null, (0, jsx_runtime_1.jsx)(link_1.default, { href: `/chat/${botSummary.id}`, children: (0, jsx_runtime_1.jsx)(button_1.Button, { size: "md", variant: "primary", className: "min-w-24", children: t('chat') }) })] }), tradeSlot: isMobile && showTradeButton ? (0, jsx_runtime_1.jsx)(launch_trade_1.default, { isBlock: true, curve: curve }) : null, hideBottomEmpty: true, isSticky: true }) })) : null] }))] }));
}
