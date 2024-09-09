'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { CheckIcon } from '@heroicons/react/24/outline';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown, ChevronUp } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../../lib/utils.js';
const Select = React.forwardRef(({ children, placeholder, options, ...props }, ref) => {
    const icon = options?.find(item => item.value === props.value)?.icon;
    return (_jsxs(SelectPrimitive.Root, { ...props, children: [Array.isArray(options) ? (_jsxs(_Fragment, { children: [_jsx(SelectTrigger, { className: "w-full", children: _jsxs("div", { className: "flex items-center", children: [_jsx(SelectIcon, { icon: icon }), _jsx(SelectValue, { placeholder: placeholder })] }) }), Array.isArray(options) && options.length ? (_jsx(SelectContent, { children: options.map(({ label, value, icon, disabled }, i) => (_jsx(SelectItem, { value: value, icon: icon, disabled: disabled, children: label }, `${value}_${i}`))) })) : null] })) : null, children] }));
});
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (_jsxs(SelectPrimitive.Trigger, { ref: ref, className: cn('flex h-10 w-full items-center justify-between rounded-lg border border-default bg-surface-search-field text-default text-sm shadow-background-default p-3 ring-offset-surface-default placeholder:text-subtler focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-30 [&>span]:line-clamp-1 [&>.select-chevron]:aria-expanded:rotate-180', className), ...props, children: [children, _jsx(SelectPrimitive.Icon, { asChild: true, children: _jsx(ChevronDown, { className: "select-chevron h-5 w-5 text-icon-subtle duration-200" }) })] })));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => (_jsx(SelectPrimitive.ScrollUpButton, { ref: ref, className: cn('flex cursor-default items-center justify-center py-1', className), ...props, children: _jsx(ChevronUp, { className: "h-4 w-4" }) })));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => (_jsx(SelectPrimitive.ScrollDownButton, { ref: ref, className: cn('flex cursor-default items-center justify-center py-1', className), ...props, children: _jsx(ChevronDown, { className: "h-4 w-4" }) })));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = 'popper', ...props }, ref) => (_jsx(SelectPrimitive.Portal, { children: _jsx(SelectPrimitive.Content, { ref: ref, className: cn('relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg	border border-opaque bg-surface-default text-default shadow-modal-default data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1', className), position: position, ...props, children: _jsx(SelectPrimitive.Viewport, { className: cn('p-2 space-y-1', position === 'popper' &&
                'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'), children: children }) }) })));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (_jsx(SelectPrimitive.Label, { ref: ref, className: cn('py-1 px-3 text-sm font-medium text-subtler', className), ...props })));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
function SelectIcon(props) {
    const { icon } = props;
    if (!icon) {
        return null;
    }
    return (_jsx(SelectPrimitive.Icon, { children: _jsx("div", { className: "aspect-[24/24] w-6 h-6 relative bg-cover bg-no-repeat rounded-md overflow-hidden mr-4", style: { backgroundImage: `url('${icon}')` } }) }));
}
SelectIcon.displayName = SelectPrimitive.Icon.displayName;
const SelectItem = React.forwardRef(({ className, children, icon, ...props }, ref) => (_jsxs(SelectPrimitive.Item, { ref: ref, className: cn('relative flex justify-between w-full cursor-pointer select-none items-center rounded-lg py-1 px-3 outline-none focus:bg-surface-container-selected-default focus:text-default data-[disabled]:pointer-events-none data-[disabled]:opacity-30', className), ...props, children: [_jsxs("span", { className: "flex items-center grow", children: [_jsx(SelectIcon, { icon: icon }), _jsx(SelectPrimitive.ItemText, { children: children })] }), _jsx("span", { className: "flex h-4 w-4 items-center justify-center", children: _jsx(SelectPrimitive.ItemIndicator, { children: _jsx(CheckIcon, { className: "h-4 w-4 text-brand stroke-[2px]" }) }) })] })));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (_jsx(SelectPrimitive.Separator, { ref: ref, className: cn('-mx-1 my-1 h-px bg-border-default', className), ...props })));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton };
