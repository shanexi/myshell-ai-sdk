"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DisconnectTipModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const ExclamationTriangleIcon_1 = __importDefault(require("@heroicons/react/24/outline/ExclamationTriangleIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const button_1 = require("../../../../common/components/ui/button.js");
const dialog_1 = require("../../../../common/components/ui/dialog.js");
const user_1 = require("../../../../common/constants/enums/user.js");
const utils_1 = require("../../../../lib/utils.js");
function DisconnectTipModal({ isOpen, bindType, onClose, onConfirmed }) {
    const t = (0, next_intl_1.useTranslations)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    let typeText = '';
    switch (bindType) {
        case user_1.BindType.BIND_TYPE_TG:
            typeText = 'Telegram';
            break;
        case user_1.BindType.BIND_TYPE_TWITTER:
            typeText = 'Twitter';
            break;
        case user_1.BindType.BIND_TYPE_DISCORD:
            typeText = 'Discord';
            break;
    }
    return ((0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: isOpen, children: (0, jsx_runtime_1.jsx)(dialog_1.DialogContent, { onClose: onClose, className: (0, utils_1.cn)('w-[90%] md:max-w-[380px] max-h-[60%] overflow-hidden pb-0 text-on-surface focus-visible:outline-none'), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2 p-5", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 rounded-full flex items-center justify-center bg-[#FFEBD3] dark:bg-[#4F3E2C] border-[6px] border-[#FFF5EA] dark:border-[#383029] flex-shrink-0 ", children: (0, jsx_runtime_1.jsx)(ExclamationTriangleIcon_1.default, { className: "w-6 h-6 stroke-icon-warning" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col text-default space-y-2", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl text-default font-ppt pt-3", children: t('disconnect_tip_title', {
                                    bindType: typeText
                                }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-subtle text-sm", children: t('disconnect_tip_content', { bindType: typeText }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex md:flex-row justify-center items-center space-x-2 md:space-x-4 pt-3", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", className: "focus-visible:outline-none min-w-[128px] md:min-w-[162px]", disabled: loading, onClick: () => {
                                    onClose();
                                }, children: t('profile.cancel') }), (0, jsx_runtime_1.jsx)(button_1.Button, { className: "focus-visible:outline-none min-w-[128px] md:min-w-[162px]", color: "warning", loading: loading, onClick: () => {
                                    setLoading(true);
                                    onConfirmed(() => {
                                        setLoading(false);
                                    });
                                }, children: t('profile.confirm') })] })] }) }) }));
}
