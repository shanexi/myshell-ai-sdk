"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RewardsInviteCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const QuestionMarkCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/QuestionMarkCircleIcon"));
const next_themes_1 = require("next-themes");
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
function RewardsInviteCard({ title, answer, count }) {
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const { theme } = (0, next_themes_1.useTheme)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col justify-center items-center w-[50%] h-[92px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center space-x-1 w-full", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-subtler text-sm md:text-base max-w-[100%] line-clamp-1 flex-shrink-0 font-medium", children: title }), (0, jsx_runtime_1.jsx)("div", { className: "flex", children: (0, jsx_runtime_1.jsxs)(react_1.Popover, { placement: isMobile ? 'top' : 'top-start', trigger: isMobile ? 'click' : 'hover', offset: isMobile ? [0, 5] : [-10, 5], closeOnBlur: true, children: [(0, jsx_runtime_1.jsx)(react_1.PopoverTrigger, { children: (0, jsx_runtime_1.jsx)(QuestionMarkCircleIcon_1.default, { className: "w-4 h-4 text-subtler cursor-pointer flex-shrink-0" }) }), (0, jsx_runtime_1.jsx)("div", { className: "z-[10] h-full w-full", children: (0, jsx_runtime_1.jsxs)(react_1.PopoverContent, { className: "rounded-lg px-3 py-2 border-none shadow-[0_0_40px_0_#0000001A] max-w-[238px] bg-white dark:bg-[#27282C] text-[#414345] dark:text-[#B8BCCF] z-[60]", children: [(0, jsx_runtime_1.jsx)(react_1.PopoverBody, { className: "p-0 text-xs font-[500] z-[60]", children: answer }), (0, jsx_runtime_1.jsx)(react_1.PopoverArrow, { sx: {
                                                    background: theme === 'dark' ? '#27282C !important' : 'white !important',
                                                    boxShadow: '0 0 40px 0 #0000001A !important'
                                                } })] }) })] }) })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-[36px] md:text-[56px] font-[800] text-surface-primary-default font-ppt", children: count })] }));
}
