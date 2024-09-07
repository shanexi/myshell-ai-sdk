"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Skeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const CustomSketelon_1 = __importDefault(require("../../../../common/components/CustomSketelon.js"));
const common_helper_1 = require("../../../../common/utils/common-helper.js");
function Skeleton({ num, animate = true }) {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: Array(num)
            .fill(0)
            .map(() => ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('flex space-x-3 p-1 md:p-2'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "grow flex flex-col space-y-0.5", children: [(0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { animate: animate, customClass: (0, clsx_1.default)('h-6 w-24') }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { animate: animate, customClass: (0, clsx_1.default)('h-5 w-32') })] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('shrink-0 flex flex-col items-end space-y-0.5'), children: [(0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { animate: animate, customClass: (0, clsx_1.default)('h-6 w-24') }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { animate: animate, customClass: (0, clsx_1.default)('h-5 w-32') })] })] }, (0, common_helper_1.generateUUID)()))) }));
}
