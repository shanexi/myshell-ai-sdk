"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatSetting;
const jsx_runtime_1 = require("react/jsx-runtime");
const Cog8ToothIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/Cog8ToothIcon"));
const react_use_1 = require("react-use");
const drawer_1 = require("../../../../common/components/ui/drawer");
const icon_button_1 = require("../../../../common/components/ui/icon-button");
const popover_1 = require("../../../../common/components/ui/popover");
const ChatSettingForm_1 = __importDefault(require("./ChatSettingForm"));
function ChatSetting() {
    const isDesktop = (0, react_use_1.useMedia)('(min-width: 768px)');
    if (isDesktop) {
        return ((0, jsx_runtime_1.jsx)(popover_1.Popover, { content: (0, jsx_runtime_1.jsx)(ChatSettingForm_1.default, {}), side: "bottom", align: "end", className: "w-[324px] p-4", children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { size: "md", variant: "ghost", className: "rounded-none", children: (0, jsx_runtime_1.jsx)(Cog8ToothIcon_1.default, { className: "size-6 text-brand" }) }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(drawer_1.Drawer, { children: [(0, jsx_runtime_1.jsx)(drawer_1.DrawerTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { size: "md", variant: "ghost", className: "rounded-none", children: (0, jsx_runtime_1.jsx)(Cog8ToothIcon_1.default, { className: "size-6 text-brand" }) }) }), (0, jsx_runtime_1.jsx)(drawer_1.DrawerContent, { className: "p-4", onCloseAutoFocus: e => e.preventDefault(), children: (0, jsx_runtime_1.jsx)(ChatSettingForm_1.default, {}) })] }));
}
