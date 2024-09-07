"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RefreshPromptModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const InformationCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/InformationCircleIcon"));
const next_intl_1 = require("next-intl");
function RefreshPromptModal({ isOpen, onClose, onConfirmed, type }) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    const rewardT = (0, next_intl_1.useTranslations)('reward_center');
    const enhanced_fix = type === 'prefix' ? t('enhanced_prefix') : t('enhanced_postfix');
    let header = t('enhanced_first_header');
    let content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [t('enhanceding', { enhanced_fix }), (0, jsx_runtime_1.jsx)("a", { href: rewardT('earn_content.discord_url'), target: "_blank", className: "text-primary", children: t('prompt_community') }), t('symbol')] }));
    if (type === 'autoPrompt') {
        header = t('enhanced_auto_prompt_header');
        content = (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: t('enhanced_auto_prompt_content') });
    }
    return ((0, jsx_runtime_1.jsxs)(react_1.Modal, { isOpen: isOpen, onClose: onClose, isCentered: true, children: [(0, jsx_runtime_1.jsx)(react_1.ModalOverlay, { className: "bg-white-opacity-95 dark:bg-black-opacity-95" }), (0, jsx_runtime_1.jsx)(react_1.ModalContent, { rounded: "24px", boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.10)", className: "refresh-prompt-modal bg-surface", children: (0, jsx_runtime_1.jsx)(react_1.ModalBody, { p: 4, children: (0, jsx_runtime_1.jsxs)(react_1.Flex, { flexDirection: "column", className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 rounded-full flex items-center justify-center bg-[#CCD4FF] dark:bg-[#2C334F] border-[6px] border-[#F2F4FE] dark:border-[#292C38] flex-shrink-0 ", children: (0, jsx_runtime_1.jsx)(InformationCircleIcon_1.default, { className: "w-6 h-6 stroke-primary" }) }), (0, jsx_runtime_1.jsxs)(react_1.Flex, { flexDirection: "column", color: "#202223", className: "space-y-2 text-on-surface", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl", children: header }), (0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "14px", lineHeight: "20px", className: "space-y-2 text-secondary", children: content })] }), (0, jsx_runtime_1.jsxs)(react_1.Flex, { p: "16px", gap: "16px", children: [type == 'autoPrompt' && ((0, jsx_runtime_1.jsx)(react_1.Button, { width: "50%", variant: "unstyled", className: "border-default border-[1px] text-secondary", rounded: "full", display: "flex", justifyContent: "center", alignItems: "center", _loading: {
                                            _hover: {
                                                bgColor: '#fff'
                                            }
                                        }, onClick: onClose, children: t('cancel') })), (0, jsx_runtime_1.jsx)(react_1.Button, { width: type == 'autoPrompt' ? '50%' : '100%', variant: "unstyled", boxShadow: "0px -1px 0px 0px rgba(0, 0, 0, 0.20) inset, 0px 1px 0px 0px rgba(0, 0, 0, 0.08)", color: "white", rounded: "full", display: "flex", justifyContent: "center", alignItems: "center", className: "bg-primary", _loading: {
                                            _hover: {
                                                bgColor: '#3E5CFA'
                                            }
                                        }, onClick: () => {
                                            onConfirmed();
                                        }, children: t('confirm') })] })] }) }) })] }));
}
