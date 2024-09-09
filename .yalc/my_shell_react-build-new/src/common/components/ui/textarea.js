import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../../lib/utils.js';
import { Text } from './typography.js';
const Textarea = React.forwardRef(({ className, maxLength, value, error, ...props }, ref) => {
    return (_jsxs("div", { children: [_jsxs("div", { className: "relative", children: [_jsx("textarea", { className: cn('w-full min-h-[123px] p-3 pb-10 rounded-lg border border-default bg-surface-search-field ', 'shadow-background-default text-sm text-default ring-offset-surface-default  ', 'hover:border-hovered hover:bg-surface-subtle aria-[invalid=true]:border-critical aria-[invalid=true]:hover:border-surface-critical-hovered aria-[invalid=true]:hover:bg-surface-accent-red-subtlest ', 'aria-[invalid=true]:focus-visible:ring-error file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-subtler', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-30', (maxLength && (value?.toString()?.length || 0) > maxLength) || error
                            ? 'border-critical hover:border-critical hover:bg-surface-accent-red-subtlest focus-visible:ring-error'
                            : '', className), ref: ref, maxLength: maxLength, value: value, ...props }), maxLength ? (_jsx("div", { className: "absolute text-right bottom-5 right-4 border-default", children: _jsx(Text, { size: "sm", color: "subtlest", children: `${value?.toString()?.length || 0}/${maxLength}` }) })) : null] }), error && (_jsx("div", { className: "w-full", children: _jsx(Text, { className: "text-wrap", size: "sm", weight: "regular", color: "critical", children: error }) }))] }));
});
Textarea.displayName = 'Textarea';
export { Textarea };
