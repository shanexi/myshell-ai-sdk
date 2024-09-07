"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MigrationTipModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const ExclamationTriangleIcon_1 = __importDefault(require("@heroicons/react/24/outline/ExclamationTriangleIcon"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const button_1 = require("../../../../common/components/ui/button.js");
const dialog_1 = require("../../../../common/components/ui/dialog.js");
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
const utils_1 = require("../../../../lib/utils.js");
function MigrationTipModal({ isOpen, onConfirmed }) {
    const t = (0, next_intl_1.useTranslations)();
    const { pathname } = (0, usePathLocale_1.usePathLocale)();
    const router = (0, navigation_1.useRouter)();
    return ((0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: isOpen, children: (0, jsx_runtime_1.jsx)(dialog_1.DialogContent, { overlayClose: false, hideClose: true, className: (0, utils_1.cn)('w-[90%] md:max-w-[340px] max-h-[60%] overflow-hidden pb-0 text-on-surface focus-visible:outline-none'), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2 p-5", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 rounded-full flex items-center justify-center bg-[#FFEBD3] dark:bg-[#4F3E2C] border-[6px] border-[#FFF5EA] dark:border-[#383029] flex-shrink-0 ", children: (0, jsx_runtime_1.jsx)(ExclamationTriangleIcon_1.default, { className: "w-6 h-6 stroke-icon-warning" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col text-default space-y-2", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl text-default font-ppt pt-3", children: t('faucet.faucet_modal_title') }), (0, jsx_runtime_1.jsx)("p", { className: "text-subtle text-sm", children: t('profile.login_register_forbbiden') })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex space-x-4 space-y-4 pt-3", children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: "w-full focus-visible:outline-none", color: "warning", onClick: () => {
                                onConfirmed();
                                if (pathname === '/account-merge') {
                                    router.back();
                                }
                            }, children: t('profile.confirm') }) })] }) }) }));
}
