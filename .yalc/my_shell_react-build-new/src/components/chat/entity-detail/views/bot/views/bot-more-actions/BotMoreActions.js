"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BotMoreActions;
const jsx_runtime_1 = require("react/jsx-runtime");
const EllipsisHorizontalIcon_1 = __importDefault(require("@heroicons/react/24/outline/EllipsisHorizontalIcon"));
const FlagIcon_1 = __importDefault(require("@heroicons/react/24/outline/FlagIcon"));
const next_intl_1 = require("next-intl");
const react_use_1 = require("react-use");
const dropdown_menu_1 = require("../../../../../../../common/components/ui/dropdown-menu.js");
const icon_button_1 = require("../../../../../../../common/components/ui/icon-button.js");
const link_1 = __importDefault(require("../../../../../../../common/components/ui/link.js"));
const store_1 = require("../../../../../../../services/store/index.js");
function BotMoreActions({ id }) {
    const t = (0, next_intl_1.useTranslations)('common');
    const isMd = (0, react_use_1.useMedia)('(min-width: 768px)');
    const user = (0, store_1.useUserStore)(state => state.user);
    const url = `https://airtable.com/app3bw0lnOOqO2QYs/pagRhK6sS7LoyT65B/form?prefill_User+Name=${user?.name}&prefill_User+ID=${user?.id}&prefill_Entity+Type=Bot&prefill_Entity+ID=${id}`;
    return ((0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { icon: EllipsisHorizontalIcon_1.default, size: isMd ? 'md' : 'sm', variant: "ghost", className: "text-brand" }) }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuContent, { side: "bottom", align: "end", children: (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { asChild: true, children: (0, jsx_runtime_1.jsxs)(link_1.default, { href: url, target: "_blank", className: "flex gap-2 items-center text-critical cursor-pointer", children: [(0, jsx_runtime_1.jsx)(FlagIcon_1.default, { className: "size-5" }), (0, jsx_runtime_1.jsx)("span", { children: t('report') })] }) }) })] }));
}
