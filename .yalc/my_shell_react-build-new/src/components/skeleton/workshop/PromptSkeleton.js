"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PromptSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const CustomSketelon_1 = __importDefault(require("../../../common/components/CustomSketelon.js"));
function PromptSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full overflow-auto bg-white flex flex-col", children: [(0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "h-[32px] w-[30%] mt-5" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "mt-8 h-[200px] rounded-[10px]" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "h-[36px] mt-[32px] w-[40%] " }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between space-y-2 mt-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2 w-full mr-[32px]", children: [(0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "h-[28px]" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "h-[40px] mt-2" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "h-[20px] mt-2" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "h-[36px] mt-2 rounded-[12px]" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "h-[20px] mt-2" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "rounded-[12px] h-[190px] mt-2" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2 w-full", children: [(0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "h-[28px]" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "h-[40px] mt-2" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "rounded-[12px] h-[280px] mt-2" })] })] })] }));
}
