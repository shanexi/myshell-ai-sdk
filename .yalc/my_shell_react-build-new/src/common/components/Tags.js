"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tags = Tags;
const jsx_runtime_1 = require("react/jsx-runtime");
const Tag_1 = __importDefault(require("./Tag.js"));
function Tags({ tagList, showCount, className }) {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (tagList ?? []).slice(0, showCount ?? (tagList ?? []).length).map((tag, index) => {
            return (0, jsx_runtime_1.jsx)(Tag_1.default, { tag: tag, index: index, className: className }, tag.id);
        }) }));
}
