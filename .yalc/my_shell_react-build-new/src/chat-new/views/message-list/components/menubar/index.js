"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Menubar;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("../../../../../lib/utils");
const actions_1 = __importDefault(require("../actions"));
function Menubar(props) {
    const { className } = props;
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('mt-2.5 mx-0.5', className), children: (0, jsx_runtime_1.jsx)(actions_1.default, { source: "menubar" }) }));
}
