"use strict";
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
exports.default = SideBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const dynamic_1 = __importDefault(require("next/dynamic"));
const react_1 = require("react");
const react_error_boundary_1 = require("react-error-boundary");
const useRedeemAndUseSeasonPass_1 = __importDefault(require("../../chat/views/hooks/useRedeemAndUseSeasonPass.js"));
const UseSeasonPassSuccessModal_1 = __importDefault(require("../../common/components/UseSeasonPassSuccessModal.js"));
const user_1 = require("../../common/constants/enums/user.js");
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
const useUserSettings_1 = __importDefault(require("../../common/hooks/useUserSettings.js"));
const RewardsPopoverWrap_1 = __importDefault(require("../../components/rewards-center/components/RewardsPopoverWrap.js"));
const useSeason_1 = __importDefault(require("../../hooks/rewards-center/useSeason.js"));
const useSideBar_1 = __importDefault(require("../../hooks/useSideBar.js"));
const utils_1 = require("../../lib/utils.js");
const store_1 = require("../../services/store/index.js");
const entity_1 = require("../../services/store/entity.js");
const SideBarBottom_1 = __importDefault(require("./SideBarBottom.js"));
const SideBarItem_1 = __importDefault(require("./SideBarItem.js"));
const SideBarLogo_1 = __importDefault(require("./SideBarLogo.js"));
const InviteCodeProcess = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../components/profile/invite/InviteCodeProcess.js'))), {
    loading: () => null,
    ssr: false
});
function Fallback() {
    return null;
}
function SideBar() {
    const { pathname } = (0, usePathLocale_1.usePathLocale)();
    const isOpenInviteCodeModal = (0, store_1.useGlobalStore)(state => state.isOpenInviteCodeModal);
    const sumUnReadMessageCount = (0, store_1.useBotStore)(state => state.sumUnReadMessageCount);
    const entitySumUnReadMessageCount = (0, entity_1.useEntityStore)(state => state.sumUnReadMessageCount);
    const [seasonPassUseSuccessModalVisible, setSeasonPassUseSuccessModalVisible] = (0, react_1.useState)(false);
    const [beforeCloseLoading, setBeforeCloseLoading] = (0, react_1.useState)(false);
    const [usedItem, setUsedItem] = (0, react_1.useState)();
    const token = (0, store_1.useUserStore)(state => state.token);
    const forumVisited = (0, store_1.useUserStore)(state => state.forumVisited);
    const user = (0, store_1.useUserStore)(state => state.user);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const clearClaimedPoints = (0, store_1.useTaskStore)(state => state.clearClaimedPoints);
    const hasClaimableTask = (0, store_1.useTaskStore)(state => state.hasClaimableTask);
    const newlyPropsCount = (0, store_1.useTaskStore)(state => state.newlyPropsCount);
    const energy = (0, store_1.useUserStore)(state => state.energy);
    const { handleRedeemAndUseSeasonPass } = (0, useRedeemAndUseSeasonPass_1.default)();
    const [showRewardsPop, setShowRewardsPop] = (0, react_1.useState)(false);
    const { seasonName } = (0, useSeason_1.default)();
    const { userSettingsInfo } = (0, useUserSettings_1.default)();
    const [selectedTab, setSelectedTab] = (0, react_1.useState)('');
    const { tabs, handleTabClick } = (0, useSideBar_1.default)({ setSelectedTab });
    const showClaimableSvg = (0, react_1.useMemo)(() => {
        return hasClaimableTask || newlyPropsCount > 0;
    }, [hasClaimableTask, newlyPropsCount, seasonName, userSettingsInfo]);
    (0, react_1.useEffect)(() => {
        const isShow = !(user?.isGenesisPasscard || user?.isPasscard) &&
            user?.level === 1 &&
            !pathname.includes('/rewards-center') &&
            isVisitor !== 1 &&
            energy > 0 &&
            energy < 50;
        setShowRewardsPop(isShow);
    }, [user?.level, user?.isGenesisPasscard, user?.isPasscard, isVisitor, energy]);
    const logErrorToService = (0, react_1.useCallback)((error, info) => {
        console.error(error, info);
    }, []);
    (0, react_1.useEffect)(() => {
        if (!pathname.startsWith('/rewards-center')) {
            clearClaimedPoints();
        }
    }, [clearClaimedPoints, pathname]);
    const handleClaimSeasonPasscard = () => {
        handleRedeemAndUseSeasonPass((usedItem) => {
            setUsedItem(usedItem);
            setSeasonPassUseSuccessModalVisible(true);
        });
    };
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
    return ((0, jsx_runtime_1.jsx)(react_error_boundary_1.ErrorBoundary, { FallbackComponent: Fallback, onError: logErrorToService, children: (0, jsx_runtime_1.jsxs)("div", { className: "relative h-full w-20", children: [(0, jsx_runtime_1.jsx)("nav", { className: "flex flex-row flex-nowrap h-full w-full", id: "sidebar", children: (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('w-full flex flex-col space-y-7 shrink-0 border-r-[1px] border-default'), children: [(0, jsx_runtime_1.jsx)(SideBarLogo_1.default, {}), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col items-center grow", children: tabs.map((tab, index) => {
                                    const isChatPage = tab.key === 'chat';
                                    const isReward = tab.key === 'rewards';
                                    const isForum = tab.key === 'forum';
                                    const unReadCount = isChatPage && sumUnReadMessageCount + entitySumUnReadMessageCount > 0
                                        ? sumUnReadMessageCount + entitySumUnReadMessageCount
                                        : 0;
                                    return ((0, jsx_runtime_1.jsx)(SideBarItem_1.default, { tab: tab, unReadCount: unReadCount, isSelected: selectedTab === tab.key, isNew: isForum && isVisitor === 2 && !forumVisited && !pathname.startsWith('/forum'), showClaimable: isReward && !!token && showClaimableSvg && selectedTab !== 'rewards', handleTabClick: handleTabClick, isVisitor: isVisitor === user_1.VisitorEnum.YES, children: isReward && showRewardsPop && ((0, jsx_runtime_1.jsx)(RewardsPopoverWrap_1.default, { onCheck: e => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                setShowRewardsPop(false);
                                                handleClaimSeasonPasscard();
                                            }, isOpen: showRewardsPop, onClose: e => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                setShowRewardsPop(false);
                                            }, children: (0, jsx_runtime_1.jsx)("div", { className: "relative flex justify-center items-center w-full translate-y-[-36px]" }) })) }, tab.href));
                                }) }), (0, jsx_runtime_1.jsx)(SideBarBottom_1.default, {})] }) }), (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: null, children: isOpenInviteCodeModal && ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('fixed flex bottom-4 md:bottom-5 left-6', pathname.includes('robot-workshop/create') && 'hidden'), children: (0, jsx_runtime_1.jsx)(InviteCodeProcess, {}) })) }), (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: null, children: seasonPassUseSuccessModalVisible && ((0, jsx_runtime_1.jsx)(UseSeasonPassSuccessModal_1.default, { isOpen: seasonPassUseSuccessModalVisible, onClose: handleClose, rewardInfo: usedItem, isLoading: beforeCloseLoading })) })] }) }));
}
