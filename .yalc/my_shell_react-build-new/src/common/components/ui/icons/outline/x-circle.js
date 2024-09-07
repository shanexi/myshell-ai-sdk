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
exports.XCircle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const icon_1 = require("../../icon.js");
const XCircle = React.forwardRef((props, ref) => {
    return ((0, jsx_runtime_1.jsx)(icon_1.Icon, { ...props, children: (0, jsx_runtime_1.jsxs)("svg", { ref: ref, className: "w-full h-full", viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: [(0, jsx_runtime_1.jsx)("path", { d: "M9.21967 9.21967C9.51256 8.92678 9.98744 8.92678 10.2803 9.21967L12 10.9393L13.7197 9.21967C14.0126 8.92678 14.4874 8.92678 14.7803 9.21967C15.0732 9.51256 15.0732 9.98744 14.7803 10.2803L13.0607 12L14.7803 13.7197C15.0732 14.0126 15.0732 14.4874 14.7803 14.7803C14.4874 15.0732 14.0126 15.0732 13.7197 14.7803L12 13.0607L10.2803 14.7803C9.98744 15.0732 9.51256 15.0732 9.21967 14.7803C8.92678 14.4874 8.92678 14.0126 9.21967 13.7197L10.9393 12L9.21967 10.2803C8.92678 9.98744 8.92678 9.51256 9.21967 9.21967Z" }), (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12ZM12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75Z" })] }) }));
});
exports.XCircle = XCircle;
