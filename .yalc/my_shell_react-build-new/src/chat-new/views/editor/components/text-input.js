"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_textarea_autosize_1 = __importDefault(require("react-textarea-autosize"));
const tooltip_1 = require("../../../../common/components/ui/tooltip.js");
const utils_1 = require("../../../../lib/utils.js");
exports.TextInput = (0, react_1.forwardRef)(({ value, disabled, disabledReason, onChange, onSend, placeholder, style, className, rows, autoFocus, ...props }, ref) => {
    const inputRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, () => ({
        focus: () => {
            inputRef.current?.focus();
        },
        blur: () => {
            inputRef.current?.blur();
        }
    }));
    const handleInputChange = (0, react_1.useCallback)(e => {
        if (e?.nativeEvent?.inputType !== 'insertLineBreak') {
            onChange?.(e);
        }
    }, [onChange]);
    const handleSelectionRange = (range) => {
        inputRef?.current?.setSelectionRange(range, range);
    };
    const handleEnterPress = (0, react_1.useCallback)(e => {
        if (!e.target?.value) {
            return;
        }
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                const { value: v, selectionStart, selectionEnd } = e.target;
                const prev = v.slice(0, selectionStart);
                const next = v.slice(selectionEnd);
                onChange?.({
                    target: {
                        value: `${prev}\n${next}`
                    }
                });
                const newRange = selectionStart + 1;
                setTimeout(() => {
                    handleSelectionRange(newRange);
                });
            }
            else {
                e.preventDefault();
                onSend?.(value);
            }
        }
    }, [onChange, onSend, value]);
    return ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { align: "start", sideOffset: 8, alignOffset: 8, variant: "info", showArrow: false, triggerClassName: "cursor-text", description: disabled && disabledReason ? disabledReason : '', children: (0, jsx_runtime_1.jsx)(react_textarea_autosize_1.default, { ref: inputRef, className: (0, utils_1.cn)('flex w-full resize-none p-2 bg-surface-default text-sm placeholder:text-subtlest focus-visible:outline-none disabled:cursor-not-allowed disabled:placeholder:text-disabled max-h-full overflow-auto', className), rows: rows || 1, disabled: disabled, value: value, onChange: handleInputChange, autoFocus: autoFocus ?? true, onKeyDown: handleEnterPress, placeholder: placeholder || 'Write a message', ...props }) }));
});
exports.TextInput.displayName = 'TextInput';
