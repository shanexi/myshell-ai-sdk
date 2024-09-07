"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const CheckIcon_1 = __importDefault(require("@heroicons/react/24/outline/CheckIcon"));
const DocumentDuplicateIcon_1 = __importDefault(require("@heroicons/react/24/outline/DocumentDuplicateIcon"));
const react_2 = require("react");
const spinner_1 = __importDefault(require("../../../common/components/ui/spinner.js"));
const useCopyClipboard_1 = __importDefault(require("../../../common/hooks/useCopyClipboard.js"));
function CopyToClipboard(props) {
    const { title, text, className = '' } = props;
    const [copied, setCopied] = (0, react_2.useState)(false);
    const onSuccess = () => {
        setCopied(true);
    };
    const { onCopy } = (0, useCopyClipboard_1.default)(text, '', onSuccess, false);
    return ((0, jsx_runtime_1.jsxs)("div", { className: className, children: [(0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "14px", lineHeight: "20px", color: "var(--on-surface)", children: title }), (0, jsx_runtime_1.jsxs)("div", { className: "relative pl-3 pr-2 py-2 rounded-xl overflow-hidden truncate cursor-pointer border-[1px] border-solid border-default inline-flex items-center text-[14px] leading-[20px] w-full justify-between shadow hover:border-[#C9CCCF]", onClick: () => onCopy(text), children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex mr-6 md:mr-0 truncate text-on-surface", children: [text || (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute w-24 h-full inset-y-0 right-4 md:right-0" })] }), (0, jsx_runtime_1.jsx)("i", { className: "absolute md:relative right-2 md:right-0 flex justify-center items-center", children: copied ? ((0, jsx_runtime_1.jsx)(CheckIcon_1.default, { className: "w-[18px] h-[18px] stroke-[#0DCC7F]" })) : ((0, jsx_runtime_1.jsx)(DocumentDuplicateIcon_1.default, { className: "w-[18px] h-[18px] stroke-primary" })) })] })] }));
}
exports.default = CopyToClipboard;
