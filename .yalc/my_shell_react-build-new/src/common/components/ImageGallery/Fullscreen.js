"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const SVG_1 = __importDefault(require("./SVG.js"));
const Fullscreen = react_1.default.memo(({ isFullscreen, onClick }) => {
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", className: "appearance-none absolute right-0 bottom-0 p-5 text-white bg-transparent border-0 cursor-pointer z-[4] drop-shadow-md", onClick: onClick, "aria-label": "Open Fullscreen", children: (0, jsx_runtime_1.jsx)(SVG_1.default, { strokeWidth: 2, icon: isFullscreen ? 'minimize' : 'maximize' }) }));
});
exports.default = Fullscreen;
