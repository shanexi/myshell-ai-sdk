"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tag;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_themes_1 = require("next-themes");
const image_1 = __importDefault(require("next/image"));
const utils_1 = require("../../lib/utils.js");
const WidgetDesc_1 = __importDefault(require("../../components/chat/entity-detail/views/widget/WidgetDesc.js"));
const tooltip_1 = require("./ui/tooltip.js");
function Tag({ tag, index, className }) {
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    const isDark = resolvedTheme === 'dark';
    return ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: index === 0 ? (0, jsx_runtime_1.jsx)(WidgetDesc_1.default, {}) : tag.extra?.hoverText ?? '', disabled: !tag.extra?.isShowHover, contentClassName: "flex-shrink-0", showArrow: false, children: (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('py-[3px] px-2 h-[22px] shrink-0 flex items-center rounded-md', className), style: {
                backgroundColor: isDark
                    ? `${tag?.backgroundColors?.dark || '#27282c'}`
                    : `${tag?.backgroundColors?.light || '#f6f6f7'}`
            }, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center text-xs font-bold line-clamp-1 text-ellipsis space-x-1", style: {
                    color: isDark ? `${tag?.labelColors?.dark}` : `${tag?.labelColors?.light}`
                }, children: [tag.iconUrl ? (0, jsx_runtime_1.jsx)(image_1.default, { src: tag.iconUrl, alt: "emoji img", width: 16, height: 16, className: "w-4 h-4" }) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-medium line-clamp-1 text-ellipsis", children: tag.label })] }) }) }));
}
