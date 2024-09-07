"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowPathIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowPathIcon"));
const next_intl_1 = require("next-intl");
const utils_1 = require("../../lib/utils.js");
const button_1 = require("./ui/button.js");
function ErrorState({ className, onClick }) {
    const t = (0, next_intl_1.useTranslations)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('w-full h-full flex flex-col justify-start items-center p-6 !mb-[20%]', className), children: [(0, jsx_runtime_1.jsx)("img", { src: "https://image.myshell.ai/image/website/error/20240603/error-state.png", alt: "error logo", className: "w-[225px] h-[180px]" }), (0, jsx_runtime_1.jsxs)("p", { className: "mt-8 md:mt-12 text-[24px] font-semibold text-default", children: [t('disconnect_tip_oops'), "!!"] }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-base text-subtler text-center md:text-left", children: t('common.error_oops') }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", className: "mt-6 flex justify-center items-center", onClick: onClick, children: (0, jsx_runtime_1.jsxs)("span", { className: "flex justify-center items-center space-x-1.5 text-brand", children: [(0, jsx_runtime_1.jsx)(ArrowPathIcon_1.default, { className: "text-brand stroke-brand w-5 h-5" }), (0, jsx_runtime_1.jsx)("span", { className: "text-base", children: `${t('profile.refresh')}` })] }) })] }));
}
exports.default = ErrorState;
