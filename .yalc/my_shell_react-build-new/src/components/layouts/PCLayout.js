"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
const useVisitorId_1 = __importDefault(require("../../hooks/useVisitorId.js"));
const utils_1 = require("../../lib/utils.js");
const MainLayout_1 = require("./MainLayout.js");
const SideBar_1 = __importDefault(require("./SideBar.js"));
function PCLayout({ children }) {
    (0, react_1.useEffect)(() => {
        document.body.style.overflowX = 'scroll';
    });
    (0, useVisitorId_1.default)();
    const { pathname } = (0, usePathLocale_1.usePathLocale)();
    const isAuthPage = pathname.includes('/auth');
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-start h-screen", children: (0, jsx_runtime_1.jsxs)(MainLayout_1.MainLayout, { className: "h-screen 2xl:rounded-[28px]", children: [!isAuthPage ? ((0, jsx_runtime_1.jsx)("aside", { className: (0, utils_1.cn)('driver-none w-[80px] relative h-full bg-[#F5F7FA] bg-transparent z-20 shrink-0'), children: (0, jsx_runtime_1.jsx)(SideBar_1.default, {}) })) : null, children] }) }));
}
exports.default = PCLayout;
