"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NftsModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const dialog_1 = require("../../common/components/ui/dialog.js");
const separator_1 = require("../../common/components/ui/separator.js");
const utils_1 = require("../../lib/utils.js");
const NFTList_1 = __importDefault(require("./NFTList.js"));
function NftsModal({ isOpen, onClose, nfts }) {
    const t = (0, next_intl_1.useTranslations)();
    return ((0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: isOpen, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { onClose: onClose, iconClassName: "!top-3", className: (0, utils_1.cn)('md:max-w-[768px] max-h-[60%] overflow-hidden pb-0 text-on-surface focus-visible:outline-none'), children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { className: "w-full flex flex-row justify-between space-x-3", children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogTitle, { className: "flex-1 text-default", children: [t('my'), " NFTs"] }) }), (0, jsx_runtime_1.jsx)(separator_1.Separator, {}), (0, jsx_runtime_1.jsx)(NFTList_1.default, { nfts: nfts })] }) }));
}
