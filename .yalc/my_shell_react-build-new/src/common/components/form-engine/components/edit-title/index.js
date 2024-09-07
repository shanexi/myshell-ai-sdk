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
exports.EditTitle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const react_hot_toast_1 = require("react-hot-toast");
const uuid_1 = require("../../../../../common/components/form-engine/utils/uuid.js");
const button_1 = require("../../../../../common/components/ui/button.js");
const dialog_1 = require("../../../../../common/components/ui/dialog.js");
const pencil_square_1 = require("../../../../../common/components/ui/icons/outline/pencil-square.js");
const input_1 = require("../../../../../common/components/ui/input.js");
const select_1 = require("../../../../../common/components/ui/select.js");
const separator_1 = require("../../../../../common/components/ui/separator.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const utils_1 = require("../../../../../lib/utils.js");
const provider_1 = require("../provider/index.js");
const EditTitle = React.forwardRef((props, ref) => {
    const [isEdit, setEdit] = (0, react_1.useState)(false);
    const { getValues } = (0, react_hook_form_1.useFormContext)();
    const { fields } = (0, provider_1.useFormEngineContext)();
    const { path, value, defaultValue, options, showDialog, dialogConfig, validates, changeKeyAndName } = props;
    const title = value || defaultValue;
    const [inputValue, setInputValue] = (0, react_1.useState)();
    const [selectValue, setSelectValue] = (0, react_1.useState)();
    const { parent: parentName } = fields[path] || {};
    const oldKey = path?.replace(`${parentName}.`, '');
    React.useEffect(() => {
        if (isEdit) {
            const isSelect = options?.find(item => item.value === title);
            const name = path && getValues(path)?.name;
            setSelectValue(isSelect ? title : '');
            setInputValue(isSelect ? '' : name || title);
        }
    }, [isEdit, title, path]);
    const handleEditMode = () => {
        setEdit(true);
    };
    const onValuesChange = () => {
        const result = validates?.find(item => new RegExp(item.pattern).test(inputValue));
        if (result?.message) {
            react_hot_toast_1.toast.error(result.message);
            return false;
        }
        if (!inputValue) {
            react_hot_toast_1.toast.error('Operation failed: The key is required.');
            return false;
        }
        if (title !== inputValue) {
            props?.onChange?.({ target: { value: inputValue } });
        }
        setEdit(false);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onValuesChange();
        }
    };
    const onBlur = () => {
        onValuesChange();
    };
    const onSelect = (value) => {
        props?.onChange?.({ target: { value } });
        setEdit(false);
    };
    const onClose = () => {
        setInputValue('');
        setSelectValue('');
        setEdit(false);
    };
    const onConfirm = () => {
        if (!selectValue) {
            const result = validates?.find(item => new RegExp(item.pattern).test(inputValue));
            if (result?.message) {
                react_hot_toast_1.toast.error(result.message);
                return false;
            }
        }
        if (props?.onKeyChange && changeKeyAndName) {
            if (selectValue) {
                props?.onKeyChange?.(selectValue, {
                    name: ''
                });
            }
            else if (inputValue) {
                const key = oldKey?.startsWith('__context__') ? (0, uuid_1.uuid)() : oldKey;
                props?.onKeyChange?.(key, {
                    name: inputValue
                });
            }
        }
        else {
            props?.onChange?.({ target: { value: inputValue || selectValue } });
        }
        setEdit(false);
    };
    const getTitle = () => {
        const name = path && getValues(path)?.name;
        const label = options?.find(item => item.value === title)?.label;
        return label || name || title || 'Untitled';
    };
    if (isEdit && !showDialog) {
        if (options) {
            return ((0, jsx_runtime_1.jsx)(select_1.Select, { value: title, options: options, defaultValue: title, onValueChange: onSelect, placeholder: dialogConfig?.selectLabel }));
        }
        return ((0, jsx_runtime_1.jsx)(input_1.Input, { autoFocus: true, ref: ref, className: (0, utils_1.cn)('h-7 w-full rounded-lg border border-default bg-surface-search-field p-1.5 text-sm text-default focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1 aria-[invalid=true]:border-critical aria-[invalid=true]:hover:border-surface-critical-hovered aria-[invalid=true]:hover:bg-surface-accent-red-subtlest aria-[invalid=true]:focus-visible:ring-error'), onKeyDown: handleKeyDown, onBlur: onBlur, value: inputValue, onChange: e => setInputValue(e.target.value) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h4", children: getTitle() }), (0, jsx_runtime_1.jsx)(pencil_square_1.PencilSquare, { size: "sm", color: "subtle", className: "ml-1", onClick: handleEditMode }), (0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: isEdit && showDialog, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { onClose: onClose, children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: (0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h2", children: dialogConfig?.title }) }) }), (0, jsx_runtime_1.jsx)(separator_1.Separator, {}), (0, jsx_runtime_1.jsxs)(dialog_1.DialogDescription, { className: "grid gap-y-1.5", children: [(0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h4", children: dialogConfig?.selectLabel }), (0, jsx_runtime_1.jsx)(select_1.Select, { options: options, value: selectValue, onValueChange: value => {
                                        setSelectValue(value);
                                        setInputValue('');
                                    }, placeholder: dialogConfig?.selectLabel }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 mx-0.5 my-3", children: [(0, jsx_runtime_1.jsx)(separator_1.Separator, { className: "flex-1" }), (0, jsx_runtime_1.jsx)(typography_1.Description, { className: "text-base", children: "or" }), (0, jsx_runtime_1.jsx)(separator_1.Separator, { className: "flex-1" })] }), (0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h4", children: dialogConfig?.inputLabel }), (0, jsx_runtime_1.jsx)(input_1.Input, { ref: ref, value: inputValue, onChange: e => {
                                        setInputValue(e.target.value);
                                        setSelectValue('');
                                    }, maxLength: props.maxLength, placeholder: props.placeholder })] }), (0, jsx_runtime_1.jsx)(separator_1.Separator, {}), (0, jsx_runtime_1.jsxs)(dialog_1.DialogFooter, { className: "gap-x-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { className: "flex-1", variant: "outline", onClick: onClose, children: "Cancal" }), (0, jsx_runtime_1.jsx)(button_1.Button, { className: "flex-1", onClick: onConfirm, children: "Confirm" })] })] }) })] }));
});
exports.EditTitle = EditTitle;
