"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MenuContainerSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const utils_1 = require("../../../lib/utils.js");
const MenuListSkeleton_1 = __importDefault(require("./MenuListSkeleton.js"));
function MenuContainerSkeleton({ number, listNumber = 1 }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('h-full flex flex-col relative overflow-hidden w-full md:w-[280px] lg:w-[320px] large:w-[360px]'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "ChatBotListSkeleton flex-col items-center flex flex-shrink-0", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center py-5 md:py-6 pb-3 w-full px-4 md:px-6", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[80px] h-8" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[75px] h-5" })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full px-4 md:px-6 mb-3", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-10 rounded-full" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "w-full h-[97px] rounded-xl px-1 md:px-3", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-[72px] w-full" }), (0, jsx_runtime_1.jsx)("div", { className: "w-full px-3 my-3", children: (0, jsx_runtime_1.jsx)("div", { className: "w-full h-0 border-b border-default" }) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "px-1 md:px-3", children: Array(listNumber)
                    .fill(1)
                    .map(() => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full flex justify-between py-1.5 items-center px-3 md:px-3", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-20 h-6" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-5 h-6" })] }), (0, jsx_runtime_1.jsx)(MenuListSkeleton_1.default, { number: number })] }, (0, common_helper_1.generateUUID)()))) })] }));
}
