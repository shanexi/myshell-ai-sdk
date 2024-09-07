"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Actions;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const button_1 = require("../../../../../common/components/ui/button.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const utils_1 = require("../../../../../lib/utils.js");
function Actions(props) {
    const { onTrade, disabled, loading, insufficientBalance } = props;
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp');
    const getButtonText = () => {
        if (insufficientBalance) {
            return t('insufficient_balance');
        }
        return t('place_trade');
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "pt-4 px-4 border-t border-default w-full", children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: (0, utils_1.cn)('w-full', disabled ? 'bg-pink-button border border-default hover:bg-surface-disabled' : 'bg-pink-button'), onClick: onTrade, disabled: disabled, loading: loading, children: (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex items-center gap-1.5'), children: (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-base", color: "static", children: getButtonText() }) }) }) }));
}
