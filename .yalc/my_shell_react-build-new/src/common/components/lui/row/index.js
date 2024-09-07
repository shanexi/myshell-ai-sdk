"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Row_1 = __importDefault(require("./Row.js"));
function Rows({ rows, latest, disabled }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "space-y-3", children: rows.map((row, index) => ((0, jsx_runtime_1.jsx)(Row_1.default, { row: row, rowIndex: index, latest: latest, disabled: disabled }, index))) }));
}
exports.default = Rows;
