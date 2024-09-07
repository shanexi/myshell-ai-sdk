"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const left = (0, jsx_runtime_1.jsx)("polyline", { points: "15 18 9 12 15 6" });
const right = (0, jsx_runtime_1.jsx)("polyline", { points: "9 18 15 12 9 6" });
const maximize = ((0, jsx_runtime_1.jsx)("path", { d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" }));
const minimize = ((0, jsx_runtime_1.jsx)("path", { d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" }));
const play = (0, jsx_runtime_1.jsx)("polygon", { points: "5 3 19 12 5 21 5 3" });
const pause = ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [(0, jsx_runtime_1.jsx)("rect", { x: "6", y: "4", width: "4", height: "16" }), (0, jsx_runtime_1.jsx)("rect", { x: "14", y: "4", width: "4", height: "16" })] }));
const iconMapper = {
    left,
    right,
    maximize,
    minimize,
    play,
    pause
};
const defaultProps = {
    strokeWidth: 1,
    viewBox: '0 0 24 24'
};
const SVG = (props) => {
    const { strokeWidth, viewBox, icon } = { ...defaultProps, ...props };
    return ((0, jsx_runtime_1.jsx)("svg", { className: "image-gallery-svg w-[16px] h-[16px] md:w-[28px] md:h-[28px] focus:outline-none", xmlns: "http://www.w3.org/2000/svg", viewBox: viewBox, fill: "none", stroke: "currentColor", strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", children: iconMapper[icon] }));
};
exports.default = SVG;
