"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const common_helper_1 = require("../../../../../common/utils/common-helper.js");
const Ios_1 = __importDefault(require("./Ios.js"));
const Normal_1 = __importDefault(require("./Normal.js"));
function Audio(props) {
    const isIosDevice = (0, common_helper_1.isIos)();
    return isIosDevice ? (0, jsx_runtime_1.jsx)(Ios_1.default, { ...props }) : (0, jsx_runtime_1.jsx)(Normal_1.default, { ...props });
}
exports.default = (0, react_1.memo)(Audio);
