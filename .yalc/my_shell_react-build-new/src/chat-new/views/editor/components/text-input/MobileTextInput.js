'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import clsx from 'clsx';
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useClickAway } from 'react-use';
import { IconButton } from '../../../../../common/components/ui/icon-button.js';
import { Separator } from '../../../../../common/components/ui/separator.js';
import { Tooltip } from '../../../../../common/components/ui/tooltip.js';
import { useDetectKeyboardOpen } from '../../../../../common/hooks/useDetectKeyboardOpen.js';
import MobileEntityInfo from '../../MobileEntityInfo.js';
import { SendButton } from '../send-button.js';
export const MobileTextInput = forwardRef(({ value, disabled, disabledReason, onChange, onSend, placeholder, style, className, rows, autoFocus, showMobileDetail, audioInputSlot, loading, interactingDisabled, energyPerChat, showEnergyCostIcon, ...props }, ref) => {
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const compositionFlag = useRef(false);
    const pl = (value || '').trim().split('\n')[0].slice(0, 100);
    const [mode, setMode] = useState('display');
    useClickAway(containerRef, () => {
        setMode('display');
    });
    const handleCompositionStart = () => {
        console.log('flag true');
        compositionFlag.current = true;
    };
    const handleCompositionEnd = () => {
        console.log('flag false');
        compositionFlag.current = false;
    };
    useDetectKeyboardOpen({
        callback: (open) => {
            if (!open) {
                setMode('display');
            }
        }
    });
    const handleSelectionRange = (range) => {
        inputRef?.current?.setSelectionRange(range, range);
    };
    const handleFocus = (e) => {
        const { value: textValue } = e.target;
        const valueLen = textValue.length;
        setTimeout(() => {
            handleSelectionRange(valueLen);
        });
    };
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
    const handleEnterPress = useCallback(e => {
        if (!e.target?.value) {
            return;
        }
        if (e.key === 'Enter') {
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
    }, [onChange]);
    const handleButtonClick = () => {
        onSend?.(value);
        setMode('display');
    };
    return mode === 'display' ? (_jsxs("div", { className: "px-4 flex flex-col gap-2", children: [_jsx(Tooltip, { side: "top", align: "start", sideOffset: 8, alignOffset: 8, variant: "info", showArrow: false, description: (disabled && disabledReason) || '', children: disabled ? (_jsxs("div", { className: "p-2 w-full h-10 overflow-hidden border border-default rounded-lg shadow-textarea flex items-center gap-2", children: [_jsx("p", { className: clsx('grow truncate h-6 text-sm leading-6 text-start', pl.length ? 'text-default' : 'text-subtlest'), children: pl || placeholder || 'Write a message' }), _jsx(IconButton, { icon: PlusCircleIcon, variant: "ghost", size: "md", className: "shrink-0", disabled: true })] })) : (_jsxs("div", { className: "p-2 w-full h-10 overflow-hidden border border-default rounded-lg shadow-textarea flex items-center gap-2", onClick: () => setMode('input'), children: [_jsx("p", { className: clsx('grow truncate h-6 text-sm leading-6 text-start', pl.length ? 'text-default' : 'text-subtlest'), children: pl || placeholder || 'Write a message' }), _jsx(IconButton, { icon: PlusCircleIcon, variant: "ghost", size: "md", className: "shrink-0", disabled: true })] })) }), _jsxs("div", { className: "w-full flex justify-between items-center", children: [_jsx("div", { className: "shrink-0", children: _jsx(MobileEntityInfo, { showMobileDetail: showMobileDetail }) }), audioInputSlot] })] })) : (_jsxs("div", { className: "w-full bg-surface-default flex flex-col gap-2", ref: containerRef, children: [_jsx(Separator, { className: "w-full bg-[var(--border)]" }), _jsx("div", { className: "px-4", children: _jsx(TextareaAutosize, { ref: inputRef, className: "flex w-full resize-none bg-surface-default text-sm leading-6 placeholder:text-subtlest focus-visible:outline-none disabled:cursor-not-allowed disabled:placeholder:text-disabled h-fit max-h-[144px] focus:overflow-auto", rows: rows || 1, disabled: disabled, value: value, onCompositionStart: handleCompositionStart, onCompositionEnd: handleCompositionEnd, onChange: handleInputChange, onFocus: handleFocus, onKeyDown: handleEnterPress, autoFocus: autoFocus ?? true, placeholder: placeholder || 'Write a message', ...props }) }), _jsxs("div", { className: "w-full flex justify-between items-center pl-2 pr-4", children: [_jsx("div", { className: "shrink-0", children: _jsx(IconButton, { icon: PlusCircleIcon, variant: "ghost", size: "md", disabled: true }) }), _jsx(SendButton, { loading: loading, disabled: interactingDisabled, onSend: handleButtonClick, energyPerChat: energyPerChat, showEnergyCostIcon: showEnergyCostIcon && !!value })] })] }));
});
MobileTextInput.displayName = 'MobileTextInput';
