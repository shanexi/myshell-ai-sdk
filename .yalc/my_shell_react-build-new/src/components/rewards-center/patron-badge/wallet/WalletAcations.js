"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WalletActions;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowDownTrayIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowDownTrayIcon"));
const ArrowUpTrayIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowUpTrayIcon"));
const LockClosedIcon_1 = __importDefault(require("@heroicons/react/24/outline/LockClosedIcon"));
const next_intl_1 = require("next-intl");
const button_1 = require("../../../../common/components/ui/button.js");
function WalletActions(props) {
    const { disablePrivySendAndReceive, openReceive, openSend, open2FA, isBind2FA } = props;
    const t = (0, next_intl_1.useTranslations)('profile.transfer_modal');
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex felx-row items-center gap-3 w-full", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { className: "flex-1", variant: "primary", color: "default", size: "md", disabled: disablePrivySendAndReceive, icon: ArrowUpTrayIcon_1.default, onClick: () => openSend(), children: t('send') }), (0, jsx_runtime_1.jsx)(button_1.Button, { className: "flex-1", variant: "primary", color: "default", size: "md", disabled: disablePrivySendAndReceive, icon: ArrowDownTrayIcon_1.default, onClick: () => openReceive(), children: t('receive') }), open2FA ? (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "flex-1 relative", variant: "primary", color: "default", size: "md", icon: LockClosedIcon_1.default, onClick: open2FA, children: ["2FA", !isBind2FA && (0, jsx_runtime_1.jsx)("div", { className: "absolute top-2 right-3 h-1.5 w-1.5 rounded-full bg-red-500" })] }) : null] }));
}
