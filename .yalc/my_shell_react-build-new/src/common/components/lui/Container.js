"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const row_1 = __importDefault(require("./row/index.js"));
function Container({ latest, component, disabled = false }) {
    return (0, jsx_runtime_1.jsx)(row_1.default, { rows: component.components, latest: latest, disabled: disabled });
}
exports.default = Container;
