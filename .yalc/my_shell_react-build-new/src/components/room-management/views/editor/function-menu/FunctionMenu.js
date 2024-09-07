"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FunctionMenu;
const jsx_runtime_1 = require("react/jsx-runtime");
const Bars3Icon_1 = __importDefault(require("@heroicons/react/24/outline/Bars3Icon"));
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
const react_1 = require("react");
const react_use_1 = require("react-use");
const StaticContext_1 = require("../../../../../chat-new/context/StaticContext.js");
const definitions_1 = require("../../../../../chat-new/model/definitions.js");
const dropdown_menu_1 = require("../../../../../common/components/ui/dropdown-menu.js");
const icon_button_1 = require("../../../../../common/components/ui/icon-button.js");
const RemoveFromList_1 = __importDefault(require("../../../../../chat-new/views/editor/components/function-menu/remove-from-list/views/RemoveFromList.js"));
function FunctionMenu() {
    const isDesktop = (0, react_use_1.useMedia)('(min-width: 768px)');
    const [open, setOpen] = (0, react_use_1.useToggle)(false);
    const { type, entityInfo, menuFunctions } = (0, react_1.useContext)(StaticContext_1.StaticContext);
    const { id } = entityInfo;
    const closeMenu = () => {
        setOpen(false);
    };
    return ((0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { open: open, children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "ghost", color: "brand", size: "md", icon: open ? XMarkIcon_1.default : Bars3Icon_1.default, className: "data-[state=open]:bg-surface-hovered", onClick: () => setOpen(!open), disabled: !menuFunctions.length }) }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuContent, { className: "w-[calc(100vw-32px)] md:w-fit", side: "top", align: "start", sideOffset: isDesktop ? 8 : 56, collisionPadding: { left: 16, right: 16 }, onInteractOutside: () => setOpen(false), onCloseAutoFocus: e => e.preventDefault(), children: menuFunctions.map(fn => ((0, jsx_runtime_1.jsx)(react_1.Fragment, { children: fn.menuFunction === definitions_1.MenuFunctionEnum.REMOVE_FROM_LIST && ((0, jsx_runtime_1.jsx)(RemoveFromList_1.default, { type: type, id: id, onSuccess: closeMenu, disabled: fn.disabled })) }, fn.menuFunction))) })] }));
}
