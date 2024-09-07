"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TextInput;
const jsx_runtime_1 = require("react/jsx-runtime");
const PlusCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/PlusCircleIcon"));
const next_intl_1 = require("next-intl");
const react_use_1 = require("react-use");
const icon_button_1 = require("../../../../common/components/ui/icon-button.js");
const input_1 = require("../../../../common/components/ui/input.js");
const tooltip_1 = require("../../../../common/components/ui/tooltip.js");
function TextInput() {
    const isDeskTop = (0, react_use_1.useMedia)('(min-width: 768px)');
    const chatLocale = (0, next_intl_1.useTranslations)('chat');
    return ((0, jsx_runtime_1.jsxs)("div", { className: "md:px-2 relative", children: [(0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { side: "top", align: "start", sideOffset: 8, alignOffset: 8, variant: "info", showArrow: false, description: chatLocale('current_feature_unavailable'), triggerClassName: "w-full", children: (0, jsx_runtime_1.jsx)(input_1.Input, { size: isDeskTop ? 'xs' : 'sm', className: "w-full relative border md:border-none px-2 md:px-0 text-sm shadow-textarea md:shadow-none bg-transparent hover:bg-transparent disabled:opacity-100", disabled: true, placeholder: chatLocale('current_feature_unavailable') }) }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { className: "absolute top-1/2 -translate-y-1/2 right-0 md:hidden", variant: "ghost", color: "brand", size: "md", icon: PlusCircleIcon_1.default, disabled: true })] }));
}
