"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendButton = SendButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const PaperAirplaneIcon_1 = __importDefault(require("@heroicons/react/24/solid/PaperAirplaneIcon"));
const image_1 = __importDefault(require("next/image"));
const button_1 = require("../../../../common/components/ui/button.js");
function SendButton({ loading = false, disabled = false, onSend, energyPerChat, showEnergyCostIcon }) {
    return ((0, jsx_runtime_1.jsxs)(button_1.Button, { loading: loading, disabled: disabled, variant: "primary", size: "md", onClick: onSend, className: "w-fit rounded-lg shrink-0", children: [(0, jsx_runtime_1.jsx)(PaperAirplaneIcon_1.default, { className: "w-4.5 h-4.5" }), showEnergyCostIcon && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("hr", { className: "h-3 border-l-[0.5px] mx-1.5 border-[#FFFFFF33]" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-x-[2px] items-center flex", children: [(0, jsx_runtime_1.jsx)(image_1.default, { alt: "energy icon", src: "/icons/thunder.svg", width: 13.59, height: 13.59 }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-medium", children: energyPerChat ?? 1 })] })] }))] }));
}
