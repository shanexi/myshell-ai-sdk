"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NoBotPlaceholder;
const jsx_runtime_1 = require("react/jsx-runtime");
const Squares2X2Icon_1 = __importDefault(require("@heroicons/react/24/outline/Squares2X2Icon"));
const next_intl_1 = require("next-intl");
function NoBotPlaceholder() {
    const t = (0, next_intl_1.useTranslations)('chat');
    return ((0, jsx_runtime_1.jsxs)("div", { className: "py-10 flex flex-col items-center space-y-3 text-on-secondary-container", children: [(0, jsx_runtime_1.jsx)(Squares2X2Icon_1.default, { className: "w-8 h-8" }), (0, jsx_runtime_1.jsx)("span", { children: t('no_bot_tip') })] }));
}
