import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import StopCircleIcon from '@heroicons/react/24/outline/StopCircleIcon';
import { Button } from '../../../common/components/ui/button.js';
export default function Termination({ onTerminate }) {
    return (_jsx(Button, { variant: "primary", color: "default", size: "md", onClick: onTerminate, children: _jsxs("span", { className: "inline-flex space-x-[6px]", children: [_jsx(StopCircleIcon, { className: "w-5 h-5" }), _jsx("span", { className: "text-sm", children: "Stop" })] }) }));
}
