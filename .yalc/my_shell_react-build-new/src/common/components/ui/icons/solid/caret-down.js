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
exports.CaretDown = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const icon_1 = require("../../icon.js");
const CaretDown = React.forwardRef((props, ref) => {
    return ((0, jsx_runtime_1.jsx)(icon_1.Icon, { ...props, children: (0, jsx_runtime_1.jsx)("svg", { ref: ref, className: "w-full h-full", viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: (0, jsx_runtime_1.jsx)("path", { d: "M13.5119 17.7818C12.7143 18.7028 11.2857 18.7028 10.4881 17.7818L2.74159 8.83689C1.61984 7.54161 2.53995 5.52759 4.25345 5.52759L19.7466 5.52759C21.4601 5.52759 22.3802 7.54161 21.2584 8.8369L13.5119 17.7818Z" }) }) }));
});
exports.CaretDown = CaretDown;
