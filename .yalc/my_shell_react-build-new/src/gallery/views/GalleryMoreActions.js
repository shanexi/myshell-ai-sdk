"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GalleryMoreActions;
const jsx_runtime_1 = require("react/jsx-runtime");
const outline_1 = require("@heroicons/react/24/outline");
const EllipsisHorizontalIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/EllipsisHorizontalIcon"));
const next_intl_1 = require("next-intl");
const react_use_1 = require("react-use");
const dropdown_menu_1 = require("../../common/components/ui/dropdown-menu");
const icon_1 = require("../../common/components/ui/icon");
const icon_button_1 = require("../../common/components/ui/icon-button");
const typography_1 = require("../../common/components/ui/typography");
function GalleryMoreActions({ handleDelete }) {
    const t = (0, next_intl_1.useTranslations)('common');
    const isMd = (0, react_use_1.useMedia)('(min-width: 768px)');
    return ((0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, tabIndex: -1, onClick: e => {
                    e.stopPropagation();
                }, children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { icon: EllipsisHorizontalIcon_1.default, size: isMd ? 'md' : 'sm', variant: "ghost", color: "default" }) }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuContent, { side: "bottom", align: "end", onClick: e => {
                    e.stopPropagation();
                }, children: (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { asChild: true, children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full space-x-1.5 cursor-pointer", onClick: handleDelete, children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { component: outline_1.TrashIcon, size: "lg", color: "critical" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", color: "critical", children: t('delete') })] }) }) })] }));
}
