"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const LockClosedIcon_1 = __importDefault(require("@heroicons/react/24/solid/LockClosedIcon"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
const store_1 = require("../../../../services/store/index.js");
function GetPassModal({ isOpen, onClose }) {
    const cancelRef = (0, react_2.useRef)();
    const router = (0, navigation_1.useRouter)();
    const { locale } = (0, usePathLocale_1.usePathLocale)();
    const t = (0, next_intl_1.useTranslations)('chat');
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    return ((0, jsx_runtime_1.jsxs)(react_1.Modal, { isOpen: isOpen, onClose: () => {
            return null;
        }, isCentered: true, children: [(0, jsx_runtime_1.jsx)(react_1.ModalOverlay, { className: "bg-alpha-mask-desktop" }), (0, jsx_runtime_1.jsx)(react_1.ModalContent, { p: 0, className: "get-pass-modal rounded-4xl overflow-hidden shadow-[0_0_40px_0_#0000001A] bg-surface max-w-[384px] w-[90%]", children: (0, jsx_runtime_1.jsx)(react_1.ModalBody, { p: 4, children: (0, jsx_runtime_1.jsxs)(react_1.Flex, { flexDirection: "column", className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 rounded-full flex items-center justify-center bg-[#E0E5FF] dark:bg-[#2C334F] border-[6px] border-[#F2F4FE] dark:border-[#292C38] flex-shrink-0 ", children: (0, jsx_runtime_1.jsx)(LockClosedIcon_1.default, { className: "w-6 h-6 fill-primary" }) }), (0, jsx_runtime_1.jsxs)(react_1.Flex, { flexDirection: "column", color: "#202223", className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl text-on-surface", children: t('lock_pop_title') }), (0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "14px", lineHeight: "20px", className: "text-secondary", children: t('lock_pop_content') })] }), (0, jsx_runtime_1.jsxs)(react_1.Flex, { p: "16px", gap: "16px", className: "w-full justify-around", children: [(0, jsx_runtime_1.jsx)(react_1.Button, { className: "w-[50%] text-on-surface bg-surface border-default font-semibold text-[16px] border-[1px] h-[44px] min-w-[118px] rounded-full", ref: cancelRef, onClick: onClose, shadow: "0px 1px 0px 0px rgba(0, 0, 0, 0.05)", _hover: {
                                            background: 'var(--surface)'
                                        }, children: t('cancel') }), (0, jsx_runtime_1.jsx)(react_1.Button, { onClick: () => {
                                            if (isVisitor == 1) {
                                                toggleLoginModal(true);
                                            }
                                            else {
                                                router.push(`/profile/passcard`);
                                            }
                                        }, className: "w-[50%] text-[#fff] font-semibold text-[16px] bg-primary h-[44px] min-w-[118px] rounded-full", _hover: {
                                            background: 'var(--primary)'
                                        }, children: t('lock_btn') })] })] }) }) })] }));
}
exports.default = GetPassModal;
