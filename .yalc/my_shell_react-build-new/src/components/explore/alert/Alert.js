"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Alert;
const jsx_runtime_1 = require("react/jsx-runtime");
const BellAlertIcon_1 = __importDefault(require("@heroicons/react/24/solid/BellAlertIcon"));
const react_1 = require("react");
const Close_1 = __importDefault(require("../../../common/components/icons/Close.js"));
const icon_button_1 = require("../../../common/components/ui/icon-button.js");
const utils_1 = require("../../../lib/utils.js");
function Alert(props) {
    const { content } = props;
    const [show, setShow] = (0, react_1.useState)(true);
    if (!show)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('px-3 py-2 bg-surface-accent-yellow-subtle w-full text-center rounded-[10px]'), children: (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex gap-[10px] items-center justify-between'), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex gap-2'), children: [(0, jsx_runtime_1.jsx)(BellAlertIcon_1.default, { className: (0, utils_1.cn)('w-[24px] h-[24px]') }), (0, jsx_runtime_1.jsx)("p", { children: content })] }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { onClick: () => setShow(false), className: (0, utils_1.cn)('bg-transparent hover:bg-transparent active:bg-transparent border-none'), children: (0, jsx_runtime_1.jsx)(Close_1.default, { className: (0, utils_1.cn)('w-[24px] h-[24px]') }) })] }) }));
}
