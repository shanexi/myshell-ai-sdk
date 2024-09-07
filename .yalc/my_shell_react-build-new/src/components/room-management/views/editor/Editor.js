"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Editor;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const context_1 = __importDefault(require("../../../../chat/layouts/context.js"));
const utils_1 = require("../../../../lib/utils.js");
const OperationMenu_1 = __importDefault(require("./OperationMenu.js"));
const TextInput_1 = __importDefault(require("./TextInput.js"));
function Editor({ className }) {
    const { editorContainerRef } = (0, react_1.useContext)(context_1.default);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: editorContainerRef, className: (0, utils_1.cn)('px-4 md:px-6 py-3 md:py-4 flex flex-col gap-2 md:gap-1 h-fit w-full shrink-0 top-0 left-0 z-10 bg-surface-default md:rounded-b-3xl overflow-hidden', className), children: [(0, jsx_runtime_1.jsx)(TextInput_1.default, {}), (0, jsx_runtime_1.jsx)(OperationMenu_1.default, {})] }));
}
