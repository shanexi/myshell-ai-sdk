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
exports.Drag = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const icon_1 = require("../../icon.js");
const Drag = React.forwardRef((props, ref) => {
    return ((0, jsx_runtime_1.jsx)(icon_1.Icon, { ...props, children: (0, jsx_runtime_1.jsx)("svg", { ref: ref, className: "w-full h-full", viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7.5 5C7.5 4.17157 8.17157 3.5 9 3.5C9.82843 3.5 10.5 4.17157 10.5 5C10.5 5.82843 9.82843 6.5 9 6.5C8.17157 6.5 7.5 5.82843 7.5 5ZM13.5 5C13.5 4.17157 14.1716 3.5 15 3.5C15.8284 3.5 16.5 4.17157 16.5 5C16.5 5.82843 15.8284 6.5 15 6.5C14.1716 6.5 13.5 5.82843 13.5 5ZM7.5 12C7.5 11.1716 8.17157 10.5 9 10.5C9.82843 10.5 10.5 11.1716 10.5 12C10.5 12.8284 9.82843 13.5 9 13.5C8.17157 13.5 7.5 12.8284 7.5 12ZM13.5 12C13.5 11.1716 14.1716 10.5 15 10.5C15.8284 10.5 16.5 11.1716 16.5 12C16.5 12.8284 15.8284 13.5 15 13.5C14.1716 13.5 13.5 12.8284 13.5 12ZM7.5 19C7.5 18.1716 8.17157 17.5 9 17.5C9.82843 17.5 10.5 18.1716 10.5 19C10.5 19.8284 9.82843 20.5 9 20.5C8.17157 20.5 7.5 19.8284 7.5 19ZM13.5 19C13.5 18.1716 14.1716 17.5 15 17.5C15.8284 17.5 16.5 18.1716 16.5 19C16.5 19.8284 15.8284 20.5 15 20.5C14.1716 20.5 13.5 19.8284 13.5 19Z" }) }) }));
});
exports.Drag = Drag;
