"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Actions;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const button_1 = require("../../../../../common/components/ui/button.js");
function Actions(props) {
    const { onCancel, onConfirm, disabled, loading } = props;
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp');
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between w-full gap-4 border-t border-default pt-4 px-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { className: "flex-1", variant: 'outline', onClick: onCancel, children: t('cancel') }), (0, jsx_runtime_1.jsx)(button_1.Button, { className: "flex-1", onClick: onConfirm, disabled: disabled, loading: loading, children: t('confirm') })] }));
}
