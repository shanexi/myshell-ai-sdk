"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExchangeCoinModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const modal_1 = require("../../../../../common/components/ui/modal.js");
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
const common_helper_1 = require("../../../../../common/utils/common-helper.js");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const useShellCoin_1 = __importDefault(require("../../../../../hooks/user/useShellCoin.js"));
const media_1 = require("../../../components/media/index.js");
const shell_point_1 = require("../../../components/shell-point/index.js");
const task_1 = require("../../../../../common/constants/enums/task.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const button_1 = require("../../../../../common/components/ui/button.js");
const shell_coin_1 = require("../../../components/shell-coin/index.js");
const dayjs_1 = __importDefault(require("dayjs"));
const useGetPoints_1 = __importDefault(require("../../../../../hooks/rewards-center/useGetPoints.js"));
const skeleton_1 = __importDefault(require("./skeleton.js"));
const icon_button_1 = require("../../../../../common/components/ui/icon-button.js");
const PointMap = {
    [task_1.PointTypeEnum.USER_POINT_TYPE_GENERAL]: {
        i18n: 'general_points',
    },
    [task_1.PointTypeEnum.USER_POINT_TYPE_CREATOR]: {
        i18n: 'creator_points',
    },
    [task_1.PointTypeEnum.USER_POINT_TYPE_ADVOCATOR]: {
        i18n: 'advocator_points',
    },
    [task_1.PointTypeEnum.USER_POINT_TYPE_INVESTOR]: {
        i18n: 'investor_points',
    }
};
function ExchangeCoinModal({ isOpen, onClose, rewardInfo }) {
    const t = (0, next_intl_1.useTranslations)('reward_center');
    const { queryExchange, exchanging, exchange } = (0, useShellCoin_1.default)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const { seasonPoints, exchangePoints } = (0, useGetPoints_1.default)();
    const isInRedeemablePeriod = !!rewardInfo.endDate
        ? (0, dayjs_1.default)().isBefore((0, dayjs_1.default)(rewardInfo.endDate)) && (0, dayjs_1.default)().isAfter((0, dayjs_1.default)(rewardInfo.startDate))
        : true;
    (0, react_1.useEffect)(() => {
        const load = async () => {
            setLoading(true);
            await queryExchange();
            setLoading(false);
        };
        if (isInRedeemablePeriod) {
            if (!(exchangePoints && exchangePoints.length)) {
                load();
            }
        }
    }, [exchangePoints, isInRedeemablePeriod]);
    const amount = exchangePoints.reduce((prev, { targetAmount }) => {
        prev += targetAmount;
        return prev;
    }, 0);
    const exchangePointsToShellCoin = async (count) => {
        const { success } = await exchange();
        if (success) {
            onClose(count);
            await queryExchange();
        }
        else {
            onClose();
        }
    };
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { modalOnly: false, open: isOpen, hideClose: true, onClose: () => {
            onClose(0);
        }, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full aspect-[4/3] md:w-[400px] md:aspect-square shrink-0 overflow-hidden relative", children: [(0, jsx_runtime_1.jsx)(media_1.Media, { src: rewardInfo.media }), (0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 left-0 right-0 bottom-0", style: { backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 77.41%, rgba(0, 0, 0, 0.40) 100%)' } }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute left-0 right-0 bottom-0 p-3", children: [(0, jsx_runtime_1.jsx)(typography_1.Display, { size: "sm", className: "text-static", children: rewardInfo.name }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "static", weight: "regular", className: "line-clamp-1 opacity-40", children: rewardInfo.description })] }), (0, jsx_runtime_1.jsx)("div", { className: "absolute right-4 top-4 md:hidden", children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { icon: XMarkIcon_1.default, size: "md", variant: "primary", color: "gray", onClick: () => onClose && onClose() }) })] }) }), loading ? (0, jsx_runtime_1.jsx)(skeleton_1.default, {}) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex p-4 w-full flex-col justify-between overflow-hidden space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h2", children: t('reward_redemption_content.shell_points') }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-5", children: [isInRedeemablePeriod && exchangePoints.map(({ type, text, targetAmountText, ratio }, index) => ((0, jsx_runtime_1.jsxs)("div", { id: `${type}_${index}`, className: "flex items-center justify-center space-x-1.5", children: [(0, jsx_runtime_1.jsx)(shell_point_1.ShellPoint, { type: type, size: 36 }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 flex flex-col space-y-0.5", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", size: "sm", children: t(PointMap[type].i18n) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", color: "brand", size: "sm", children: text })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-1 items-end", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-end space-x-0.5", children: [(0, jsx_runtime_1.jsx)(shell_coin_1.ShellCoin, { size: 18 }), (0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", size: "sm", children: targetAmountText })] }), (0, jsx_runtime_1.jsx)(typography_1.Description, { size: "sm", weight: "medium", children: `(Rate ${ratio}:1)` })] })] }))), !isInRedeemablePeriod && seasonPoints?.map(({ type, text }, index) => ((0, jsx_runtime_1.jsxs)("div", { id: `${type}_${index}`, className: "flex items-center justify-center space-x-1.5", children: [(0, jsx_runtime_1.jsx)(shell_point_1.ShellPoint, { type: type, size: 36 }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 flex flex-col space-y-0.5", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", size: "sm", children: t(PointMap[type].i18n) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", color: "brand", size: "sm", children: text })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-end space-x-0.5", children: [(0, jsx_runtime_1.jsx)(shell_coin_1.ShellCoin, { size: 18 }), (0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", size: "sm", children: "???" })] }), (0, jsx_runtime_1.jsx)(typography_1.Description, { size: "sm", weight: "medium", children: `(Rate ???:1)` })] })] })))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col space-y-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "block md:hidden border-t border-default -mx-4" }), (0, jsx_runtime_1.jsx)(button_1.Button, { disabled: !isInRedeemablePeriod || amount === 0, color: isInRedeemablePeriod && amount !== 0 ? 'brand' : 'gray', variant: "primary", loading: exchanging, onClick: () => exchangePointsToShellCoin(amount), children: isInRedeemablePeriod ?
                                        (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [t('reward_redemption_content.rewards.shell_coin.exchange'), " ", (0, jsx_runtime_1.jsx)(shell_coin_1.ShellCoin, { size: 16, className: "mx-1" }), (0, common_helper_1.formatFloatNumberToOneDecimalAndRemoveDecimalZero)(amount)] }) :
                                        t('reward_redemption_content.available_soon') })] })] }))] }) }));
}
