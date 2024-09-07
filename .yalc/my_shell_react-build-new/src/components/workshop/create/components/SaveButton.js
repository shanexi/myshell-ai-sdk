"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const spinner_1 = __importDefault(require("../../../../common/components/ui/spinner.js"));
function SaveButton({ canSave, saveLoading, onSave }) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-end", children: (0, jsx_runtime_1.jsx)("button", { disabled: !canSave || saveLoading, className: `${!canSave || saveLoading ? 'opacity-30 cursor-not-allowed' : ''} bg-primary text-white rounded-full py-2.5 px-8 font-bold text-sm h-[44px]`, onClick: onSave, children: saveLoading ? (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-white", size: "md" }) : t('save') }) }));
}
exports.default = SaveButton;
