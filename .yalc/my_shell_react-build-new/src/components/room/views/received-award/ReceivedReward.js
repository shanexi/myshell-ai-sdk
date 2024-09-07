"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReceivedReward;
const jsx_runtime_1 = require("react/jsx-runtime");
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
const next_intl_1 = require("next-intl");
const InviteGift_1 = __importDefault(require("../../../../common/components/icons/InviteGift.js"));
const icon_button_1 = require("../../../../common/components/ui/icon-button.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
function ReceivedReward({ onClose }) {
    const t = (0, next_intl_1.useTranslations)('chat.room.received_reward');
    return ((0, jsx_runtime_1.jsx)("div", { className: "fixed bottom-10 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 z-20", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative flex items-center rounded-2xl py-3 pl-3 pr-[6px] border border-opaque bg-surface-search-field shadow-modal-bolder", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)(InviteGift_1.default, { className: "size-11" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "semibold", children: t('title') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtle", children: t('content') })] })] }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "ghost", color: "gray", size: "sm", icon: XMarkIcon_1.default, onClick: onClose })] }) }));
}
