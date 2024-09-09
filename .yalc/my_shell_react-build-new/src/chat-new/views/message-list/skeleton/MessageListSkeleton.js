import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from '../../../../common/components/ui/skeleton.js';
export default function MessageListSkeleton() {
    return (_jsxs("div", { className: "flex flex-col gap-5 bg-surface-default md:mt-[80px]", children: [_jsx("div", { className: "flex flex-row-reverse items-start", children: _jsx(Skeleton, { animate: true, className: "w-2/3 h-12 rounded-2xl rounded-tr-sm" }) }), _jsxs("div", { className: "flex gap-1.5", children: [_jsx(Skeleton, { animate: true, className: "size-8 rounded-lg" }), _jsx(Skeleton, { animate: true, className: "w-2/3 h-40 rounded-2xl rounded-tl-sm" })] })] }));
}
