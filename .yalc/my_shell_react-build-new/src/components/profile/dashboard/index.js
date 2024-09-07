"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/solid/ArrowLeftIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const useBackToRewardsCenter_1 = __importDefault(require("../../../hooks/rewards-center/useBackToRewardsCenter.js"));
const useGetInvitation_1 = __importDefault(require("../../../hooks/user/useGetInvitation.js"));
const store_1 = require("../../../services/store/index.js");
const BotRank_1 = __importDefault(require("./bot-rank/BotRank.js"));
const InvitationChart_1 = __importDefault(require("./charts/InvitationChart.js"));
const PopularityRank_1 = __importDefault(require("./charts/PopularityRank.js"));
const invite_1 = __importDefault(require("./invite/invite.js"));
function Dashboard() {
    const goToInviteArea = (0, store_1.useGlobalStore)(state => state.goToInviteArea);
    const isToInviteArea = (0, store_1.useGlobalStore)(state => state.isToInviteArea);
    const t = (0, next_intl_1.useTranslations)('profile');
    const inviteAreaRef = (0, react_2.useRef)(null);
    (0, useGetInvitation_1.default)();
    (0, react_2.useEffect)(() => {
        if (isToInviteArea && inviteAreaRef.current) {
            inviteAreaRef.current.scrollIntoView({ behavior: 'smooth' });
            goToInviteArea(false);
        }
    }, [goToInviteArea, isToInviteArea]);
    const { backToProfile, isMobile } = (0, useBackToRewardsCenter_1.default)();
    return ((0, jsx_runtime_1.jsxs)(react_1.Flex, { id: "invite", w: "full", h: "full", position: "relative", color: "#141718", flexDirection: "column", overflow: "hidden", ref: inviteAreaRef, children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('shrink-0 flex w-full text-on-surface bg-surface-container-default md:bg-surface-default items-center h-[56px] md:h-[60px] border-0 md:border-b border-default border-solid z-10 justify-center md:justify-start md:pl-5'), children: [(0, jsx_runtime_1.jsx)("div", { onClick: backToProfile, className: (0, clsx_1.default)('absolute left-4 text-lg cursor-pointer md:hidden'), children: (0, jsx_runtime_1.jsx)(ArrowLeftIcon_1.default, { className: "w-[22px] h-[22px] fill-surface-primary-default" }) }), (0, jsx_runtime_1.jsx)("h2", { className: "text-lg md:text-xl font-semibold text-default pt-[0.175rem]", children: t('dashboard') })] }), (0, jsx_runtime_1.jsxs)(react_1.Flex, { p: "20px", flexDirection: "column", gap: "32px", overflowY: "auto", children: [(0, jsx_runtime_1.jsxs)(react_1.Flex, { flexDirection: "column", gap: "16px", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-lg font-medium text-default", children: t('dashboard_items.overview') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4 overflow-hidden flex-col md:flex-row", children: [(0, jsx_runtime_1.jsx)(react_1.Box, { w: {
                                            base: 'full',
                                            md: 'calc(50% - 8px)'
                                        }, children: (0, jsx_runtime_1.jsx)(invite_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_1.Box, { w: {
                                            base: 'full',
                                            md: 'calc(50% - 8px)'
                                        }, children: (0, jsx_runtime_1.jsx)(BotRank_1.default, {}) })] })] }), (0, jsx_runtime_1.jsxs)(react_1.Flex, { flexDirection: "column", gap: "16px", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-default text-lg font-medium", children: t('dashboard_items.trend') }), (0, jsx_runtime_1.jsxs)(react_1.Flex, { gap: "16px", overflow: "hidden", flexDirection: {
                                    base: 'column',
                                    md: 'row'
                                }, children: [(0, jsx_runtime_1.jsx)(react_1.Box, { w: {
                                            base: 'full',
                                            md: 'calc(50% - 8px)'
                                        }, children: (0, jsx_runtime_1.jsx)(InvitationChart_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_1.Box, { w: {
                                            base: 'full',
                                            md: 'calc(50% - 8px)'
                                        }, children: (0, jsx_runtime_1.jsx)(PopularityRank_1.default, {}) })] })] })] })] }));
}
exports.default = Dashboard;
