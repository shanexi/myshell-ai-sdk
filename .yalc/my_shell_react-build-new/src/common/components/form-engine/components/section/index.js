"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_hook_form_1 = require("react-hook-form");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const utils_1 = require("../../../../../lib/utils.js");
const provider_1 = require("../provider/index.js");
const Section = props => {
    const { children, name = '' } = props;
    const { fields, components } = (0, provider_1.useFormEngineContext)();
    const { schema } = fields[name] || {};
    const { getValues, setValue } = (0, react_hook_form_1.useFormContext)();
    if (!schema) {
        return null;
    }
    const { title, description, 'x-title-size': xTitleSize = 'h1', 'x-class': xClass = '', 'x-suffix': xSuffix } = schema;
    const cls = (0, utils_1.cn)('mt-2 space-y-5', xClass);
    const value = name !== '' ? getValues(name) : getValues();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", "data-ui": "section", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [title ? ((0, jsx_runtime_1.jsx)(typography_1.Heading, { size: xTitleSize, lineClamp: 1, children: title })) : null, xSuffix ? (0, jsx_runtime_1.jsx)("div", { className: "ml-auto", children: react_1.default.createElement(components[xSuffix], { value }) }) : null] }), description ? ((0, jsx_runtime_1.jsx)(typography_1.Paragraph, { size: "sm", lineClamp: 2, color: "subtler", className: "mt-1", children: description })) : null, (0, jsx_runtime_1.jsx)("div", { className: cls, children: children })] }));
};
exports.default = Section;
