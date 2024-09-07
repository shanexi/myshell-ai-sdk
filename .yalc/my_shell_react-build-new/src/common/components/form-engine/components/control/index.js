"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const validator_1 = require("../../utils/validator.js");
const react_hook_form_1 = require("react-hook-form");
const utils_1 = require("../../../../../lib/utils.js");
const form_1 = require("../../../../../common/components/ui/form.js");
const provider_1 = require("../provider/index.js");
const exp_input_1 = require("../../../nocode/components/exp-input/index.js");
const getDefaultValueBySchema_1 = require("../../utils/getDefaultValueBySchema.js");
const ExpReg = /\{\{(.+?)\}\}/;
const Control = props => {
    const { name } = props;
    const { fields, components } = (0, provider_1.useFormEngineContext)();
    const { setValue, getValues } = (0, react_hook_form_1.useFormContext)();
    const { schema, state } = fields[name] || {};
    const [mode, setMode] = (0, react_1.useState)(ExpReg.test(getValues(name)) ? 'raw' : 'ui');
    if (!schema) {
        return null;
    }
    function toggleRaw() {
        const isRaw = mode == 'raw';
        setValue(name, isRaw ? (0, getDefaultValueBySchema_1.getDefaultValueBySchema)(schema) : '');
        setMode(isRaw ? 'ui' : 'raw');
    }
    const { 'x-type': xType, 'x-component': xComponent, 'x-component-props': xComponentProps, 'x-layout': xLayout, 'x-validator': xValidator, 'x-disabled': xDisabled, 'x-read-only': xReadOnly, 'x-hidden': xHidden, 'x-value-prop-name': xValuePropsName, 'x-onchange-prop-name': xOnChangePropsName, 'x-raw': xRaw, 'x-suffix': xSuffix, title, description, default: defaultValue } = schema;
    const { required } = xValidator?.find(item => !!item.required) || {};
    const { control } = (0, react_hook_form_1.useFormContext)();
    const validator = (0, validator_1.createValidator)(schema);
    if (!(xComponent && components[xComponent])) {
        return null;
    }
    const passProps = {
        disabled: xDisabled,
        readOnly: xReadOnly,
        defaultValue,
        ...xComponentProps
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)({ hidden: xHidden }), "data-ui": "control", children: (0, jsx_runtime_1.jsx)(form_1.FormField, { control: control, name: name, rules: {
                validate: v => {
                    if (xRaw) {
                        return true;
                    }
                    const result = validator?.safeParse(v);
                    if (result && !result.success && Array.isArray(result.error.issues) && result.error.issues.length) {
                        const [{ message }] = result.error.issues;
                        return message;
                    }
                    return result?.success;
                }
            }, render: ({ field, fieldState }) => {
                const newField = {};
                const valuePropsName = xValuePropsName || 'value';
                const renderFormItem = () => {
                    return mode === 'ui' ? (react_1.default.createElement(components[xComponent], { ...passProps, ...field, ...newField })) : ((0, jsx_runtime_1.jsx)(exp_input_1.ExpInput, { ...passProps, ...field, ...newField }));
                };
                newField[valuePropsName] = state?.hasOwnProperty('value') ? state.value : field.value;
                if (state?.hasOwnProperty('value') && state.value !== field.value) {
                    field.onChange({ target: { value: state.value } });
                }
                if (xOnChangePropsName) {
                    newField[xOnChangePropsName] = field.onChange;
                }
                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { layout: xLayout, children: [xRaw || title ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [title && xType === 'Control' ? (0, jsx_runtime_1.jsx)(form_1.FormLabel, { required: required, children: title }) : null, xRaw && xType === 'Block' ? (0, jsx_runtime_1.jsx)(form_1.FormLabel, { required: required, children: "Value" }) : null] }), xRaw ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center border border-default bg-surface-subtle rounded-full cursor-pointer", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('w-14 text-xs text-center text-subtle font-medium py-0.5', {
                                                'text-brand': mode === 'ui'
                                            }), onClick: mode === 'raw' ? toggleRaw : undefined, children: "UI" }), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('w-14 text-xs text-center text-subtle font-medium py-0.5', {
                                                'text-brand': mode === 'raw'
                                            }), onClick: mode === 'ui' ? toggleRaw : undefined, children: "Raw" })] })) : null] })) : null, (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: xSuffix ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-x-3 items-center\t", children: [renderFormItem(), react_1.default.createElement(components[xSuffix], { ...passProps, ...field, ...newField })] })) : (renderFormItem()) }), fieldState.error ? ((0, jsx_runtime_1.jsx)(form_1.FormMessage, {})) : description && xType === 'Control' ? ((0, jsx_runtime_1.jsx)(form_1.FormDescription, { children: description })) : null] }));
            } }) }));
};
exports.default = Control;
