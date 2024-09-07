"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SaveTipModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const ExclamationTriangleIcon_1 = __importDefault(require("@heroicons/react/24/outline/ExclamationTriangleIcon"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
function SaveTipModal({ isOpen, onClose, onConfirmed }) {
    const t = (0, next_intl_1.useTranslations)('chat.replicate');
    const [closeLoading, setCloseLoading] = (0, react_2.useState)(false);
    const [comfirmLoading, setComfirmLoading] = (0, react_2.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(react_1.Modal, { isOpen: isOpen, onClose: () => {
            return null;
        }, isCentered: true, children: [(0, jsx_runtime_1.jsx)(react_1.ModalOverlay, { className: "bg-alpha-mask-desktop" }), (0, jsx_runtime_1.jsx)(react_1.ModalContent, { p: 0, className: "save-tip-modal rounded-4xl overflow-hidden shadow-[0_0_40px_0_#0000001A] bg-surface", children: (0, jsx_runtime_1.jsx)(react_1.ModalBody, { p: 4, children: (0, jsx_runtime_1.jsxs)(react_1.Flex, { flexDirection: "column", className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 rounded-full flex items-center justify-center bg-[#FFEBD3] dark:bg-[#4F3E2C] border-[6px] border-[#FFF5EA] dark:border-[#383029] flex-shrink-0 ", children: (0, jsx_runtime_1.jsx)(ExclamationTriangleIcon_1.default, { className: "w-6 h-6 stroke-[#FAAC00] dark:stroke-[#FFC453]" }) }), (0, jsx_runtime_1.jsxs)(react_1.Flex, { flexDirection: "column", color: "#202223", className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl text-on-surface", children: t('save_tip_title') }), (0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "14px", lineHeight: "20px", className: "text-secondary", children: t('save_tip_content') })] }), (0, jsx_runtime_1.jsxs)(react_1.Flex, { p: "16px", gap: "16px", children: [(0, jsx_runtime_1.jsx)(react_1.Button, { width: "50%", variant: "unstyled", className: "border-default border-[1px] text-secondary outline-none px-6 py-2.5 font-bold h-[44px] shadow-none", rounded: "full", display: "flex", justifyContent: "center", alignItems: "center", isLoading: closeLoading, _loading: {
                                            _hover: {
                                                bgColor: '#fff'
                                            }
                                        }, onClick: () => {
                                            if (comfirmLoading)
                                                return;
                                            onClose();
                                            setCloseLoading(true);
                                        }, children: t('save_tip_close') }), (0, jsx_runtime_1.jsx)(react_1.Button, { width: "50%", variant: "unstyled", boxShadow: "0px -1px 0px 0px rgba(0, 0, 0, 0.20) inset, 0px 1px 0px 0px rgba(0, 0, 0, 0.08)", color: "white", rounded: "full", display: "flex", justifyContent: "center", alignItems: "center", className: "bg-primary h-[44px] outline-none px-6 py-2.5 font-bold", _loading: {
                                            _hover: {
                                                bgColor: 'var(--primary)'
                                            }
                                        }, isLoading: comfirmLoading, onClick: () => {
                                            setComfirmLoading(true);
                                            onConfirmed(() => {
                                                setComfirmLoading(false);
                                            });
                                        }, children: t('save_tip_confirmed') })] })] }) }) })] }));
}
