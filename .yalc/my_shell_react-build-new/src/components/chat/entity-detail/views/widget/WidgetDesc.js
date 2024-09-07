"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WidgetDesc;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const common_helper_1 = require("../../../../../common/utils/common-helper.js");
function WidgetDesc() {
    const t = (0, next_intl_1.useTranslations)('workshop');
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-1", children: [(0, jsx_runtime_1.jsxs)("p", { className: "space-x-1", children: [(0, jsx_runtime_1.jsx)(image_1.default, { alt: "Basic Widget", src: (0, common_helper_1.getAssetsUrlV2)('image/widget/icon/20240105/block/green.png'), width: 16, height: 16, className: "inline-block" }), (0, jsx_runtime_1.jsx)("span", { children: t('basic_widget_desc') })] }), (0, jsx_runtime_1.jsxs)("p", { className: "space-x-1", children: [(0, jsx_runtime_1.jsx)(image_1.default, { alt: "Composite Widget", src: (0, common_helper_1.getAssetsUrlV2)('image/widget/icon/20240105/block/blue.png'), width: 16, height: 16, className: "inline-block" }), (0, jsx_runtime_1.jsx)("span", { children: t('composite_widget_desc') })] }), (0, jsx_runtime_1.jsxs)("p", { className: "space-x-1", children: [(0, jsx_runtime_1.jsx)(image_1.default, { alt: "Application (Bot)", src: (0, common_helper_1.getAssetsUrlV2)('image/widget/icon/20240105/block/purple.png'), width: 16, height: 16, className: "inline-block" }), (0, jsx_runtime_1.jsx)("span", { children: t('application_desc') })] })] }));
}
