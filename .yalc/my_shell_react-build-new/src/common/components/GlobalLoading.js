"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const spinner_1 = __importDefault(require("../../common/components/ui/spinner.js"));
function GlobalLoading(props) {
    const { loadingText } = props;
    return ((0, jsx_runtime_1.jsx)(react_1.Portal, { children: (0, jsx_runtime_1.jsx)(react_1.Flex, { justifyContent: "center", alignItems: "center", bg: "rgba(0, 0, 0, .5)", position: "fixed", zIndex: "50", left: "0", right: "0", top: "0", bottom: "0", children: (0, jsx_runtime_1.jsxs)(react_1.Flex, { direction: "column", gap: "12px", alignItems: "center", color: "white", children: [(0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand", size: "md" }), loadingText || 'Loading...'] }) }) }));
}
exports.default = GlobalLoading;
