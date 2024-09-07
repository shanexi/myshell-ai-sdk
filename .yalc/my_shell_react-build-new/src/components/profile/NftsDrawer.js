"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NftsDrawer;
const jsx_runtime_1 = require("react/jsx-runtime");
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
const next_intl_1 = require("next-intl");
const drawer_1 = require("../../common/components/ui/drawer.js");
const NFTList_1 = __importDefault(require("./NFTList.js"));
function NftsDrawer({ isOpen, onClose, nfts }) {
    const t = (0, next_intl_1.useTranslations)();
    return ((0, jsx_runtime_1.jsx)(drawer_1.Drawer, { open: isOpen, onClose: onClose, children: (0, jsx_runtime_1.jsxs)(drawer_1.DrawerContent, { className: "focus-visible:outline-0", children: [(0, jsx_runtime_1.jsxs)(drawer_1.DrawerHeader, { className: "flex justify-between border-b border-default h-[68px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-xl font-ppt text-default", children: [t('my'), " NFTs"] }), (0, jsx_runtime_1.jsx)(XMarkIcon_1.default, { className: "w-[22px] h-[22px] text-icon", onClick: onClose })] }), (0, jsx_runtime_1.jsx)(NFTList_1.default, { nfts: nfts })] }) }));
}
