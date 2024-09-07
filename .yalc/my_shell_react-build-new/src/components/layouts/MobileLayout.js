"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const useVisitorId_1 = __importDefault(require("../../hooks/useVisitorId.js"));
const AllProviders_1 = require("./AllProviders.js");
const MainLayout_1 = require("./MainLayout.js");
const TabBar_1 = __importDefault(require("./TabBar.js"));
function MobileLayout({ children }) {
    (0, useVisitorId_1.default)();
    return ((0, jsx_runtime_1.jsx)(AllProviders_1.WagmiConfigWrapper, { children: (0, jsx_runtime_1.jsx)(MainLayout_1.MainLayout, { className: "h-dvh w-[100vw] overflow-y-auto overflow-x-hidden", children: (0, jsx_runtime_1.jsxs)("div", { className: "grow flex flex-col justify-between h-dvh sm:h-screen overflow-hidden", children: [children, (0, jsx_runtime_1.jsx)(TabBar_1.default, {})] }) }) }));
}
exports.default = MobileLayout;
