"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Share;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowUpOnSquareIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowUpOnSquareIcon"));
const next_intl_1 = require("next-intl");
const context_menu_1 = require("../../../../../common/components/ui/context-menu.js");
const icon_button_1 = require("../../../../../common/components/ui/icon-button.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const useNewChatStore_1 = require("../../../../../chat-new/services/useNewChatStore.js");
function Share(props) {
    const { source } = props;
    const commonT = (0, next_intl_1.useTranslations)('bot');
    const setInputType = (0, useNewChatStore_1.useNewChatStore)(state => state.setInputType);
    const onShare = () => {
        setInputType('share');
    };
    if (source === 'menubar') {
        return ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "outline", size: "sm", color: "default", className: "rounded-lg", onClick: onShare, children: (0, jsx_runtime_1.jsx)(ArrowUpOnSquareIcon_1.default, { className: "size-[18px]" }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(context_menu_1.ContextMenuItem, { onClick: onShare, children: [(0, jsx_runtime_1.jsx)(ArrowUpOnSquareIcon_1.default, { className: "w-5 h-5" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "ml-2", children: commonT('share') })] }));
}
