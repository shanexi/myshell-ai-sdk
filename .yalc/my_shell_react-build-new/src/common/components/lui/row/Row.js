"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = __importDefault(require("../button/index.js"));
function Row({ row, rowIndex, latest, disabled }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full flex flex-wrap gap-3", children: row.components.map((button, index) => button.button && ((0, jsx_runtime_1.jsx)(button_1.default, { rowIndex: rowIndex, buttonProps: button.button, index: index, latest: latest, disabled: disabled }, index))) }));
}
exports.default = Row;
