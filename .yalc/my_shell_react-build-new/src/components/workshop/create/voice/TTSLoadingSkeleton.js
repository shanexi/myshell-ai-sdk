"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TTSLoadingSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const CustomSketelon_1 = __importDefault(require("../../../../common/components/CustomSketelon.js"));
const common_helper_1 = require("../../../../common/utils/common-helper.js");
function TTSLoadingSkeleton({ num, animate = true }) {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: Array(num)
            .fill(0)
            .map(() => ((0, jsx_runtime_1.jsx)("div", { className: 'flex w-full items-center rounded-xl relative h-[60px] mb-3', children: (0, jsx_runtime_1.jsxs)("div", { className: "flex w-full px-2 py-3 items-center rounded-xl border-[1px] border-default relative space-x-2", children: [(0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { animate: animate, customClass: (0, clsx_1.default)('h-6 rounded-full w-6') }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { animate: animate, customClass: (0, clsx_1.default)('h-8 rounded-full w-8') }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { animate: animate, customClass: (0, clsx_1.default)('h-5 rounded-md w-32') }), (0, jsx_runtime_1.jsx)(CustomSketelon_1.default, { animate: animate, customClass: (0, clsx_1.default)('h-5 rounded-md w-8') })] }) }, (0, common_helper_1.generateUUID)()))) }));
}
