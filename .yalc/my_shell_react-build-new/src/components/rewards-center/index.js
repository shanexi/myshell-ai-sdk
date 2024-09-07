"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ChevronRightIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronRightIcon"));
const dayjs_1 = __importDefault(require("dayjs"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const task_1 = require("../../apis/task.js");
const icon_1 = require("../../common/components/ui/icon.js");
const link_1 = __importDefault(require("../../common/components/ui/link.js"));
const typography_1 = require("../../common/components/ui/typography.js");
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
const useSeason_1 = __importDefault(require("../../hooks/rewards-center/useSeason.js"));
const utils_1 = require("../../lib/utils.js");
const EarnIcon_1 = __importDefault(require("./components/images/EarnIcon.js"));
const MyPropsIcon_1 = __importDefault(require("./components/images/MyPropsIcon.js"));
const PatronBadgeIcon_1 = __importDefault(require("./components/images/PatronBadgeIcon.js"));
const RewardRedemptionIcon_1 = __importDefault(require("./components/images/RewardRedemptionIcon.js"));
const store_1 = require("../../services/store/index.js");
const user_1 = require("../../common/constants/enums/user.js");
const rewards_info_1 = require("./components/rewards-info/index.js");
const useUserSettings_1 = __importDefault(require("../../common/hooks/useUserSettings.js"));
const popover_1 = require("../../common/components/ui/popover.js");
const common_helper_1 = require("../../common/utils/common-helper.js");
function RewardsCenterIndex() {
    const { isMobile, pathname } = (0, usePathLocale_1.usePathLocale)();
    const newlyPropsCount = (0, store_1.useTaskStore)(state => state.newlyPropsCount);
    const setNewlyPropsCount = (0, store_1.useTaskStore)(state => state.setNewlyPropsCount);
    const { querySeasons, seasons } = (0, useSeason_1.default)();
    const [currentSeason, lastSeason] = seasons || [];
    const subscribingEarnViewed = (0, store_1.useUserStore)(state => state.subscribingEarnViewed);
    const silentPeriodConfirmed = (0, store_1.useUserStore)(state => state.silentPeriodConfirmed);
    const visitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const [isClaimableNewClicked, setIsClaimableNewClicked] = (0, react_1.useState)(false);
    const isClaimableNew = !isClaimableNewClicked &&
        !(0, common_helper_1.isNullOrUndefined)(silentPeriodConfirmed) &&
        !silentPeriodConfirmed &&
        (0, dayjs_1.default)().isAfter(lastSeason?.claimableStart) &&
        (0, dayjs_1.default)().isBefore(lastSeason?.claimableEnd);
    const { handleSilentPeriodConfirmed } = (0, useUserSettings_1.default)();
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const t = (0, next_intl_1.useTranslations)('reward_center');
    const prefix = isMobile ? '/m' : '';
    const ButtonList = (0, react_1.useMemo)(() => [
        {
            name: 'stake_earn',
            url: `${prefix}/rewards-center/rewards-aipp-store`,
            icon: PatronBadgeIcon_1.default
        },
        {
            name: 'earn',
            url: `${prefix}/rewards-center/earn`,
            icon: EarnIcon_1.default,
            color: '#0DA8FC'
        },
        {
            name: 'reward_redemption',
            url: `${prefix}/rewards-center/reward-redemption`,
            icon: RewardRedemptionIcon_1.default,
            color: '#FAAC00'
        },
        {
            name: 'my_rewards',
            url: `${prefix}/rewards-center/my-rewards`,
            icon: MyPropsIcon_1.default,
            color: '#6325EE'
        }
    ], [prefix]);
    const activeIndex = (0, react_1.useMemo)(() => {
        const getIndex = () => {
            if (pathname === '/rewards-center') {
                return isMobile ? -2 : 0;
            }
            const index = ButtonList.findIndex(b => b.url === pathname);
            if (index > -1) {
                return index;
            }
        };
        return getIndex();
    }, [pathname, isMobile, ButtonList]);
    (0, react_1.useEffect)(() => {
        if (visitor === user_1.VisitorEnum.NO) {
            (0, task_1.getNewlyMyPropsCount)().subscribe({
                next: num => {
                    setNewlyPropsCount(num);
                }
            });
        }
    }, [visitor]);
    (0, react_1.useEffect)(() => {
        querySeasons();
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col h-full bg-surface-container-default overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "shrink-0 py-5 md:pt-6 md:pb-4 px-4 md:px-6", children: (0, jsx_runtime_1.jsx)(typography_1.Display, { size: "md", children: t('title') }) }), (0, jsx_runtime_1.jsxs)("div", { className: "overflow-y-auto no-scrollbar px-4 md:px-3 space-y-4", children: [(0, jsx_runtime_1.jsx)(rewards_info_1.RewardsInfo, { isVisitor: visitor !== user_1.VisitorEnum.NO }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center flex-col space-y-4 md:space-y-1.5 pb-4", children: ButtonList.map((item, index) => ((0, jsx_runtime_1.jsxs)(link_1.default, { className: (0, utils_1.cn)('flex justify-between items-center w-full rounded-xl p-3', activeIndex === index
                                ? 'md:bg-surface-accent-blue-subtler'
                                : 'bg-surface-default md:bg-transparent md:hover:bg-surface-container-hovered'), onClick: () => {
                                if (visitor === user_1.VisitorEnum.YES) {
                                    if (isMobile && item.name !== 'stake_earn') {
                                        toggleLoginModal(true);
                                    }
                                }
                                else if (item.name === 'reward_redemption') {
                                    if (currentSeason && isClaimableNew) {
                                        handleSilentPeriodConfirmed(currentSeason.id);
                                    }
                                    else if ((0, common_helper_1.isNullOrUndefined)(silentPeriodConfirmed) && lastSeason) {
                                        handleSilentPeriodConfirmed(lastSeason.id);
                                    }
                                    setIsClaimableNewClicked(true);
                                }
                            }, href: !isMobile || visitor === user_1.VisitorEnum.NO || item.name === 'stake_earn' ? item.url : 'javascript:;', children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center space-x-2", children: [visitor === user_1.VisitorEnum.NO && item.name === 'reward_redemption' && isClaimableNew ? ((0, jsx_runtime_1.jsx)(popover_1.Popover, { showArrow: true, open: true, content: t(lastSeason?.isBate ? 'reward_redemption_tip_beta' : 'reward_redemption_tip', {
                                                name: lastSeason?.name
                                            }), variant: "info", children: (0, jsx_runtime_1.jsx)(icon_1.Icon, { size: isMobile ? '3xl' : '2xl', component: item.icon }) })) : ((0, jsx_runtime_1.jsx)(icon_1.Icon, { size: isMobile ? '3xl' : '2xl', component: item.icon })), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "default", className: "text-base md:text-sm", children: t(item.name) }), visitor === user_1.VisitorEnum.NO && item.name === 'stake_earn' && !subscribingEarnViewed && ((0, jsx_runtime_1.jsx)("div", { className: "h-4 w-8 bg-new-tag-gradient inline-flex justify-center items-center rounded-full left-1", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", className: "scale-50 text-white", children: "NEW" }) }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center gap-1", children: [visitor === user_1.VisitorEnum.NO && item.name === 'my_rewards' && newlyPropsCount > 0 && ((0, jsx_runtime_1.jsx)("div", { className: "h-1.5 w-1.5 rounded-full bg-red-500" })), (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: ChevronRightIcon_1.default, className: "text-subtler" })] })] }, item.name))) })] })] }));
}
exports.default = RewardsCenterIndex;
