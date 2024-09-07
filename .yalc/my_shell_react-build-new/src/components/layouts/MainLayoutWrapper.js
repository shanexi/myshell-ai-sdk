"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MainLayoutWrapper;
const jsx_runtime_1 = require("react/jsx-runtime");
const AllProviders_1 = require("./AllProviders.js");
function MainLayoutWrapper({ children }) {
    return (0, jsx_runtime_1.jsx)(AllProviders_1.Providers, { children: children });
}
