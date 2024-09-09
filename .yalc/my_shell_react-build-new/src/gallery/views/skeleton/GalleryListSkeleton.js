"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GalleryListSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const spinner_1 = __importDefault(require("../../../common/components/ui/spinner"));
function GalleryListSkeleton({ isMobile }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "h-screen flex-1 flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { color: "brand" }) }));
}
