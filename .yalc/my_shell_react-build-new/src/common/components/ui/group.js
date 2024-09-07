"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Group;
const jsx_runtime_1 = require("react/jsx-runtime");
function Group({ children }) {
    return (0, jsx_runtime_1.jsx)("div", { className: "flex space-x-2", children: children });
}
