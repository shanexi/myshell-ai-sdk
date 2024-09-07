"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tag;
const jsx_runtime_1 = require("react/jsx-runtime");
const tooltip_1 = require("../../../../../../common/components/ui/tooltip.js");
const utils_1 = require("../../../../../../lib/utils.js");
function TagItem({ iconUrl, label, className }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('px-2 py-[3px] shrink-0 rounded-md bg-surface-accent-gray-subtler', className), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[2px] items-center", children: [iconUrl && (0, jsx_runtime_1.jsx)("img", { src: iconUrl, alt: "tag emoji", className: "size-[14px]" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-default font-medium truncate line-clamp-1", children: label })] }) }));
}
function Tag({ showHoverableContent = false, hoverContent = '', iconUrl, label, className }) {
    return showHoverableContent ? ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: hoverContent, showArrow: false, contentClassName: "max-w-80", children: (0, jsx_runtime_1.jsx)(TagItem, { iconUrl: iconUrl, label: label, className: className }) })) : ((0, jsx_runtime_1.jsx)(TagItem, { iconUrl: iconUrl, label: label, className: className }));
}
