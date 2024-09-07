"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PreSaleOnlyModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const InformationCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/InformationCircleIcon"));
const link_1 = __importDefault(require("next/link"));
const next_intl_1 = require("next-intl");
const button_1 = require("../../../../../common/components/ui/button.js");
const modal_1 = require("../../../../../common/components/ui/modal.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const utils_1 = require("../../../../../lib/utils.js");
function PreSaleOnlyModal({ open, onClose }) {
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp');
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: open, onOpenChange: open => {
            if (!open)
                onClose();
        }, size: "sm", children: (0, jsx_runtime_1.jsxs)(modal_1.ModalBody, { className: (0, utils_1.cn)('p-4 text-on-surface rounded-2xl'), children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 rounded-full flex items-center justify-center bg-surface-accent-blue-subtler flex-shrink-0 ", children: (0, jsx_runtime_1.jsx)(InformationCircleIcon_1.default, { className: "w-6 h-6 stroke-primary" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col text-default space-y-2 mb-4", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl text-default font-ppt pt-3", children: t('notice') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-subtle text-sm", children: t('presale_only_tip') })] }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "https://opensea.io/collection/myshell-mysoul", target: "_blank", rel: "noreferrer nopopener", children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", className: "w-full outline-none border-default", children: t('get_mysoul') }) })] }) }));
}
