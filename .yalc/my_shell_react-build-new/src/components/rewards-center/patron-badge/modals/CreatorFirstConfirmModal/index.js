"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreatorFirstConfirmModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const dialog_1 = require("../../../../../common/components/ui/dialog.js");
const utils_1 = require("../../../../../lib/utils.js");
const InformationCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/InformationCircleIcon"));
const button_1 = require("../../../../../common/components/ui/button.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
function CreatorFirstConfirmModal(props) {
    const { open, onClose, onConfirm } = props;
    const t = (0, next_intl_1.useTranslations)();
    const handleClose = () => {
        onClose();
    };
    return ((0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: open, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { overlayClassName: "z-[1000]", overlayClose: false, onClose: () => {
                handleClose();
            }, className: (0, utils_1.cn)('p-5 pt-[72px] w-[380px] text-on-surface z-[1000]'), maskClosable: false, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('w-10 h-10 rounded-full flex items-center justify-center bg-[#CCD4FF] dark:bg-[#2C334F] flex-shrink-0 absolute top-5 left-5'), children: (0, jsx_runtime_1.jsx)(InformationCircleIcon_1.default, { className: "w-6 h-6 stroke-primary" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[6px] mt-2 mb-5", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xl font-medium text-default", children: t('migration.notice') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtle", children: t.rich('reward_center.aipp.creator_first_confirm_tip', {
                                br: () => (0, jsx_runtime_1.jsx)("br", {})
                            }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2 items-center w-full", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { className: "w-full", onClick: onConfirm, children: t('reward_center.aipp.creator_first_ok') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", color: "brand", onClick: onClose, className: "cursor-pointer", children: t('reward_center.aipp.creator_first_cancle') })] })] }) }));
}
