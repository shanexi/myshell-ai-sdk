"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("../../../lib/utils.js");
function DownIcon({ className }) {
    return ((0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", className: (0, utils_1.cn)('transition-all', className), children: (0, jsx_runtime_1.jsx)("path", { d: "M6.75593 8.8908C6.35716 9.35126 5.64284 9.35126 5.24407 8.8908L1.3708 4.41832C0.80992 3.77068 1.26997 2.76367 2.12673 2.76367L9.87328 2.76367C10.73 2.76367 11.1901 3.77068 10.6292 4.41833L6.75593 8.8908Z" }) }));
}
exports.default = DownIcon;
