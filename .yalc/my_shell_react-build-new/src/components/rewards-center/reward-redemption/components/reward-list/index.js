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
exports.default = RewardList;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const dayjs_1 = __importDefault(require("dayjs"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const task_1 = require("../../../../../apis/task.js");
const button_1 = require("../../../../../common/components/ui/button.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const task_2 = require("../../../../../common/constants/enums/task.js");
const common_helper_1 = require("../../../../../common/utils/common-helper.js");
const useGetPoints_1 = __importDefault(require("../../../../../hooks/rewards-center/useGetPoints.js"));
const useGetProps_1 = __importDefault(require("../../../../../hooks/rewards-center/useGetProps.js"));
const useGetRewardList_1 = __importDefault(require("../../../../../hooks/rewards-center/useGetRewardList.js"));
const useSeason_1 = __importDefault(require("../../../../../hooks/rewards-center/useSeason.js"));
const useGetEnergyInfo_1 = __importDefault(require("../../../../../hooks/user/useGetEnergyInfo.js"));
const useShellCoin_1 = __importDefault(require("../../../../../hooks/user/useShellCoin.js"));
const useUpdateUserProfile_1 = __importDefault(require("../../../../../hooks/user/useUpdateUserProfile.js"));
const store_1 = require("../../../../../services/store/index.js");
const media_1 = require("../../../components/media/index.js");
const shell_coin_1 = require("../../../components/shell-coin/index.js");
const RewardDetailModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../reward-detail-modal/index.js'))), {
    ssr: false
});
const RewardConfirmModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../reward-confirm-modal/index.js'))), {
    ssr: false
});
const RedemptionSuccessModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../redemption-success-modal/index.js'))), {
    ssr: false
});
const SuccessTipModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../my-props/components/SuccessTipModal.js'))), {
    ssr: false
});
const BadgeExchangeCoinModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../BadgeExchangeCoinModal.js'))), {
    ssr: false
});
const ExchangeCoinModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../exchange-coin-modal/index.js'))), {
    ssr: false
});
function RewardList() {
    const t = (0, next_intl_1.useTranslations)('reward_center.reward_redemption_content');
    const { seasonId } = (0, useSeason_1.default)();
    const setNewlyPropsCount = (0, store_1.useTaskStore)(state => state.setNewlyPropsCount);
    const [rewardDetailModalVisible, setRewardDetailModalVisible] = (0, react_1.useState)(false);
    const [exchangeShellCoinModalVisible, setExchangeShellCoinModalVisible] = (0, react_1.useState)(false);
    const [badgeExchangeCoinModalVisible, setBadgeExchangeCoinModalVisible] = (0, react_1.useState)(false);
    const [redemptionSuccessModalVisible, setRedemptionSuccessModalVisible] = (0, react_1.useState)(false);
    const [successModalVisible, setSuccessModalVisible] = (0, react_1.useState)(false);
    const [rewardConfirmModalVisible, setRewardConfrimModalVisible] = (0, react_1.useState)(false);
    const [selectedReward, setSelectedReward] = (0, react_1.useState)();
    const [redeemedCount, setRedeemedCount] = (0, react_1.useState)(0);
    const [redeemedShellCoin, setRedeemedShellCoin] = (0, react_1.useState)(0);
    const [usedCount, setUsedCount] = (0, react_1.useState)();
    const [rewardConfirmed, setRewardConfirmed] = (0, react_1.useState)(false);
    const { queryProps } = (0, useGetProps_1.default)();
    const { rewardList, queryRewardList } = (0, useGetRewardList_1.default)();
    const { getEnergyInfo } = (0, useGetEnergyInfo_1.default)();
    const { queryUserProfile } = (0, useUpdateUserProfile_1.default)();
    const { queryPoints } = (0, useGetPoints_1.default)();
    const { queryShellCoins } = (0, useShellCoin_1.default)();
    const calcIsInRedemablePeriod = (startDate, endDate) => {
        return (0, dayjs_1.default)().isBefore((0, dayjs_1.default)(endDate)) && (0, dayjs_1.default)().isAfter((0, dayjs_1.default)(startDate));
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4", children: rewardList.map(r => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col border border-default shadow-background-default bg-surface-default cursor-pointer relative h-fit rounded-xl overflow-hidden transition-transform duration-300 delay-0\tease-in hover:border-hovered hover:-translate-y-1", onClick: () => {
                        setSelectedReward(r);
                        if (r.propType === task_2.PropTypeEnum.shellCoin && r.subType.includes('badge')) {
                            setBadgeExchangeCoinModalVisible(true);
                        }
                        else if (r.propType === task_2.PropTypeEnum.shellCoin) {
                            setExchangeShellCoinModalVisible(true);
                        }
                        else {
                            setRewardDetailModalVisible(true);
                        }
                    }, children: [r.propType === task_2.PropTypeEnum.shellCoin && ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('absolute top-3 right-3 rounded-full px-3 h-6 text-white text-xs flex items-center', r.subType.includes('badge') ? 'bg-utility-status03-70' : 'bg-surface-info-default'), children: t(`rewards.${(0, common_helper_1.camelToSnake)(r.subType)}.exchange_type`) })), (0, jsx_runtime_1.jsx)("div", { className: "aspect-square w-full", children: (0, jsx_runtime_1.jsx)(media_1.Media, { src: r.media }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col p-4 space-y-3", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", size: "lg", children: r.name }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: r.propType === task_2.PropTypeEnum.shellCoin ? 'primary' : 'outline', color: "default", children: r.propType === task_2.PropTypeEnum.shellCoin ? (r.endDate && !calcIsInRedemablePeriod(r.startDate, r.endDate) && !r.subType.includes('badge') ? (t('available_soon')) : (t('exchange_now'))) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(shell_coin_1.ShellCoin, { size: 20, className: "mr-1.5" }), r.gemCount] })) })] })] }, r.id))) }), rewardDetailModalVisible && ((0, jsx_runtime_1.jsx)(RewardDetailModal, { isOpen: rewardDetailModalVisible, redeemedCount: redeemedCount, onConfirm: (shellCoin, count) => {
                    setRedeemedCount(count);
                    setRedeemedShellCoin(shellCoin);
                    setRewardDetailModalVisible(false);
                    setRewardConfrimModalVisible(true);
                }, onClose: async (count) => {
                    setRewardDetailModalVisible(false);
                    if (count) {
                        setRedeemedCount(count);
                        setRewardConfirmed(false);
                        setRedemptionSuccessModalVisible(true);
                        queryShellCoins();
                    }
                    else {
                        setSelectedReward(undefined);
                        setRewardConfirmed(false);
                    }
                }, rewardInfo: selectedReward, rewardConfirmed: rewardConfirmed })), exchangeShellCoinModalVisible && ((0, jsx_runtime_1.jsx)(ExchangeCoinModal, { isOpen: exchangeShellCoinModalVisible, onClose: async (count) => {
                    setExchangeShellCoinModalVisible(false);
                    if (count) {
                        setRedeemedCount(count);
                        setRedemptionSuccessModalVisible(true);
                        queryShellCoins();
                        queryPoints();
                    }
                    else {
                        setSelectedReward(undefined);
                    }
                }, rewardInfo: selectedReward })), badgeExchangeCoinModalVisible && ((0, jsx_runtime_1.jsx)(BadgeExchangeCoinModal, { isOpen: badgeExchangeCoinModalVisible, onClose: (count) => {
                    setBadgeExchangeCoinModalVisible(false);
                    if (count) {
                        setRedeemedCount(count);
                        setRedemptionSuccessModalVisible(true);
                        seasonId && queryRewardList(seasonId);
                        queryShellCoins();
                    }
                    else {
                        setSelectedReward(undefined);
                    }
                }, rewardInfo: selectedReward })), redemptionSuccessModalVisible && ((0, jsx_runtime_1.jsx)(RedemptionSuccessModal, { isOpen: redemptionSuccessModalVisible, onClose: () => {
                    setRedemptionSuccessModalVisible(false);
                    setSelectedReward(undefined);
                    setRedeemedCount(0);
                    seasonId && queryRewardList(seasonId);
                }, onUse: (count) => {
                    setRedemptionSuccessModalVisible(false);
                    setRedeemedCount(0);
                    setSuccessModalVisible(true);
                    setUsedCount(count);
                    selectedReward?.propType === task_2.PropTypeEnum.energyPack && getEnergyInfo();
                    if (selectedReward?.propType === task_2.PropTypeEnum.standardBattlePass) {
                        queryUserProfile();
                        getEnergyInfo();
                    }
                    (0, task_1.getNewlyMyPropsCount)().subscribe({
                        next: num => {
                            setNewlyPropsCount(num);
                        }
                    });
                }, rewardInfo: selectedReward, redeemedCount: redeemedCount })), successModalVisible && ((0, jsx_runtime_1.jsx)(SuccessTipModal, { isOpen: successModalVisible, onClose: () => {
                    setSuccessModalVisible(false);
                    setSelectedReward(undefined);
                    setUsedCount(undefined);
                    seasonId && queryRewardList(seasonId);
                    queryProps();
                }, rewardInfo: selectedReward, count: usedCount })), rewardConfirmModalVisible && ((0, jsx_runtime_1.jsx)(RewardConfirmModal, { isOpen: rewardConfirmModalVisible, redeemedShellCoin: redeemedShellCoin, redeemedCount: redeemedCount, rewardInfo: selectedReward, onCancel: () => {
                    setRewardDetailModalVisible(true);
                    setRewardConfrimModalVisible(false);
                    setRewardConfirmed(false);
                }, onConfirm: () => {
                    setRewardDetailModalVisible(true);
                    setRewardConfrimModalVisible(false);
                    setRewardConfirmed(true);
                } }))] }));
}
