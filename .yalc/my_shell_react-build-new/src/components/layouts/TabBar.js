"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TabBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_error_boundary_1 = require("react-error-boundary");
const useRedeemAndUseSeasonPass_1 = __importDefault(require("../../chat/views/hooks/useRedeemAndUseSeasonPass.js"));
const user_1 = require("../../common/constants/enums/user.js");
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
const RewardsPopoverWrap_1 = __importDefault(require("../../components/rewards-center/components/RewardsPopoverWrap.js"));
const useSeason_1 = __importDefault(require("../../hooks/rewards-center/useSeason.js"));
const useSideBar_1 = __importDefault(require("../../hooks/useSideBar.js"));
const utils_1 = require("../../lib/utils.js");
const store_1 = require("../../services/store/index.js");
const entity_1 = require("../../services/store/entity.js");
const TabBarItem_1 = __importDefault(require("./TabBarItem.js"));
const UseSeasonPassSuccessModal_1 = __importDefault(require("../../common/components/UseSeasonPassSuccessModal.js"));
const InviteCodeProcess_1 = __importDefault(require("../profile/invite/InviteCodeProcess.js"));
function Fallback() {
    return null;
}
function TabBar() {
    const user = (0, store_1.useUserStore)(state => state.user);
    const isOpenInviteCodeModal = (0, store_1.useGlobalStore)(state => state.isOpenInviteCodeModal);
    const [showRewardsPop, setShowRewardsPop] = (0, react_1.useState)(false);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const { pathname } = (0, usePathLocale_1.usePathLocale)();
    const hasClaimableTask = (0, store_1.useTaskStore)(state => state.hasClaimableTask);
    const { handleRedeemAndUseSeasonPass } = (0, useRedeemAndUseSeasonPass_1.default)();
    const [beforeCloseLoading, setBeforeCloseLoading] = (0, react_1.useState)(false);
    const [usedItem, setUsedItem] = (0, react_1.useState)();
    const [seasonPassUseSuccessModalVisible, setSeasonPassUseSuccessModalVisible] = (0, react_1.useState)(false);
    const sumUnReadMessageCount = (0, store_1.useBotStore)(state => state.sumUnReadMessageCount);
    const entitySumUnReadMessageCount = (0, entity_1.useEntityStore)(state => state.sumUnReadMessageCount);
    const { isInClaimablePeriod } = (0, useSeason_1.default)();
    const [selectedTab, setSelectedTab] = (0, react_1.useState)('');
    const { tabs, handleTabClick } = (0, useSideBar_1.default)({ setSelectedTab, isMobile: true });
    const energy = (0, store_1.useUserStore)(state => state.energy);
    const showClaimableSvg = (0, react_1.useMemo)(() => {
        return isInClaimablePeriod && hasClaimableTask;
    }, [hasClaimableTask, isInClaimablePeriod]);
    const token = (0, store_1.useUserStore)(state => state.token);
    const forumVisited = (0, store_1.useUserStore)(state => state.forumVisited);
    const handleClaimSeasonPasscard = () => {
        handleRedeemAndUseSeasonPass((usedItem) => {
            setUsedItem(usedItem);
            setSeasonPassUseSuccessModalVisible(true);
        });
    };
    const logErrorToService = (0, react_1.useCallback)((error, info) => {
        console.error(error, info);
    }, []);
    (0, react_1.useEffect)(() => {
        const isShow = !(user?.isGenesisPasscard || user?.isPasscard) && user?.level === 1 && isVisitor !== 1;
        !isOpenInviteCodeModal && energy > 0 && energy < 50 && setShowRewardsPop(isShow);
    }, [user?.level, user?.isGenesisPasscard, user?.isPasscard, isVisitor, isOpenInviteCodeModal, energy]);
    const handleClose = async () => {
        try {
            setBeforeCloseLoading(true);
            setSeasonPassUseSuccessModalVisible(false);
        }
        catch (e) {
        }
        finally {
            setBeforeCloseLoading(false);
        }
    };
    return ((0, jsx_runtime_1.jsx)(react_error_boundary_1.ErrorBoundary, { FallbackComponent: Fallback, onError: logErrorToService, children: (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('relative z-50 w-full bg-surface-default border-t border-default', selectedTab !== '' || pathname === '/m/forum' ? 'block' : 'hidden'), children: [(0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('grid  mx-auto h-[74px]', tabs?.length === 5 ? 'grid-cols-5' : 'grid-cols-4'), children: tabs.map((tab, index) => {
                        const isChatPage = tab.key === 'chat';
                        const isReward = tab.key === 'rewards';
                        const isForum = tab.key === 'forum';
                        const unReadCount = isChatPage && sumUnReadMessageCount + entitySumUnReadMessageCount > 0
                            ? sumUnReadMessageCount + entitySumUnReadMessageCount
                            : 0;
                        return ((0, jsx_runtime_1.jsx)(TabBarItem_1.default, { tab: tab, unReadCount: unReadCount, isSelected: selectedTab === tab.key, isNew: isForum && isVisitor === 2 && !forumVisited && !pathname.startsWith('/m/forum'), showClaimable: isReward && !!token && showClaimableSvg && selectedTab !== 'rewards', handleTabClick: handleTabClick, isVisitor: isVisitor === user_1.VisitorEnum.YES, children: isReward && showRewardsPop && ((0, jsx_runtime_1.jsx)(RewardsPopoverWrap_1.default, { isMob: true, onCheck: e => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setShowRewardsPop(false);
                                    handleClaimSeasonPasscard();
                                }, isOpen: showRewardsPop, onClose: e => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setShowRewardsPop(false);
                                }, children: (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center absolute top-0 left-50% w-[1px] h-[1px]" }) })) }, tab.key));
                    }) }), (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: null, children: isOpenInviteCodeModal && ((0, jsx_runtime_1.jsx)("div", { className: "absolute flex justify-center w-full bottom-[106px]", children: (0, jsx_runtime_1.jsx)(InviteCodeProcess_1.default, {}) })) }), (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: null, children: seasonPassUseSuccessModalVisible && ((0, jsx_runtime_1.jsx)(UseSeasonPassSuccessModal_1.default, { isOpen: seasonPassUseSuccessModalVisible, onClose: handleClose, rewardInfo: usedItem, isLoading: beforeCloseLoading })) })] }) }));
}
