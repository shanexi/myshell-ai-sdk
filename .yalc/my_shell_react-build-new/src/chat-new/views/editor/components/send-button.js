import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import PaperAirplaneIcon from '@heroicons/react/24/solid/PaperAirplaneIcon';
import Image from 'next/image';
import { Button } from '../../../../common/components/ui/button.js';
export function SendButton({ loading = false, disabled = false, onSend, energyPerChat, showEnergyCostIcon }) {
    return (_jsxs(Button, { loading: loading, disabled: disabled, variant: "primary", size: "md", onClick: onSend, className: "w-fit rounded-lg shrink-0", children: [_jsx(PaperAirplaneIcon, { className: "w-4.5 h-4.5" }), showEnergyCostIcon && (_jsxs(_Fragment, { children: [_jsx("hr", { className: "h-3 border-l-[0.5px] mx-1.5 border-[#FFFFFF33]" }), _jsxs("div", { className: "space-x-[2px] items-center flex", children: [_jsx(Image, { alt: "energy icon", src: "/icons/thunder.svg", width: 13.59, height: 13.59 }), _jsx("span", { className: "text-xs font-medium", children: energyPerChat ?? 1 })] })] }))] }));
}
