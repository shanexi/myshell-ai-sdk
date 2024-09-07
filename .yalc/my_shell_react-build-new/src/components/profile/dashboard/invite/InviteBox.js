"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const DocumentDuplicateIcon_1 = __importDefault(require("@heroicons/react/24/outline/DocumentDuplicateIcon"));
const spinner_1 = __importDefault(require("../../../../common/components/ui/spinner.js"));
const useCopyClipboard_1 = __importDefault(require("../../../../common/hooks/useCopyClipboard.js"));
function InviteBox(props) {
    const { title, text, containerClass } = props;
    const { onCopy } = (0, useCopyClipboard_1.default)(text);
    return ((0, jsx_runtime_1.jsxs)("div", { className: containerClass, children: [(0, jsx_runtime_1.jsx)("p", { className: "text-default text-sm font-medium mb-1.5", children: title }), (0, jsx_runtime_1.jsxs)("div", { className: "relative pl-3 pr-2 py-2 rounded-xl overflow-hidden truncate cursor-pointer border-[1px] border-solid border-default inline-flex items-center text-[14px] leading-[20px] w-full justify-between shadow", onClick: () => {
                    onCopy();
                }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex mr-6 md:mr-0 truncate text-on-surface", children: [text || (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute w-24 h-full inset-y-0 right-4 md:right-0" })] }), (0, jsx_runtime_1.jsx)("i", { className: "absolute md:relative right-2 md:right-0 flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(DocumentDuplicateIcon_1.default, { className: "w-[18px] h-[18px] text-surface-primary-default" }) })] })] }));
}
exports.default = InviteBox;
