"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatSettingSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const CustomSketelon_1 = __importDefault(require("../../../common/components/CustomSketelon.js"));
function ChatSettingSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full overflow-auto bg-white flex flex-col", children: [(0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "h-[32px] w-[30%] mt-5" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-[32px] mt-8", children: [(0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "rounded-[12px] h-[75px]" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "rounded-[12px] h-[75px]" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "rounded-[12px] h-[75px]" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "rounded-[12px] h-[75px]" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "rounded-[12px] h-[140px]" })] }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "h-[48px] mt-2 w-[47%]" })] }));
}
