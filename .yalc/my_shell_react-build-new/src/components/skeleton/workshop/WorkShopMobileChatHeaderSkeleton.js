"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkShopMobileChatHeaderSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
const TopBarSkeleton_1 = __importDefault(require("../../../components/skeleton/workshop/TopBarSkeleton.js"));
function WorkShopMobileChatHeaderSkeleton({ hasTopBar = true, hasSetting = true, hasNav = true }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "h-[56px] cursor-pointer flex items-center bg-surface-default py-[10px] w-full justify-between space-x-3 min-h-10 shrink-0 px-4", children: [hasNav ? (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[32px] h-[32px] rounded-md flex-shrink-0" }) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: hasTopBar ? (0, jsx_runtime_1.jsx)(TopBarSkeleton_1.default, {}) : null }), hasSetting ? (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[32px] h-[32px] rounded-md flex-shrink-0" }) : null] }));
}
