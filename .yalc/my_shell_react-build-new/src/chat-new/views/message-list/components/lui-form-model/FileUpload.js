"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileUpload;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_hook_form_1 = require("react-hook-form");
const FileUpload_1 = __importDefault(require("../../../../../chat/views/chat-body/replicate/FileUpload.js"));
function FileUpload(props) {
    const { setValue } = (0, react_hook_form_1.useFormContext)();
    return (0, jsx_runtime_1.jsx)(FileUpload_1.default, { ...props, setFormValue: setValue });
}
