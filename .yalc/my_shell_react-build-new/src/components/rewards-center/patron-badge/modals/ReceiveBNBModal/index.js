"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReceiveBNBModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("../../../../../lib/utils.js");
const BNB_svg_1 = __importDefault(require("@/common/assets/icons/BNB.svg"));
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const ModalTitle_1 = __importDefault(require("../ModalTitle.js"));
const typography_1 = require("../../../../../common/components/ui/typography.js");
const button_1 = require("../../../../../common/components/ui/button.js");
const useCopyClipboard_1 = __importDefault(require("../../../../../common/hooks/useCopyClipboard.js"));
const modal_1 = require("../../../../../common/components/ui/modal.js");
function ReceiveBNBModal({ address, open, onClose }) {
    const t = (0, next_intl_1.useTranslations)('profile.transfer_modal');
    const { onCopy } = (0, useCopyClipboard_1.default)('');
    const handleCopy = () => {
        onCopy(address);
    };
    const renderReceive = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex flex-col pt-4 gap-4 w-full'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-3 px-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex w-full justify-center", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: BNB_svg_1.default, width: 92, height: 92, alt: "bnb" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-start gap-1.5", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtler", children: t('network') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", color: "default", children: "BNB(BSC)" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-start gap-1.5", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtler", children: t('address') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", color: "default", className: "break-all", weight: "medium", children: address })] }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "warning-bolder", children: t.rich('deposit_tip', {
                                token: 'BNB',
                                chain: 'BSC(Binance Smart Chain)'
                            }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full border-t border-default px-4 pt-4", children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: "w-full", onClick: handleCopy, children: t('copy_address') }) })] }));
    };
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: open, onOpenChange: open => {
            if (!open)
                onClose();
        }, size: "sm", modalOnly: false, children: (0, jsx_runtime_1.jsxs)(modal_1.ModalBody, { className: (0, utils_1.cn)('pt-4 text-on-surface rounded-2xl'), children: [(0, jsx_runtime_1.jsx)(ModalTitle_1.default, { content: t('receive') }), renderReceive()] }) }));
}
