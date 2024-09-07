"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("../../../lib/utils.js");
function FilterTagItem({ tag, tagSelected, className, bgWhite, onClick }) {
    const toggleSelectClick = () => {
        onClick?.();
    };
    return ((0, jsx_runtime_1.jsx)("li", { className: (0, utils_1.cn)('flex-shrink-0 h-7 py-1 px-3 rounded-lg text-sm mb-1 text-default md:mb-2 mr-3', tagSelected
            ? 'filter-tag-item-selected bg-surface-primary-default font-medium text-white'
            : bgWhite
                ? 'bg-surface-default hover:bg-surface-accent-gray-subtler focus:shadow-rings-brand'
                : 'bg-surface-accent-gray-subtlest hover:bg-surface-accent-gray-subtler focus:shadow-rings-brand', tag?.isComingSoon ? 'cursor-not-allowed select-none opacity-50' : 'cursor-pointer', className), onClick: () => {
            if (!tag?.isComingSoon) {
                toggleSelectClick();
            }
        }, children: tag.label }, `${tag.parentId}_${tag.id}`));
}
exports.default = FilterTagItem;
