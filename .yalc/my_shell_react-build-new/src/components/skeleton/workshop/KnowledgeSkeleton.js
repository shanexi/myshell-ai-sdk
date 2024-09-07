"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = KnowledgeSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const CustomSketelon_1 = __importDefault(require("../../../common/components/CustomSketelon.js"));
function KnowledgeSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full overflow-auto bg-white flex flex-col", children: [(0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "h-[32px] w-[30%] mt-5" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "mt-8 h-[44px]" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "mt-8 h-[132px] rounded-[12px]" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "mt-8 h-[20px] w-[20%]" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "mt-2 h-[20px] w-[60%]" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "mt-2 h-[40px] rounded-[12px]" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "mt-8 h-[20px] w-[20%]" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "mt-2 h-[20px] w-[60%]" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "mt-2 h-[40px] rounded-[12px]" })] }));
}
