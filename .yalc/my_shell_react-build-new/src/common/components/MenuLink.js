"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MenuLink;
const jsx_runtime_1 = require("react/jsx-runtime");
const ChevronRightIcon_1 = __importDefault(require("@heroicons/react/20/solid/ChevronRightIcon"));
const utils_1 = require("../../lib/utils.js");
const HomeIcon_1 = __importDefault(require("./icons/HomeIcon.js"));
const icon_1 = require("./ui/icon.js");
const link_1 = require("./ui/link.js");
function MenuLink({ title, description, isSelected, linkUrl, onClick }) {
    return ((0, jsx_runtime_1.jsx)(link_1.Link, { href: `${linkUrl}`, onClick: () => {
            onClick?.();
        }, className: "cursor-pointer", prefetch: true, children: (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('w-full h-[72px] flex items-center overflow-hidden md:px-3 gap-2', isSelected
                ? 'bg-surface-accent-blue-subtler text-default rounded-lg'
                : 'bg-transparent hover:bg-surface-container-hovered rounded-xl'), children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12", children: (0, jsx_runtime_1.jsx)(HomeIcon_1.default, {}) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col grow overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-base font-medium text-default", children: title }), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('w-full text-sm truncate text-subtler'), children: description })] }), (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: ChevronRightIcon_1.default, size: "2xl", className: "opacity-60" })] }) }));
}
