import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../../lib/utils.js';
const alertVariants = cva('relative rounded-xl border flex justify-center flex-col md:flex-row md:justify-between items-center gap-3 p-3 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground', {
    variants: {
        variant: {
            default: 'bg-background text-foreground',
            destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
            warning: 'bg-surface-accent-yellow-subtlest border-icon-warning text-warning-bolder',
            info: 'bg-surface-accent-blue-subtlest border-icon-brand text-brand',
            error: 'bg-surface-accent-red-subtlest border-icon-critical text-critical-bolder'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (_jsx("div", { ref: ref, role: "alert", className: cn(alertVariants({ variant }), className), ...props })));
Alert.displayName = 'Alert';
const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (_jsx("h5", { ref: ref, className: cn('mb-1 font-medium leading-none tracking-tight', className), ...props })));
AlertTitle.displayName = 'AlertTitle';
const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn('text-base [&_p]:leading-relaxed', className), ...props })));
AlertDescription.displayName = 'AlertDescription';
export { Alert, AlertTitle, AlertDescription };
