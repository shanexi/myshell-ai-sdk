"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Spinner;
const jsx_runtime_1 = require("react/jsx-runtime");
const class_variance_authority_1 = require("class-variance-authority");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("../../../lib/utils.js");
const spinnerVariants = (0, class_variance_authority_1.cva)('animate-spin', {
    variants: {
        size: {
            lg: 'h-6 w-6',
            md: 'h-5 w-5',
            sm: 'h-[18px] w-[18px]'
        },
        speed: {
            slow: 'duration-2000',
            default: 'duration-1000',
            fast: 'duration-500'
        }
    },
    defaultVariants: {
        size: 'md',
        speed: 'default'
    }
});
function Spinner(props) {
    const { size, speed, className } = props;
    return (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: (0, utils_1.cn)(spinnerVariants({ size, speed }), className) });
}
