"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RewardRedemption;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowLeftIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_use_1 = require("react-use");
const icon_button_1 = require("../../../common/components/ui/icon-button.js");
const typography_1 = require("../../../common/components/ui/typography.js");
const user_1 = require("../../../common/constants/enums/user.js");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const useBackToRewardsCenter_1 = __importDefault(require("../../../hooks/rewards-center/useBackToRewardsCenter.js"));
const useGetRewardList_1 = __importDefault(require("../../../hooks/rewards-center/useGetRewardList.js"));
const useSeason_1 = __importDefault(require("../../../hooks/rewards-center/useSeason.js"));
const utils_1 = require("../../../lib/utils.js");
const store_1 = require("../../../services/store/index.js");
const reward_list_1 = __importDefault(require("./components/reward-list/index.js"));
const top_info_1 = require("../components/top-info/index.js");
const Skeleton_1 = require("./components/reward-list/Skeleton.js");
function RewardRedemption() {
    const { backToProfile } = (0, useBackToRewardsCenter_1.default)();
    const isMobileDevice = (0, react_use_1.useMedia)('(max-width: 768px)');
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const [isSticky, setIsSticky] = (0, react_1.useState)(false);
    const { setSeasonIndex, seasonId, querySeasons } = (0, useSeason_1.default)();
    const { querying, queryRewardList } = (0, useGetRewardList_1.default)();
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const containerRef = (0, react_1.useRef)(null);
    const [slientQuerying, setSlientQuerying] = (0, react_1.useState)(false);
    const t = (0, next_intl_1.useTranslations)('reward_center');
    const [isInit, setIsInit] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setSeasonIndex(1);
        setIsInit(true);
    }, []);
    const load = async () => {
        if (isVisitor === user_1.VisitorEnum.NO && seasonId) {
            setSlientQuerying(false);
            await queryRewardList(seasonId);
            setSlientQuerying(true);
        }
    };
    (0, react_1.useEffect)(() => {
        if (isInit) {
            load();
        }
    }, [isVisitor, seasonId, isInit]);
    (0, react_1.useEffect)(() => {
        if (isMobile) {
            querySeasons();
        }
    }, []);
    (0, react_1.useEffect)(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }
        const handleScroll = () => {
            if (container?.scrollTop) {
                setIsSticky(container?.scrollTop > 30);
            }
        };
        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "h-full overflow-hidden relative", children: [isMobileDevice || isMobile ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('sticky top-0 bg-surface-default hidden items-center justify-center px-4 h-14  border-b border-default', isSticky && 'flex'), children: (0, jsx_runtime_1.jsx)(typography_1.Display, { size: "xs", children: t('reward_redemption') }) }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { onClick: backToProfile, variant: "ghost", color: "brand", size: "md", icon: ArrowLeftIcon_1.default, className: (0, utils_1.cn)('fixed left-4 top-2.5 z-50', isSticky ? 'flex' : 'hidden') }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { onClick: backToProfile, variant: "primary", color: "default", size: "md", icon: ArrowLeftIcon_1.default, className: (0, utils_1.cn)('fixed left-4 top-4 z-50', isSticky ? 'hidden' : 'flex') })] })) : null, (0, jsx_runtime_1.jsxs)("div", { ref: containerRef, className: "flex flex-col h-full overflow-auto", children: [(0, jsx_runtime_1.jsx)(top_info_1.TopInfo, {}), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col grow px-4 py-3 pb-[80px] md:px-6 md:py-4", children: (querying && !slientQuerying) || !seasonId ? (0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, {}) : (0, jsx_runtime_1.jsx)(reward_list_1.default, {}) })] })] }));
}
