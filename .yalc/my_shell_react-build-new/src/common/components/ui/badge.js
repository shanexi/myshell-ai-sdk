"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Badge;
const jsx_runtime_1 = require("react/jsx-runtime");
const class_variance_authority_1 = require("class-variance-authority");
const utils_1 = require("../../../lib/utils.js");
const badgeVariants = (0, class_variance_authority_1.cva)('rounded-full flex items-center justify-center', {
    variants: {
        status: {
            default: 'w-2 h-2 bg-surface-critical-default border border-static',
            unRead: 'pb-[1px] min-w-2 min-h-4 bg-surface-critical-default border border-static px-1.5 text-static text-2xs font-medium',
            cardUnRead: 'pb-[1px] min-w-4 min-h-4 bg-surface-critical-default px-1.5 text-static text-2xs font-medium',
            public: 'w-2.5 h-2.5 bg-surface-info-default border-[2px] border-surface-info-subtle-pressed',
            private: 'w-2.5 h-2.5 bg-surface-warning-default border-[2px] border-surface-warning-subtle-pressed',
            hidden: 'w-2.5 h-2.5 bg-icon-disabled border-[2px] border-surface-pressed',
            new: 'w-8.5 h-4 pb-0.5 flex juctify-center items-center bg-surface-critical-default border border-static px-1.5 py-0.5'
        }
    },
    defaultVariants: {
        status: 'default'
    }
});
function Badge(props) {
    const { status, count, className } = props;
    const unReadCount = count && count < 100 ? count : '99+';
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)(badgeVariants({ status }), className), children: status === 'new' ? ((0, jsx_runtime_1.jsx)("span", { className: "text-2xs font-medium text-static ", children: "New" })) : ((0, jsx_runtime_1.jsx)("span", { className: "font-medium text-2xs", children: unReadCount && (status === 'unRead' || status === 'cardUnRead') ? count : null })) }));
}
