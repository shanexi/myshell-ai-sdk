"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ItemDemo = () => {
    console.log('a');
    return (0, jsx_runtime_1.jsx)("div", { className: "text-lg text-brand", children: "Yes. this is ItemDemo children." });
};
exports.default = ItemDemo;
