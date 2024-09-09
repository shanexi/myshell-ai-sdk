"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const spinner_1 = __importDefault(require("../../../../../common/components/ui/spinner"));
const Header = ({ loading }) => {
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "w-full flex justify-center", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { color: "brand" }) }));
    }
    return null;
};
exports.default = Header;
