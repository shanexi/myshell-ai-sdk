"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tag;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("../../../../../lib/utils.js");
function Tag(props) {
    const { content, selected, onClick } = props;
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex items-center justify-center rounded-md px-2 py-[3px] text-xs cursor-pointer', selected ? 'bg-surface-primary-default text-static' : 'bg-surface-accent-gray-subtler text-default'), onClick: onClick, children: content }));
}
