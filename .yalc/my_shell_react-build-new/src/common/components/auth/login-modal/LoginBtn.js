"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ChevronRightIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronRightIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const button_1 = require("../../../../common/components/ui/button.js");
const icon_1 = require("../../../../common/components/ui/icon.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const user_1 = require("../../../../common/constants/enums/user.js");
const identityService_1 = require("../../../../common/services/identityService.js");
const store_1 = require("../../../../services/store/index.js");
const WalletConnectBtn_1 = require("../wallet-connect-btn/WalletConnectBtn.js");
function LoginBtn({ showArray, showDescription, noStyle }) {
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const token = (0, store_1.useUserStore)(state => state.token);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const { connectWallet } = (0, WalletConnectBtn_1.useWalletLogin)({
        invitationCode: undefined,
        closeModal: undefined,
        from: 'okx'
    });
    const initRef = (0, react_1.useRef)(false);
    const loginFuncRef = (0, react_1.useRef)({ connectWallet });
    const t = (0, next_intl_1.useTranslations)('profile');
    const handleClick = () => {
        toggleLoginModal(true);
    };
    (0, react_1.useEffect)(() => {
        loginFuncRef.current.connectWallet = connectWallet;
    }, [connectWallet]);
    (0, react_1.useEffect)(() => {
        const loginByOkx = async () => {
            loginFuncRef.current.connectWallet('metaMask');
        };
        const channel = identityService_1.identityService.getChannel();
        const ua = navigator.userAgent;
        const isOKApp = /OKApp/i.test(ua);
        const installedOkx = typeof window.okxwallet !== 'undefined';
        if (channel === 'okx' && isVisitor === 1 && !initRef.current && (isOKApp || installedOkx)) {
            initRef.current = true;
            loginByOkx();
        }
    }, [isVisitor]);
    if (isVisitor !== user_1.VisitorEnum.YES || token) {
        return null;
    }
    if (noStyle) {
        return ((0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "medium", className: "w-full", children: t('login_sign_up') }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex w-full h-21 md:h-36 justify-center items-center border-0 flex-shrink-0 flex-col", children: [showDescription ? ((0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "medium", className: "text-nowrap mb-3", children: t('login_sign_up_desc') })) : null, (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: handleClick, className: "w-5/6 h-11 text-white", children: [t('login_sign_up'), showArray ? (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: ChevronRightIcon_1.default, className: "text-white" }) : null] })] }));
}
exports.default = LoginBtn;
