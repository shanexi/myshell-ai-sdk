import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../../lib/utils.js';
export default function CustomSketelon({ customClass, children, animate = true }) {
    return _jsx("div", { className: cn('bg-surface-container-hovered', customClass, animate && 'animate-pulse '), children: children });
}
