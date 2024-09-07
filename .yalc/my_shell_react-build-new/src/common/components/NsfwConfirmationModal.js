"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NsfwConfirmationModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const useUserSettings_1 = __importDefault(require("../../common/hooks/useUserSettings.js"));
function NsfwConfirmationModal({ isOpen, onClose, onConfirmed }) {
    const { handleNsfwConfirmed } = (0, useUserSettings_1.default)();
    const [loading, setLoading] = (0, react_2.useState)(false);
    const [removeLoading, setRemoveLoading] = (0, react_2.useState)(false);
    const t = (0, next_intl_1.useTranslations)('workshop.nsfw_confirm');
    const onConfirm = () => {
        setLoading(true);
        handleNsfwConfirmed(() => {
            setLoading(false);
            onConfirmed();
        });
    };
    return ((0, jsx_runtime_1.jsxs)(react_1.Modal, { isOpen: isOpen, onClose: () => {
            return false;
        }, isCentered: true, children: [(0, jsx_runtime_1.jsx)(react_1.ModalOverlay, { className: "bg-alpha-mask-desktop backdrop-filter backdrop-blur-[2px]" }), (0, jsx_runtime_1.jsx)(react_1.ModalContent, { rounded: "24px", boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.10)", className: "bg-surface", children: (0, jsx_runtime_1.jsx)(react_1.ModalBody, { p: 4, children: (0, jsx_runtime_1.jsxs)(react_1.Flex, { flexDirection: "column", className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)(react_1.Flex, { flexDirection: "column", className: "space-y-2 text-on-surface", children: [(0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "28px", lineHeight: "36px", children: "\uD83D\uDD1E" }), (0, jsx_runtime_1.jsx)("h2", { className: "text-xl", children: t('header') }), (0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "14px", lineHeight: "20px", children: t('content') })] }), (0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", bgColor: "#D72C0D", className: "bg-[#D72C0D]", boxShadow: "0px -1px 0px 0px rgba(0, 0, 0, 0.20) inset, 0px 1px 0px 0px rgba(0, 0, 0, 0.08)", color: "white", rounded: "full", display: "flex", justifyContent: "center", alignItems: "center", isLoading: loading, _loading: {
                                    _hover: {
                                        bgColor: '#D72C0D'
                                    }
                                }, onClick: onConfirm, children: t('confirm_text') }), (0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", className: "border-[#D72C0D] border-[1px] bg-white", boxShadow: "0px -1px 0px 0px rgba(0, 0, 0, 0.20) inset, 0px 1px 0px 0px rgba(0, 0, 0, 0.08)", color: "#D72C0D", rounded: "full", display: "flex", justifyContent: "center", alignItems: "center", onClick: () => {
                                    setRemoveLoading(false);
                                    onClose();
                                }, isLoading: removeLoading, children: t('confirm_close_text') })] }) }) })] }));
}
