"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TabBarItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const badge_1 = __importDefault(require("../../common/components/ui/badge.js"));
const link_1 = require("../../common/components/ui/link.js");
const utils_1 = require("../../lib/utils.js");
function TabBarItem({ tab, isSelected, children, unReadCount, isNew, showClaimable, isVisitor, handleTabClick }) {
    const Icon = tab.icon;
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center", children: (0, jsx_runtime_1.jsxs)(link_1.Link, { href: tab.mobileHref, className: (0, utils_1.cn)('relative flex items-center flex-col justify-center w-[72px] h-[56px] py-1.5 rounded-xl outline-1 outline-offset-2', isSelected && 'shadow-tabBar bg-surface-default'), onClick: e => handleTabClick(e, tab), children: [(0, jsx_runtime_1.jsx)(Icon, { className: `w-6 ${isSelected ? 'stroke-icon-brand text-brand' : 'stroke-icon-subtle text-subtler'}` }), unReadCount && unReadCount > 0 ? ((0, jsx_runtime_1.jsx)(badge_1.default, { status: "unRead", count: unReadCount, className: "absolute left-9 top-0.5" })) : null, isNew ? ((0, jsx_runtime_1.jsx)(badge_1.default, { className: "absolute top-0 left-9", status: "new" })) : showClaimable ? ((0, jsx_runtime_1.jsx)(badge_1.default, { className: "absolute left-10 top-[5px]" })) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, utils_1.cn)('text-xs font-normal mt-1', isSelected ? 'text-brand' : 'text-subtler'), children: tab.text }), children] }) }, tab.key));
}
