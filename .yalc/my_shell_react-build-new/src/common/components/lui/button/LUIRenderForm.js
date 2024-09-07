"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RenderForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const clsx_1 = __importDefault(require("clsx"));
const react_hook_form_1 = require("react-hook-form");
const Checkbox_1 = __importDefault(require("../../../../chat/views/chat-body/replicate/Checkbox.js"));
const CustomNumberInput_1 = __importDefault(require("../../../../chat/views/chat-body/replicate/CustomNumberInput.js"));
const CustomSelect_1 = __importDefault(require("../../../../chat/views/chat-body/replicate/CustomSelect.js"));
const CustomTextarea_1 = __importDefault(require("../../../../chat/views/chat-body/replicate/CustomTextarea.js"));
const FileUpload_1 = __importDefault(require("../../../../chat/views/chat-body/replicate/FileUpload.js"));
const NumberSlider_1 = __importDefault(require("../../../../chat/views/chat-body/replicate/NumberSlider.js"));
const CustomCodeEditor_1 = __importDefault(require("../../../../components/chat/chat-body/replicate/custom-code-editor/CustomCodeEditor.js"));
function RenderForm(props) {
    const { formEle, control, setFormValue, errors, register, defaultValues, clearErrors } = props;
    let Com = null;
    if (formEle.type === 'textarea') {
        Com = CustomTextarea_1.default;
    }
    if (formEle.type === 'input') {
        Com = react_1.Input;
    }
    if (formEle.type === 'select' || formEle.type === 'numberSelect') {
        Com = CustomSelect_1.default;
    }
    if (formEle.type === 'numberSlider' || formEle.type === 'interSlider') {
        Com = NumberSlider_1.default;
    }
    if (formEle.type === 'numberInput' || formEle.type === 'interInput') {
        Com = CustomNumberInput_1.default;
    }
    if (formEle.type === 'checkbox') {
        Com = Checkbox_1.default;
    }
    if (formEle.type === 'upload') {
        Com = FileUpload_1.default;
    }
    if (formEle.type === 'codeEditor') {
        Com = CustomCodeEditor_1.default;
    }
    const handleValueChange = (value) => {
        if (setFormValue) {
            setFormValue(formEle.fieldName, value);
        }
    };
    if (Com) {
        const options = (formEle.type === 'select' || formEle.type === 'numberSelect') && formEle.options
            ? { options: formEle.options }
            : {};
        const extFiledName = {};
        if (formEle.type === 'upload') {
            const filedName = formEle.id;
            extFiledName[`x_ms_name_${filedName}`] = defaultValues?.[`x_ms_name_${filedName}`] ?? '';
            extFiledName[`x_ms_size_${filedName}`] = defaultValues?.[`x_ms_size_${filedName}`] ?? '';
        }
        return ((0, jsx_runtime_1.jsxs)(react_1.FormControl, { className: (0, clsx_1.default)('relative', formEle.wrapperClass), children: [formEle.name && ((0, jsx_runtime_1.jsxs)(react_1.FormLabel, { htmlFor: formEle.id, className: "mb-1.5 text-[14px]", children: [formEle.isRequired && (0, jsx_runtime_1.jsx)("span", { className: "text-[#EC2F0D] mr-[2px]", children: "*" }), formEle.name] })), formEle.description && ((0, jsx_runtime_1.jsx)(react_1.FormLabel, { htmlFor: formEle.id, className: "mb-1.5 text-[14px] text-secondary", children: formEle.description })), (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('flex flex-row justify-between items-center'), children: (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: formEle.id, control: control, rules: formEle.rules, render: ({ field }) => {
                            const { ref, onChange, ...rest } = field;
                            const onValueChange = (v) => {
                                let value = v;
                                if (formEle.type === 'checkbox') {
                                    value = v.target.checked;
                                }
                                else if (v.target) {
                                    value = v.target.value;
                                }
                                onChange(value);
                                handleValueChange(value);
                                if (formEle.onChange) {
                                    formEle.onChange(value);
                                }
                            };
                            return ((0, jsx_runtime_1.jsx)(Com, { ...rest, ...(formEle?.props || {}), ...options, ...extFiledName, type: formEle.type, supportedFileTypes: formEle.supportedFileTypes, fileUploadSizeMaximum: formEle?.fileUploadSizeMaximum || 5 * 1024 ** 2, ref: ref, onChange: (data) => {
                                    onValueChange(data);
                                }, setFormValue: setFormValue, errors: errors, clearErrors: clearErrors, isInvalid: !!errors, ...register(formEle.fieldName, { required: formEle.isRequired }), className: (0, clsx_1.default)(formEle.type !== 'checkbox' &&
                                    'w-full border-default hover:border-hovered focus:outline focus:outline-variant focus-visible:border-pressed focus-visible:outline-offset-0 focus-visible:outline-utility-status04-70s04-70s04-70s04-70s04-70 focus-visible:shadow-none rounded-[12px]', formEle.class) }));
                        } }) })] }, formEle.id));
    }
    return null;
}
