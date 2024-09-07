"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_hook_form_1 = require("react-hook-form");
const form_1 = require("../../../../../common/components/ui/form.js");
const provider_1 = require("../provider/index.js");
const Switch = props => {
    const { name = '', children } = props;
    const { fields } = (0, provider_1.useFormEngineContext)();
    const { control } = (0, react_hook_form_1.useFormContext)();
    const { schema } = fields[name] || {};
    if (!schema) {
        return null;
    }
    const { type, title } = schema;
    const render = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between h-10 rounded-lg border border-default bg-surface-search-field shadow-background-default p-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: title }), children] }));
    };
    return type === 'void' ? render() : (0, jsx_runtime_1.jsx)(form_1.FormField, { control: control, name: name, render: render });
};
exports.default = Switch;
