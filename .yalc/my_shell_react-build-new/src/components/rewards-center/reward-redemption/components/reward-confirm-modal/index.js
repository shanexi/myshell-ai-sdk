"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RewardConfirmModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const button_1 = require("../../../../../common/components/ui/button.js");
const modal_1 = require("../../../../../common/components/ui/modal.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
function RewardConfirmModal({ isOpen, onConfirm, onCancel, rewardInfo, redeemedCount, redeemedShellCoin, }) {
    const commonT = (0, next_intl_1.useTranslations)('common');
    const t = (0, next_intl_1.useTranslations)('reward_center.reward_redemption_content.rewards');
    return ((0, jsx_runtime_1.jsxs)(modal_1.Modal, { open: isOpen, onClose: onCancel, size: "sm", modalOnly: true, children: [(0, jsx_runtime_1.jsx)(modal_1.ModalHeader, { children: t('redemption_confirmation') }), (0, jsx_runtime_1.jsx)(modal_1.ModalBody, { className: "p-5", children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "mt-1.5", children: t('redemption_confirmation_content', { y: redeemedShellCoin, x: redeemedCount, z: rewardInfo.name }) }) }) }), (0, jsx_runtime_1.jsxs)(modal_1.ModalFooter, { className: "space-x-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", color: "default", isBlock: true, size: "lg", onClick: onCancel, tabIndex: -1, children: commonT('cancel') }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", size: "lg", isBlock: true, onClick: onConfirm, tabIndex: -1, children: commonT('confirm') }) })] })] }));
}
