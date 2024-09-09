'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Tooltip } from '../../../../common/components/ui/tooltip.js';
import { cn } from '../../../../lib/utils.js';
export const TextInput = forwardRef(({ value, disabled, disabledReason, onChange, onSend, placeholder, style, className, rows, autoFocus, ...props }, ref) => {
    const inputRef = useRef(null);
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current?.focus();
        },
        blur: () => {
            inputRef.current?.blur();
        }
    }));
    const handleInputChange = useCallback(e => {
        if (e?.nativeEvent?.inputType !== 'insertLineBreak') {
            onChange?.(e);
        }
    }, [onChange]);
    const handleSelectionRange = (range) => {
        inputRef?.current?.setSelectionRange(range, range);
    };
    const handleEnterPress = useCallback(e => {
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
    return (_jsx(Tooltip, { align: "start", sideOffset: 8, alignOffset: 8, variant: "info", showArrow: false, triggerClassName: "cursor-text", description: disabled && disabledReason ? disabledReason : '', children: _jsx(TextareaAutosize, { ref: inputRef, className: cn('flex w-full resize-none p-2 bg-surface-default text-sm placeholder:text-subtlest focus-visible:outline-none disabled:cursor-not-allowed disabled:placeholder:text-disabled max-h-full overflow-auto', className), rows: rows || 1, disabled: disabled, value: value, onChange: handleInputChange, autoFocus: autoFocus ?? true, onKeyDown: handleEnterPress, placeholder: placeholder || 'Write a message', ...props }) }));
});
TextInput.displayName = 'TextInput';
