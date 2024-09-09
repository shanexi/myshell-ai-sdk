import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import Link from '../../../../../common/components/ui/link.js';
import { useTranslations } from 'next-intl';
import { camelToSnake } from '../../../../../common/utils/common-helper.js';
import { chainIdNameScannerMap } from '../../../../../hooks/rewards-center/useOnChainInteraction.js';
export default function WagmiErrorModal({ isOpen, onClose, wagmiErrorType, chainId }) {
    const t = useTranslations('common.wagmi_error');
    return (_jsxs(Modal, { isOpen: isOpen, onClose: onClose, isCentered: true, children: [_jsx(ModalOverlay, {}), _jsxs(ModalContent, { borderRadius: "24px", boxShadow: "0px 0px 40px 0px #0000001A", className: "w-[342px] md:w-auto bg-surface", children: [_jsx(ModalHeader, { p: "16px 20px", children: _jsx("h2", { className: "text-xl font-[400] text-on-surface", children: t(`${camelToSnake(wagmiErrorType)}.title`) }) }), _jsx(Divider, { className: "border-default" }), _jsxs(ModalBody, { className: "text-on-surface", children: [wagmiErrorType === 'unKnownRpcError' &&
                                t(`${camelToSnake(wagmiErrorType)}.desc`, {
                                    chainName: chainIdNameScannerMap[chainId].name
                                }), wagmiErrorType === 'switchChainError' && (_jsxs(_Fragment, { children: [t(`${camelToSnake(wagmiErrorType)}.desc1`), _jsx(Link, { href: `https://chainlist.org/chain/${chainId}`, target: "_blank", className: "underline text-primary", children: chainIdNameScannerMap[chainId].name }), t(`${camelToSnake(wagmiErrorType)}.desc2`)] }))] }), _jsx(Divider, { className: "border-default" }), _jsx(ModalFooter, { p: "16px", gap: "16px", children: _jsx(Button, { variant: "unstyled", w: "full", h: "36px", className: "bg-primary", display: "flex", justifyContent: "center", color: "white", fontSize: "14px", lineHeight: "20px", boxShadow: "0px 1px 0px rgba(0, 0, 0, 0.08), inset 0px -1px 0px rgba(0, 0, 0, 0.2)", borderRadius: "full", onClick: onClose, children: t('got_it') }) })] })] }));
}
