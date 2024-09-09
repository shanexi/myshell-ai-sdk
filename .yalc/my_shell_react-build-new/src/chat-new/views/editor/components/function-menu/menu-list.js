"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MenuList;
const jsx_runtime_1 = require("react/jsx-runtime");
const Bars3Icon_1 = __importDefault(require("@heroicons/react/24/outline/esm/Bars3Icon"));
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/XMarkIcon"));
const react_1 = require("react");
const react_use_1 = require("react-use");
const StaticContext_1 = require("../../../../../chat-new/context/StaticContext");
const definitions_1 = require("../../../../../chat-new/model/definitions");
const dropdown_menu_1 = require("../../../../../common/components/ui/dropdown-menu");
const icon_button_1 = require("../../../../../common/components/ui/icon-button");
const ClearHistory_1 = __importDefault(require("./clear-history/views/ClearHistory"));
const ClearMemory_1 = __importDefault(require("./clear-memory/views/ClearMemory"));
const RemoveFromList_1 = __importDefault(require("./remove-from-list/views/RemoveFromList"));
function MenuList() {
    const isDesktop = (0, react_use_1.useMedia)('(min-width: 768px)');
    const [open, setOpen] = (0, react_use_1.useToggle)(false);
    const { type, entityInfo, menuDisabled, menuFunctions, customMenuFunction } = (0, react_1.useContext)(StaticContext_1.StaticContext);
    const { id } = entityInfo;
    const closeMenu = () => {
        setOpen(false);
    };
    return ((0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { open: open, children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "ghost", color: "brand", size: "md", icon: open ? XMarkIcon_1.default : Bars3Icon_1.default, className: "data-[state=open]:bg-surface-hovered", onClick: () => setOpen(!open), disabled: menuDisabled || (!menuFunctions.length && !customMenuFunction?.length) }) }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuContent, { className: "w-[calc(100vw-32px)] md:w-fit", side: "top", align: "start", sideOffset: isDesktop ? 8 : 56, collisionPadding: { left: 16, right: 16 }, onInteractOutside: () => setOpen(false), onCloseAutoFocus: e => e.preventDefault(), children: [menuFunctions.map(fn => ((0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [fn.menuFunction === definitions_1.MenuFunctionEnum.REMOVE_FROM_LIST && ((0, jsx_runtime_1.jsx)(RemoveFromList_1.default, { type: type, id: id, onSuccess: closeMenu })), fn.menuFunction === definitions_1.MenuFunctionEnum.CLEAR_MEMORY && ((0, jsx_runtime_1.jsx)(ClearMemory_1.default, { type: type, id: id, onSuccess: closeMenu })), fn.menuFunction === definitions_1.MenuFunctionEnum.CLEAR_HISTORY && ((0, jsx_runtime_1.jsx)(ClearHistory_1.default, { type: type, id: id, onSuccess: closeMenu }))] }, fn.menuFunction))), (customMenuFunction ?? []).map((menu, index) => {
                        const Ele = (0, react_1.cloneElement)(menu, {
                            onSuccess: closeMenu
                        });
                        return (0, jsx_runtime_1.jsx)(react_1.Fragment, { children: Ele }, index);
                    })] })] }));
}
