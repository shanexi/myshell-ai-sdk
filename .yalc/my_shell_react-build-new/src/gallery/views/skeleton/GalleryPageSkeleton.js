"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GalleryPageSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const TopActionsSkeleton_1 = __importDefault(require("../../../components/room-management/views/top-actions/skeleton/TopActionsSkeleton.js"));
const GalleryListSkeleton_1 = __importDefault(require("./GalleryListSkeleton.js"));
function GalleryPageSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { id: "gallery-page-skeleton", className: 'w-full h-screen md:h-[calc(100vh-16px)] flex flex-col flex-nowrap overflow-hidden bg-surface-default md:rounded-3xl bg-cover bg-no-repeat bg-center bg-origin-border', children: [(0, jsx_runtime_1.jsx)("div", { className: "h-15 w-full flex-shrink-0", children: (0, jsx_runtime_1.jsx)(TopActionsSkeleton_1.default, {}) }), (0, jsx_runtime_1.jsx)(GalleryListSkeleton_1.default, {})] }));
}
