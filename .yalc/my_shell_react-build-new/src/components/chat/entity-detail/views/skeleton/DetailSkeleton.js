"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DetailSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../../common/components/ui/skeleton.js");
const AuthorSkeleton_1 = __importDefault(require("../common/author/skeleton/AuthorSkeleton.js"));
const DescriptionSkeleton_1 = __importDefault(require("../common/description/skeleton/DescriptionSkeleton.js"));
const LogoSkeleton_1 = __importDefault(require("../common/logo/skeleton/LogoSkeleton.js"));
const ButtonSlotSkeleton_1 = __importDefault(require("../common/others/skeleton/ButtonSlotSkeleton.js"));
const TabSkeleton_1 = __importDefault(require("../common/others/skeleton/TabSkeleton.js"));
const TagsSkeleton_1 = __importDefault(require("../common/tags/skeleton/TagsSkeleton.js"));
function DetailSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col gap-2 md:gap-5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col gap-3 md:gap-5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center w-full justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(LogoSkeleton_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1 grow overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-1", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-[26px] md:h-[28px] w-32" }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex", children: (0, jsx_runtime_1.jsx)(AuthorSkeleton_1.default, {}) })] })] }), (0, jsx_runtime_1.jsx)(ButtonSlotSkeleton_1.default, {})] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-3 md:gap-4", children: [(0, jsx_runtime_1.jsx)(TagsSkeleton_1.default, {}), (0, jsx_runtime_1.jsx)(DescriptionSkeleton_1.default, {})] })] }), (0, jsx_runtime_1.jsx)(TabSkeleton_1.default, {})] }));
}
