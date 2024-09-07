"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const RewardIcon = React.forwardRef((props, ref) => {
    return ((0, jsx_runtime_1.jsxs)("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", children: [(0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6.32644 4.57031H17.7809L21.0536 10.2703L12.0537 20.8561L3.05371 10.2703L6.32644 4.57031Z", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M6.32568 4.57031L12.053 20.8561L17.7802 4.57031", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M3.05371 10.2695H21.0536", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M8.37207 10.2703L12.0539 4.57031L15.7357 10.2703", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M20.654 0.603721C20.7195 0.409109 20.9948 0.409109 21.0602 0.603721L21.5424 2.03707C21.5638 2.1006 21.6137 2.15047 21.6772 2.17184L23.1105 2.65404C23.3051 2.71951 23.3051 2.99477 23.1105 3.06024L21.6772 3.54244C21.6137 3.56382 21.5638 3.61369 21.5424 3.67722L21.0602 5.11056C20.9948 5.30518 20.7195 5.30518 20.654 5.11056L20.1718 3.67722C20.1505 3.61369 20.1006 3.56382 20.0371 3.54244L18.6037 3.06024C18.4091 2.99477 18.4091 2.71951 18.6037 2.65404L20.0371 2.17184C20.1006 2.15047 20.1505 2.1006 20.1718 2.03707L20.654 0.603721Z", fill: "currentColor" })] }));
});
exports.default = RewardIcon;
