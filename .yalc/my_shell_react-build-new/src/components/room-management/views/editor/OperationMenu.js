"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OperationMenu;
const jsx_runtime_1 = require("react/jsx-runtime");
const MicrophoneIcon_1 = __importDefault(require("@heroicons/react/24/outline/MicrophoneIcon"));
const PlusCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/PlusCircleIcon"));
const icon_button_1 = require("../../../../common/components/ui/icon-button.js");
const MobileEntityInfo_1 = __importDefault(require("./MobileEntityInfo.js"));
const FunctionMenu_1 = __importDefault(require("./function-menu/FunctionMenu.js"));
function OperationMenu() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "md:hidden shrink-0", children: (0, jsx_runtime_1.jsx)(MobileEntityInfo_1.default, {}) }), (0, jsx_runtime_1.jsxs)("div", { className: "hidden md:flex gap-1", children: [(0, jsx_runtime_1.jsx)(FunctionMenu_1.default, {}), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "ghost", color: "brand", size: "md", disabled: true, children: (0, jsx_runtime_1.jsx)(PlusCircleIcon_1.default, { className: "size-6 text-brand" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex", children: [(0, jsx_runtime_1.jsx)("div", { className: "md:hidden", children: (0, jsx_runtime_1.jsx)(FunctionMenu_1.default, {}) }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "ghost", color: "brand", size: "md", disabled: true, children: (0, jsx_runtime_1.jsx)(MicrophoneIcon_1.default, { className: "size-6 text-brand" }) })] })] }));
}
