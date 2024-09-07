"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LaunchTradeBtn;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const button_1 = require("../../../../../common/components/ui/button.js");
const utils_1 = require("../../../../../lib/utils.js");
function LaunchTradeBtn(props) {
    const { curve, isSelf, creatorFirst, onLaunch, onTrade, isBlock, className, ...buttonProps } = props;
    const tBadge = (0, next_intl_1.useTranslations)('reward_center.aipp');
    if (!curve || !curve?.detail) {
        if (!isSelf) {
            return null;
        }
        return ((0, jsx_runtime_1.jsx)(button_1.Button, { size: isBlock ? 'lg' : 'md', variant: "primary", className: (0, utils_1.cn)('min-w-24 bg-share-key hover:bg-share-key-hover active:bg-share-key-press text-white', isBlock && 'w-full', className), ...buttonProps, onClick: onLaunch, children: tBadge('launch') }));
    }
    if (creatorFirst && !isSelf) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", size: isBlock ? 'lg' : 'md', className: (0, utils_1.cn)('min-w-24 bg-share-key hover:bg-share-key-hover active:bg-share-key-press text-white', isBlock && 'w-full', className), ...buttonProps, onClick: () => onTrade?.({ curve: curve?.detail?.boundingCurveSummary }), children: tBadge('trade') }));
}
