"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../../../../lib/utils.js");
const form_1 = require("../../../../../common/components/ui/form.js");
const provider_1 = require("../provider/index.js");
const react_hook_form_1 = require("react-hook-form");
const Grid = props => {
    const { name = '', children } = props;
    const { fields } = (0, provider_1.useFormEngineContext)();
    const { control } = (0, react_hook_form_1.useFormContext)();
    const { schema } = fields[name] || {};
    if (!schema) {
        return null;
    }
    const { type, 'x-class': xClass } = schema;
    const cls = (0, utils_1.cn)('grid grid-cols-2 gap-2', xClass);
    const render = () => {
        return ((0, jsx_runtime_1.jsx)("div", { className: cls, children: react_1.default.Children.map(children, (child, i) => {
                if (!react_1.default.isValidElement(child)) {
                    return null;
                }
                const { schema: { 'x-hidden': xHidden, 'x-class': xChildClass } } = fields[child.props.name];
                return !xHidden ? ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex items-center', xChildClass), children: (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex-1', xChildClass), children: child }) }, i)) : (child);
            }) }));
    };
    return type === 'void' ? render() : (0, jsx_runtime_1.jsx)(form_1.FormField, { control: control, name: name, render: render });
};
exports.default = Grid;
