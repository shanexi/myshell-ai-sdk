"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PartialDetailSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../../common/components/ui/skeleton.js");
const LogoSkeleton_1 = __importDefault(require("../common/logo/skeleton/LogoSkeleton.js"));
function PartialDetailSkeleton() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(LogoSkeleton_1.default, {}), (0, jsx_runtime_1.jsx)("div", { className: "grow flex items-center ml-3", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-10 lg:w-[40%] mb-2 lg:mb-0 rounded" }) })] }));
}
