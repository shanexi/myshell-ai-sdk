"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GitHubInfo;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const ArrowTopRightOnSquareIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowTopRightOnSquareIcon"));
const useDevice_1 = require("../../../../../../../common/hooks/useDevice.js");
function GitHubInfo({ githubUrl }) {
    const { isMobile } = (0, useDevice_1.useDevice)();
    if (!githubUrl)
        return null;
    const urlParam = githubUrl.split('/');
    const authorName = urlParam[urlParam.length - 2];
    const projectName = urlParam[urlParam.length - 1];
    const logo = 'https://image.myshell.ai/image/bot/icon/20231208/github.svg';
    return ((0, jsx_runtime_1.jsxs)(react_1.Popover, { placement: "top", trigger: isMobile ? 'click' : 'hover', offset: [0, 8], closeOnBlur: true, openDelay: 100, children: [(0, jsx_runtime_1.jsx)(react_1.PopoverTrigger, { children: (0, jsx_runtime_1.jsx)("img", { src: logo, className: "w-5 h-5 rounded cursor-pointer shrink-0", alt: "github logo" }) }), (0, jsx_runtime_1.jsx)(react_1.PopoverContent, { className: "rounded-xl px-3 py-2 border border-default w-fit bg-surface text-on-surface shadow-lg", children: (0, jsx_runtime_1.jsx)(react_1.PopoverBody, { className: "p-0 text-xs", children: (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center space-x-4", children: (0, jsx_runtime_1.jsxs)("a", { href: githubUrl, target: "_blank", rel: "noopener noreferrer", className: "flex items-center space-x-1", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-[500]", children: [authorName, ' / ', projectName] }), (0, jsx_runtime_1.jsx)(ArrowTopRightOnSquareIcon_1.default, { className: "w-[20px] h-[20px] stroke-primary" })] }) }) }) })] }));
}
