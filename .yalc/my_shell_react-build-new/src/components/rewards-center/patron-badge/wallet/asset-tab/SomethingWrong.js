"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SomethingWrong;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowPathIcon_1 = __importDefault(require("@heroicons/react/24/solid/ArrowPathIcon"));
const next_intl_1 = require("next-intl");
const button_1 = require("../../../../../common/components/ui/button.js");
const utils_1 = require("../../../../../lib/utils.js");
function SomethingWrong() {
    const t = (0, next_intl_1.useTranslations)('profile');
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative h-[240px] w-full ", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full h-full blur-md flex gap-3 items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" }), (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center justify-center gap-[12px]'), children: [(0, jsx_runtime_1.jsx)("p", { className: "text-16", children: t('something_wrong') }), (0, jsx_runtime_1.jsx)(button_1.Button, { className: "h-[44px] px-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[6px]", children: [(0, jsx_runtime_1.jsx)(ArrowPathIcon_1.default, { color: "var(--surface)", className: "h-5 w-5" }), (0, jsx_runtime_1.jsx)("span", { className: "text-16 font-medium", children: t('refresh') })] }) })] })] }));
}
