"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellCoin = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const shell_cion_3x_png_1 = __importDefault(require("./assets/images/shell_cion@3x.png"));
const shell_coin_png_1 = __importDefault(require("./assets/images/shell_coin.png"));
;
const ShellCoin = ({ size, className, varient = 'samll' }) => {
    return ((0, jsx_runtime_1.jsx)("img", { alt: "shell coin", width: size, height: size, src: varient === 'samll' ? shell_coin_png_1.default.src : shell_cion_3x_png_1.default.src, className: className }));
};
exports.ShellCoin = ShellCoin;
