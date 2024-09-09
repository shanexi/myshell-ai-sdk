"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WagmiErrorModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const link_1 = __importDefault(require("../../../../../common/components/ui/link"));
const next_intl_1 = require("next-intl");
const common_helper_1 = require("../../../../../common/utils/common-helper");
const useOnChainInteraction_1 = require("../../../../../hooks/rewards-center/useOnChainInteraction");
function WagmiErrorModal({ isOpen, onClose, wagmiErrorType, chainId }) {
    const t = (0, next_intl_1.useTranslations)('common.wagmi_error');
    return ((0, jsx_runtime_1.jsxs)(react_1.Modal, { isOpen: isOpen, onClose: onClose, isCentered: true, children: [(0, jsx_runtime_1.jsx)(react_1.ModalOverlay, {}), (0, jsx_runtime_1.jsxs)(react_1.ModalContent, { borderRadius: "24px", boxShadow: "0px 0px 40px 0px #0000001A", className: "w-[342px] md:w-auto bg-surface", children: [(0, jsx_runtime_1.jsx)(react_1.ModalHeader, { p: "16px 20px", children: (0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-[400] text-on-surface", children: t(`${(0, common_helper_1.camelToSnake)(wagmiErrorType)}.title`) }) }), (0, jsx_runtime_1.jsx)(react_1.Divider, { className: "border-default" }), (0, jsx_runtime_1.jsxs)(react_1.ModalBody, { className: "text-on-surface", children: [wagmiErrorType === 'unKnownRpcError' &&
                                t(`${(0, common_helper_1.camelToSnake)(wagmiErrorType)}.desc`, {
                                    chainName: useOnChainInteraction_1.chainIdNameScannerMap[chainId].name
                                }), wagmiErrorType === 'switchChainError' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [t(`${(0, common_helper_1.camelToSnake)(wagmiErrorType)}.desc1`), (0, jsx_runtime_1.jsx)(link_1.default, { href: `https://chainlist.org/chain/${chainId}`, target: "_blank", className: "underline text-primary", children: useOnChainInteraction_1.chainIdNameScannerMap[chainId].name }), t(`${(0, common_helper_1.camelToSnake)(wagmiErrorType)}.desc2`)] }))] }), (0, jsx_runtime_1.jsx)(react_1.Divider, { className: "border-default" }), (0, jsx_runtime_1.jsx)(react_1.ModalFooter, { p: "16px", gap: "16px", children: (0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", w: "full", h: "36px", className: "bg-primary", display: "flex", justifyContent: "center", color: "white", fontSize: "14px", lineHeight: "20px", boxShadow: "0px 1px 0px rgba(0, 0, 0, 0.08), inset 0px -1px 0px rgba(0, 0, 0, 0.2)", borderRadius: "full", onClick: onClose, children: t('got_it') }) })] })] }));
}
