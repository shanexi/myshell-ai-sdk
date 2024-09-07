"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SideBarItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const badge_1 = __importDefault(require("../../common/components/ui/badge.js"));
const link_1 = require("../../common/components/ui/link.js");
const utils_1 = require("../../lib/utils.js");
function SideBarItem({ tab, isSelected, children, unReadCount, isNew = false, showClaimable, handleTabClick }) {
    const Icon = tab.icon;
    return ((0, jsx_runtime_1.jsxs)(link_1.Link, { href: tab.href, className: "flex flex-col justify-center items-center space-y-0.5 mb-6 cursor-pointer relative", onClick: e => handleTabClick(e, tab), prefetch: true, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative w-[56px] h-[40px] rounded-xl flex justify-center items-center", onFocus: e => {
                    e?.preventDefault();
                }, children: [unReadCount && unReadCount > 0 ? ((0, jsx_runtime_1.jsx)(badge_1.default, { status: "unRead", count: unReadCount, className: "absolute left-[30px] top-0.5" })) : null, isNew ? ((0, jsx_runtime_1.jsx)(badge_1.default, { status: "new", className: "absolute left-[30px] top-0.5" })) : showClaimable ? ((0, jsx_runtime_1.jsx)(badge_1.default, { status: "default", className: "absolute top-[5px] left-[34px]" })) : null, (0, jsx_runtime_1.jsx)(Icon, { className: `w-7 h-7 ${isSelected ? 'stroke-icon-brand text-brand' : 'stroke-icon-subtle text-subtler'}` })] }), (0, jsx_runtime_1.jsx)("span", { className: (0, utils_1.cn)('text-xs font-normal pt-1', isSelected ? 'text-brand' : 'text-subtler'), children: tab.text }), children] }, tab.href));
}
