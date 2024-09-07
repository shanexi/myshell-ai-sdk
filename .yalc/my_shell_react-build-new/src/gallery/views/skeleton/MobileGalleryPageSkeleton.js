"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MobileGalleryPageSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const TopActionsSkeleton_1 = __importDefault(require("../../../components/room-management/views/top-actions/skeleton/TopActionsSkeleton.js"));
const GalleryListSkeleton_1 = __importDefault(require("./GalleryListSkeleton.js"));
function MobileGalleryPageSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full flex flex-col bg-surface-default", children: [(0, jsx_runtime_1.jsx)("div", { className: "shrink-0", children: (0, jsx_runtime_1.jsx)(TopActionsSkeleton_1.default, {}) }), (0, jsx_runtime_1.jsx)("div", { className: "grow md:px-4", children: (0, jsx_runtime_1.jsx)(GalleryListSkeleton_1.default, { isMobile: true }) })] }));
}
