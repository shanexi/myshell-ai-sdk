"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Fallback;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
function Fallback() {
    const t = (0, next_intl_1.useTranslations)('chat');
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center w-full h-full", children: (0, jsx_runtime_1.jsx)("div", { className: "p-[10px] font-medium text-subtle rounded-xl", children: t('select_chat') }) }));
}
