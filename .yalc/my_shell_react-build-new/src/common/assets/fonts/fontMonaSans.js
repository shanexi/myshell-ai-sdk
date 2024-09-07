"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fontMonaSans = void 0;
const local_1 = __importDefault(require("next/font/local"));
exports.fontMonaSans = (0, local_1.default)({
    src: '../../../../public/font/Mona-Sans-Thin.woff2',
    variable: '--font-mona-sans',
    display: 'swap',
    fallback: ['sans-serif'],
    weight: 'normal',
    style: 'normal'
});
