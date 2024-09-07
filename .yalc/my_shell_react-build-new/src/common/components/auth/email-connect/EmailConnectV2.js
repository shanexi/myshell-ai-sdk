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
exports.default = EmailConnect;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowSmallLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowSmallLeftIcon"));
const EnvelopeIcon_1 = __importDefault(require("@heroicons/react/24/outline/EnvelopeIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const usePrivyLogin_1 = __importStar(require("../../../../hooks/user/usePrivyLogin.js"));
const utils_1 = require("../../../../lib/utils.js");
const button_1 = require("../../ui/button.js");
const icon_button_1 = require("../../ui/icon-button.js");
const input_1 = require("../../ui/input.js");
const PrivyLoginModal_1 = require("../login-modal/PrivyLoginModal.js");
const ResendCountdown_1 = __importDefault(require("../login-modal/ResendCountdown.js"));
const useNotification_1 = require("../../../../common/hooks/useNotification.js");
function EmailConnect(props) {
    const { onCodeVerified, onCodeSent, setCurrentMethod, setErrorMessage, setLoadingAfterVerify, title, description, loadingAfterVerify, errorMessage } = props;
    const t = (0, next_intl_1.useTranslations)('profile');
    const t_migration = (0, next_intl_1.useTranslations)('migration');
    const { login, logout, emailLoginWithCode: verifyPrivyCode } = (0, usePrivyLogin_1.default)();
    const [emailStatus, setEmailStatus] = (0, react_1.useState)(PrivyLoginModal_1.EmailLoginStatus.ENTER_EMAIL);
    const [email, setEmail] = (0, react_1.useState)('');
    const [code, setCode] = (0, react_1.useState)('');
    const [emailLoginError, setEmailLoginError] = (0, react_1.useState)(false);
    const [sendingCode, setSendingCode] = (0, react_1.useState)(false);
    const [verifyingCode, setVerifyingCode] = (0, react_1.useState)(false);
    const [disableResend, setDisableResend] = (0, react_1.useState)(false);
    const { error: toastError } = (0, useNotification_1.useNotification)();
    const sendCode = async ({ email }) => {
        try {
            setSendingCode(true);
            await logout({ method: usePrivyLogin_1.LoginMethod.Email, source: 'EmailConnect:sendCode' });
            setCurrentMethod?.(usePrivyLogin_1.LoginMethod.Email);
            const { success, error } = await login({ method: usePrivyLogin_1.LoginMethod.Email, params: { email } });
            if (success) {
                setDisableResend(true);
                setEmailStatus(PrivyLoginModal_1.EmailLoginStatus.ENTER_CODE);
                setTimeout(() => {
                    setDisableResend(false);
                }, 60000);
                onCodeSent?.();
            }
            else {
                const errStr = error.toString();
                if (errStr.includes('User already exists with provided email address')) {
                    toastError({
                        content: t_migration('privy_user_exsited')
                    });
                }
                else if (errStr.includes('User already has one email account linked')) {
                    toastError({
                        content: t_migration('privy_user_exsited')
                    });
                }
            }
        }
        catch (error) {
            setEmailStatus(PrivyLoginModal_1.EmailLoginStatus.ENTER_EMAIL);
            setCurrentMethod?.(undefined);
        }
        finally {
            setSendingCode(false);
        }
    };
    const verifyCode = async ({ code }) => {
        try {
            setVerifyingCode(true);
            setCurrentMethod?.(usePrivyLogin_1.LoginMethod.Email);
            await verifyPrivyCode({ code });
            await onCodeVerified?.({ method: usePrivyLogin_1.LoginMethod.Email });
            setLoadingAfterVerify?.(true);
        }
        catch (error) {
            console.log('error:', error);
            setEmailLoginError(true);
            setCurrentMethod?.(undefined);
        }
        finally {
            setVerifyingCode(false);
        }
    };
    const handleBack = () => {
        setEmailStatus(PrivyLoginModal_1.EmailLoginStatus.ENTER_EMAIL);
        setEmail('');
        setCode('');
        setEmailLoginError(false);
        setErrorMessage?.('');
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = pattern.test(e.target.value);
        setEmailLoginError(!isValid);
    };
    const handleCodeChange = (e) => {
        const code = e.target.value;
        const isValid = code.trim().length <= 6;
        setCode(e.target.value.trim());
        setEmailLoginError(!isValid);
    };
    const handleResendCode = async ({ email }) => {
        setDisableResend(true);
        await sendCode({ email });
        setTimeout(() => {
            setDisableResend(false);
        }, 60000);
    };
    const renderErrorMessage = () => {
        if (emailLoginError) {
            return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('h-[14px] mb-[6px] mt-[6px]'), children: (0, jsx_runtime_1.jsx)("p", { className: "text-[12px] mt-0 text-[var(--error)]", children: emailStatus === PrivyLoginModal_1.EmailLoginStatus.ENTER_EMAIL ? t('enter_valid_email') : t('enter_valid_code') }) }));
        }
        if (errorMessage) {
            return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('h-[14px] mb-[6px] mt-[6px]'), children: (0, jsx_runtime_1.jsx)("p", { className: "text-[12px] mt-0 text-[var(--error)]", children: errorMessage }) }));
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex flex-col w-full h-full gap-5 mb-5'), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex flex-col gap-[6px]'), children: [emailStatus === PrivyLoginModal_1.EmailLoginStatus.ENTER_EMAIL ? ((0, jsx_runtime_1.jsx)("p", { className: (0, utils_1.cn)('text-2xl'), children: title ?? t('login_sign_up') })) : ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex gap-2 items-center'), children: [(0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { className: (0, utils_1.cn)('w-[24px] h-[24px] bg-transparent shadow-none hover:bg-transparent text-[var(--on-surface)]'), onClick: handleBack, children: (0, jsx_runtime_1.jsx)(ArrowSmallLeftIcon_1.default, {}) }), (0, jsx_runtime_1.jsx)("p", { className: (0, utils_1.cn)('text-2xl'), children: t('login_verify_email') })] })), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-subtle", children: [emailStatus === PrivyLoginModal_1.EmailLoginStatus.ENTER_EMAIL ? description ?? t('login_tip') : t('login_verify_email_tip'), ' ', (0, jsx_runtime_1.jsx)("br", {}), emailStatus === PrivyLoginModal_1.EmailLoginStatus.ENTER_CODE && (0, jsx_runtime_1.jsx)("strong", { children: email })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex flex-col gap-5'), children: [(0, jsx_runtime_1.jsxs)("div", { children: [emailStatus === PrivyLoginModal_1.EmailLoginStatus.ENTER_EMAIL ? ((0, jsx_runtime_1.jsxs)("div", { className: "w-full relative", children: [(0, jsx_runtime_1.jsx)(EnvelopeIcon_1.default, { className: "w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2 stroke-icon-subtle" }), (0, jsx_runtime_1.jsx)(input_1.Input, { className: "pl-8 !text-base", placeholder: t('email_address'), onChange: handleEmailChange, value: email })] })) : ((0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: t('login_enter_code'), onChange: handleCodeChange, value: code })), renderErrorMessage()] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex flex-col gap-[6px]'), children: [(0, jsx_runtime_1.jsx)(button_1.Button, { disabled: emailStatus === PrivyLoginModal_1.EmailLoginStatus.ENTER_EMAIL ? !email || emailLoginError : !code || sendingCode, loading: emailStatus === PrivyLoginModal_1.EmailLoginStatus.ENTER_EMAIL ? sendingCode : verifyingCode || loadingAfterVerify, className: "w-full", onClick: emailStatus === PrivyLoginModal_1.EmailLoginStatus.ENTER_EMAIL ? () => sendCode({ email }) : () => verifyCode({ code }), children: emailStatus === PrivyLoginModal_1.EmailLoginStatus.ENTER_EMAIL ? t('continue_email') : t('confirm') }), emailStatus === PrivyLoginModal_1.EmailLoginStatus.ENTER_CODE && ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('w-full flex items-center justify-center cursor-pointer ', disableResend || verifyingCode
                                    ? 'opacity-50 pointer-events-none'
                                    : 'opacity-100 pointer-events-auto text-[var(--primary)]'), onClick: () => handleResendCode({ email }), children: [(0, jsx_runtime_1.jsx)("p", { className: (0, utils_1.cn)('text-sm'), children: t('login_send_again') }), disableResend && (0, jsx_runtime_1.jsx)(ResendCountdown_1.default, {})] }))] })] })] }));
}
