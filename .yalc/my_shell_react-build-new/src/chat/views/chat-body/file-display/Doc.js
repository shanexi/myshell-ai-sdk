"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Doc;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const ArrowDownTrayIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowDownTrayIcon"));
const image_1 = __importDefault(require("next/image"));
const react_2 = require("react");
const usehooks_ts_1 = require("usehooks-ts");
const useDownload_1 = __importDefault(require("../../../../common/hooks/useDownload.js"));
function Doc({ doc }) {
    const hoverRef = (0, react_2.useRef)(null);
    const isHover = (0, usehooks_ts_1.useHover)(hoverRef);
    const { downloading, onDownload } = (0, useDownload_1.default)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3 px-3 rounded-xl border border-default bg-surface h-[58px] w-[260px] md:w-[448px] overflow-hidden relative", ref: hoverRef, children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: doc.iconUrl, alt: "file type", width: 36, height: 36, className: "rounded-[10.8px] overflow-hidden w-9 h-9 shrink-0" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-[2px] grow overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm font-semibold text-on-surface truncate", children: doc.title }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-secondary uppercase", children: doc.extensionName })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-[26px] h-10 shrink-0", children: isHover && ((0, jsx_runtime_1.jsx)(react_1.IconButton, { variant: "unstyled", "aria-label": "download file", isLoading: downloading, onClick: () => onDownload(doc.url, doc.title), className: "p-1 min-w-fit text-[var(--on-surface-btn-text)]", children: (0, jsx_runtime_1.jsx)(ArrowDownTrayIcon_1.default, { className: "w-[18px] h-[18px] text-[var(--on-surface-btn-text)] cursor-pointer" }) })) })] }));
}
