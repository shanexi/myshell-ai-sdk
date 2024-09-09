"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalCardSkeleton = NormalCardSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const CustomSketelon_1 = __importDefault(require("../../../common/components/CustomSketelon"));
const utils_1 = require("../../../lib/utils");
function NormalCardSkeleton({ className, size = 'default' }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('w-full px-0 md:px-2.5 flex flex-row justify-start items-center rounded-xl overflow-hidden', className, size === 'sm' ? 'h-[72px]' : 'h-[88px]'), children: [(0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: (0, utils_1.cn)('flex-shrink-0 rounded-2xl mr-3', size === 'sm' ? 'h-[48px] w-[48px]' : 'h-[72px] w-[72px]') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center flex-col w-full space-y-1", children: [size === 'default' && (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "w-[60%] h-[16px] rounded" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: "w-full h-[16px] rounded" }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { customClass: (0, utils_1.cn)('h-[16px] rounded', size === 'default' ? 'w-[20%]' : 'w-[35%]') })] })] }));
}
