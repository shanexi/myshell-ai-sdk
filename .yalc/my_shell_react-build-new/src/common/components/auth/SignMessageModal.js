"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignMessageModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
function SignMessageModal({ isOpen, onClose, loading, handleSign }) {
    const commonT = (0, next_intl_1.useTranslations)('common');
    const loginT = (0, next_intl_1.useTranslations)('login');
    return ((0, jsx_runtime_1.jsxs)(react_1.Modal, { isOpen: isOpen, onClose: onClose, isCentered: true, closeOnEsc: !loading, closeOnOverlayClick: !loading, children: [(0, jsx_runtime_1.jsx)(react_1.ModalOverlay, { className: "bg-alpha-mask-desktop" }), (0, jsx_runtime_1.jsx)(react_1.ModalContent, { p: 0, className: "w-[342px] md:w-[380px] rounded-4xl overflow-hidden shadow-[0_0_40px_0_#0000001A] bg-surface", children: (0, jsx_runtime_1.jsx)(react_1.ModalBody, { p: 0, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col p-4 pt-8 space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col pt-1 space-y-3 items-center", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: "/images/shell_logo_with_bg.png", alt: "logo", width: 90, height: 90, className: "w-[90px] h-[90px] rounded-[14px]" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-1", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-[400] text-on-surface text-center", children: loginT('sign_title') }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-secondary", children: loginT('sign_desc') })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between space-x-4", children: [(0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", className: "grow border border-primary px-6 py-[10px] h-[44px] rounded-full text-primary text-sm", onClick: () => onClose(), children: commonT('cancel') }), (0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", className: "grow px-6 py-[10px] h-[44px] rounded-full bg-primary text-white text-sm flex justify-center items-center", onClick: handleSign, isLoading: loading, _hover: {
                                            _loading: {
                                                bg: 'var(--primary)'
                                            }
                                        }, children: loginT('sign') })] })] }) }) })] }));
}
