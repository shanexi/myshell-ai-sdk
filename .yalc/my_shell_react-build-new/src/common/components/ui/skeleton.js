import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../../../lib/utils.js';
function Skeleton({ className, animate = true, ...props }) {
    return (_jsx("div", { className: cn('rounded-md bg-surface-container-hovered dark:bg-surface-container-pressed', className, animate && 'animate-pulse '), ...props }));
}
export { Skeleton };
