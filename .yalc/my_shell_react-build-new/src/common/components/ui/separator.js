'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';
import { cn } from '../../../lib/utils.js';
const Separator = React.forwardRef(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (_jsx(SeparatorPrimitive.Root, { ref: ref, decorative: decorative, orientation: orientation, className: cn('shrink-0 border-default', orientation === 'horizontal' ? 'border-b w-full ' : 'h-full  border-r', className), ...props })));
Separator.displayName = SeparatorPrimitive.Root.displayName;
export { Separator };
