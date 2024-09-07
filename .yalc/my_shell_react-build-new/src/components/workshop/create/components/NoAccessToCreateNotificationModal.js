"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NoAccessToCreateNotificationModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const image_1 = __importDefault(require("next/image"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
function NoAccessToCreateNotificationModal({ isOpen, onClose }) {
    const router = (0, navigation_1.useRouter)();
    const { locale } = (0, usePathLocale_1.usePathLocale)();
    const t = (0, next_intl_1.useTranslations)('workshop.create_bot.no_access_modal');
    const handleGoToRewardCenter = () => {
        router.push(`/rewards-center`);
        onClose();
    };
    return ((0, jsx_runtime_1.jsxs)(react_1.Modal, { isOpen: isOpen, onClose: onClose, isCentered: true, children: [(0, jsx_runtime_1.jsx)(react_1.ModalOverlay, { className: "bg-white-opacity-75 dark:bg-black-opacity-75 backdrop-blur-2xl" }), (0, jsx_runtime_1.jsxs)(react_1.ModalContent, { p: 0, className: "shadow-modal-default  overflow-hidden bg-[#FFF5EA] dark:bg-[#383029] w-[380px]", children: [(0, jsx_runtime_1.jsx)(react_1.ModalHeader, { p: 0, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col px-6 pt-6 pb-4 space-y-2", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: "/icons/workshop/glowing_star.svg", width: 54.95, height: 56, alt: "no access to create" }), (0, jsx_runtime_1.jsx)("h2", { className: "text-[#FAAC00] dark:text-[#FFC453] text-2xl", children: t('title') })] }) }), (0, jsx_runtime_1.jsx)(react_1.ModalBody, { p: 0, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col p-4 bg-surface text-[#414345] dark:text-[#B8BCCF] rounded-2xl space-y-4", children: [(0, jsx_runtime_1.jsx)("p", { children: t('desc') }), (0, jsx_runtime_1.jsx)(react_1.Button, { w: "full", h: "44px", color: "var(--primary)", fontWeight: "500", borderRadius: "full", className: "bg-surface border border-default shadow-button-basic", _hover: {
                                        bgColor: 'var(--surface)'
                                    }, onClick: handleGoToRewardCenter, children: t('btn_text') })] }) })] })] }));
}
