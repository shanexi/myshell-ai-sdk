"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SearchBox;
const jsx_runtime_1 = require("react/jsx-runtime");
const MagnifyingGlassIcon_1 = __importDefault(require("@heroicons/react/24/outline/MagnifyingGlassIcon"));
const next_intl_1 = require("next-intl");
const input_1 = require("../../common/components/ui/input.js");
function SearchBox({ searchValue, searchChange }) {
    const t = (0, next_intl_1.useTranslations)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative w-full", children: [(0, jsx_runtime_1.jsx)(MagnifyingGlassIcon_1.default, { className: "absolute top-1/2 -translate-y-1/2 left-3 z-10 w-5 h-5 text-subtler" }), (0, jsx_runtime_1.jsx)(input_1.Input, { value: searchValue, onChange: e => searchChange(e.target.value), placeholder: t('workshop.search_tips'), maxLength: 32, className: "w-full caret-primary text-default pl-9 pr-12 h-10 rounded-4xl" }), searchValue.length > 0 && ((0, jsx_runtime_1.jsx)("button", { className: "absolute top-1/2 -translate-y-1/2 right-4 z-10 inline-flex items-center space-x-2 text-primary", onClick: () => searchChange(''), children: t('clear') }))] }));
}
