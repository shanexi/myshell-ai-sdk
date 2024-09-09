"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileTextInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const PlusCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/PlusCircleIcon"));
const clsx_1 = __importDefault(require("clsx"));
const react_1 = require("react");
const react_textarea_autosize_1 = __importDefault(require("react-textarea-autosize"));
const react_use_1 = require("react-use");
const icon_button_1 = require("../../../../../common/components/ui/icon-button");
const separator_1 = require("../../../../../common/components/ui/separator");
const tooltip_1 = require("../../../../../common/components/ui/tooltip");
const useDetectKeyboardOpen_1 = require("../../../../../common/hooks/useDetectKeyboardOpen");
const MobileEntityInfo_1 = __importDefault(require("../../MobileEntityInfo"));
const send_button_1 = require("../send-button");
exports.MobileTextInput = (0, react_1.forwardRef)(({ value, disabled, disabledReason, onChange, onSend, placeholder, style, className, rows, autoFocus, showMobileDetail, audioInputSlot, loading, interactingDisabled, energyPerChat, showEnergyCostIcon, ...props }, ref) => {
    const inputRef = (0, react_1.useRef)(null);
    const containerRef = (0, react_1.useRef)(null);
    const compositionFlag = (0, react_1.useRef)(false);
    const pl = (value || '').trim().split('\n')[0].slice(0, 100);
    const [mode, setMode] = (0, react_1.useState)('display');
    (0, react_use_1.useClickAway)(containerRef, () => {
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
    (0, useDetectKeyboardOpen_1.useDetectKeyboardOpen)({
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
    const handleEnterPress = (0, react_1.useCallback)(e => {
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
    return mode === 'display' ? ((0, jsx_runtime_1.jsxs)("div", { className: "px-4 flex flex-col gap-2", children: [(0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { side: "top", align: "start", sideOffset: 8, alignOffset: 8, variant: "info", showArrow: false, description: (disabled && disabledReason) || '', children: disabled ? ((0, jsx_runtime_1.jsxs)("div", { className: "p-2 w-full h-10 overflow-hidden border border-default rounded-lg shadow-textarea flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, clsx_1.default)('grow truncate h-6 text-sm leading-6 text-start', pl.length ? 'text-default' : 'text-subtlest'), children: pl || placeholder || 'Write a message' }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { icon: PlusCircleIcon_1.default, variant: "ghost", size: "md", className: "shrink-0", disabled: true })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "p-2 w-full h-10 overflow-hidden border border-default rounded-lg shadow-textarea flex items-center gap-2", onClick: () => setMode('input'), children: [(0, jsx_runtime_1.jsx)("p", { className: (0, clsx_1.default)('grow truncate h-6 text-sm leading-6 text-start', pl.length ? 'text-default' : 'text-subtlest'), children: pl || placeholder || 'Write a message' }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { icon: PlusCircleIcon_1.default, variant: "ghost", size: "md", className: "shrink-0", disabled: true })] })) }), (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "shrink-0", children: (0, jsx_runtime_1.jsx)(MobileEntityInfo_1.default, { showMobileDetail: showMobileDetail }) }), audioInputSlot] })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "w-full bg-surface-default flex flex-col gap-2", ref: containerRef, children: [(0, jsx_runtime_1.jsx)(separator_1.Separator, { className: "w-full bg-[var(--border)]" }), (0, jsx_runtime_1.jsx)("div", { className: "px-4", children: (0, jsx_runtime_1.jsx)(react_textarea_autosize_1.default, { ref: inputRef, className: "flex w-full resize-none bg-surface-default text-sm leading-6 placeholder:text-subtlest focus-visible:outline-none disabled:cursor-not-allowed disabled:placeholder:text-disabled h-fit max-h-[144px] focus:overflow-auto", rows: rows || 1, disabled: disabled, value: value, onCompositionStart: handleCompositionStart, onCompositionEnd: handleCompositionEnd, onChange: handleInputChange, onFocus: handleFocus, onKeyDown: handleEnterPress, autoFocus: autoFocus ?? true, placeholder: placeholder || 'Write a message', ...props }) }), (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex justify-between items-center pl-2 pr-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "shrink-0", children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { icon: PlusCircleIcon_1.default, variant: "ghost", size: "md", disabled: true }) }), (0, jsx_runtime_1.jsx)(send_button_1.SendButton, { loading: loading, disabled: interactingDisabled, onSend: handleButtonClick, energyPerChat: energyPerChat, showEnergyCostIcon: showEnergyCostIcon && !!value })] })] }));
});
exports.MobileTextInput.displayName = 'MobileTextInput';
