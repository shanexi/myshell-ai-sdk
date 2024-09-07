"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Skeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const CustomSketelon_1 = __importDefault(require("../../../../../common/components/CustomSketelon.js"));
const common_helper_1 = require("../../../../../common/utils/common-helper.js");
const utils_1 = require("../../../../../lib/utils.js");
function Skeleton() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col", children: Array(6)
            .fill(0)
            .map(() => ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex items-center justify-between py-4 border-default border-b space-x-2'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-1.5 flex-1", children: [(0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { animate: true, customClass: (0, utils_1.cn)('h-6 w-48') }), (0, jsx_runtime_1.jsxs)("div", { className: "grow flex space-x-1.5", children: [(0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { animate: true, customClass: (0, utils_1.cn)('h-8 w-[120px] rounded-md') }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { animate: true, customClass: (0, utils_1.cn)('h-8 w-[120px] rounded-md') })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex-col items-center justify-center gap-y-0.5", children: (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { animate: true, customClass: (0, utils_1.cn)('h-8 w-[80px] rounded-md') }) })] }, (0, common_helper_1.generateUUID)()))) }));
}
