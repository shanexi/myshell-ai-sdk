"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const form_1 = require("../../../../../common/components/ui/form.js");
const caret_down_1 = require("../../../../../common/components/ui/icons/solid/caret-down.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const utils_1 = require("../../../../../lib/utils.js");
const control_1 = __importDefault(require("../control/index.js"));
const provider_1 = require("../provider/index.js");
const Block = props => {
    const { name = '', children } = props;
    const { fields, append } = (0, provider_1.useFormEngineContext)();
    const { schema } = fields[name] || {};
    if (!schema) {
        return null;
    }
    const { type, title, description, 'x-title-size': xTitleSize = 'h3', 'x-collapsible': xCollapsible, 'x-addable': xAddable, 'x-component': xComponent, 'x-empty': xEmpty, 'x-class': xClass } = schema;
    const [isExpand, setIsExpand] = (0, react_1.useState)(true);
    const { control } = (0, react_hook_form_1.useFormContext)();
    const onExpandToggle = () => {
        setIsExpand(!isExpand);
    };
    const contentCls = (0, utils_1.cn)('mt-2 space-y-5', {
        hidden: !isExpand
    }, xClass);
    const onAdd = () => {
        append(name);
    };
    const renderCollapsibleTitle = () => {
        return xCollapsible ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-6 h-6 flex items-center justify-center cursor-pointer mr-1", onClick: onExpandToggle, children: (0, jsx_runtime_1.jsx)(caret_down_1.CaretDown, { size: "2xs", color: "subtlest", rotate: !isExpand ? '-90' : undefined }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsx)(typography_1.Heading, { size: xTitleSize, lineClamp: 1, children: title }) })] })) : ((0, jsx_runtime_1.jsx)(typography_1.Heading, { size: xTitleSize, lineClamp: 1, children: title }));
    };
    const renderTitle = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: renderCollapsibleTitle() }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center space-x-1", children: xAddable ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center cursor-pointer text-primary", onClick: onAdd, children: [(0, jsx_runtime_1.jsx)("div", { className: "w-6 h-6 flex items-center justify-center", children: (0, jsx_runtime_1.jsx)("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: (0, jsx_runtime_1.jsx)("path", { d: "M9 3.9375C9.31066 3.9375 9.5625 4.18934 9.5625 4.5V8.4375L13.5 8.4375C13.8107 8.4375 14.0625 8.68934 14.0625 9C14.0625 9.31066 13.8107 9.5625 13.5 9.5625L9.5625 9.5625V13.5C9.5625 13.8107 9.31066 14.0625 9 14.0625C8.68934 14.0625 8.4375 13.8107 8.4375 13.5V9.5625L4.5 9.5625C4.18934 9.5625 3.9375 9.31066 3.9375 9C3.9375 8.68934 4.18934 8.4375 4.5 8.4375L8.4375 8.4375V4.5C8.4375 4.18934 8.68934 3.9375 9 3.9375Z" }) }) }), "Add"] })) : null })] }));
    };
    if (xComponent) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", "data-ui": "block", children: [title ? renderTitle() : null, description ? ((0, jsx_runtime_1.jsx)(typography_1.Paragraph, { size: "lg", lineClamp: 2, color: "subtler", className: "mt-1", children: description })) : null, (0, jsx_runtime_1.jsx)("div", { className: contentCls, children: (0, jsx_runtime_1.jsx)(control_1.default, { name: name }) })] }));
    }
    const render = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", "data-ui": "block", children: [title ? renderTitle() : null, description ? ((0, jsx_runtime_1.jsx)(typography_1.Paragraph, { size: "lg", color: "subtler", lineClamp: 2, className: "mt-1", children: description })) : null, (0, jsx_runtime_1.jsx)("div", { className: contentCls, children: children })] }));
    };
    return type === 'void' ? render() : (0, jsx_runtime_1.jsx)(form_1.FormField, { control: control, name: name, render: render });
};
exports.default = Block;
