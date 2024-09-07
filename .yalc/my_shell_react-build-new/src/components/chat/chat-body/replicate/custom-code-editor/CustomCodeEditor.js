"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CustomCodeEditor;
const jsx_runtime_1 = require("react/jsx-runtime");
const code_editor_1 = __importDefault(require("../../../../../common/components/code-editor/index.js"));
const CopyBtn_1 = __importDefault(require("../../../../../components/chat/chat-body/replicate/custom-code-editor/CopyBtn.js"));
function CustomCodeEditor(props) {
    const { name, setFormValue, value } = props;
    const onValueChange = (v) => {
        setFormValue(name, v);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col", children: [(0, jsx_runtime_1.jsx)("div", { className: "shrink-0 flex items-center p-4 space-x-4", children: (0, jsx_runtime_1.jsx)("div", { className: "grow flex justify-end", children: (0, jsx_runtime_1.jsx)(CopyBtn_1.default, { code: value }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "w-full h-[200px]", children: (0, jsx_runtime_1.jsx)(code_editor_1.default, { language: "javascript", value: value, onValueChange: onValueChange }) })] }));
}
