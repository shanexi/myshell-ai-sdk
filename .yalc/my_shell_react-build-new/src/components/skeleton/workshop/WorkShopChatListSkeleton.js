"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkShopChatListSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const separator_1 = require("../../../common/components/ui/separator.js");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const MenuListSkeleton_1 = __importDefault(require("../../../components/skeleton/common/MenuListSkeleton.js"));
function WorkShopChatListSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "h-full flex flex-col relative overflow-hidden w-full", children: [(0, jsx_runtime_1.jsx)("div", { className: "py-3", children: (0, jsx_runtime_1.jsx)(separator_1.Separator, {}) }), (0, jsx_runtime_1.jsx)("div", { children: Array(3)
                    .fill(1)
                    .map(() => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: " flex-col items-center flex flex-shrink-0", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex justify-between py-1.5 items-center px-3 md:px-3", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-20 h-6" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-5 h-6" })] }) }), (0, jsx_runtime_1.jsx)(MenuListSkeleton_1.default, { number: 3 })] }, (0, common_helper_1.generateUUID)()))) })] }));
}
