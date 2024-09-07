"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaucetSkeleton = FaucetSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const CustomSketelon_1 = __importDefault(require("../../../common/components/CustomSketelon.js"));
const FaucetTabSkeleton_1 = require("./FaucetTabSkeleton.js");
function FaucetSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full m-2 md:flex flex-col items-center relative bg-surface-default rounded-4xl overflow-hidden", children: [(0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "flex items-center w-full h-[56px] md:h-[72px] px-4 py-2.5 md:px-5 md:py-[18px] md:rounded-t-[24px] md:border-b md:border-default" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "w-[40%] h-[32px] mt-[56px] md:ml-[150px]" }), (0, jsx_runtime_1.jsx)(FaucetTabSkeleton_1.FaucetTabSkeleton, {})] }));
}
