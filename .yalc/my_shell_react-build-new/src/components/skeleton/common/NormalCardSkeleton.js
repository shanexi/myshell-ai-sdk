import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CustomSketelon from '../../../common/components/CustomSketelon.js';
import { cn } from '../../../lib/utils.js';
export function NormalCardSkeleton({ className, size = 'default' }) {
    return (_jsxs("div", { className: cn('w-full px-0 md:px-2.5 flex flex-row justify-start items-center rounded-xl overflow-hidden', className, size === 'sm' ? 'h-[72px]' : 'h-[88px]'), children: [_jsx(CustomSketelon, { customClass: cn('flex-shrink-0 rounded-2xl mr-3', size === 'sm' ? 'h-[48px] w-[48px]' : 'h-[72px] w-[72px]') }), _jsxs("div", { className: "flex justify-center flex-col w-full space-y-1", children: [size === 'default' && _jsx(CustomSketelon, { customClass: "w-[60%] h-[16px] rounded" }), _jsx(CustomSketelon, { customClass: "w-full h-[16px] rounded" }), _jsx(CustomSketelon, { customClass: cn('h-[16px] rounded', size === 'default' ? 'w-[20%]' : 'w-[35%]') })] })] }));
}
