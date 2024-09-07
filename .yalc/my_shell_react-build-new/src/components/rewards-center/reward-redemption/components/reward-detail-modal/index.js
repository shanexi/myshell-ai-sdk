"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RewardDetailModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const outline_1 = require("@heroicons/react/24/outline");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const button_1 = require("../../../../../common/components/ui/button.js");
const icon_button_1 = require("../../../../../common/components/ui/icon-button.js");
const input_1 = require("../../../../../common/components/ui/input.js");
const common_helper_1 = require("../../../../../common/utils/common-helper.js");
const useRedeemReward_1 = __importDefault(require("../../../../../hooks/rewards-center/useRedeemReward.js"));
const useShellCoin_1 = __importDefault(require("../../../../../hooks/user/useShellCoin.js"));
const media_1 = require("../../../components/media/index.js");
const shell_coin_1 = require("../../../components/shell-coin/index.js");
const modal_1 = require("../../../../../common/components/ui/modal.js");
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
function RewardDetailModal({ isOpen, onClose, onConfirm, rewardInfo, rewardConfirmed, redeemedCount }) {
    const { shellCoins } = (0, useShellCoin_1.default)();
    const commonT = (0, next_intl_1.useTranslations)('common');
    const t = (0, next_intl_1.useTranslations)('reward_center');
    const { acting, redeem } = (0, useRedeemReward_1.default)();
    const [count, setCount] = (0, react_1.useState)(redeemedCount || 1);
    const unitPrice = (0, react_1.useMemo)(() => {
        return rewardInfo.gemCount;
    }, [rewardInfo.gemCount]);
    const availableShellCoins = (0, react_1.useMemo)(() => {
        return shellCoins || 0;
    }, [shellCoins]);
    const maxAvailableCount = (0, react_1.useMemo)(() => {
        return Math.min(!!Number(rewardInfo.maxRedeemablePerUser) ? rewardInfo.redeemableCount : Infinity, unitPrice > 0 ? Math.floor(availableShellCoins / unitPrice) : Infinity);
    }, [
        availableShellCoins,
        rewardInfo.maxRedeemablePerUser,
        rewardInfo.redeemableCount,
        unitPrice
    ]);
    const neededShellCoins = (0, react_1.useMemo)(() => {
        return count * unitPrice;
    }, [count, unitPrice]);
    const doReddem = async () => {
        const { success } = await redeem(rewardInfo.id, count);
        if (success) {
            onClose(count);
        }
        else {
            onClose(0);
        }
    };
    (0, react_1.useEffect)(() => {
        if (rewardConfirmed) {
            doReddem();
        }
    }, [rewardConfirmed]);
    const reddemDisabled = maxAvailableCount === 0 || neededShellCoins > availableShellCoins || count === 0;
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: isOpen, onClose: () => {
            onClose(0);
        }, hideClose: true, modalOnly: false, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full aspect-[4/3] md:w-[400px] md:aspect-square shrink-0 overflow-hidden", children: [(0, jsx_runtime_1.jsx)(media_1.Media, { src: rewardInfo.media }), (0, jsx_runtime_1.jsx)("div", { className: "absolute right-4 top-4 md:hidden", children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { icon: XMarkIcon_1.default, size: "md", variant: "primary", color: "gray", onClick: () => onClose && onClose(0) }) })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex p-4 w-full flex-col justify-between overflow-hidden space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col w-full overflow-hidden space-y-3", children: [(0, jsx_runtime_1.jsx)(typography_1.Display, { size: "md", children: rewardInfo.name }), (!!Number(rewardInfo.maxRedeemablePerUser)) && ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-start items-center", children: (0, jsx_runtime_1.jsxs)(typography_1.Text, { size: "sm", className: "text-[#B6651B]", children: [t('redeemable_count'), rewardInfo.redeemableCount] }) })), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtler", weight: "regular", children: rewardInfo.description })] }), (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { size: "md", color: "default", variant: "primary", icon: outline_1.MinusIcon, disabled: count <= 0 ||
                                                count > maxAvailableCount, onClick: () => setCount(count - 1) }), (0, jsx_runtime_1.jsx)(input_1.Input, { size: "xs", rounded: "full", value: count, className: "text-center", disabled: count > maxAvailableCount, onChange: (e) => {
                                                const val = Number(e.target.value);
                                                if (val < 0 || isNaN(val)) {
                                                    setCount(0);
                                                    return;
                                                }
                                                if (val > (maxAvailableCount)) {
                                                    setCount(maxAvailableCount);
                                                    return;
                                                }
                                                setCount(val);
                                            } }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { size: "md", color: "default", variant: "primary", icon: outline_1.PlusIcon, disabled: count >= maxAvailableCount, onClick: () => setCount(count + 1) }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: "md", variant: "primary", color: "default", onClick: () => {
                                                setCount(maxAvailableCount);
                                            }, disabled: count >= (maxAvailableCount), children: commonT('max') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtler", children: t('current_shellcoins') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtler", children: (0, common_helper_1.formatNumberWithSeparator)((0, common_helper_1.formatFloatNumberToOneDecimalAndRemoveDecimalZero)(availableShellCoins)) })] }), (0, jsx_runtime_1.jsx)("div", { className: "block md:hidden border-t border-default -mx-4" }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-1", children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", color: reddemDisabled ? 'gray' : 'brand', disabled: reddemDisabled, className: "w-full", loading: acting, onClick: async () => {
                                            if (rewardConfirmed || neededShellCoins === 0) {
                                                if (acting) {
                                                    return;
                                                }
                                                doReddem();
                                            }
                                            else {
                                                onConfirm(neededShellCoins, count);
                                            }
                                        }, children: neededShellCoins <= availableShellCoins ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(shell_coin_1.ShellCoin, { size: 16, className: "mr-1.5" }), neededShellCoins] })) : t('insufficient_shell_coin') }) })] })] })] }) }));
}
