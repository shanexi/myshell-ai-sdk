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
exports.FormMessage = exports.FormDescription = exports.FormControl = exports.FormLabel = exports.FormItem = exports.Form = exports.useFormField = void 0;
exports.FormField = FormField;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_slot_1 = require("@radix-ui/react-slot");
const class_variance_authority_1 = require("class-variance-authority");
const React = __importStar(require("react"));
const react_hook_form_1 = require("react-hook-form");
const label_1 = require("../../../common/components/ui/label.js");
const utils_1 = require("../../../lib/utils.js");
const Form = react_hook_form_1.FormProvider;
exports.Form = Form;
const FormFieldContext = React.createContext({});
function FormField({ ...props }) {
    return ((0, jsx_runtime_1.jsx)(FormFieldContext.Provider, { value: { name: props.name }, children: (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { ...props }) }));
}
const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext);
    const itemContext = React.useContext(FormItemContext);
    const { getFieldState, formState } = (0, react_hook_form_1.useFormContext)();
    const fieldState = getFieldState(fieldContext.name, formState);
    if (!fieldContext) {
        throw new Error('useFormField should be used within <FormField>');
    }
    const { id } = itemContext;
    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState
    };
};
exports.useFormField = useFormField;
const FormItemContext = React.createContext({});
const formLayoutVariants = (0, class_variance_authority_1.cva)('', {
    variants: {
        layout: {
            Vertical: 'space-y-1.5',
            Horizontal: 'flex flex-row items-center space-x-3'
        }
    },
    defaultVariants: {
        layout: 'Vertical'
    }
});
const FormItem = React.forwardRef(({ className, layout, ...props }, ref) => {
    const id = React.useId();
    const cls = (0, utils_1.cn)(className, formLayoutVariants({ layout }));
    return ((0, jsx_runtime_1.jsx)(FormItemContext.Provider, { value: { id }, children: (0, jsx_runtime_1.jsx)("div", { ref: ref, className: cls, ...props }) }));
});
exports.FormItem = FormItem;
FormItem.displayName = 'FormItem';
const FormLabel = React.forwardRef(({ className, required, children, ...props }, ref) => {
    const { formItemId } = useFormField();
    return ((0, jsx_runtime_1.jsxs)(label_1.Label, { ref: ref, className: className, htmlFor: formItemId, ...props, children: [required ? (0, jsx_runtime_1.jsx)("span", { className: "text-[#EC2F0D] mr-1", children: "*" }) : null, children] }));
});
exports.FormLabel = FormLabel;
FormLabel.displayName = 'FormLabel';
const FormControl = React.forwardRef(({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    return ((0, jsx_runtime_1.jsx)(react_slot_1.Slot, { ref: ref, id: formItemId, "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`, "aria-invalid": !!error, ...props }));
});
exports.FormControl = FormControl;
FormControl.displayName = 'FormControl';
const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();
    return (0, jsx_runtime_1.jsx)("p", { ref: ref, id: formDescriptionId, className: (0, utils_1.cn)('text-sm text-subtler', className), ...props });
});
exports.FormDescription = FormDescription;
FormDescription.displayName = 'FormDescription';
const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;
    if (!body) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("p", { ref: ref, id: formMessageId, className: (0, utils_1.cn)('text-sm font-medium text-critical', className), ...props, children: body }));
});
exports.FormMessage = FormMessage;
FormMessage.displayName = 'FormMessage';
