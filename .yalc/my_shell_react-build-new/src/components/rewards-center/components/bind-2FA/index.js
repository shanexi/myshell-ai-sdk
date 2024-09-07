"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBind2FA = useBind2FA;
exports.default = Bind2FAModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const InformationCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/InformationCircleIcon"));
const react_auth_1 = require("@privy-io/react-auth");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const button_1 = require("../../../../common/components/ui/button.js");
const icon_1 = require("../../../../common/components/ui/icon.js");
const modal_1 = require("../../../../common/components/ui/modal.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const identityService_1 = require("../../../../common/services/identityService.js");
const usePrivyLogin_1 = require("../../../../hooks/user/usePrivyLogin.js");
const utils_1 = require("../../../../lib/utils.js");
function useBind2FA() {
    const loginMethod = identityService_1.identityService.getLoginMethod();
    const { user } = (0, react_auth_1.usePrivy)();
    if (loginMethod && [usePrivyLogin_1.LoginMethod.Email, usePrivyLogin_1.LoginMethod.Google, usePrivyLogin_1.LoginMethod.Apple].includes(loginMethod)) {
        return user?.mfaMethods && user.mfaMethods.length > 0;
    }
    return true;
}
function Bind2FAModal(props) {
    const { open, onClose } = props;
    const t = (0, next_intl_1.useTranslations)('reward_center.2fa');
    const { showMfaEnrollmentModal } = (0, react_auth_1.useMfaEnrollment)();
    const [dontShowAgain, setDontShowAgain] = (0, react_1.useState)(false);
    const handleClose = () => {
        onClose();
    };
    const handleGo = () => {
        onClose(true);
        showMfaEnrollmentModal();
    };
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: open, onClose: handleClose, size: "md", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex md:flex-row flex-col pace-x-0 md:space-x-6 space-y-2 md:space-y-0 p-4 md:p-5", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('w-10 h-10 rounded-full flex items-center justify-center bg-surface-accent-blue-subtler flex-shrink-0'), children: (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: InformationCircleIcon_1.default, color: "brand", size: "2xl" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2", children: [(0, jsx_runtime_1.jsx)(typography_1.Display, { size: "sm", children: t('enable_2fa') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtle", children: t('to_ensure_the_security') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "hidden md:flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1.5 cursor-pointer", onClick: () => {
                                        identityService_1.identityService.setDontShow2FA(!dontShowAgain);
                                        setDontShowAgain(!dontShowAgain);
                                    }, children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: dontShowAgain }), (0, jsx_runtime_1.jsx)(typography_1.Text, { children: t('don_t_show_again') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleClose, color: "gray", children: t('no_thanks') }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleGo, children: t('confirm') })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "md:hidden items-center justify-center space-y-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleGo, isBlock: true, children: t('confirm') }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleClose, color: "gray", isBlock: true, children: t('no_thanks') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center space-x-1.5 cursor-pointer", onClick: () => {
                                        identityService_1.identityService.setDontShow2FA(!dontShowAgain);
                                        setDontShowAgain(!dontShowAgain);
                                    }, children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: dontShowAgain }), (0, jsx_runtime_1.jsx)(typography_1.Text, { children: t('don_t_show_again') })] })] })] })] }) }));
}
