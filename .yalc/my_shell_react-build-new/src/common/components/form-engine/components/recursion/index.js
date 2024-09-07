"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_hook_form_1 = require("react-hook-form");
const block_1 = __importDefault(require("../block/index.js"));
const card_1 = __importDefault(require("../card/index.js"));
const control_1 = __importDefault(require("../control/index.js"));
const grid_1 = __importDefault(require("../grid/index.js"));
const provider_1 = require("../provider/index.js");
const section_1 = __importDefault(require("../section/index.js"));
const switch_1 = __importDefault(require("../switch/index.js"));
const Recursion = (props) => {
    const { name = '', index } = props;
    const { fields } = (0, provider_1.useFormEngineContext)();
    const { getValues } = (0, react_hook_form_1.useFormContext)();
    const { schema, parent, error } = fields[name] || {};
    if (!schema) {
        return null;
    }
    const { type, properties, items, 'x-type': xtype } = schema;
    const value = name !== '' ? getValues(name) : getValues();
    const renderChildren = () => {
        if ((type === 'object' || type === 'void') && properties) {
            return Object.keys(properties).map((key, i) => {
                const path = name ? [name] : [];
                if (type === 'void') {
                    path.shift();
                    if (parent) {
                        path.push(parent);
                    }
                }
                path.push(key);
                return (0, jsx_runtime_1.jsx)(Recursion, { name: path.join('.'), index: i }, key);
            });
        }
        if (type === 'array' && items) {
            return Array.isArray(value) && value.length
                ? value.map((item, i) => {
                    const path = name ? [name] : [];
                    path.push(String(i));
                    return (0, jsx_runtime_1.jsx)(Recursion, { name: path.join('.'), index: i }, item._key);
                })
                : null;
        }
    };
    switch (xtype) {
        case 'Control':
            return (0, jsx_runtime_1.jsx)(control_1.default, { name: name });
        case 'Section':
            return (0, jsx_runtime_1.jsx)(section_1.default, { name: name, children: renderChildren() });
        case 'Card':
            return ((0, jsx_runtime_1.jsx)(card_1.default, { name: name, index: index, error: error, children: renderChildren() }));
        case 'Block':
            return (0, jsx_runtime_1.jsx)(block_1.default, { name: name, children: renderChildren() });
        case 'Grid':
            return (0, jsx_runtime_1.jsx)(grid_1.default, { name: name, children: renderChildren() });
        case 'Switch':
            return (0, jsx_runtime_1.jsx)(switch_1.default, { name: name, children: renderChildren() });
        default:
            return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: renderChildren() });
    }
};
exports.default = Recursion;
