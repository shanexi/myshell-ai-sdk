"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tags;
const jsx_runtime_1 = require("react/jsx-runtime");
const Tag_1 = __importDefault(require("./Tag.js"));
function Tags({ tags }) {
    if (!tags.length)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full flex items-center flex-wrap", children: tags.map(item => {
            return ((0, jsx_runtime_1.jsx)(Tag_1.default, { showHoverableContent: item.extra?.isShowHover, hoverContent: item.extra?.hoverText, iconUrl: item.iconUrl, label: item.label, className: "mr-1.5 mb-1.5" }, item.id));
        }) }));
}
