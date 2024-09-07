"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const Reference_1 = __importDefault(require("./Reference.js"));
function References({ references, showBottomBorder = false, className }) {
    const t = (0, next_intl_1.useTranslations)('chat');
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('border-[#DBDDDF] dark:border-[#54565E] border-dashed py-3 flex flex-col space-y-1.5', showBottomBorder ? 'border-y' : 'border-t', className), children: [(0, jsx_runtime_1.jsx)("div", { className: "text-xs text-subtle font-medium", children: t('sources') }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-y-1.5 space-y-1.5", children: references.map(refer => ((0, jsx_runtime_1.jsx)(Reference_1.default, { reference: refer }, refer.link))) })] }));
}
exports.default = (0, react_1.memo)(References);
