"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MessageMenuItems;
const jsx_runtime_1 = require("react/jsx-runtime");
const actions_1 = __importDefault(require("../actions"));
function MessageMenuItems() {
    const onSendSensors = (action_type, other) => {
    };
    return (0, jsx_runtime_1.jsx)(actions_1.default, { source: "contextmenu" });
}
