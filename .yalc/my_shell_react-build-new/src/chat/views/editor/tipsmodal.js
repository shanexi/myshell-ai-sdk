"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SaveTipModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const ExclamationTriangleIcon_1 = __importDefault(require("@heroicons/react/24/outline/ExclamationTriangleIcon"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const modal_1 = require("../../../common/components/ui/modal.js");
const store_1 = require("../../../services/store/index.js");
function SaveTipModal({ maxSize }) {
    const t = (0, next_intl_1.useTranslations)('common');
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const fileAlert = (0, store_1.useChatStore)(state => state.fileUpload.alert);
    const setFileAlert = (0, store_1.useChatStore)(state => state.setFileAlert);
    const hasSupport = fileAlert.data[0].length > 0;
    const hasTooLarge = fileAlert.data[1].length > 0;
    const total = hasSupport && hasTooLarge ? 2 : 1;
    const [index, setIndex] = (0, react_2.useState)(total === 1 && hasTooLarge ? 1 : 0);
    const handleClose = () => {
        if (total === 2 && index === 0) {
            setIndex(1);
        }
        else {
            setFileAlert({ visible: false });
        }
    };
    const current = index === 0 ? fileAlert.data[0] : fileAlert.data[1];
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: true, onClose: handleClose, hideClose: true, size: "sm", overlayClassName: "z-[9999]", contentClassName: "z-[9999] p-0", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "px-6 pt-6 pb-4 bg-surface-accent-yellow-subtlest rounded-t-4xl", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-14 h-14 p-2 rounded-full flex items-center justify-center bg-[#FFEBD3] dark:bg-[#4F3E2C] border-[6px] border-[#FFF5EA] dark:border-[#383029] flex-shrink-0 ", children: (0, jsx_runtime_1.jsx)(ExclamationTriangleIcon_1.default, { className: "w-9 h-9 stroke-[#FAAC00] dark:stroke-[#FFC453]" }) }), (0, jsx_runtime_1.jsx)(react_1.Flex, { flexDirection: "column", color: "#202223", className: "space-y-2", children: (0, jsx_runtime_1.jsx)("h2", { className: "text-xl text-on-surface", children: index === 0 ? chatT('panel.unsupported') : chatT('panel.maxsize') }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-surface w-full rounded-4xl px-4 py-4 text-[#414345] dark:text-[#B8BCCF]", children: [index === 0 && ((0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "14px", lineHeight: "20px", className: "text-secondary", children: chatT('panel.unsupported_tip') })), index === 0 && ((0, jsx_runtime_1.jsx)("ul", { className: "list-disc list-inside mt-4", children: current.map((item) => {
                                return ((0, jsx_runtime_1.jsx)("li", { className: "list-item line-clamp-2 break-all font-medium text-on-surface", children: (0, jsx_runtime_1.jsx)("span", { className: "-ml-3", children: item.name }) }, item.name));
                            }) })), index === 1 && ((0, jsx_runtime_1.jsx)("span", { children: chatT('panel.maxsize_tip', {
                                maxSize: maxSize || 50
                            }) })), (0, jsx_runtime_1.jsx)(react_1.Button, { width: "100%", variant: "outline", color: "white", rounded: "full", display: "flex", justifyContent: "center", alignItems: "center", className: "h-[44px] px-6 py-2.5 font-bold text-primary mt-4", onClick: handleClose, children: t('confirm') })] })] }) }));
}
