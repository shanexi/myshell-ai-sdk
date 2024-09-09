"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Spinner;
const jsx_runtime_1 = require("react/jsx-runtime");
const class_variance_authority_1 = require("class-variance-authority");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("../../../lib/utils");
const spinnerVariants = (0, class_variance_authority_1.cva)('animate-spin', {
    variants: {
        size: {
            '2xs': 'h-3.5 w-3.5',
            xs: 'h-4 w-4',
            sm: 'h-5 w-5',
            md: 'h-6 w-6',
            lg: 'h-9 w-9'
        },
        speed: {
            slow: 'duration-2000',
            default: 'duration-600',
            fast: 'duration-500'
        },
        color: {
            default: 'text-default',
            brand: 'text-brand',
            static: 'text-static',
            warning: 'text-warning',
            success: 'text-success'
        }
    },
    defaultVariants: {
        size: 'md',
        speed: 'default',
        color: 'default'
    }
});
function Spinner(props) {
    const { size, speed, color, className } = props;
    return (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: (0, utils_1.cn)(spinnerVariants({ size, speed, color }), className) });
}
