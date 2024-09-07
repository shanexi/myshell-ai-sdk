"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DevMode;
const jsx_runtime_1 = require("react/jsx-runtime");
const bot_1 = require("../../../../../common/constants/interfaces/bot.js");
const ApiMode_1 = __importDefault(require("./ApiMode.js"));
const DevModeTypeForm_1 = __importDefault(require("./DevModeTypeForm.js"));
const ProConfigMode_1 = __importDefault(require("./ProConfigMode.js"));
function DevMode(props) {
    const { form } = props;
    const devModeType = form.getFieldValue('devModeType');
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-3", children: [(0, jsx_runtime_1.jsx)(DevModeTypeForm_1.default, { form: form }), devModeType === bot_1.DevModeTypeEnum.PRO ? (0, jsx_runtime_1.jsx)(ProConfigMode_1.default, { ...props }) : (0, jsx_runtime_1.jsx)(ApiMode_1.default, {})] }));
}
