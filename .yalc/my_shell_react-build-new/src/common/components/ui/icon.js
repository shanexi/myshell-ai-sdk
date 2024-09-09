import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../../lib/utils.js';
const iconVariants = cva('inline-flex shrink-0', {
    variants: {
        size: {
            '2xs': 'w-3 h-3',
            xs: 'w-3.5 h-3.5',
            sm: 'w-4 h-4',
            md: 'w-4.5 h-4.5',
            lg: 'w-5 h-5',
            xl: 'w-5.5 h-5.5',
            '2xl': 'w-6 h-6',
            '3xl': 'w-7 h-7',
            '4xl': 'w-8 h-8',
            '5xl': 'w-9 h-9',
            '6xl': 'w-10 h-10',
            '7xl': 'w-12 h-12'
        },
        color: {
            default: 'text-default',
            subtle: 'text-subtle',
            subtlest: 'text-subtlest',
            disabled: 'text-disabled',
            inverse: 'text-inverse',
            static: 'text-static',
            brand: 'text-brand',
            critical: 'text-critical',
            warning: 'text-warning',
            success: 'text-success'
        },
        rotate: {
            '45': 'rotate-45',
            '90': 'rotate-90',
            '-45': '-rotate-45',
            '-90': '-rotate-90',
            '180': 'rotate-180'
        }
    },
    defaultVariants: {
        size: 'sm',
        color: 'default'
    }
});
const Icon = React.forwardRef((props, ref) => {
    const { children, component, size, color, rotate, className, ...passProps } = props;
    const Com = component || 'span';
    return (_jsx(Com, { ref: ref, ...passProps, className: cn(iconVariants({ size, color, rotate }), className), children: children }));
});
Icon.displayName = 'Icon';
export { Icon };
